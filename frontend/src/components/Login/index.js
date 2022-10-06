import React from "react";
import { useEffect, useState, useContext } from "react";
import {Navigate, useNavigate} from "react-router-dom"
import {AuthContext} from "../Contexts/context";
import axios from "axios";
import "./style.css"
//import Google from "../googleTest/Google";
import Googlelogin from "../googleLogin/GoogleLogin";
import logo from "../Navbar/download.svg"
import logo1 from "./log.svg"
import logo2 from "./log2.svg"

const Login = () => {
  
const [email , setEmail]=useState("")
const [password, setPassword]= useState("")
const [error, seterror]= useState("")
const [iserror, setIserror]= useState(false)
const [showAdminButon, setShowAdminButon] = useState(true)
const { isLoggedIn, saveToken ,setIsAdmin , isAdmin} = useContext(AuthContext);
const navigate=useNavigate()
const body = {email , password  }

const [loggedInSucssfully, setLoggedInSucssfully]= useState(false)



const login= ()=>{
axios.post("http://localhost:5000/login" , body )
.then((response)=>{
  
 console.log(response.data.token)
  saveToken (response.data.token)
  localStorage.setItem("Token" , response.data.token)
const adminRole = response.data.result.role.role  
console.log(adminRole)
console.log(response.data.result._id)

localStorage.setItem("userId" , response.data.result._id)


  setIserror(true)
  if (adminRole=="admin"){ 

    setIsAdmin(true)}
    setLoggedInSucssfully(true)


  setTimeout(() => {
    if (adminRole=="admin"){ 
     // setIsAdmin(true)

  localStorage.setItem("Admin" , true)
  setIsAdmin(localStorage.getItem("Admin"))
  console.log(isAdmin)
      navigate ("/")

  }
    else{ navigate ("/")}
    
  }, 1000);
 
 


})
.catch((err)=>{
  console.log (err)
  seterror(err.response.data.message)
  setIserror(!true)

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



<img className="logo1" src={logo} />



<div className="new">
<img className="logo3" src={logo2}  />

<div className="infoContainer">
<h1> Login</h1>
{/* <p> Email</p> */}
<input className="emailInput" placeholder="  Email " onChange={(e)=>{setEmail(e.target.value)}}/>
{/* <p> Password</p> */}
<input className="emailInput" placeholder=" Password " onChange={(e)=>{setPassword(e.target.value)}}/>


{loggedInSucssfully&& <div className="popuptry">

  <h1 >  Logged In Sussfully</h1>
</div>}


<button className="loginButton"  onClick={()=>{login()}}> Login </button>
<p>{!iserror ? error : null}</p>
<Googlelogin/>


</div>
<img className="logo2" src={logo1}  />

</div>
  </div>;
};
export default Login;
