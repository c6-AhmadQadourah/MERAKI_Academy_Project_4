import { useEffect, useState, useContext } from "react";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/context";
import { Navigate, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = (  ) => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);
  const [data1, setData1] = useState([]);
const [change, setchange] = useState(false)
const [comments, setComments] = useState([])
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(0)



const getCategory =(category1)=>{

      axios
        .get(`http://localhost:5000/products/category/${category1}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData1(response.data.product);
          
       
        })
        .catch((err) => {
          console.log(err);
        });
  
 
}


  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data.product);
          setComments(response.data.product.comments);
          
          setProduct(response.data.product._id)
         
          getCategory(response.data.product.category._id)
          
          
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token ,change ]);

  
const addToCart = ()=>{


  const body ={ product }

axios.post ("http://localhost:5000/cart" , body , {
  headers: { Authorization: `Bearer ${token}`} })
  .then((response)=>{
    console.log(response)
    
   
  })
  .catch((err)=>{
    console.log(err)
   
  })
}
 




  return (
    <div>
      
      <div className="ContainerDetails">
        <div className="imgDivDetails">
          <img className="imgDetails" src={data.image} alt="img" />
        </div>
        <span className="itemContainerDetails">
          <h1>{data.title}</h1>
          <hr></hr>
          <h4>{data.description}</h4>
          <hr></hr>

          <h2>Price : {data.price}$ </h2>
          <hr></hr>

          <div className="Buttons">
          <button className="addToCart" onClick={()=>{addToCart()}} > Add To Cart</button>
          <button className="addToCart"> Add To Favorite</button>
          </div>
      {/*--------------------- Comments-------------------------*/}

          {comments.map((elem)=>{
            return <div className="commentsDiv">
              <div >
              <p><span>{elem.commenter.firstName}</span> : <span>{elem.comment}</span>   </p> 
              </div>
           <textarea></textarea>
            </div>
          }) }
        </span>
      </div>
      {/*--------------------- Suggested Products-------------------------*/}
      <h1> Other Products You May Like !</h1>
      <div className="bigContainer" >
      {data1 && data1.map((elem,i)=>{
        return<>
      
        <div className="Container" onClick={()=>{navigate(`/${elem._id}`) ; setchange(!change)  }} key={i}>

           <div className="imgDiv">
                    <img className="img" src={elem.image} alt="img" />
                 </div>
                 <div className="itemContainer">
                   <h1>{elem.title}</h1>
                    <p>{elem.description}</p>
                    <span>Price : {elem.price}$ </span>
                    
                    </div>

           </div>
          
           </>
      })}
    

      </div>
    </div>
  );
};

export default ProductDetails;
