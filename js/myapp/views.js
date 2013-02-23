/**
 * Created with JetBrains WebStorm.
 * User: sfuss
 * Date: 23.02.13
 * Time: 14:51
 * To change this template use File | Settings | File Templates.
 */

PersonView = Backbone.View.extend({
	initialize: function() {
		this.model = new Person();
		console.log("fetch", this.model);
		this.model.fetch();
		this.render();

	},

    render:function(){
		// Compile the template using underscore
        var template = _.template( $("#person_template").html(), {} );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
        // execute the model bindings
    	Backbone.ModelBinding.bind(this);
        return this;
    },

    events : {
    	"click #next" : "next"
    },

    next : function () {
    	window.sessionStorage.setItem("person", JSON.stringify(this.model));
    	var address = new Address(JSON.parse(window.sessionStorage.getItem("address")));
    	new AddressView({ el: this.el , model : address});
    },

    close: function(){
    	// If you do not call this method when your view is being closed / removed / cleaned up, then you may end up with memory leaks and zombie views that are still responding to model change events.
	    this.remove();
	    this.unbind();
	    Backbone.ModelBinding.unbind(this);
	}

});

AddressView = Backbone.View.extend({
	initialize: function() {
		this.model = new Address();
		this.render();
	},

    render:function(){
		// Compile the template using underscore
        var template = _.template( $("#address_template").html(), {} );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
        // execute the model bindings
    	Backbone.ModelBinding.bind(this);
        return this;
    },

	events : {
    	"click #next" : "next",
    	"click #back" : "back"
    },

    back : function () {
    	window.sessionStorage.setItem("address", JSON.stringify(this.model));
		var person = new Person(JSON.parse(window.sessionStorage.getItem("person")));
    	new PersonView({ el: this.el , model : person});
    },

    next : function () {
    	window.sessionStorage.setItem("address", JSON.stringify(this.model));
		var person = JSON.parse(window.sessionStorage.getItem("person"));
		var address = this.model.toJSON();
		var summary = _.extend({},person, address);
		console.log("show sum", summary);
    	new SummaryView({ el: this.el , model: new Summary(summary) } );
    },

    close: function(){
    	// If you do not call this method when your view is being closed / removed / cleaned up, then you may end up with memory leaks and zombie views that are still responding to model change events.
	    this.remove();
	    this.unbind();
	    Backbone.ModelBinding.unbind(this);
	}
});

SummaryView = Backbone.View.extend({
	initialize: function() {
		this.model = new Summary();
		this.render();
	},

    render:function(){
    	var model = this.model.toJSON();
		// Compile the template using underscore
        var template = _.template( $("#summary_template").html(), model );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
        // execute the model bindings
    	Backbone.ModelBinding.bind(this);
        return this;
    },

    close: function(){
    	// If you do not call this method when your view is being closed / removed / cleaned up, then you may end up with memory leaks and zombie views that are still responding to model change events.
	    this.remove();
	    this.unbind();
	    Backbone.ModelBinding.unbind(this);
	}

});
