import { useEffect, useState, useContext } from "react";
import axios, { Axios } from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"

const Users = ()=>{
    const navigate = useNavigate();
    const { token , isAdmin   } = useContext(AuthContext);
    const [data, setData] = useState([])

    useEffect(()=>{
           
        if (token){
 axios.get("http://localhost:5000/users" , {headers:{Authorization: `Bearer ${token}`}})
        .then((response)=>{
            
            setData(response.data.Users)
            console.log(response.data.Users)
            
            //setLoggedUser(response.data.userId)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    
    },[token ] )


    const deleteUser = (id) => {
        axios
          .delete(`http://localhost:5000/users//${id} `, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {

            
            const newusers = data.filter((element) => {
              return element._id !== id
            });
            setData(newusers);
            
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return <div  className="bigContainer"> 
    { data.map((elem,i)=>{
       return (
        
        <div   key={i} className="Container">
      
            <div className="imgDiv">
               
              
               

             </div>
             <div className="itemContainer">
               <h2 className="title"> FirstName : ( {elem.firstName} )</h2>
              
                <h2>LastName : ( {elem.lastName} )</h2>
                 <span><h2>Email : ( {elem.email} )</h2>  </span>
                 <span><h2>Country : ( {elem.country} )</h2>  </span>
                 <span><h2>Role : ( {elem.role.role} )</h2>  </span>

                 <div>
                 <button onClick={()=>{deleteUser(elem._id)}} > Delete User</button>
                 <button onClick={()=>{}} > Upgrade To Admin</button>
                </div>

                </div>
                
                </div>
                
      )
    })}
    </div>
}

export default Users