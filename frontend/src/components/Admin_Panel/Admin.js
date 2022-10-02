import { useEffect, useState, useContext } from "react";
import axios, { Axios } from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"


const Admin= ()=>{


    const { originalData ,token   } = useContext(AuthContext);
  const [data, setData] = useState([]);
    
    const navigate=useNavigate()


const deleteProduct = (prductID)=>{

    axios
      .delete(`http://localhost:5000/products/${prductID} `, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        
        const newcart = originalData.filter((element) => {
          return element.products._id !== prductID;
        });
       
      })
      .catch((err) => {
        console.log(err);
      });
}


    return <div  className="bigContainer"> 
    {originalData.map((elem,i)=>{
       return (
        
        <div  key={i} className="Container">
      
            <div className="imgDiv">
                <img className="img" src={elem.image} alt="img" />
             </div>
             <div className="itemContainer">
               <h1>{elem.title}</h1>
               <hr></hr>
                <h4>{elem.description}</h4>
                <span><h2>Price : {elem.price}$</h2> </span>
               
                
                </div>
                </div>
      )
    })}
    </div>
}
export default Admin