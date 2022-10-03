import { Routes, Route, Link ,useNavigate } from "react-router-dom";
import React from "react";

import logo2 from "./cart.svg"

import {useEffect , useState ,useContext, createContext} from "react"
import axios from "axios";
import { AuthContext } from "../Contexts/context";
import ("./Navbar.css")



const Navigation = ()=>{


const [search1 ,setSearch1] = useState("")
  const navigate = useNavigate()
const {logout , isAdmin ,isLoggedIn , originalData}=  useContext(AuthContext);



  const search = (search)=>{

    axios.get(`http://localhost:5000/products/search?search=${search}`  )
    .then((result)=>{
      
      //setData(result.data)
        console.log(result.data)
        
        
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const goToAdminPanel =()=>{
    return navigate("./register")
  }




  return( 
  <div  className="navigation" style={{ display: "flex", gap: "50px" }}>
{isLoggedIn && <button className="button" > <Link className="link" to="/"> Home </Link></button>}
 
 
 {/*------------ search Div------- */}
 {isLoggedIn&& <div className="searchDiv">
<input className="searchBar" onChange={(e)=>{setSearch1(e.target.value)}} /> 
<button className="button" id="searchButton" onClick={()=>{search(search1)}} >search Now</button>
</div>}
 {/*------------ search Div End------- */}

 {isAdmin&& <button className="button"  onClick={()=>{navigate("/admin")}} >Admin Panel</button> }



<div className="cart_searchDiv" > 
{/*------------ Cart Div ------- */}
{isLoggedIn&& <div onClick={()=>{navigate("/cart")}} className="bigCart">
<div className="c">

  <span className="numCart">0</span>
<img className="cart" src={logo2} alt="logo" />



</div>
<p className="pCart">Cart</p>
</div>}
 {/*------------ Cart Div End ------- */}

{/*--------- Login and register div */}
<div className="loginReg">
{isLoggedIn? null : <button className="button">  <Link className="link" to="/login"> Login </Link></button>}
{isLoggedIn? null : <button className="button"> <Link className="link" to="/register"> Register </Link></button>}
{ isLoggedIn&& <button className="button" onClick={()=>{logout()}} >Logout</button>}
</div>
</div>
{/*--------- Login and register div  End*/}

 

  </div>
  )
}
export default Navigation
