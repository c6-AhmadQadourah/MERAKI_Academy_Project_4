import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/context";
import { Navigate, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // const [prductID, setProductID]=useState(0)
  const [change, setChange] = useState(false);
  const userId = localStorage.getItem("userId");
  const [quantity, setQuantity] = useState(Number);
  const [itemID, setItemID] = useState("");
  const [total, setTotal] = useState(0);



  useEffect( () => {
    if (token) {
        axios
        .get(`http://localhost:5000/cart/${userId} `, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data.products);

          
           
            for(let i=0 ; i <= data.length ; i++){
              const total1 = data[i].product.price
              setTotal(total1)
            }
          
         
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
        const newCart =data.map((elem)=>{
          if (elem._id == itemID){
            elem.quantity = response.data.result.quantity
          }
        setQuantity(quantity)
          return elem
        })
        setChange(!change)
        console.log(response.data.result.quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

const sum = (a)=>{
  for(let i=0 ; i <= a.length ; i++){
    const total1 = a[i]
    setTotal(total1)
  }
}

  return (
    <div>
      {data.map((elem, i) => {
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
              <button> add to fav</button>
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
                    setQuantity(elem.quantity++); updateQuantity(elem._id);
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

    <button className="checkOut"> Proceed To Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
