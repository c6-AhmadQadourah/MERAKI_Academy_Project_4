import { Routes, Route, Link ,useNavigate } from "react-router-dom";
import React from "react";

import logo2 from "./cart.svg"
import logo1 from "./download.svg"

import {useEffect , useState ,useContext, createContext} from "react"
import axios from "axios";
import { AuthContext } from "../Contexts/context";
import ("./Navbar.css")



const Navigation = ()=>{

const [cart ,setCart]=useState([])
const [search1 ,setSearch1] = useState("")
  const navigate = useNavigate()
const {logout , isAdmin ,isLoggedIn , setOriginalData ,token  , change1, setChange1}=  useContext(AuthContext);
const userId = localStorage.getItem("userId");



  const search = (search)=>{

    axios.get(`http://localhost:5000/products/search?search=${search}`  )
    .then((result)=>{
      
      //setData(result.data)
        console.log(result.data.Products)
        setOriginalData(result.data.Products)
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const goToAdminPanel =()=>{
    return navigate("./register")
  }


  useEffect( () => {
    if (token) {
        axios
        .get(`http://localhost:5000/cart/${userId} `, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
  setCart(response.data.products);
  

          
       
          
         
          console.log(response.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token , change1]);



  return( <>


  <div  className="navigation" style={{ display: "flex", gap: "50px" }}>

    <img src={logo1}   className="i" />
{isLoggedIn &&   <Link id="home" onClick={()=>{setChange1(!change1)}}  className="link" to="/"> Home </Link>}
 
 
 {/*------------ search Div------- */}
 {isLoggedIn&& <div className="searchDiv">
<input className="searchBar" onChange={(e)=>{setSearch1(e.target.value)}} /> 
<button className="button" id="searchButton" onClick={()=> { search(search1)}} >search Now</button>
</div>}
 {/*------------ search Div End------- */}

 {isAdmin&& <span className="link"  onClick={()=>{navigate("/admin")}} >Admin Panel</span> }



<div className="cart_searchDiv" > 
{/*------------ Cart Div ------- */}
{isLoggedIn&& <div onClick={()=>{navigate("/cart")}} className="bigCart">
<div className="c">

  <span className="numCart">{cart.length}</span>
<img className="cart" src={logo2} alt="logo" />



</div>
<p className="pCart">Cart</p>
</div>}
 {/*------------ Cart Div End ------- */}

{/*--------- Login and register div */}
<div className="loginReg">
{isLoggedIn? null : <Link className="link" to="/login"> Login </Link>}

{isLoggedIn? null : <Link className="link" to="/register"> Register </Link>}


{ isLoggedIn&& <span id="logout" className="link"  onClick={()=>{logout()}} >Logout</span>}
</div>
</div>
{/*--------- Login and register div  End*/}

 

  </div>
  </>
  )
}
export default Navigation
