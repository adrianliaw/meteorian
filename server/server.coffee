Meteor.startup ->
	if Categories.find().count() == 0
		for cat in data.Categories
			iid = Categories.insert name: cat
			for subcat in data.SubCategories[cat]
				SubCategories.insert
					name: subcat
					cat: iid
	if Products.find().count() == 0
		for p in data.Products
			Products.insert p


Meteor.methods
	removeAll: ->
		Products.remove {}
		Categories.remove {}
		SubCategories.remove {}
		CartItems.remove {}
	addToCart: (qty, product, session) ->
		if qty > 0
			if CartItems.findOne( product:product )
				added = CartItems.findOne product:product
				CartItems.remove added._id
				qty = String Number added.qty + Number qty
			CartItems.insert 
				qty: qty
				product: product
				sessid: session
		else
			console.log "Quality is less then 0"
	removeCartItem: (id) ->
		CartItems.remove _id:id