import { useEffect, useState, useContext } from "react";
import axios, { Axios } from "axios"
import { useParams } from "react-router-dom";
import {AuthContext} from "../Contexts/context";
import {Navigate, useNavigate} from "react-router-dom"

const Users = ()=>{
    const navigate = useNavigate();
    const { token , isAdmin ,change1 , setChange1  } = useContext(AuthContext);
    const [data, setData] = useState([])
    const [newRole , setNewRole]=useState('6330bbb19cea5c5c03a3fb07')

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
    
    },[token,change1 ] )


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


      const updateToAdmin = (id) => {
       
        axios
          .put(`http://localhost:5000/users/${id}`, {role :newRole})
          .then((response) => {
            console.log(response)
            setChange1(!change1)
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
                 <button onClick={()=>{updateToAdmin(elem._id)}} > Upgrade To Admin</button>
                </div>

                </div>
                
                </div>
                
      )
    })}
    </div>
}

export default Users