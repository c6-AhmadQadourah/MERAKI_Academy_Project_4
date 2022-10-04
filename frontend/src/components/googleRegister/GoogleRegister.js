import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import GoogleLogin from "react-google-login"


const GoogleRegister = ()=>{
  const [givenName ,setGivenName]=useState("")
  const [familyName ,setFamilyName]=useState("")
  const [email , setEmail]=useState("")
  const [password, setPassword]= useState("")
  const [role, setRole] = useState("6330bbe89cea5c5c03a3fb09")
  const [image, setImage]= useState("")
  const [name, setName]= useState("")

  const body = {givenName ,
    familyName ,
    email ,
    password,
    role,
    image,
    name,}
  
    const register = ()=>{
      axios.post("http://localhost:5000/google", body)
      .then((response)=>{
      console.log (response)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

  const responseGoogle = (response) => {
    console.log(response.profileObj
      );
body.givenName= response.profileObj.givenName
body.familyName= response.profileObj.familyName
body.password=response.profileObj.googleId
body.email= response.profileObj.email
body.image= response.profileObj.imageUrl
body.name=response.profileObj.name

register() 
  }
    return <div>
      <div className="signinDiv" ></div>
      <GoogleLogin
    clientId="994328639474-ub85dkgodp4vrm5nvfaemiklfko5jpt9.apps.googleusercontent.com"
    buttonText="Register" 
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
              
    </div>
}


export default GoogleRegister