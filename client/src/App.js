import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useContext } from 'react';
import { useState } from 'react';
import {UserContext} from "./UserContext";
import {Home} from "./components/Home";
import {Login} from "./components/Login";
import { Register } from './components/Register';
import {AddTask} from "./components/AddTask";

function App() {
  const [loginstatus, setloginstatus] = useState(false);
  const [username, setusername] = useState('');
  return (
    <>
      <UserContext.Provider value={{loginstat: [loginstatus,setloginstatus], usrname : [username,setusername]}}>
        <Router>
          <Routes>
            <Route exact path = "/" element={<Home />} />
            <Route exact path = "/login" element={<Login />} />
            <Route exact path = "/register" element={<Register />} />
            <Route exact path = "/addtask" element={<AddTask />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
