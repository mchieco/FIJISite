var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
	name : { 	
			type : String,
			required: true
			},
	startDate : {
			type : Date,
			required : true
			},
	endDate : {
			type : Date,
			required : true
			}
},
	{ timestamps : true 
			
    });
    
var Events = mongoose.model('Events', eventsSchema);

module.exports = Events;