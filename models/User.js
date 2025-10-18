const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name'],
        minLength:3,
        maxLength:50, 
    },
    email:{
        type:String,
        required:[true, 'Please enter your email address'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ],
        unique:true, //creates a unique index
    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
        minLength:6,
        maxLength:12, 
    }
})

module.exports = mongoose.model('User', userSchema)