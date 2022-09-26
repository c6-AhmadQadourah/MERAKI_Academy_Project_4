import axios from "axios";
import React from "react";
import {Navigate, useNavigate} from "react-router-dom"
import { useEffect, useState, useContext } from "react";

const Register = () => {
const [firstName ,setFirstName]=useState("")
const [lastName ,setLastName]=useState("")
const [country ,setCountry]=useState("")
const [email , setEmail]=useState("")
const [password, setPassword]= useState("")


const body = {firstName,
  lastName,
  country,
  email,
  password,}

  const register = ()=>{
    axios.post("http://localhost:5000/users", body)
    .then((response)=>{
    console.log (response)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return <div>
    <div>
      <p> Register</p>
      <span>First Name</span>
      <input onChange={(e)=>{setFirstName(e.target.value)}}/>
      <span>Last Name</span>
      <input onChange={(e)=>{setLastName(e.target.value)}}/>
      <span>Country</span>
      <input onChange={(e)=>{setCountry(e.target.value)}}/>
      <span>Email</span>
      <input onChange={(e)=>{setEmail(e.target.value)}}/>
      <span>Password</span>
      <input onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={()=>{ register()}} > Register Now !</button>
    </div>
    </div>;
};
export default Register;
