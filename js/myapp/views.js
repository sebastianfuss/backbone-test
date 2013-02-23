/**
 * Created with JetBrains WebStorm.
 * User: sfuss
 * Date: 23.02.13
 * Time: 14:51
 * To change this template use File | Settings | File Templates.
 */

(function (){

PersonView = Backbone.View.extend({
	initialize: function() {
		console.log("init person view");
		this.render();
		_.bindAll(this, 'contentChanged');
    	this.inputContent = this.$('input.content');
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
    	"click #next" : "next",
    	"change input.content":  "contentChanged"
    },

    next : function () {
    	window.sessionStorage.setItem("person", JSON.stringify(this.model));
    	var address = new Address();
    	new AddressView({ el: this.el , model : address});
    },

    contentChanged: function () {
    	var input = this.inputContent;
    	console.log(input);
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
		console.log(JSON.parse(window.sessionStorage.getItem("person")));
		console.log("init address view");
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
    	new PersonView({ el: this.el });
    },

    next : function () {
    	new SummaryView({ el: this.el });
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
		console.log("init summary view");
		this.render();
	},

    render:function(){
		// Compile the template using underscore
        var template = _.template( $("#summary_template").html(), {} );
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

// creating the views


document.ready = function () {
	person = new Person();
	person_view = new PersonView({ el: $("#container") , model : person});
}
//var address_view = new AddressView({ el: $("#container") });
//var summary_view = new SummaryView({ el: $("#container") });

}());
