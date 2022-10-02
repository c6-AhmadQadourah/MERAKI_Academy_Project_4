import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import "./Category.css"


const Categories = ({setData})=>{
    const [category , setCategory]=useState([])
    const { token  } = useContext(AuthContext);
    const { originalData   } = useContext(AuthContext);





useEffect(()=>{
    if (token){
    axios.get("http://localhost:5000/products/category" , {headers:{Authorization: `Bearer ${token}`}})
    .then((response)=>{
        console.log(response.data.Comment)
        setCategory(response.data.Comment)
     
       
        
    })
    .catch((err)=>{
        console.log(err)
    })
    }
},[token ] )


const filter=(id)=>{
    axios.get(`http://localhost:5000/products/category/${id}`)
    .then((response)=>{
        console.log(response.data)
       setData(response.data.product)
     
       
        
    })
    .catch((err)=>{
        console.log(err)
    })
}

return <div className="cate">
   
<h2> Categories</h2>
<hr></hr>
<h4 onClick={()=>{setData(originalData)}} > All Categories </h4>
        <hr></hr>
 { category.map((elem,i)=>{
    return <div > 
        
        <h4 onClick={()=>{ filter(elem._id)}}> {elem.industry}</h4>
        <hr></hr>
    </div>
}) }
</div>

}

export default Categories