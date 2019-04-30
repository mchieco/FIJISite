const express = require("express");
const router = express.Router();
const admin_controller = require("./controllers/admin");
const event_controller = require("./controllers/events");
const recruitment_controller = require("./controllers/recruitment");
const contactus_controller = require("./controllers/contactus");
const auth = require("../bin/auth")
const checkAdmin = auth.checkAdmin;
// function checkAdmin(req,res,next){
//     next();
// }

router.route("/event")
.all((req,res,next)=>{
    console.log("[Events]","Got event.");
    next();
})
.get(event_controller.getEvent)//Public
.put(checkAdmin,event_controller.updateEvent) //Admin
.post(checkAdmin,event_controller.createEvent) //Admin
.delete(checkAdmin,event_controller.deleteEvent); //Admin

router.route("/contactus")
.all((req,res,next)=>{
    console.log("[Contact Us]","Got event.");
    next();
})
.get(checkAdmin,contactus_controller.get)//Admin
.put(checkAdmin,contactus_controller.update) //Admin
.post(contactus_controller.create) //Public
.delete(checkAdmin,contactus_controller.delete); //Admin

router.route("/auth")
.all((req,res,next)=>{
    console.log("[Auth]","Got event.");
    next();
})
.post(admin_controller.create)
.put(admin_controller.login);

router.put("/auth/logout",admin_controller.logout);
router.get("/auth/logout",admin_controller.logout);

router.route("/eboardadmins")
.get(admin_controller.getList)
.delete(admin_controller.removeAdmin);


router.route("/application")
.all((req,res,next)=>{
    console.log("[Application]","Got event.");
    next();
})
.get(checkAdmin,recruitment_controller.get)//Admin
.put(checkAdmin,recruitment_controller.update) //Admin
.post(recruitment_controller.create) //Public
.delete(checkAdmin,recruitment_controller.delete); //Admin


module.exports = router;