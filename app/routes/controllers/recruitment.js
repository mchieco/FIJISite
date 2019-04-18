const Recruit = require("../../models/recruitmentmodel");
const express = require("express");
module.exports = {
    /**
     * 
     * @param {Express.Request} req - Express request object 
     * @param {Express.Response} res - Express response object
     * @param {Function} next 
     */
    get(req,res,next){
        if(req.query.hasOwnProperty("id")){
            Recruit.findOne({"_id":req.query.id}).exec()
            .then(doc=>{
                res.status(200).json(doc);
            })
            .catch(err=>{
                res.status(500).send("There was an error.")
            })
            return;
        }
        Recruit.find({}).exec()
        .then(docs=>{
            res.status(200).json(docs);
        })
        .catch(err=>{
            res.status(500).send("There was an error.")
        })
    },
    //This will need to be restricted to admins

    update(req,res,next){
        console.log("Update...")
        //we check the req for an id
        if(!req.query.hasOwnProperty("id")){
            return res.status(400).send("Missing ID Parameter.");
        }
        let id = req.query.id;

        Recruit.findByIdAndUpdate(id,req.body).exec()
        .then(doc=>{
            res.status(200).json(doc);
        })
        .catch(err=>{
            res.status(500).send("There was an error.")
        })
    },

    create(req,res,next){
        console.log("Getting...");
        let data = req.body;
        if(!data.hasOwnProperty("firstName") || !data.hasOwnProperty("lastName") || !data.hasOwnProperty("email")|| !data.hasOwnProperty("phoneNumber")){
            return res.status(400).send("Missing a field. Requires firstName, lastName, email, message");
        }

        Recruit.create({
            firstName:data.firstName,
            lastName:data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber
        })
        .then(doc=>{
            res.status(201).json(doc);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send("Server error. Could not create event.");
        })
    },

    delete(req,res,next){
        console.log("Removing....");
        if(!req.query.hasOwnProperty("id")){
            return res.status(400).send("Missing ID Parameter.");
        }
        Recruit.deleteOne({"_id":req.query.id}).exec()
        .then(doc=>{
            res.status(204).end();
        })
        .catch(err=>{
            res.status(500).end();
        })
    }

}
