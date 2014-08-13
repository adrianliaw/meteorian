Template.products.catnotselected = function () {
	return Session.equals("category", null);
};

Template.products.category = function () {
	return Session.get("category");
};

Template.products.subcategory = function () {
	return Session.get("subcategory");
}

Template.products.productlist = function () {
	return Products.find({catName: Session.get("category"), subcatName: Session.get("subcategory")});
}

Template.product.currency = function (num) {
	return "$" + Number(num).toFixed(2);
}

Template.product.events({
	'click .addcart': function (e, t) {
		var qty = t.find(".prodqty").value;
		var product = this._id;
		var sessid = Meteor.default_connection._lastSessionId;
		Meteor.call("addToCart", qty, product, sessid);
	}
});