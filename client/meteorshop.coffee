Session.setDefault "category", null
Session.setDefault "subcategory", null
Session.setDefault "addProduct", false

Router.configure
    layoutTemplate: "layout"
    yieldTemplates: 
        products: 
            to: "products"
        cart:
            to: "cart"
        categories:
            to: "categories"
        addproduct:
            to: "addproduct"

Router.map ->
    @route "", 
        data: ->
            Session.set "addProduct", false
            Session.set "category", null
            Session.set "subcategory", null
        template: "layout"
    @route "addproduct", 
        data: ->
            Session.set "addProduct", true
        template: "layout"
        path: "/AddProduct"
    @route "products", 
        data: ->
            Session.set "category", @params.cat
            Session.set "subcategory", @params.subcat
            Session.set "addProduct", false
        template: "layout"
        path: "/:cat/:subcat"