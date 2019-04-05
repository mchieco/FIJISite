module.exports = {
    login(req,res,next){
        if(!checkCookie(res))
            return;
        
    },
}
function checkCookie(res){
    return true;
}