const TWILIO_CONFIG = require("../../app/config/CONSTANTS")


const client = require('twilio')(TWILIO_CONFIG.twilio_account_sid, TWILIO_CONFIG.twilio_auth_token);

let actions = {
    /**
     * @description Checks to make sure the number is valid.
     * @param {String} raw_phone 
     * @param {Boolean} force_resolve Forces formatNumber to resolve even when number is invalid. Will resolve with null.
     * @returns {Promise<String>} Will return formatted phone number if valid. Will return null if invalid. 
     */
    formatNumber(raw_phone, force_resolve = false) {
        return new Promise((resolve, reject) => {
            client.lookups.phoneNumbers(raw_phone)
                .fetch()
                .then(phone_number => {
                    resolve(phone_number.phoneNumber)
                })
                .catch(err => {
                    if (force_resolve) {
                        resolve(null);
                    } else {
                        reject(err);
                    }
                })
                .done();
        })
    },
    /**
     * @description Sends a MMS Message.
     * @param {String} to The number being sent the message
     * @param {String} from Twilio number the message is from.
     * @param {String} message Max length is 1600 characters
     * @param {String} media URL of media to send. i.e. the FIJI logo. 
     * @param {Boolean} safe Will resolve even on failed send. 
     * @return {Promise} Returns twilio message instance
     */
    sendMediaMessage(to,from,message,media,safe=false){
        return new Promise((resolve,reject)=>{
            if(String(message).length >= 1600){
                return reject("Length of message is over 1600 characters")
            }
            client.messages
                .create({
                    body: String(message),
                    from: String(from),
                    mediaUrl: encodeURI(media),
                    to: String(to)
                })
                .then(message => resolve(message))
                .catch(data => (safe)?resolve():reject(data))
                .done();

        })
    },
    /**
     * @description Bulk cleans a list of phone numbers into clean phone numbers. 
     * @param {Array<String>} numbers Array of phone numbers to parse
     * @param {Boolean}remove_invalid Default:true - removes invalid numbers from array before returning
     * @returns {Promise<Array<String>>} Returns an array of formatted numbers. 
     */
    bulkFormat(numbers,remove_invalid=true){
        return new Promise((resolve,reject)=>{
            if(!Array.isArray(numbers)){
                return reject("'numbers' param is not an array")
            }
            if(numbers.length == 0){
                return resolve([])
            }

            //Format all numbers
            let promises = [];
            numbers.forEach(raw_num=>{
                promises.push(actions.formatNumber(raw_num,true))
            })
            Promise.all(promises)
            .then(data=>{
                if(remove_invalid){
                    let filtered = data.filter(obj=>{
                        return obj!=null;
                    })
                    return resolve(filtered);
                }else{
                    return resolve(data)
                }
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}

module.exports = actions;