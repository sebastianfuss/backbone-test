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

    }

});

Summary = Backbone.Model.extend({

	initialize:function(){

    }
})