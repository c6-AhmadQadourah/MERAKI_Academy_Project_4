import {useEffect , useState , createContext} from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();


const AuthProvider = (props) => {

    const navigation = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
console.log(token)


const saveToken=(token)=>{
    setToken(token)
    setIsLoggedIn(true) 
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
    
    if (isLoggedIn) {
        navigation("/");
    }
    
  }, [ isLoggedIn]);

  const state = {
    token,
    isLoggedIn,
    logout,
    saveToken,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );

}

export default AuthProvider