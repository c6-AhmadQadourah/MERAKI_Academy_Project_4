import "./App.css";
import { Routes, Route, Link , useNavigate } from "react-router-dom";
import {useEffect , useState , createContext} from "react"
import Login from "./components/Login";
import Register from "./components/Register";
import Navigation from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
export const TokenContext = createContext()

function App() {
  const [token ,setToken]=useState(localStorage.getItem("Token"))
  const [isLoggedIn , setIsLoggedin]=useState(false)
console.log(token)


  
  return (
    <TokenContext.Provider value={token}>
    <div className="App">
    
    <Navigation/>
      <Routes>
      <Route path = "/" element={<Home/> }  />

     <Route path = "/login" element={ <Login setToken={setToken} setIsLoggedin={setIsLoggedin}/>}  />
     <Route path = "/register" element={<Register/>}  />
</Routes>
    </div>

    </TokenContext.Provider>

  );
}

export default App;
