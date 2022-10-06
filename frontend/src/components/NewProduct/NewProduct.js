import { useEffect, useState, useContext ,createContext } from "react";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/context";
import { Navigate, useNavigate } from "react-router-dom";
import "./NewProduct.css"



const NewProduct = ()=>{
  const [category1 , setCategory1]=useState([])
  const [category , setCategory]=useState([])
  const [cate , setCate]=useState("Select Category")
   
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [shown, setShown] = useState(false)

  const { token  } = useContext(AuthContext);

const navigate=useNavigate()
  

  useEffect(()=>{
    if (token){
    axios.get("http://localhost:5000/products/category" , {headers:{Authorization: `Bearer ${token}`}})
    .then((response)=>{
        console.log(response.data.Comment)
        setCategory1(response.data.Comment)
     
       
        
    })
    .catch((err)=>{
        console.log(err)
    })
    }
},[token ] )




    const addProduct = ()=>{
        const body = {title ,description ,price ,image ,category}
    
        axios.post ("http://localhost:5000/products" , body , {
  headers: { Authorization: `Bearer ${token}`} })
  .then((response)=>{
    setShown(true)

    setTimeout(() => {
      navigate('/')
      
    }, 1000);

    console.log(response)
    
   
  })
  .catch((err)=>{
    console.log(err)
   
  })
    }

    return(
        <div className="newProductDiv"> 
         
            <span> Image</span>
            <input className="New" placeholder="Paste Your Image URL HERE !"  onChange={(e)=>{setImage(e.target.value)}} />

            <span> Title</span>
            <input className="New" placeholder="Write Your  Title HERE !" onChange={(e)=>{setTitle(e.target.value)}} />

            <span> Description</span>
            <input className="New" placeholder="Write Your  Description HERE !" onChange={(e)=>{setDescription(e.target.value)}} />
            
            <span> Price</span>
            <input className="New" placeholder="Write Your Price HERE !" onChange={(e)=>{setPrice(e.target.value)}} />

            <span> Category</span>

            <div class="dropdown">
  <button class="dropbtn">{cate}</button>
  
  <div class="dropdown-content">
  {category1.map((elem)=>{
    
      return(<div className="industry"> <p onClick={()=>{setCategory(elem._id) ;setCate(elem.industry)}} >{elem.industry}</p> <hr></hr></div>)
    })}
  </div>

 
</div>

              <button className="addP" onClick={()=>{ addProduct() }}>Add Product </button>


  {  !shown?null:        <div className="sucsses">
  <h1 className="suc">Product Added Sucssfully</h1>
  </div>}
            </div>
    )
}

export default NewProduct