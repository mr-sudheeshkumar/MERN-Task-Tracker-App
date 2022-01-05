const mongoose = require("mongoose");

//user's schema
const userSchema = mongoose.Schema({
    username : String,
    password : String,
    name : String
});

const userModel = mongoose.model("users",userSchema,"users");

module.exports = userModel;