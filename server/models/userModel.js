const mongo = require("mongoose")

const userSchema = new mongo.Schema({
    
    username : {
        type:String,
        required:true
    },
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
       type:String,
        required:true
    },
    date : {
        type:Date,
        default:Date.now
    },
    isBlocked : {
        type:Boolean,
        default:false
    },
    isAdmin : {
        type:Boolean,
        default:false
    }

})

module.exports = mongo.model('User', userSchema);

