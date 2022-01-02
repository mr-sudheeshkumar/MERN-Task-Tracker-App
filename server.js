const {json} = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const port = 4000;
const mongoose = require("mongoose");

const userModel = require("./models/users");

mongoose.connect("mongodb://127.0.0.1:27017/skdb").then(() => console.log("MongoDB connected."));

app.get('/api/', (req, res) => res.send('Hello World!'))

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
        return res.json({data : "success"});
    }else{
        return res.json({data : "failed"});
    }
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))