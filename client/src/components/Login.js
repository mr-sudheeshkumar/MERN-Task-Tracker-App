import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
export const Login = () =>{
    const {loginstat,usrname} = useContext(UserContext);
    const [loginstatus,setloginstatus] = loginstat;
    const [username,setusername] = usrname;
    const [wrongcred, setwrongcred] = useState("");
    let navigate = useNavigate();
    const usercred={
        username:"",
        password:"",
    }
    const logintbnclicked = () =>{
        if(!loginstatus){
            axios.post("/api/login",usercred).then((res) => res.data.data==="failed"?loginfailed():loginsuccess(res));
        }else{
            setloginstatus(false);
            setusername("");
        }
    }
    const loginsuccess = (res) =>{
        setusername(res.data.data.toString());
        setloginstatus(true);
        navigate("/");
    }
    const loginfailed = () =>{
        setwrongcred("Entered Credentials are incorrect.");
        setTimeout(() => navigate("/"),3000);
    }
    useEffect(()=>{
        if(loginstatus){
            navigate("/");
        }
    });
    return(
        <>
            {!loginstatus &&
            <div className="App">
                <div className='container'>
                <p className="title">Task Tracker App</p>
                <>
                <form>
                <p className="page-title">User Login</p>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" onChange={(e) => usercred.username = e.target.value} className="form-control" id="exampleInputEmail1" placeholder="Enter Username" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" onChange={(e) => usercred.password = e.target.value} className="form-control" id="exampleInputPassword1" placeholder="Enter Password" />
                    </div>
                    <button type="button" className="btn" onClick={logintbnclicked}>Login</button>
                    </form>
                    <p className="wrongcred">{wrongcred}</p>
                </>
                {!loginstatus && <p className="donthaveactxt">Don't have an account?<Link className="registerlink" to="../register">Register Here</Link></p>}
                </div>
            </div>}
        </>
    );
}