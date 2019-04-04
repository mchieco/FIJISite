const express = require("express");
const router = express.Router();
const admin_controller = require("./controllers/admin");
const event_controller = require("./controllers/events");
const recruitment_controller = require("./controllers/recruitment");
const contactus_controller = require("./controllers/contactus");


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

router.route("/application")
.all((req,res,next)=>{
    console.log("[Application]","Got event.");
    next();
})
.get(checkAdmin,recruitment_controller.get)//Admin
.put(checkAdmin,recruitment_controller.update) //Admin
.post(recruitment_controller.create) //Public
.delete(checkAdmin,recruitment_controller.delete); //Admin

function checkAdmin(req,res,next){
    next();
}


module.exports = router;