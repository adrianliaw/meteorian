Template.addproduct.events({
	"keyup #cat": function (e) {
		$("#cat").val($("#cat").val().toUpperCase());
	}, 
	"focus #cat": function (e) {
		$("#cat").autocomplete({
			source: (function () {
				list = [];
				Categories.find().forEach(function (p) {
					list.push(p.name);
				});
				return list
			})()
		});
	}, 
	"focus #subcat": function (e) {
		$("#subcat").autocomplete({
			source: (function () {
				list = [];
				SubCategories.find().forEach(function (p) {
					list.push(p.name);
				});
				return list
			})()
		});
	}, 
	"submit #inputs": function (e, t) {
		var cat = t.find("#cat").value;
		if (!Categories.findOne({name:cat})) {
			Categories.insert({name:cat});
		}
		var subcat = t.find("#subcat").value;
		if (!SubCategories.findOne({cat:Categories.findOne({name:cat})._id, name:subcat})) {
			SubCategories.insert({cat:Categories.findOne({name:cat})._id, name:subcat});
		}
		Products.insert({thumb: t.find("#thumbnail").value, 
						 name: t.find("#name").value, 
						 desc: t.find("#desc").value, 
						 price: t.find("#price").value, 
						 catName: cat, 
						 subcatName: subcat});
		Router.go("/"+cat+"/"+subcat);
	}
});