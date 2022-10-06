import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"
import "./Home.css"
import Slideshow from "../SlideShow/SlideShow";
import Categories from "../Category/Category";

const Home = ({setId  })=>{
    const [data , setData]=useState([])
   
  const [fadeImages,setFadeImages]=useState([])

    const { token ,change1  } = useContext(AuthContext);
    const { setOriginalData , isAdmin ,originalData  } = useContext(AuthContext);
   
const navigate=useNavigate()

if(!token){navigate("/login")}

        useEffect(()=>{
           
            if (token){
     axios.get("http://localhost:5000/products" , {headers:{Authorization: `Bearer ${token}`}})
            .then((response)=>{
                console.log(response.data.products)
                setData(response.data.products)
                setOriginalData(response.data.products)
  
                //setLoggedUser(response.data.userId)
               
            })
            .catch((err)=>{
                console.log(err)
            })
            }
        
        },[token ,change1] )

        const deleteProduct = (prductID)=>{

            axios
              .delete(`http://localhost:5000/products/${prductID} `, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                
                const newData = data.filter((element) => {
                    console.log(data)
                  return element._id !== prductID;
                });
               setData(newData)
               setOriginalData(newData)

              })
              .catch((err) => {
                console.log(err);
              });
        }

 
    return <>
 {/* ------- category-------- */}
 <Categories setData={setData} />
        {/* ------- category End -------- */}
    {/* try */}

      <div className="slideShow">
        <Slideshow />
       
</div>  

    {/* try end */}
    
    <div className="bigbig">
       

        <div  className="bigContainer"> 
        { originalData?.map((elem,i)=>{
           return (
            
            <div   key={i} className="Container">
          
                <div className="imgDiv">
                    <img className="img" src={elem.image} alt="img" />
                    {/*admin*/}
                    {isAdmin&& <div>
                     <button onClick={()=>{deleteProduct(elem._id)}} > Delete Product</button>
                
                    </div>}
                    {/*admin end*/}

                 </div>
                 <div className="itemContainer">
                   <h1 className="title" onClick={()=>{navigate(`/${elem._id}`) }}>{elem.title}</h1>
                   <hr></hr>
                    <h4>{elem.description}</h4>
                     <span><h2>Price : {elem.price}$</h2> </span>
                    </div>
                    
                    </div>
                    
          )
        })}
        </div>
    </div>
    </>
}

export default Home
