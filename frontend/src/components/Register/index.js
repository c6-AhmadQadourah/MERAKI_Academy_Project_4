import axios from "axios";
import React from "react";
import GoogleRegister from "../googleRegister/GoogleRegister"
import logo from "../Navbar/download.svg"
import logo1 from "../Login/log.svg"
import logo2 from "../Login/log2.svg"

import {Navigate, useNavigate} from "react-router-dom"
import { useEffect, useState, useContext } from "react";
import ("./style.css")


const Register = () => {
const [firstName ,setFirstName]=useState("")
const [lastName ,setLastName]=useState("")
const [country ,setCountry]=useState("")
const [email , setEmail]=useState("")
const [password, setPassword]= useState("")
const [role, setRole] = useState("6330bbe89cea5c5c03a3fb09")
const [registeredSucssfully, setRegisteredSucssfully]= useState(false)
const navigate=useNavigate()

const body = {firstName,
  lastName,
  country,
  email,
  password,
role}

  const register = ()=>{
    axios.post("http://localhost:5000/users", body)
    .then((response)=>{

      setRegisteredSucssfully(true)
      setTimeout(() => {
        navigate("/login") 
      }, 1000);
    console.log (response)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return <div className="bigDivRegister">

<img className="logo1R" src={logo} />


<div className="new1">

<img className="logo3R" src={logo2}  />

    <div className="infoContainerRegister">
      <p> Register</p>
      <input placeholder="First Name" className="RegInput" onChange={(e)=>{setFirstName(e.target.value)}}/>

    
      <input placeholder="Last Name" className="RegInput" onChange={(e)=>{setLastName(e.target.value)}}/>

      
      <input placeholder="Country" className="RegInput" onChange={(e)=>{setCountry(e.target.value)}}/>

      
      <input placeholder="Email" className="RegInput" onChange={(e)=>{setEmail(e.target.value)}}/>

      
      <input placeholder="Password" className="RegInput" onChange={(e)=>{setPassword(e.target.value)}}/>


      
{registeredSucssfully&& <div className="popuptry">

<h1 >  Registerd In Sussfully</h1>
</div>}

      <button className="registerButton" onClick={()=>{ register()}} > Register Now !</button>

    <GoogleRegister/>
    </div>
    <img className="logo2" src={logo1}  />

    </div>
    </div>;
};
export default Register;
