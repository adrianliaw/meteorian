Template.products.helpers
	catnotselected: ->
		Session.equals "category", null
	category: ->
		Session.get "category"
	subcategory: ->
		Session.get "subcategory"
	productlist: ->
		Products.find
			catName: Session.get "category"
			subcatName: Session.get "subcategory"

Template.product.currency = (num) ->
	"$" + Number(num).toFixed 2

Template.product.events
	"click .addcart": (e, t) ->
		qty = t.find(".prodqty").value
		product = @_id
		sessid = Meteor.default_connection._lastSessionId
		Meteor.call "addToCart", qty, product, sessid
		$("#cartitem-"+@_id).hide "fold", 500