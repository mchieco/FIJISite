var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	username : { 	
			type : String,
			required: true,
			unique : true
			},
	password : {
			type : String,
			required : true
	}
},
	{ timestamps : true 
			
    });
    
var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;