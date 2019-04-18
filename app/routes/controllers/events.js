const Events = require("../../models/eventsmodel");
const express = require("express");
module.exports = {
    /**
     * 
     * @param {Express.Request} req - Express request object 
     * @param {Express.Response} res - Express response object
     * @param {Function} next 
     */
    getEvent(req,res,next){
        if(req.query.hasOwnProperty("id")){
            Events.findOne({"_id":req.query.id}).exec()
            .then(event=>{
                res.status(200).json(event);
            })
            .catch(err=>{
                res.status(500).send("There was an error.")
            })
            return;
        }
        Events.find({}).exec()
        .then(events=>{
            res.status(200).json(events);
        })
        .catch(err=>{
            res.status(500).send("There was an error.")
        })
    },
    //This will need to be restricted to admins
    updateEvent(req,res,next){
        console.log("Update...")
        //we check the req for an id
        if(!req.query.hasOwnProperty("id")){
            return res.status(400).send("Missing ID Parameter.");
        }
        let id = req.query.id;

        Events.findByIdAndUpdate(id,req.body).exec()
        .then(doc=>{
            res.status(200).json(doc);
        })
        .catch(err=>{
            res.status(500).send("There was an error.")
        })
    },

    createEvent(req,res,next){
        console.log("Getting...");
        let data = req.body;
        if(!data.hasOwnProperty("name") || !data.hasOwnProperty("startDate") || !data.hasOwnProperty("endDate")){
            return res.status(400).send("Missing a field. Requires name, startDate, endDate");
        }
        let name = data.name;
        let startDate = data.startDate;
        let endDate = data.endDate;

        Events.create({
            name:name,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        })
        .then(doc=>{
            res.status(201).json(doc);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send("Server error. Could not create event.");
        })
    },

    deleteEvent(req,res,next){
        console.log("Removing....");
        if(!req.query.hasOwnProperty("id")){
            return res.status(400).send("Missing ID Parameter.");
        }
        Events.deleteOne({"_id":req.query.id}).exec()
        .then(doc=>{
            res.status(204).end();
        })
        .catch(err=>{
            res.status(500).end();
        })
    }

}
