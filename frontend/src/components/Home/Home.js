import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import "./Home.css"


const Home = ()=>{
    const [data , setData]=useState([])
    const { token } = useContext(AuthContext);
   
   
        useEffect(()=>{
            if (token){
            axios.get("http://localhost:5000/products" , {headers:{Authorization: `Bearer ${token}`}})
            .then((response)=>{
                console.log(response.data.products)
                setData(response.data.products)
                //setLoggedUser(response.data.userId)
                
            })
            .catch((err)=>{
                console.log(err)
            })
            }
        },[token] )
    

    return <div className="bigContainer">
        {data.map((elem,i)=>{
           return (
            <div key={i} className="Container">
                <div className="imgDiv">
                    <img className="img" src={elem.image} alt="img" />
                 </div>
                 <div className="itemContainer">
                   <h1>{elem.title}</h1>
                    <p>{elem.description}</p>
                    <span>Price : {elem.price}$ </span>
                    
                    </div>
                    </div>
          )
        })}
    </div>
}

export default Home