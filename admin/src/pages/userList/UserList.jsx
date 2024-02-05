import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
// import { Link } from "react-router-dom";
import { useState } from "react";
// import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { publicRequest } from "../../requestMethods";

export default function UserList() {
  const [data, setData] = useState([]);

  // 
 useEffect(()=>{
  fetchData();
 },[]);

 const fetchData = async () => {
  try {
    const res = await publicRequest.get("/users");
    const formattedData = res.data.map((item) => ({
      ...item,
      id: item._id // Rename _id to id
    }));
    setData(formattedData);
  } catch (error) {
    console.log("Error during fetching data", error);
  }
};


  const handleDelete = async(id) => {
    await publicRequest.delete(`/users/${id}`)
    fetchData();
    // setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </NavLink>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        // rows={fetchData}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />

        {/* {Array.isArray(data) && data.length > 0? */}
      {/* (data.map((userdata)=> */}
       {/* <ul key={userdata._id}> */}
        {/* <li>{userdata.username}</li> */}
        {/* <li>{userdata.email}</li> */}
        {/* <li>{userdata.password}</li> */}
       {/* </ul> */}
      {/* ) */}
      {/* ):( */}
        {/* <p>loading...</p> */}
      {/* )} */}
    </div> 
  ); 
}
