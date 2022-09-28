import "./App.css";
import { Routes, Route, Link , useNavigate } from "react-router-dom";
import {useEffect , useState , createContext} from "react"
import Login from "./components/Login";
import Register from "./components/Register";
import Navigation from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  const [hidden, setHidden] = useState(false);
  const [id, setId] = useState(0);
 



  
  return (
    
    <div className="App">
    
    <Navigation/>
      <Routes>
      <Route path = "/" element={<Home/> }  />
      
      <Route path = "/product" element={<ProductDetails/>}  />

     <Route path = "/login" element={ <Login  />}  />
     <Route path = "/register" element={<Register/>}  />

</Routes>
    </div>

   

  );
}

export default App;
