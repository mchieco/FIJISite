const CONSTANTS = require("../../config/CONSTANTS")
const auth = require("../../bin/auth")
const Admin = require("../../models/adminmodel");
module.exports = {
    login(req,res,next){
        let token = checkCookie(req);
        if(token==null)
            return res.status(403).send("Missing token..");
        
        let data = req.body;
        if(!data.hasOwnProperty("username") || !data.hasOwnProperty("password")){
            return res.status(403).send("Missing fields.")
        }
        
        //now we get the ID from the token
        auth.decodeToken(token)
        .then(token=>{
            let userid = token.userid;
            console.log("Logging in...")
            return auth.login(userid,data.username,data.password)
        })
        .then(valid=>{
            return res.send("Logged in homie...")
        })
        .catch(err=>{
            console.log(err);
            return res.status(400).send(err.message);
        })
    },
    logout(req,res,next){
        let token = checkCookie(req);
        if(token==null)
            return;
        auth.decodeToken(token)
        .then(token=>{
            return auth.logout(token.userid)
        })
        .then(()=>{
            res.redirect("/")
        })
        .catch(err=>{
            res.redirect("/")
        })
    },
    create(req,res,next){
        let data = req.body;
        if(!data.hasOwnProperty("username") && !data.hasOwnProperty("password")){
            return res.status(403).send("You are missing fields.")
        }
        let admin = new Admin();
        admin.username = data.username;
        admin.generateHash(data.password)
        .then(password=>{
            admin.password = password;
            admin.save(function(err,doc){
                if(err){
                    return res.status(500).send(err.message);
                }
                return res.end();
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(400).send(err.message)
        })
    }
}
function checkCookie(req){
    var cookie = req.cookies[CONSTANTS.cookieName];
    console.log("Cookie",cookie)
    if (cookie === undefined) {
        return null
    }
    return req.cookies[CONSTANTS.cookieName];
}