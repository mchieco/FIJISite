const express = require("express")
const app = express()
const port = process.env.PORT || 5000; //port we will listen for connections on. 
const mongoose = require("mongoose") //Library we will be using for connecting and manipulating mongoDB documents. 
const path = require("path") // Default Node library. 
const bodyparser = require("body-parser")

//Here we set up out mongoose connections. 
const DBconfig = require("./app/config/dbconfig")

app.use(bodyparser.json()); // get information from html forms


mongoose.connect(DBconfig.url,{ useNewUrlParser: true })
    .then(object => {
        console.log("Connection to Mongoose is good!")
    })
    .catch(err => {
        console.log("There was an error connecting!!!! TIME TO PANIC!!!!")
        throw "The world is ending - make sure you added the db.js file in config!!!"
    })

//Connect to the router; 
const router = require("./app/routes/router");
app.use("/",router);
app.use(express.static(path.join(__dirname,"app","resources")));


console.log("Server started on port " + port)
app.listen(port)
console.log("Webpage can be found at http://localhost:" + port)