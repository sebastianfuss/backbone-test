/**
 * Created with JetBrains WebStorm.
 * User: sfuss
 * Date: 23.02.13
 * Time: 14:51
 * To change this template use File | Settings | File Templates.
 */

// Die "View" für die Person. Wir haben gelernt, dass dies eher dem Controller-Teil des MVC-Pattern entspricht.
PersonView = Backbone.View.extend({
	initialize: function() {
		// Die "initialize" Funktion wird beim erzeugen einer neuen View ausgeführt.
		that = this;
		// Die View erzeugt sich eine neue Instanz des Models zum Halten der Daten
		var model = new Person();
		// Mit _.bindAll binden wir globale Events. In diesem Fall sind "render" und "close" global und 
		// können auf der View aufgerufen werden.
		_.bindAll(this, 'render', 'close');
		// Anschließend soll das Modell aus einer eventuell Persistenzschicht geladen werden. 
		// Hierzu wird "fetch" aufgerufen
		model.fetch({
			"success" : function (model) {
				// "fetch" ist ein asynchroner Aufruf und hat einen Erfolgs- und Fehlerfalls.
				// Alle weiteren Funktionen müssen in den beiden Funktionen definiert werden.
				// Im Erfolgsfall wird das geladene Model vor dem "rendern" der View zugewiesen.
				that.model = model;
				// Des Weiteren teilen wir dem Modell mit, dass alle Änderungen ("change" Events) 
				// zu einer Aktualisierung ("render") der View führen
		        that.model.bind('change', that.render);
		        // Nun wird die View angezeigt.
				that.render();
			},
			"error" : function () {
				// Im Fehlerfalls muss ebenfalls das Verhalten definiert sein.
				// Hier wird ein neue Modell-Instanz erzeugt
				that.model = new Person();
				// und ebenfalls mit der Aktualisierung bei Änderung vertraut gemacht
		        that.model.bind('change', that.render);
		        // Auch muss das Anzeigen der View aufgerufen werden.
				that.render();
			}
		});
	},

	// Das Aktualisieren der View wird in der "render" Funktion definiert.
	render:function(){
		// Es wird das Modell in JSON umgewandelt.
	    var model = this.model.toJSON();
    	// Das Template von der View über Underscore geladen und mit den Daten vom Modell gefüllt.
    	var template = _.template( $("#person_template").html(), model );
    	// Die Daten des Templates werden anschließend dem DOM-Knoten ($el) der View hinterlegt.
    	$(this.el).html( template );
    	// Abschließend wird das Binding des Models auf die HTML-Elemente aufgerufen und die 
		Backbone.ModelBinding.bind(this);
    	// Validierung ebenfalls an das HTML gehangen.
    	Backbone.Validation.bind(this,{
    		// Es wird das attribute definiert, auf das das Modelbinding läuft.
    		selector : "modelattr",
    		// Die standard Validationsparameter sind nicht auf Bootstrap geeicht.
    		// Deshalb schreiben wir die callbacks für valid und invalid um.
    		valid: function(view, attr, selector) {
		        view.$('[' + selector + '="' + attr + '"]')
		          .parentsUntil("control-group").removeClass('error')
		          .removeAttr('data-error');
		    },

		    invalid: function(view, attr, error, selector) {
    		// Es wird jetzt das Eltern "control-group" mit der CSS Class "error" versehen, 
    		// wenn ein Fehler auftritt.
		        view.$('[' + selector + '="' + attr + '"]')
		          .parentsUntil("control-group").addClass('error')
		          .attr('data-error', error);
		    }
    	});

    	this.model.on("validated:valid", this.valid, this);
    	this.model.on("validated:invalid", this.invalid, this);

        var picker = new Pikaday(
            {
                field: $('#p_birthday')[0],
                firstDay: 1,
                format: 'DD.MM.YYYY',
                minDate: new Date('2000-01-01'),
                maxDate: new Date('2020-12-31'),
                yearRange: [2000,2020]
            });

        return this;
    },

    events : {
    	"click #next" : "next"
    },

    next : function () {
    	var that = this;
    	// is the model valid?
    	if (this.model.isValid) {
	    	this.model.save(this.model.toJSON(),{
	    		"success" : function () {
	    			
	    		},
	    		"error" : function () {
	    			console.error("Fehler beim Speichern");
	    		}
	    	});
	    } else {
	    	// if not we have to output the validation result

	    }
    },

    valid : function () {
    	this.$(".alert").hide();
    	this.$(".alert-error").fadeIn();
    },

    close: function(){
    	// If you do not call this method when your view is being closed / removed / cleaned up, then you may end up with memory leaks and zombie views that are still responding to model change events.
	    this.remove();
	    this.unbind();
	    Backbone.Validation.unbind(this);
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
        $(this.el).html( template );
        // execute the model bindings
    	Backbone.ModelBinding.bind(this);
    	// validation
    	Backbone.Validation.bind(this);

        var picker = new Pikaday(
            {
                field: $('#adr_livingsince')[0],
                firstDay: 1,
                format: 'DD.MM.YYYY',
                minDate: new Date('2000-01-01'),
                maxDate: new Date('2020-12-31'),
                yearRange: [2000,2020]
            });

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
	    Backbone.Validation.unbind(this);
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
        $(this.el).html( template );
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

AppRouter = Backbone.Router.extend({
  routes: {
    "person": "showPerson",
    "address" : "showAddress",
    "summary" : "showSummary",
    "*path" : "defaultRoute"
  },
 
  showPerson: function(){
    var view = new PersonView();
    this.showView(view);
  },
  showAddress: function(){
    var view = new AddressView();
    this.showView(view);
  },
  showSummary: function(){
    var view = new SummaryView();
    this.showView(view);
  },
  defaultRoute : function (){
  	this.showPerson();
  },

  showView : function(view) {
	if (this.currentView){
		this.currentView.close();
	}

	this.currentView = view;
	this.currentView.render();

	$("#container").html(this.currentView.el);
  }
});

