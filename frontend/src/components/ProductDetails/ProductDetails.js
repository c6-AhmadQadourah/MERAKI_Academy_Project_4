import { useEffect, useState, useContext } from "react";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/context";
import { Navigate, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import logo from "./logo.svg";

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const { token, isAdmin, setChange1, change1 } = useContext(AuthContext);
  const [data1, setData1] = useState([]);
  const [change, setchange] = useState(false);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(0);
  const [price, setPrice] = useState(null);
  const [comment, setComment] = useState("");

  //----------------------Update Product -----------------------//
  const [update, setUpdate] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newImage, setNewImage] = useState("");
  let [likes, setLikes] = useState(0);

  const getCategory = (category1) => {
    axios
      .get(`http://localhost:5000/products/category/${category1}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData1(response.data.product);
        setPrice(response.data.product.price);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setLikes(response.data.product.likes);
          setData(response.data.product);
          setComments(response.data.product.comments);
          setProduct(response.data.product._id);
          getCategory(response.data.product.category._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, change]);

  const addToCart = () => {
    const body = { product };

    axios
      .post("http://localhost:5000/cart", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setChange1(!change1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProduct = () => {
    const body = {};

    if (newTitle !== "") {
      body.newTitle = newTitle;
    }
    if (newDescription !== "") {
      body.newDescription = newDescription;
    }
    if (newImage !== "") {
      body.newImage = newImage;
    }
    if (newPrice !== "") {
      body.newPrice = newPrice;
    }

    axios
      .put(
        `http://localhost:5000/products/${id}`,
        {
          title: body.newTitle,
          description: body.newDescription,
          image: body.newImage,
          price: body.newPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setchange(!change);
        console.log(response.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const like = (id) => {
    axios
      .put(
        `http://localhost:5000/products/${id}`,
        { likes: likes },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setchange(!change);

        console.log(response.data.product.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createComment = (id) => {
    const body = { comment };

    axios
      .post(`http://localhost:5000/products/${id}/comments`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setchange(!change);

        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="BigDiv1">
      <div className="ContainerDetails">
        <div className="newDiv">
          <div className="imgDivDetails">
            {update ? null : (
              <img className="imgDetails" src={data.image} alt="img" />
            )}
            {update && (
              <input
                className="New"
                placeholder="Paste Your Image URL HERE !"
                onChange={(e) => {
                  setNewImage(e.target.value);
                }}
              />
            )}
          </div>
          <span className="itemContainerDetails">
            {update ? null : <h1 className="title">{data.title}</h1>}
            {update && (
              <input
                className="New"
                placeholder="Write Your New Title HERE !"
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
              />
            )}
            <hr className="hr"></hr>
            {update ? null : <h4>{data.description}</h4>}
            {update && (
              <input
                className="New"
                placeholder="Write Your New Description HERE !"
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
              />
            )}
            <hr></hr>

            {update ? null : <h2>Price : {data.price}$ </h2>}
            {update && (
              <input
                className="New"
                placeholder="Write Your New Price HERE !"
                onChange={(e) => {
                  setNewPrice(e.target.value);
                }}
              />
            )}
            <hr></hr>

            <div className="Buttons">
              <button
                className="addToCart"
                onClick={() => {
                  addToCart();
                }}
              >
                {" "}
                Add To Cart
              </button>
              <button
                className="likeButton"
                onClick={() => {
                  setLikes(likes++);
                  like(data._id);
                  setPrice(price);
                }}
              >
                Like <img className="logo" src={logo} />{" "}
                <span>({data.likes})</span>{" "}
              </button>
            </div>

            
           
          </span>

          {isAdmin && (
            <div>
              <button
                onClick={() => {
                  setUpdate(!update);
                }}
              >
                {" "}
                Update Product
              </button>
              <button
                onClick={() => {
                  updateProduct();
                  setUpdate(!update);
                }}
              >
                {" "}
                Finish Update !
              </button>
            </div>
          )}
        </div>
      </div>



              <div className="Rev1"> 
              {/*--------------------- Comments-------------------------*/}
              <div className="commentsDiv">
            <h1 className="topRev">Top reviews</h1>
              {comments.map((elem) => {
                console.log(elem.commenter);
                return (
                  <div className="comments">
                    <p className="eachComment">
                      <span className="commenter">
                        {elem.commenter.firstName}
                      </span>{" "}
                      : <span>{elem.comment}</span>{" "}
                    </p>
                  </div>
                );
              })}
              <div className="text_button">
                <textarea
                  placeholder="Write Your Comment Here !"
                  className="textArea"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></textarea>
                <button
                  className="commentButton"
                  onClick={() => {
                    createComment(data._id);
                  }}
                >
                  Comment
                </button>
              </div>
            </div>
      {/*--------------------- Suggested Products-------------------------*/}
      <div className="bigContainer1">

      <h1 className="h11"> Other Products You May Like !</h1>
         

        {data1 &&
          data1.map((elem, i) => {
            return (
              <>
                <div
                  className="Container"
                  onClick={() => {
                    navigate(`/${elem._id}`);
                    setchange(!change);
                  }}
                  key={i}
                >
                  <div className="imgDiv">
                    <img className="img" src={elem.image} alt="img" />
                  </div>
                  <div className="itemContainer">
                    <h1>{elem.title}</h1>
                    <p>{elem.description}</p>
                    <span>Price : {price}$ </span>
                  </div>
                </div>
              </>
            );
          })}
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;
