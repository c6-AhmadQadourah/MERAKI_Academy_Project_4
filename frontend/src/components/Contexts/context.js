import {useEffect , useState , createContext} from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();


const AuthProvider = (props) => {

    const navigation = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)

console.log(isAdmin)


const saveToken=(token)=>{
    setToken(token)
    setIsLoggedIn(true) 
    
    //  setIsAdmin(localStorage.getItem("Admin"));
      
}

const logout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.clear();
    navigation("/login");
  };

  useEffect(() => {
    setToken(localStorage.getItem("Token"));
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
    isAdmin
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );

}

export default AuthProvider