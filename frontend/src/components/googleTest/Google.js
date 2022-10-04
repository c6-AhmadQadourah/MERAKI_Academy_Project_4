import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import GoogleLogin from "react-google-login"


const Google = ()=>{
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
 //const [loginData, setLoginData] = useState(localStorage.getItem('loginData')?JSON.parse(localStorage.getItem('loginData')):null)
    
    const handleFailure = (result) => {
       
        console.log(result)
      };
/*
      const handleLogin = async (googleData) => {
        const res = await fetch('/api/google-login', {
          method: 'POST',
          body: JSON.stringify({
            token: googleData.tokenId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data));
      };

const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  */

    return <div>
      
              <GoogleLogin
              clientId="105670242284-id2m25ofp3234v7j5772ogvudn00tldr.apps.googleusercontent.com"
              
              
              buttonText="Login"
              onSuccess={handleFailure}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            />
              
    </div>
}


export default Google