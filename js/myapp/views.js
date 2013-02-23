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
	},

    render:function(){
		// Compile the template using underscore
        var template = _.template( $("#person_template").html(), {} );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
        return this;
    }

});

AddressView = Backbone.View.extend({
	initialize: function() {
		console.log("init address view");
		this.render();
	},

    render:function(){
		// Compile the template using underscore
        var template = _.template( $("#address_template").html(), {} );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
        return this;
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
        return this;
    }

});

// creating the views


document.ready = function () {
	var person_view = new PersonView({ el: $("#container") });
}
//var address_view = new AddressView({ el: $("#container") });
//var summary_view = new SummaryView({ el: $("#container") });

}());
