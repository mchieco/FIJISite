var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
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
    },
    locked : {
        type : Boolean,
        required : true,
        default: false
}
},
	{ timestamps : true 
			
    });
// generating a hash
adminSchema.methods.generateHash = function(password) {
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, bcrypt.genSaltSync(10), null, function(err, hash) {
            if(err){
                reject(null)
            }else{
                resolve(hash)
            }
        });
    })
};

// checking if password is valid
adminSchema.methods.validPassword = function(password) {
    console.log("Running valid password check");
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, this.password, function(err, res) {
            if(err || res==false){
                reject(false)
            }
            resolve(true)
        });
    })
};

var Admin = mongoose.model('Admin', adminSchema,"admins");

module.exports = Admin;