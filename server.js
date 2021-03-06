require("dotenv").config();
const {json} = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
const path = require('path');
app.use(cors());
const port = 4000;
const mongoose = require("mongoose");

const userModel = require("./models/users");
const taskModel =  require("./models/tasks");

mongoose.connect(process.env.MONGOURL).then(() => console.log("MongoDB connected."));


app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build'))
})


app.get('/api/', (req, res) => res.send('Hello World!'));


//Register Users
app.post("/api/register",async (req,res) =>{
    const newUser = req.body;
    userModel.create(newUser);
    return res.json({data: "success"});
});

//Login User
app.post("/api/login", async (req,res) =>{
    const usercred = req.body;
    const user = await userModel.findOne(usercred);
    if(user){
        return res.json({data : user.username});
    }else{
        return res.json({data : "failed"});
    }
});

//Add Task
app.post("/api/addtask",async (req,res) =>{
    const taskdetails = req.body;
    const task = taskModel.create(taskdetails);
    if(task){
        return res.json({data : "success"});
    }else{
        return res.json({data : "failed"});
    }
});

//Fetch Tasks
app.post("/api/tasks",async (req,res) =>{
    const user = req.body;
    const tasklist = await taskModel.find(user);
    if(tasklist.length > 0){
        return res.json(tasklist);
    }else{
        return res.json({data :"empty"});
    }
});

//Delete Task
app.post("/api/deletetask",async (req,res)=>{
    const taskdetails = req.body;
    const deltask = await taskModel.findOneAndDelete(taskdetails);
    if(deltask){
        return res.json({data : "success"});
    }else{
        return res.json({data : "failed"});
    }
});

app.listen(process.env.PORT || port, () => console.log(`Task tracker app listening on port ${port}!`))