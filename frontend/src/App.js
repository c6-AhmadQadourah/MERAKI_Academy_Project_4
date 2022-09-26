import "./App.css";
import { Routes, Route, Link , useNavigate } from "react-router-dom";
import {useEffect , useState , createContext} from "react"
import Login from "./components/Login";
import Register from "./components/Register";
export const TokenContext = createContext()

function App() {
  const [token ,setToken]=useState(localStorage.getItem("Token"))
  const [isLoggedIn , setIsLoggedin]=useState(false)
console.log(token)


  
  return (
    <div className="App">
      <h1>Hello world</h1>
      <Login setToken={setToken} setIsLoggedin={setIsLoggedin}/>
<Register/>
    </div>
  );
}

export default App;
