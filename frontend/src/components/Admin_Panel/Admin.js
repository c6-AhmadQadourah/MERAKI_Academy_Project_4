import { useEffect, useState, useContext } from "react";
import axios, { Axios } from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"


const Admin= ()=>{
  const navigate = useNavigate();



    const { token   } = useContext(AuthContext);


    return <div > 
  <button onClick={()=>{navigate("/admin/new")}} > Add New Product</button>
 <button> Get All Users</button>
    </div>
}
export default Admin