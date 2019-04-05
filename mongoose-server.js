var mongoose = require('mongoose'),
    assert = require('assert');

//module variables
var Admin = require('./app/models/adminmodel.js');
var Events = require('./app/models/eventsmodel.js');
var Recruitment = require('./app/models/recruitmentmodel.js');
var Contact = require('./app/models/contactusmodel.js');
// Connection URL
var url = 'mongodb://secretusername:secretpassword@fijicluster-shard-00-00-lrgmz.mongodb.net:27017,fijicluster-shard-00-01-lrgmz.mongodb.net:27017,fijicluster-shard-00-02-lrgmz.mongodb.net:27017/test?ssl=true&replicaSet=FIJICluster-shard-0&authSource=admin&retryWrites=true';

// Connect using mongoose
mongoose.connect(url, { useNewUrlParser: true });

//open a connection and get a db handler
var db = mongoose.connection;
//error handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new recruitment object
    var newRecruitment = Recruitment({
        firstName: "Matt",
        lastName: "Chieco",
        phoneNumber: "518-925-9270",
        email: "cheeks369@gmail.com"
    });
    var newAdmin = Admin({
        username: "Cheeks",
        password: "password"
    });
    var newEvent = Events({
        name: "Philanthropy",
        startDate: "2019-05-18T16:00:00Z",
        endDate: "2019-05-18T16:30:00Z",
    });
    var newContact = Contact({
        firstName: "Matt",
        lastName: "Chieco",
        email: "cheeks369@gmail.com",
        message: "I LOVE FIJI"
    });
    // save the recruitment info
    newRecruitment.save((err) => {
        assert.equal(err, null);

        console.log("Recruitment Data saved");
        Recruitment.find({},(err,Recruitment)=>{
            assert.equal(err,null);

            console.log(Recruitment);
            db.collection("Recruitment").drop(()=>{
                db.close();
            });
        });
    });
    // save the admin info
    newAdmin.save((err) => {
        assert.equal(err, null);

        console.log("Admin Data saved");
        Admin.find({},(err,Admin)=>{
            assert.equal(err,null);

            console.log(Admin);
            db.collection("Admin").drop(()=>{
                db.close();
            });
        });
    });
    // save the event info
    newEvent.save((err) => {
        assert.equal(err, null);

        console.log("Event Data saved");
        Events.find({},(err,Events)=>{
            assert.equal(err,null);

            console.log(Events);
            db.collection("Events").drop(()=>{
                db.close();
            });
        });
    });
    // save the contactus info
    newContact.save((err) => {
        assert.equal(err, null);

        console.log("Contact Data saved");
        Contact.find({},(err,Contact)=>{
            assert.equal(err,null);

            console.log(Contact);
            db.collection("Contact").drop(()=>{
                db.close();
            });
        });
    });
});