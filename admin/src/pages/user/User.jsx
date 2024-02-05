import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
// import { Link } from "react-router-dom";
import "./user.css";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { publicRequest } from "../../requestMethods";
import { useEffect, useState } from "react";

export default function User() {

  
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  // const [editingUser, setEditingUser] = useState(null);
  const [stats, setStats] = useState([]);


useEffect(() => {
  const getStats = async () => {
    try {
      const res = await publicRequest.get("/users/find/" + productId);
      setStats(res.data);
      console.log(res.data)
       
    } catch (err) {
      console.log(err);
    }
  };
  getStats();
}, [productId]);

const handleEditButton = async () => {
  try {
    await publicRequest.put(`/users/${productId}`, stats); // Use the correct endpoint and send updated user data
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error on editing user", error);
  }
};


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <NavLink to="/register">
          <button className="userAddButton">Create</button>
        </NavLink>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={stats.img}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{stats.username}</span>
              {/* <span className="userShowUserTitle">Software Engineer</span> */}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{stats.email}</span>
            </div>
            {/* <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div> */}
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{stats.firstName}{stats.lastName}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{stats.email}</span>
            </div>
            {/* <div className="userShowInfo"> */}
              {/* <LocationSearching className="userShowIcon" /> */}
              {/* <span className="userShowInfoTitle">New York | USA</span> */}
            {/* </div> */}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={stats ? stats.username : ''}
                  onChange={(e) => setStats({ ...stats, username: e.target.value })}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={stats ? stats.email : ''}
                  onChange={(e) => setStats({ ...stats, email: e.target.value })}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>First name</label>
                <input
                  type="text"
                  value={stats ? stats.firstName : ''}
                  onChange={(e) => setStats({ ...stats, firstName: e.target.value })}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Last name</label>
                <input
                  type="text"
                  value={stats ? stats.lastName : ''}
                  onChange={(e) => setStats({ ...stats, lastName: e.target.value })}
                  className="userUpdateInput"
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div> */}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={stats ? stats.img : ''}
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleEditButton}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


