import axios from "axios";
import React from "react";
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


const body = {firstName,
  lastName,
  country,
  email,
  password,
role}

  const register = ()=>{
    axios.post("http://localhost:5000/users", body)
    .then((response)=>{
    console.log (response)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return <div className="bigDivRegister">
    <div className="infoContainerRegister">
      <p> Register</p>
      <span>First Name</span>
      <input className="RegInput" onChange={(e)=>{setFirstName(e.target.value)}}/>
      <span>Last Name</span>
      <input className="RegInput" onChange={(e)=>{setLastName(e.target.value)}}/>
      <span>Country</span>
      <input className="RegInput" onChange={(e)=>{setCountry(e.target.value)}}/>
      <span>Email</span>
      <input className="RegInput" onChange={(e)=>{setEmail(e.target.value)}}/>
      <span>Password</span>
      <input className="RegInput" onChange={(e)=>{setPassword(e.target.value)}}/>
      <button className="registerButton" onClick={()=>{ register()}} > Register Now !</button>
    </div>
    </div>;
};
export default Register;
