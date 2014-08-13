Template.cart.currency = function (num) {
	return "$" + Number(num).toFixed(2);
}

Template.cart.cartitems = function () {
	var shopCart = [];
	var cartItems = CartItems.find();
	var total = 0;
	cartItems.forEach(function (cartitem) {
		var product = Products.findOne({_id:cartitem.product});
		cartitem.productname = product.name;
		cartitem.price = (Number(product.price) * cartitem.qty);
		total += cartitem.price;
		shopCart.push(cartitem);
	});
	shopCart.subtotal = total;
	shopCart.tax = shopCart.subtotal * .06;
	shopCart.total = shopCart.subtotal + shopCart.tax;
	return shopCart;
}

Template.cart.events({
	'click .removeci': function (e, t) {
		Meteor.call("removeCartItem", this._id);
	}
});