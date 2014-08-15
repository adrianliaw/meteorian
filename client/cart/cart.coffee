Template.cart.helpers
	currency: (num) ->
		"$#{Number(num).toFixed 2}"
	cartitems: ->
		shopCart = []
		shopCart.subtotal = 0
		CartItems.find().forEach (cartitem) ->
			product = Products.findOne 
				_id: cartitem.product
			cartitem.productname = product.name
			cartitem.price = Number(product.price) * cartitem.qty
			shopCart.subtotal += cartitem.price
			shopCart.push cartitem
		shopCart.tax = shopCart.subtotal * .06
		shopCart.total = shopCart.subtotal + shopCart.tax
		shopCart

Template.cart.events
	"click .removeci": (e, t) ->
		$("#cartitem-#{@_id}").hide "fold", {}, 500, 
			->
				Meteor.call "removeCartItem", @id[9..]