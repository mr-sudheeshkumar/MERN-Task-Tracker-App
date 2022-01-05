import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export const Register = () =>{
    const {loginstat} = useContext(UserContext);
    const [loginstatus] = loginstat;
    const [msg, setmsg] = useState("");
    let navigate = useNavigate();
    const userdetails = {
        username:"",
        password:"",
        name:"",
    }
    const regbtnclicked =() =>{
        axios.post("/api/register",userdetails).then((res) => res.data.data === "success"?regsuccess():<></> );
    }
    const regsuccess = () =>{
        setmsg("User registered successfully.");
        setTimeout(() => window.location.reload(true),5000);
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
                    <p className="page-title">User Registration</p>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" onChange={(e) => userdetails.name = e.target.value} className="form-control"  placeholder="Enter Name" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" onChange={(e) => userdetails.username = e.target.value} className="form-control"  placeholder="Enter Username" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" onChange={(e) => userdetails.password = e.target.value} className="form-control"  placeholder="Enter Password" />
                    </div>
                    <button type="button" className="btn" onClick={regbtnclicked}>Register</button>
                    </form>
                    <p className="regsuccessmsg">{msg}</p>
                </>
                {!loginstatus && <p className="donthaveactxt">Already have an account?<Link className="registerlink" to="../login">Login Here</Link></p>}
                </div>
            </div>}
        </>
    );
}