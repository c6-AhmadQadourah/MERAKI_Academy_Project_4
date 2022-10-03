import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import GoogleLogin from "react-google-login"


const Google = ()=>{

    const handleFailure = (result) => {
        alert(result);
      };

const handleLogin =(googleData)=>{
    console.log(googleData)
}



    return <div>
    <GoogleLogin>
 clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
 buttonText="Log in with Google"
 onSuccess={handleLogin}
 onFailure={handleFailure}
 cookiePolicy={'single_host_origin'}
    </GoogleLogin>
    </div>
}


export default Google