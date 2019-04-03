var mongoose = require('mongoose'),
    assert = require('assert');

//recipe module variable
var Admin = require('./models/adminmodel.js');
var Events = require('./models/eventsmodel.js');
var Recruitment = require('./models/recruitmentmodel.js');
var Contact = require('./models/contactusmodel.js');
// Connection URL
var url = 'mongodb://secretusername:secretpassword@fijicluster-shard-00-00-lrgmz.mongodb.net:27017,fijicluster-shard-00-01-lrgmz.mongodb.net:27017,fijicluster-shard-00-02-lrgmz.mongodb.net:27017/test?ssl=true&replicaSet=FIJICluster-shard-0&authSource=admin&retryWrites=true';

// Connect using mongoose
mongoose.connect(url,{useNewUrlParser:true});

//open a connection and get a db handler
var db = mongoose.connection;
//error handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new recipe
    var newRecruitment = Recruitment({
        firstName: "Matt",
        lastName: "Chieco",
        phoneNumber: "518-925-9270",
        email: "cheeks369@gmail.com"
    });
    // save the Recipe
    newRecruitment.save((err)=>{
        assert.equal(err,null);

        console.log("Recruitment Data saved");
    });
});