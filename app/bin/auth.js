const jwt = require("jsonwebtoken");
const CONSTANTS = require("../config/CONSTANTS")
const Admin = require("../models/adminmodel")
var uniqid = require('uniqid');
/**
 * @typedef token
 * @property {String} userid;
 */


const AuthorizedIds = {}

module.exports = {
    /**
     * @description Creates a new JWT token.
     */
    createToken() {
        return new Promise((resolve, reject) => {
            let id = uniqid()
            var token = jwt.sign({ userid: id }, CONSTANTS.secret);
            resolve(token);
        })
    },
    /**
     * 
     * @param {String} token Token to be decoded
     */
    decodeToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, CONSTANTS.secret, function (err, decoded) {
                if (err) {
                    return reject(err);
                }
                return resolve(decoded);
            });

        })
    },

    checkAdmin(req, res, next) {
        //get token
        var cookie = req.cookies[CONSTANTS.cookieName];
        if (cookie === undefined) {
            return res.status(401).send("No token present. ")
        }
        let token = req.cookies[CONSTANTS.cookieName];
        return new Promise((resolve, reject) => {
            module.exports.decodeToken(token)
                .then(decodedToken => {
                    //great we have the decoded token, and its valid - lets get the ID
                    let id = decodedToken.userid;
                    if (AuthorizedIds.hasOwnProperty(id)) {
                        return next();
                    } else {
                        return res.status(401).send("Not authenticated. ")
                    }
                })
                .catch(err => {
                    return res.status(500).send(err.message)
                })
        })
    },
    /**
     * @description Checks if the request is authenticated.
     * @param {Express.Request} req 
     * @returns {Promise<Boolean>} True if sign in, false if not. 
     */
    customCheckAdmin(req) {
        return new Promise((resolve, reject) => {
            //get token
            var cookie = req.cookies[CONSTANTS.cookieName];
            if (cookie === undefined) {
                return reject(false);
            }
            let token = req.cookies[CONSTANTS.cookieName];
            module.exports.decodeToken(token)
                .then(decodedToken => {
                    //great we have the decoded token, and its valid - lets get the ID
                    let id = decodedToken.userid;
                    if (AuthorizedIds.hasOwnProperty(id)) {
                        return resolve(true)
                    } else {
                        return reject(false)
                    }
                })
                .catch(err => {
                    return reject(false)
                })
        })
    },
    /**
     * 
     * @param {String} id 
     * @todo This needs to link up with the admin database.
     * @param {String} username 
     * @param {String} password 
     */
    login(id, username, password) {
        return new Promise((resolve, reject) => {
            let founduser = null;
            console.log("[Auth]", "Finding", username)
            Admin.find({"username":username}).exec()
                .then((users) => {
                    console.log(users);
                    let user = users.pop();
                    if (user == undefined || user == null) {
                        console.log("no.");
                        return reject(new Error("Username does not exist."))
                    }
                    founduser = user;
                    return user.validPassword(password)
                })
                .then(valid => {
                    //password if valid at this point. 
                    AuthorizedIds[id] = { Date: new Date(), user: founduser };
                    resolve(founduser)
                })
                .catch(err => {
                    console.log("err2", err)
                    reject(err);
                })
        })
    },

    logout(id) {
        return new Promise((resolve, reject) => {
            if (AuthorizedIds.hasOwnProperty(id)) {
                delete AuthorizedIds[id];
                resolve(true)
            } else {
                reject(new Error("No id found."))
            }
        })
    },
}