import { useEffect, useState, useContext } from "react";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/context";
import { Navigate, useNavigate } from "react-router-dom";

const NewProduct = ()=>{


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")

  const { token  } = useContext(AuthContext);

  

    const addProduct = ()=>{
        const body = {title ,description ,price ,image}
    
        axios.post ("http://localhost:5000/products" , body , {
  headers: { Authorization: `Bearer ${token}`} })
  .then((response)=>{


    console.log(response)
    
   
  })
  .catch((err)=>{
    console.log(err)
   
  })
    }

    return(
        <div> 
            <span> Image</span>
            <input className="New" placeholder="Paste Your Image URL HERE !"  onChange={(e)=>{setImage(e.target.value)}} />

            <span> Title</span>
            <input className="New" placeholder="Write Your  Title HERE !" onChange={(e)=>{setTitle(e.target.value)}} />

            <span> Description</span>
            <input className="New" placeholder="Write Your  Description HERE !" onChange={(e)=>{setDescription(e.target.value)}} />
            
            <span> Price</span>
            <input className="New" placeholder="Write Your Price HERE !" onChange={(e)=>{setPrice(e.target.value)}} />

            <button onClick={()=>{ addProduct()}}>Add Product </button>

            </div>
    )
}

export default NewProduct