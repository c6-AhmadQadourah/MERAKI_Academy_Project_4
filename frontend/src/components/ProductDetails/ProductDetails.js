import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";



const ProductDetails = ()=>{
    const [data , setData]=useState([])
    const { token  } = useContext(AuthContext); 


    useEffect(()=>{
        if (token){
        axios.get("http://localhost:5000/products/63333b17f51b18f0139330a6" , {headers:{Authorization: `Bearer ${token}`}})
        .then((response)=>{
            console.log(response)
            setData(response)
            //setLoggedUser(response.data.userId)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    },[token ] )


    
return <div>


</div>
}

export default ProductDetails