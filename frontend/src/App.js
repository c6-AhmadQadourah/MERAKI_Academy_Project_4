import "./App.css";
import { Routes, Route, Link , useNavigate ,useParams } from "react-router-dom";
import {useEffect , useState , createContext} from "react"
import Login from "./components/Login";
import Register from "./components/Register";
import Navigation from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import Admin from "./components/Admin_Panel/Admin";
import NewProduct from "./components/NewProduct/NewProduct";
import Test from "./components/test/Test";
import Google from "./components/googleTest/Google";
import Users from "./components/Users/Users";

function App() {
 const [change , setChange]= useState(false)
 




  return (
    
    <div className="App">
    
    <Navigation   />
      <Routes>
      <Route path = "/" element={<Home  /> }  />
      <Route path = "/admin" element={<Admin  /> }  />
      <Route path = "/admin/new" element={<NewProduct /> }  />
     
      
      <Route path = "/:id" element={<ProductDetails   />}  />
      <Route path = "/cart" element={<Cart   />}  />
      <Route path = "/test" element={<Test   />}  />
      <Route path = "/google" element={<Google   />}  />
      <Route path = "/users" element={<Users   />}  />
    
     <Route path = "/login" element={ <Login  />}  />
     <Route path = "/register" element={<Register/>}  />

</Routes>


    </div>

   

  );
}

export default App;
