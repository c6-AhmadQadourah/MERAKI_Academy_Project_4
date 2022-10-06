import { useEffect, useState, useContext } from "react";
import axios, { Axios } from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import "./Admin.css"

const Admin= ()=>{
  const navigate = useNavigate();



    const { token   } = useContext(AuthContext);


    return <div className="Admin" > 
  <button className="btn" onClick={()=>{navigate("/admin/new")}} >Products</button>
 <button className="btn" onClick={()=>{navigate("/users")}}>  Users</button>
    </div>
}
export default Admin