const express = require("express")
const app = express()
const port = process.env.PORT || 5000; //port we will listen for connections on. 
const mongoose = require("mongoose") //Library we will be using for connecting and manipulating mongoDB documents. 
const path = require("path") // Default Node library. 
const bodyparser = require("body-parser")
const CONSTANTS = require("./app/config/CONSTANTS")
//Here we set up out mongoose connections. 
const DBconfig = require("./app/config/dbconfig")
const Auth = require("./app/bin/auth");
const cookieParser = require("cookie-parser");
const Admin = require("./app/models/adminmodel")
app.use(bodyparser.json()); // get information from html forms
app.use(cookieParser());
//Here we are going to give them a webtoken because i feel like it. 
app.use((req, res, next) => {
    // check if client sent cookie
    var cookie = req.cookies[CONSTANTS.cookieName];
    if (cookie === undefined) {
        Auth.createToken()
            .then((token) => {
                res.cookie(CONSTANTS.cookieName, token, { maxAge: 3600 * 1000, httpOnly: true });
                next(); // <-- important!
            })
    }
    else {
        // yes, cookie was already present 
        // console.log('cookie exists', cookie);
        Auth.decodeToken(req.cookies[CONSTANTS.cookieName])
            .then(token => {
                // console.log("FOUND",token);
                next(); // <-- important!
            })
            .catch(err => {
                console.log(err);
                next();
            })
    }
})


mongoose.connect(DBconfig.url, { useNewUrlParser: true })
    .then(object => {
        console.log("Connection to Mongoose is good!")
    })
    .catch(err => {
        console.log("There was an error connecting!!!! TIME TO PANIC!!!!", err)
        throw "The world is ending - make sure you added the db.js file in config!!!"
    })

//Connect to the router; 
const router = require("./app/routes/router");
app.use("/", router); //before sending requests to static files, we first check if they are valid API requests. 
app.get("/eboardadmin.html", (req, res, next) => {
    //we don't have to send a file. We can just send text if we wish.
    let file = path.join(__dirname, "app", "private_resources", "eboardadmin.html") //__dirname is a constant that is established, automatically provides the path to the current folder <THIS> Js file is in. 

    Auth.customCheckAdmin(req)
    .then(()=>{
        res.sendFile(file)
    })
    .catch(err=>{
        res.redirect("/index.html");
    })
});
app.use(express.static(path.join(__dirname, "app", "resources")));

console.log("Server started on port " + port)
app.listen(port)
console.log("Webpage can be found at http://localhost:" + port)