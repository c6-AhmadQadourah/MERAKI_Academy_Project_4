import { Routes, Route, Link ,useNavigate } from "react-router-dom";
import {useEffect , useState ,useContext, createContext} from "react"
import axios from "axios";
import { AuthContext } from "../Contexts/context";
import ("./Navbar.css")



const Navigation = ()=>{
const [search1 ,setSearch1] = useState("")
  const navigate = useNavigate()
const {logout , isAdmin}=  useContext(AuthContext);
  const search = (search)=>{

    axios.get(`http://localhost:5000/products/search?search=${search}`  )
    .then((result)=>{
      
      //setData(result.data)
        console.log(result.data)
        
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const goToAdminPanel =()=>{
    return navigate("./register")
  }

  return( 
  <div  className="navigation" style={{ display: "flex", gap: "50px" }}>
<Link to="/"> Home </Link>
<Link to="/login"> Login </Link>
<Link to="/register"> Register </Link>

<input onChange={(e)=>{setSearch1(e.target.value)}} /> 
<button onClick={()=>{search(search1)}} >search Now</button>
<button onClick={()=>{logout()}} >Logout</button>
{isAdmin&& <button  >Admin Panel</button> }


  </div>
  )
}
export default Navigation
