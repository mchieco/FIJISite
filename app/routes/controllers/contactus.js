const Contact = require("../../models/contactusmodel");
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
            Contact.findOne({"_id":req.query.id}).exec()
            .then(doc=>{
                res.status(200).json(doc);
            })
            .catch(err=>{
                res.status(500).send("There was an error.")
            })
            return;
        }
        Contact.find({}).exec()
        .then(docs=>{
            res.status(200).json(docs);
        })
        .catch(err=>{
            res.status(500).send("There was an error.")
        })
    },
    //This will need to be restricted to admins
    /**
     * @author Joe Passanante
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @description This should be blocked to admins only. 
     * @param {*} next 
     */
    update(req,res,next){
        console.log("Update...")
        //we check the req for an id
        if(!req.query.hasOwnProperty("id")){
            return res.status(400).send("Missing ID Parameter.");
        }
        let id = req.query.id;

        Contact.findByIdAndUpdate(id,req.body).exec()
        .then(doc=>{
            res.status(200).json(doc);
        })
        .catch(err=>{
            res.status(500).send("There was an error.")
        })
    },
        /**
     * @author Joe Passanante
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @description This should be blocked to admins only. 
     * @param {*} next 
     */
    create(req,res,next){
        console.log("Getting...");
        let data = req.body;
        if(!data.hasOwnProperty("firstName") || !data.hasOwnProperty("lastName") || !data.hasOwnProperty("email")|| !data.hasOwnProperty("message")){
            return res.status(400).send("Missing a field. Requires firstName, lastName, email, message");
        }

        Contact.create({
            firstName:data.firstName,
            lastName:data.lastName,
            email: data.email,
            message: data.message
        })
        .then(doc=>{
            res.status(201).json(doc);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send("Server error. Could not create event.");
        })
    },
        /**
     * @author Joe Passanante
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @description This should be blocked to admins only. 
     * @param {*} next 
     */
    delete(req,res,next){
        console.log("Removing....");
        if(!req.query.hasOwnProperty("id")){
            return res.status(400).send("Missing ID Parameter.");
        }
        Contact.deleteOne({"_id":req.query.id}).exec()
        .then(doc=>{
            res.status(204).end();
        })
        .catch(err=>{
            res.status(500).end();
        })
    }

}
