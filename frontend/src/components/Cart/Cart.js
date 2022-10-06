import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/context";
import { Navigate, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { token , setChange1 , change1} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // const [prductID, setProductID]=useState(0)
  const [change, setChange] = useState(false);
  const userId = localStorage.getItem("userId");
  let [quantity, setQuantity] = useState(0);
  const [itemID, setItemID] = useState("");
  const [total, setTotal] = useState(0);
const [totalPrice , setTotalPrice ]=useState(null)


  useEffect( () => {
    if (token) {
        axios
        .get(`http://localhost:5000/cart/${userId} `, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data.products);
          
       
          
         
          console.log(response.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, change]);

  const deleteItem = (prductID) => {
    axios
      .delete(`http://localhost:5000/cart/cart/${userId}/${prductID} `, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const newcart = data.filter((element) => {
          return element.products._id !== prductID;
        });
        setData(newcart);
        setChange1(!change1)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQuantity = (itemID) => {
    const body = { quantity };
    axios
      .put(`http://localhost:5000/cart/${itemID}`, body)
      .then((response) => {
        const newq =data.map((elem)=>{
          if (elem._id == itemID){
            elem.quantity = response.data.result.quantity
          }
          return elem
        })
        setQuantity(quantity)

        console.log(response.data.result.quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>

      {data.length==0? <div className="empetyCart">
      
      <button onClick={()=>{navigate('/')}} > Browse Products now!  </button>
      <img src="https://dlinkmea.com/images/no-product.png" />
      </div>
      :data.map((elem, i) => {

        return (
          <div key={i} className="Container">
            <div className="imgDiv">
              <img className="img" src={elem.product.image} alt="img" />
            </div>
            <div className="itemContainer">
              <h1>{elem.product.title}</h1>
              <hr></hr>
              <h4>{elem.product.description}</h4>
              <span>
                <h2>Price : {elem.product.price}$</h2>{" "}
              </span>
              <button
                onClick={() => {
                  deleteItem(elem.product._id);
                  setChange(!change);
                }}
              >
                {" "}
                Remove From Cart
              </button>
            
              <div className="Q">
                <p>Quantity</p>
                <button
                  className="qb"
          onClick={() => { 
                    setQuantity( quantity--);updateQuantity(elem._id);
                  }}
                >
                  -
                </button>
                <span
                  className="q" >

                  {elem.quantity}
                </span>
                <button
                  className="qb"
                  onClick={() => {
                    setQuantity(quantity++); updateQuantity(elem._id);
                    
                  }}
                >
                  +
                </button>
                
              </div>
            </div>
          </div>
        );
      })}
{/* ------------- Order ----------*/}
      <div className="order" > 
        
      <h1> Subtotal  ({data.length} Items) :  { data
      .map((elem) => elem.product.price)
    .reduce((prev, curr) => prev + curr, 0)}$  </h1>


      </div>
    </div>
  );
};

export default Cart;
