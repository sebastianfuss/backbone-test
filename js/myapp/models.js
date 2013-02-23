/**
 * Created with JetBrains WebStorm.
 * User: sfuss
 * Date: 23.02.13
 * Time: 14:50
 * To change this template use File | Settings | File Templates.
 */

Person = Backbone.Model.extend({

	defaults: {
		birthday: "",
		creditcardnumber: "",
		firstname: "",
		surename: ""
	},

    initialize:function(){

    },

    sync : function (method, model, options) {
    	console.log("sync Person",{method : method, model : model, options: options});
    	var resp = {};
    	switch (method) {
    		case "read" : 
    			var data = JSON.parse(window.sessionStorage.getItem("person"));
    			console.log("session data", data);
    			resp = new Person(data);
    			break;
    	}
    	console.log("out", {"model" : model, "resp" : resp});
    	options.success(model, resp);
    }

});

Address = Backbone.Model.extend({

	defaults : {
		city: "",
		land: "",
		livingsince: "",
		street: "",
		zipcode: ""
	},

    initialize:function(){

    }

});

Summary = Backbone.Model.extend({

	initialize:function(){

    }
})