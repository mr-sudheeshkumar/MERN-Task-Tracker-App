const mongoose = require("mongoose");

//Tasks Schema
const tasksSchema = mongoose.Schema({
    text : String,
    day : String,
    reminder : Boolean,
    username : String
});

const taskModel = mongoose.model("tasks",tasksSchema,"tasks");

module.exports = taskModel;