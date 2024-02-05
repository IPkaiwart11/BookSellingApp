import { useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./newUser.css";

export default function NewUser() {
 const [newData, setNewData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: '',
        img:'',
        password:''
 })

  const handlechange = (e)=>{
      setNewData({...newData, [e.target.name]:e.target.value})
  }

   const createUser = async(e)=>{
    e.preventDefault();
    try{
          await publicRequest.post('/auth/register',newData);
          setNewData({username: '',
          firstName: '',
          lastName: '',
          email: '',
          isAdmin: '',
          img:'',
          password:''});
    }catch(error){
      console.log("Error on creating new user", error);
    }
   }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={createUser}>
        <div className="newUserItem">
          <label>Image</label>
          <input onChange={handlechange} name="img" type="file"/>
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" name="username" onChange={handlechange} placeholder="indrapal11" />
        </div>
        <div className="newUserItem">
          <label>First Name</label>
          <input type="text" name="firstName" onChange={handlechange} placeholder="indrapal" />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input type="text" name="lastName" onChange={handlechange} placeholder="kaiwart" />
        </div>
        <div className="newUserItem">
          <label>password</label>
          <input type="password" name="password" onChange={handlechange} placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name="email" onChange={handlechange} placeholder="abc@gmail.com" />
        </div>
        {/* <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div> */}
        {/* <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div> */}
        <div className="newUserItem">
          <label>isAdmin</label>
          <select className="newUserSelect" name="isAdmin" onChange={handlechange} id="active">
            <option name="isAdmin" value="true">Yes</option>
            <option name="isAdmin" value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" type="submit">Create</button>
      </form>
    </div>
  );
}
