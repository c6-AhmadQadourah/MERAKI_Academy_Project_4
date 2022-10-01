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
   // const [prductID, setProductID]=useState(0)
const [change, setChange] = useState(false)
const userId=localStorage.getItem("userId")
    
    useEffect(()=>{
        if (token){
        axios.get(`http://localhost:5000/cart/${userId} `, {headers:{Authorization: `Bearer ${token}`}})
        .then((response)=>{
            setData(response.data.products)
           console.log(response.data.products[1]._id)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    },[token , change] )


    const deleteItem = (prductID)=>{
        axios.delete(`http://localhost:5000/cart/cart/${userId}/${prductID} `, {headers:{Authorization: `Bearer ${token}`}})
        .then((response)=>{
           const newcart = data.filter((element)=>{
            return element.products._id !== prductID
           })
           setData(newcart)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        }



return <div>

{data.map((elem,i)=>{
           return (
            <div   key={i} className="Container">
                <div className="imgDiv">
                    <img className="img" src={elem.product.image} alt="img" />
                 </div>
                 <div className="itemContainer">
                   <h1>{elem.product.title}</h1>
                   <hr></hr>
                    <h4>{elem.product.description}</h4>
                    <span><h2>Price : {elem.product.price}$</h2> </span>
                    <button onClick={()=>{deleteItem(elem.product._id) ; setChange(!change) }} > Remove From Cart</button>   
                    <button > add to fav</button>
                    
                    </div>
                    </div>
          )
        })}

</div>

}


export default Cart
