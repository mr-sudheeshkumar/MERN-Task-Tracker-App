import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
export const AddTask = () =>{
    const {loginstat,usrname} = useContext(UserContext);
    const [loginstatus] = loginstat;
    const [username] = usrname;
    const [msg, setmsg] = useState("");
    let navigate = useNavigate();
    const taskdetails={
        text: "",
        day: "",
        reminder: "false",
        username:username,
    }
    const addtaskbtnclicked = () =>{
        axios.post("/api/addtask",taskdetails).then((res) => setmsg("Task Added Successfully."));
        setTimeout(() => navigate("/"),3000);
    }
    useEffect(() =>{
        if(!loginstatus){
            navigate("/");
        }
    });
    return(
        <>
            <div className="App">
                <div className='container'>
                <p className="title">Task Tracker App</p>
                <>
                <form>
                    <p className="page-title">Add Task</p>
                    <div className="mb-3">
                        <label className="form-label">Task</label>
                        <input type="text" onChange={(e) => taskdetails.text = e.target.value} className="form-control" id="exampleInputEmail1" placeholder="Add Task"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date and Time</label>
                        <input type="text" onChange={(e) => taskdetails.day = e.target.value} className="form-control" id="exampleInputEmail1" placeholder="Add Date and time" />
                    </div>
                    <div>
                        <label className="set-reminderlbl">Set Reminder<input className="chckbox" type="checkbox" value="true" onChange={(e)=> taskdetails.reminder = e.target.value} /></label>
                    </div>
                    <button type="button" className="btn" onClick={addtaskbtnclicked}>Add Task</button>
                    </form>
                    <p className="regsuccessmsg">{msg}</p>
                </>
                </div>
            </div>
        </>
    );
}