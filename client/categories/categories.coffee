Template.categories.helpers
	Categories: ->
		Categories.find()
	SubCategories: ->
		SubCategories.find cat:@_id

class dropDownIcon
	constructor: (cat) ->
		@_id = cat._id
		@iconElem = $ ".icon-#{@_id}"
		@subCatElem = $ ".subcateg-#{@_id}"
		@headerElem = $ ".categ-#{@_id}"
		@state = false
	rotDown: ->
		@iconElem.stop().animate
			rotation: 90, 
				duration: 500, 
				step: (now, fx) ->
					$(@).css
						transform: "rotate(#{now}deg)"
		@subCatElem.stop().toggle "blind", 500
	rotBack: ->
		@iconElem.stop().animate
			rotation: 0, 
				duration: 500, 
				step: (now, fx) ->
					$(@).css
						transform: "rotate(#{now}deg)"
		@subCatElem.stop().toggle "blind", 500
	toggle: ->
		if @state then @rotBack() else @rotDown()
		@state = !@state

Template.categories.rendered = ->
	interval = window.setInterval ->
		if $(".nav-header").length > 0
			window.catElems = {}
			Categories.find().forEach (cat) ->
				catElems[cat.name] = new dropDownIcon cat
			window.clearInterval interval
	, 100