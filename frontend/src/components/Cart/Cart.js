import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import "./Cart.css"


const Cart = ()=>{
    const { token  } = useContext(AuthContext);
    const [data , setData]=useState([])
    const navigate=useNavigate()

const userId=localStorage.getItem("userId")
    
    useEffect(()=>{
        if (token){
        axios.get(`http://localhost:5000/cart/${userId} `, {headers:{Authorization: `Bearer ${token}`}})
        .then((response)=>{
            setData(response.data.products)
           console.log(response.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    },[token ] )



return <div>

{data.map((elem,i)=>{
           return (
            <div  onClick={()=>{navigate(`/${elem.product._id}`) }} key={i} className="Container">
                <div className="imgDiv">
                    <img className="img" src={elem.product.image} alt="img" />
                 </div>
                 <div className="itemContainer">
                   <h1>{elem.product.title}</h1>
                   <hr></hr>
                    <h4>{elem.product.description}</h4>
                    <span><h2>Price : {elem.product.price}$</h2> </span>
                    <button> Remove From Cart</button>
                    <button> Remove From Cart</button>
                    
                    </div>
                    </div>
          )
        })}

</div>

}


export default Cart
