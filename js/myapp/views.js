/**
 * Created with JetBrains WebStorm.
 * User: sfuss
 * Date: 23.02.13
 * Time: 14:51
 * To change this template use File | Settings | File Templates.
 */

PersonView = Backbone.View.extend({
	initialize: function() {
		that = this;
		var model = new Person();
		model.fetch({
			"success" : function (model) {
				// im erfolgsfall altes model
				that.model = model;
		        _.bindAll(this, 'render', 'close');
		        this.model.bind('change', this.render);
				that.render();
			},
			"error" : function () {
				// im fehlerfall neues modell
				that.model = new Person();
		        _.bindAll(this, 'render', 'close');
		        this.model.bind('change', this.render);
				that.render();
			}
		});
	},

    render:function(){
        var model = this.model.toJSON();
		// Compile the template using underscore
        var template = _.template( $("#person_template").html(), model );
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
    	var that = this;
    	this.model.save(this.model.toJSON(),{
    		"success" : function () {
    			var view = new AddressView({ el: that.el });
    		},
    		"error" : function () {
    			console.error("Fehler beim Speichern");
    		}
    	});
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
		that = this;
		var model = new Address();
		model.fetch({
			"success" : function (model) {
				// im erfolgsfall altes model
				that.model = model;
				that.render();
			},
			"error" : function () {
				// im fehlerfall neues modell
				that.model = new Address();
				that.render();
			}
		});
	},

    render:function(){
        var model = this.model.toJSON();
		// Compile the template using underscore
        var template = _.template( $("#address_template").html(), model );
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
    	var that = this;
    	this.model.save(this.model.toJSON(), {
			"success" : function (model) {
    			new PersonView({ el: that.el } );
			},
			"error" : function () {
    			console.error("Fehler beim Speichern");
			}
    	});
    },

    next : function () {
    	var that = this;
    	this.model.save(this.model.toJSON(), {
			"success" : function (model) {
    			new SummaryView({ el: that.el } );
			},
			"error" : function () {
    			console.error("Fehler beim Speichern");
			}
    	});
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
		that = this;
		var model = new Summary();
		model.fetch({
			"success" : function (model) {
				// im erfolgsfall altes model
				that.model = model;
				that.render();
			},
			"error" : function () {
				// im fehlerfall neues modell
				that.model = new Summary();
				that.render();
			}
		});
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

	events : {
    	"click #back" : "back"
    },

    back : function () {
    	new AddressView({ el: that.el } );
    },

    close: function(){
    	// If you do not call this method when your view is being closed / removed / cleaned up, then you may end up with memory leaks and zombie views that are still responding to model change events.
	    this.remove();
	    this.unbind();
	    Backbone.ModelBinding.unbind(this);
	}

});

AppView = function () {
 
   	this.showView = function(view) {
	    if (this.currentView){
	      this.currentView.close();
	    }
	 
	    this.currentView = view;
	    this.currentView.render();
	 
	    $("#content").html(this.currentView.el);
	 }
}

Router = Backbone.Router.extend({
  routes: {
    "person": "showPerson",
    "address" : "showAddress",
    "summary" : "showSummary"
  },
 
  showPerson: function(){
    var view = new PersonView();
    this.appView.showView(view);
  },
  showAddress: function(){
    var view = new AddressView();
    this.appView.showView(view);
  },
  showSummary: function(){
    var view = new SummaryView();
    this.appView.showView(view);
  }
});

