var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recruitmentSchema = new Schema({
	firstName : { 	
			type : String,
			required: true
			},
	lastName : {
			type : String,
			required : true
			},
	phoneNumber : {
			type : String,
			required : true
			},
	email : {
				type : String,
				required : true
	}
},
	{ timestamps : true 
			
    });
    
var Recruitment = mongoose.model('Recruitment', recruitmentSchema);

module.exports = Recruitment;