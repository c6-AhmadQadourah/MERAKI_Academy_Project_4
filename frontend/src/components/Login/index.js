import React from "react";
import { useEffect, useState, useContext } from "react";
import {Navigate, useNavigate} from "react-router-dom"
import {AuthContext} from "../Contexts/context";
import axios from "axios";
import "./style.css"




const Login = () => {

const [email , setEmail]=useState("")
const [password, setPassword]= useState("")
const [error, seterror]= useState("")
const [iserror, setIserror]= useState(false)

const { isLoggedIn, saveToken } = useContext(AuthContext);
const navigate=useNavigate()
const body = {email , password}



const login= ()=>{
axios.post("http://localhost:5000/login" , body )
.then((response)=>{
 console.log(response.data.token)
  saveToken (response.data.token)
  localStorage.setItem("Token" , response.data.token)
  setIserror(true)


})
.catch((err)=>{
  console.log (err)
  seterror(err.response.data.message)
  setIserror(!iserror)

})
}

/*
useEffect(() => {
  if (!isLoggedIn) {
    navigate("/");
  }
});
*/

  return <div className="BigDivLogin">

<div className="infoContainer">
<p> Login</p>
<p> Email</p>
<input className="emailInput" placeholder="Write Your Email Here !!" onChange={(e)=>{setEmail(e.target.value)}}/>
<p> Password</p>
<input className="emailInput" placeholder="Write Your Password Here !!" onChange={(e)=>{setPassword(e.target.value)}}/>
<button className="loginButton"  onClick={()=>{login()}}> Login </button>
<p>{!iserror ? error : null}</p>
</div>


  </div>;
};
export default Login;
