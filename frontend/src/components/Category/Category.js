import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import "./Category.css"


const Categories = ({setData})=>{
    const [category , setCategory]=useState([])
    const { token  } = useContext(AuthContext);
    const { originalData ,setOriginalData ,change1 ,setChange1 } = useContext(AuthContext);





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
       setOriginalData(response.data.product)
     
       
        
    })
    .catch((err)=>{
        console.log(err)
    })
}

return <>
<div className="cate">
<h2> Categories :</h2>

<span className="aa">


<h4 className="Cname" onClick={()=>{setChange1(!change1)}} > All Categories  </h4>
       
        

 { category.map((elem,i)=>{
    return <div className="category" > 
       
        <h4 className="Cname" onClick={()=>{ filter(elem._id)}}> {elem.industry}</h4>
        
        
        
    </div>
    
}) }
</span>
</div>
</>
}

export default Categories