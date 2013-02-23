/**
 * Created with JetBrains WebStorm.
 * User: sfuss
 * Date: 23.02.13
 * Time: 14:50
 * To change this template use File | Settings | File Templates.
 */

Person = Backbone.Model.extend({

	defaults: {
		p_birthday: "",
		p_creditcardnumber: "",
		p_firstname: "",
		p_surename: ""
	},

    initialize:function(){

    },

    validation: {
    	p_firstname: {
    		required : true,
    		msg: 'Please enter your firstname'
    	},
    	p_surename: {
    		required : true,
    		msg: 'Please enter your surename'
    	},
    	p_birthday: {
    		pattern : /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
    		msg: 'Please enter a valid date'
    	},
    	p_creditcardnumber: {
    		length : 16,
    		msg: 'Please enter a valid 16 digit creditcard number'
    	}
	},

    sync : function (method, model, options) {
    	var resp = {};
    	switch (method) {
    		case "read" : 
    			var data = JSON.parse(window.sessionStorage.getItem("person"));
    			model = new Person(data);
    			//options.success(model);
    			break;
    		case "update" :
    		case "create" : 
    			window.sessionStorage.setItem("person", JSON.stringify(model));
    			break;
    	}
    	options.success(model,resp,options);
    }

});

Address = Backbone.Model.extend({

	defaults : {
		adr_city: "",
		adr_land: "",
		adr_livingsince: "",
		adr_street: "",
		adr_zipcode: ""
	},

    initialize:function(){

    },

    sync : function (method, model, options) {
    	console.log("sync address");
    	var resp = {};
    	switch (method) {
    		case "read" : 
    		console.log("lade address");
    			var data = JSON.parse(window.sessionStorage.getItem("address"));
    			model = new Address(data);
    			break;
    		case "update" :
    		case "create" : 
    			console.log("speichere address");
    			window.sessionStorage.setItem("address", JSON.stringify(model));
    			break;
    	}
    	options.success(model, resp, options);
    }

});

Summary = Backbone.Model.extend({

	initialize:function(){

    },

    sync : function (method, model, options) {
    	var resp = {};
    	switch (method) {
    		case "read" : 
    			var addressdata = JSON.parse(window.sessionStorage.getItem("address"));
    			var persondata = JSON.parse(window.sessionStorage.getItem("person"));
    			var data = _.extend({},addressdata, persondata);
    			model = new Summary(data);
    			break;
    		case "update" :
    		case "create" :
    			break;
    	}
    	options.success(model, resp, options);
    }
})