const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number
    }
})

const userslist = mongoose.model("userslist",userSchema)
module.exports = userslist
