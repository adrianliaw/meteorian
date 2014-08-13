Session.setDefault("category", null);
Session.setDefault("addProduct", false);

Router.configure({
    layoutTemplate: "layout", 
    yieldTemplates: {
        "products": {to: "products"}, 
        "cart": {to: "cart"}, 
        "categories": {to: "categories"}, 
        "addproduct": {to: "addproduct"}
    }
});

Router.map(function () {
    this.route("/", "layout");
    this.route("/addproduct", {
        data: function () {
            Session.set("addProduct", true);
        }, 
        template: "layout", 
        path: "/AddProduct"
    });
    this.route("/products", {
        data: function () {
            Session.set("category", this.params.cat);
            Session.set("subcategory", this.params.subcat);
            Session.set("addProduct", false);
        }, 
        template: "layout", 
        path: "/:cat/:subcat"
    });
});


