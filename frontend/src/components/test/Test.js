import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"



const Test = ()=>{
    const { token ,change1  } = useContext(AuthContext);
const [data , setData]=useState([])
const navigate=useNavigate()



const options = {
    method: 'GET',
  url: 'https://ali-express1.p.rapidapi.com/productsByCategoryV2/702',
  params: {sort_type: 'default', page: '1', page_size: '20', sort_order: 'default'},
  headers: {
    'X-RapidAPI-Key': 'ba5cb6e325msh16da93214946bc3p1f5e30jsn519005cfbe48',
    'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
    }
  };
    
    useEffect(()=>{
           
        if (token){
 axios.request(options)
        .then((response)=>{
            console.log(response.data.data.searchResult.mods.itemList.content )
            setData(response.data.data.searchResult.mods.itemList.content)
          //  setOriginalData(response.data.products)
            
            //setLoggedUser(response.data.userId)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    
    },[token ,change1] )

    return      <div  className="bigContainer"> 
   
    </div>
   
}

export default Test