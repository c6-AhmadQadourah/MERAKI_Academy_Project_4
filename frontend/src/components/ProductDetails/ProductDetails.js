import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import "./ProductDetails.css"


const ProductDetails = ()=>{
    const [data , setData]=useState([])
    const { token  } = useContext(AuthContext); 

  const {id} =useParams()
const navigate=useNavigate()

    useEffect(()=>{
        if (token){
        axios.get(`http://localhost:5000/products/${id}` , {headers:{Authorization: `Bearer ${token}`}})
        .then((response)=>{
            console.log(response.data.product)
            setData(response.data.product)
            //setLoggedUser(response.data.userId)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    },[token ] )


    
return <div>
    
 <div  className="ContainerDetails">
                <div className="imgDivDetails">
                    <img className="imgDetails" src={data.image} alt="img" />
                 </div>
                 <div className="itemContainerDetails">
                   <h1>{data.title}</h1>
                    <p>{data.description}</p>
                    <span>Price : {data.price}$ </span>
                    
                    </div>
                    </div>
 

</div>
}

export default ProductDetails