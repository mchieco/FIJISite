const CONSTANTS = require("../../config/CONSTANTS")
const auth = require("../../bin/auth")
module.exports = {
    login(req,res,next){
        let token = checkCookie(req);
        if(token==null)
            return;
        
        let data = req.body;
        if(!data.hasOwnProperty("username") || !data.hasOwnProperty("password")){
            return res.status(403).send("Missing fields.")
        }
        
        //now we get the ID from the token
        auth.decodeToken(token)
        .then(token=>{
            let userid = token.userid;
            return auth.login(userid,data.username,data.password)
        })
        .then(valid=>{
            return res.send("Logged in homie...")
        })
        .catch(err=>{
            console.log(err);
            return res.status(500).send(err.message);
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
            res.send("Done.")
        })
        .catch(err=>{
            res.status(500).send(err.message);
        })
    }
}
function checkCookie(req){
    var cookie = req.cookies[CONSTANTS.cookieName];
    if (cookie === undefined) {
        return null
    }
    return req.cookies[CONSTANTS.cookieName];
}