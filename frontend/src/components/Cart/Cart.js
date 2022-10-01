import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/context";
import { Navigate, useNavigate } from "react-router-dom";
import "./Cart.css";



const Cart = ( ) => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // const [prductID, setProductID]=useState(0)
  const [change, setChange] = useState(false);
  const userId = localStorage.getItem("userId");
  const [quantity, setQuantity] = useState(0)
  
  

  useEffect(() => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQuantity =(id)=>{

    const body = {quantity}
    axios.put(`http://localhost:5000/cart/${id}` , body)
    .then((response) => {
     
      console.log(response);
     
    })
    .catch((err) => {
      console.log(err);
    });
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
                <button className="qb" >-</button>   <span className="q" onChange={(e)=>{setQuantity(e.target.value)}}>{elem.quantity}   </span> <button className="qb" onClick={()=>{setQuantity(quantity=> quantity+1) }}>+</button>
                <button onClick={()=>{updateQuantity(elem._id)}} >test</button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
