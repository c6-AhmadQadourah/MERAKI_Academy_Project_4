import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import GoogleLogin from "react-google-login"
import "./GoogleLogin.css"

const Googlelogin = ()=>{
    const [error, seterror]= useState("")
    const [iserror, setIserror]= useState(false)
  const [email , setEmail]=useState("")
  const [password, setPassword]= useState("")
  const { isLoggedIn, saveToken ,setIsAdmin , isAdmin} = useContext(AuthContext);
  const navigate=useNavigate()

  let body = {
    email ,
    password
  }
  
  const login= ()=>{
    axios.post("http://localhost:5000/login/google" , body )
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

  const  responseGoogle = async (response) => {
    console.log(response.profileObj
      );
 body.password= response.profileObj.googleId
 body.email = response.profileObj.email


 await login()

 
  }
    return <div>
      <div className="signinDiv" ></div>
      <GoogleLogin
    clientId="994328639474-ub85dkgodp4vrm5nvfaemiklfko5jpt9.apps.googleusercontent.com"
    buttonText="Login" 
    
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
              
    </div>
}


export default Googlelogin