Template.categories.Categories = function () {
	return Categories.find();
};

Template.categories.SubCategories = function () {
	return SubCategories.find({cat:this._id});
};

dropDownIcon = function(cat) {
	this.catName = cat.name;
	this.iconClass = "icon-"+cat._id;
	this.subCatUlClass = "subcateg-"+cat._id;
	this.headerClass = "categ-"+cat._id;
	this.iconElem = $("."+this.iconClass);
	this.subCatElem = $("."+this.subCatUlClass);
	this.headerElem = $("."+this.headerClass);
	this.state = false;
	this.rotDown = function () {
		this.iconElem.stop().animate(
			{rotation: 90}, 
			{
				duration: 500, 
				step: function (now, fx) {
					$(this).css({"transform": "rotate("+now+"deg)"});
				}
			}
		);
		this.subCatElem.stop().toggle("blind", 500);
	};
	this.rotBack = function () {
		this.iconElem.stop().animate(
			{rotation: 0}, 
			{
				duration: 500, 
				step: function (now, fx) {
					$(this).css({"transform": "rotate("+now+"deg)"});
				}
			}
		);
		this.subCatElem.stop().toggle("blind", 500);
	};
	this.toggle = function () {
		if (!this.state) {
			this.rotDown();
		} else {
			this.rotBack();
		}
		this.state = !this.state;
	};
};

setup = function () {
	catElems = {};
	Categories.find().forEach(function (cat) {
		catElems[cat.name] = new dropDownIcon(cat);
	});
}

Template.categories.rendered = function () {
	$("li[class^=nav-header]").ready(function () {
		setup();
	});
	interval = window.setInterval(function () {
		if ($(".nav-header").length > 0) {
			catElems = {};
			Categories.find().forEach(function (cat) {
				catElems[cat.name] = new dropDownIcon(cat);
			});
			window.clearInterval(interval);
		}
	}, 100);
};