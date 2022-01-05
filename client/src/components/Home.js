import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
export const Home = () =>{
    const {loginstat,usrname} = useContext(UserContext);
    const [loginstatus,setloginstatus] = loginstat;
    const [username,setusername] = usrname;
    const [loginmsg, setloginmsg] = useState("Please Login to use app.");
    const [tasktext, settasktext] = useState([]);
    const [tottasks, settottasks] = useState(0);
    const [tasks, settasks] = useState([]);
    const [delmsg, setdelmsg] = useState(false);
    let navigate = useNavigate();
    const user ={
        username: username,
    }
    const task ={
        _id:"",
    }
    const logintbnclicked = () =>{
        if(!loginstatus){
            navigate("/login");
        }else{
            window.location.reload();
        }
    }
    const addtasktbnclicked = () =>{
        navigate("/addtask");
    }
    useEffect(()=>{
        if(loginstatus){
            setloginmsg("Welcome " + username);
            gettasks();
            if(delmsg){
                setdelmsg(false);
            }
        }
    },[loginstatus,tottasks,delmsg]);
    const gettasks = () =>{
        const tasklist = axios.post("/api/tasks",user).then((res) => rendertasks(res.data));
    }
    const rendertasks = (props) =>{
        settottasks(props.length);
        if(tottasks>0){
            settasks(props);
            for(var i=0;i<tasks.length;i++){
                console.log(tasks[i].text);
            }
        }
    }
    const taskdblclicked = () =>{
        
    }
    const deltask =(props) =>{
        if(tottasks>0){
            task._id = props;
            axios.post("/api/deletetask",task).then((res) => setdelmsg(true));
        }
    }
    return(
        <>
            <div className="App">
                <div className='container'>
                <p className="title">Task Tracker App</p>
                <p className="loginmsg">{loginmsg}</p>
                {!loginstatus && <button className="btn" onClick={logintbnclicked}>Login Here</button>}
                {!loginstatus && <p className="donthaveactxt">Don't have an account?<Link className="registerlink" to="./register">Register Here</Link></p>}
                {loginstatus && <button className="btn" onClick={addtasktbnclicked}>Add Task</button>}
                {loginstatus && <button className="btn btn-logout" onClick={logintbnclicked}>Log Out</button>}
                {loginstatus && (tottasks>0) &&
                    <>
                        <div className="tasks-section">
                            {tasks.map((t) => 
                            
                            
                            <div className="tasks">
                                <button className="singletaskbtn" onDoubleClick={() =>taskdblclicked()}>
                                    {t.reminder?(<div className="task reminder" style={{borderLeft: "0.5rem solid green"}}>
                                        <h3>{t.text}<button type="button" onClick={() => deltask(t._id)} className="delbtn">x</button></h3>
                                        <p>{t.day}</p>
                                    </div>):
                                    (<div className="task reminder" style={{borderLeft: "0.5rem solid transparent"}}>
                                    <h3>{t.text}<button type="button" onClick={() => deltask(t._id)} className="delbtn">x</button></h3>
                                    <p>{t.day}</p>
                                </div>)}
                                </button>
                            </div>
                        
                        
                            )}
                        </div>
                    </>
                }
                </div>
            </div>
        </>
    );
}