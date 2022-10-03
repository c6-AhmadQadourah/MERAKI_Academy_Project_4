import {useEffect , useState , createContext} from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();


const AuthProvider = (props) => {

    const navigation = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    const [originalData, setOriginalData] = useState(null)
    const [change1, setChange1] = useState(false)


console.log(isAdmin)
 

const saveToken=(token)=>{
    setToken(token)
    setIsLoggedIn(true) 
    
     setIsAdmin(localStorage.getItem("Admin"));
      
}

const logout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.clear();
    navigation("/login");
    setIsAdmin(false)
  };

  useEffect(() => {
    const token = localStorage.getItem("Token")
console.log(token)
    setToken(token);

    if (token) {
      saveToken(token);
    
    }
    
    /*
    if (isLoggedIn) {
        navigation("/");
    }
    */
  }, [ isLoggedIn ]);

  const state = {
    token,
    isLoggedIn,
    logout,
    saveToken,
    setIsLoggedIn,
    setIsAdmin,
    isAdmin,
    setOriginalData,
    originalData,
    setChange1,
    change1
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );

}

export default AuthProvider