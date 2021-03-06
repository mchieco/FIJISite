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
    },
    getList(req,res,next){
        Admin.find({}).exec()
        .then(admins=>{
            let safeList = admins.map(admin=>{
                return {username:admin.username,updatedAt:admin.updatedAt,_id:admin._id,createdAt:admin.createdAt,locked:admin.locked};
            }).sort((a,b)=>{
                return (new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
            })
            let young = 0;
            let y_admin = null;
            safeList.forEach(admin=>{
                if(new Date(admin.createdAt).valueOf() >= young){
                    young = new Date(admin.createdAt).valueOf();
                    y_admin = admin;
                }
            })
            safeList.forEach(admin=>{
                if(admin._id == y_admin._id){
                    admin.locked = true;
                }
            })
            res.status(200).json(safeList);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send("Could not get admins");
        })
    },
    removeAdmin(req,res,next){
        if(!req.query.hasOwnProperty("id")){
            return res.status(400).send("Missing ID Parameter.");
        }
        let id = req.query.id;
        let current_admin = null;
        Admin.find({"_id":id}).exec()
        .then(admins=>{
            if(admins == undefined || admins.length == 0){
                throw 'Cannot remove admin';
            }
            current_admin = admins.pop();
            return Admin.find({}).exec()
        })
        .then(admins=>{
            //check to make sure this isn't the youngest admin. 
            let young = 0;
            let y_admin = null;
            admins.forEach(admin=>{
                if(new Date(admin.createdAt).valueOf() >= young){
                    young = new Date(admin.createdAt).valueOf();
                    y_admin = admin;
                }
            })
            if(y_admin == null || y_admin._id == req.query.id || current_admin.locked == true){
                return res.status(400).end();
            }else{
                Admin.deleteOne({"_id":req.query.id}).exec()
                .then(()=>{
                    res.end();
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).end();
                })
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send(err.message);
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