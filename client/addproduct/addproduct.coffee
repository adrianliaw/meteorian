Template.addproduct.events
	"keyup #cat": (e) ->
		$("#cat").val $("#cat").val().toUpperCase()
	"focus #cat": (e) ->
		$("#cat").autocomplete
			source: (p.name for p in Categories.find().fetch())
	"focus #subcat": (e) ->
		$("#subcat").autocomplete
			source: (p.name for p in SubCategories.find().fetch())
	"submit #inputs": (e, t) ->
		cat = $("#cat").val()
		#console.log cat
		if not Categories.findOne( name:cat )
		#	console.log true
			Categories.insert name:cat
		subcat = $("#subcat").val()
		key = 
			cat  : Categories.findOne( name:cat )._id
			name : subcat
		if not SubCategories.findOne key
			SubCategories.insert key
		Products.insert
			thumb      : $("#thumbnail").val()
			name       : $("#name").val()
			desc       : $("#desc").val()
			price      : Number $("#price").val()
			catName    : cat
			subcatName : subcat
		Router.go "/#{cat}/#{subcat}"