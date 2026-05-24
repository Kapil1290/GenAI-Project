const mongoose = require('mongoose');

const blacklist = mongoose.Schema({
    token:{
        type:String,
        required:[true, "token is required to be added in blacklist"]
    },   
},{
    timestamps: true
})

const listModel = mongoose.model("tokenBlacklist", blacklist)

module.exports = listModel