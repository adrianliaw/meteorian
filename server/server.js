Meteor.startup(function () {
	if (Categories.find().count() == 0) {
		for (var i=0; i<data.Categories.length; i++) {
			var iid = Categories.insert({name: data.Categories[i]});
			for (var j=0; j<data.SubCategories[data.Categories[i]].length; j++) {
				SubCategories.insert({
					name: data.SubCategories[data.Categories[i]][j], 
					cat: iid
				});
			}
		}
	}
	if (Products.find().count() == 0) {
		for (var i=0; i<data.Products.length; i++) {
			Products.insert(data.Products[i]);
		}
	}
});


Meteor.methods({
	removeAll: function () {
		Products.remove({});		
		Categories.remove({});
		SubCategories.remove({});
		CartItems.remove({});
	}, 
	addToCart: function (qty, product, session) {
		if (qty > 0) {
			if (CartItems.findOne({product:product})) {
				var added = CartItems.findOne({product:product});
				CartItems.remove(added._id);
				qty = String(Number(added.qty)+Number(qty));
			}
			CartItems.insert({qty:qty, product:product, sessid:session});
		} else {
			console.log("Quality is less then 0");
		}
	}, 
	removeCartItem: function (id) {
		CartItems.remove({_id:id});
	}, 
	sampleProducts: function () {
		if (Categories.find().count() == 0) {
			for (var i=0; i<data.Categories.length; i++) {
				var iid = Categories.insert({name: data.Categories[i]});
				for (var j=0; j<data.SubCategories[data.Categories[i]].length; j++) {
					SubCategories.insert({
						name: data.SubCategories[data.Categories[i]][j], 
						cat: iid
					});
				}
			}
		}
		if (Products.find().count() == 0) {
			for (var i=0; i<data.Products.length; i++) {
				data.Products[i].thumb = Meteor.absoluteUrl() + data.Products[i].thumb
				Products.insert(data.Products[i]);
			}
		}
	}
});