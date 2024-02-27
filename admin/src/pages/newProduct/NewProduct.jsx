// 

////////////////////////////////
import { useState } from "react";
import "./newProduct.css";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  // const [file, setFile] = useState(null);
  // const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    // Handle select inputs differently
    if (type === "select-one") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value
      }));
    } else if (name === "categories") {
      // Split the comma-separated string into an array of categories
      const categoriesArray = value.split(",");
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: categoriesArray
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: type === "checkbox" ? e.target.checked : value
      }));
    }
  };
  
  

  const handleCreateButton = (e)=>{
     e.preventDefault();
    addProduct(inputs,dispatch)
    console.log(inputs)
  }

    
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            // type="file"
            type="text"
            // id="file"
            name="img"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Books"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            // value={}
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" name="categories" placeholder="gk" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Type of Book</label>
          <input type="text" name="typeOfBook" placeholder="gk,novels" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Language</label>
          <select name="language" onChange={handleChange}>
            <option   value="English">English</option>
            <option  value="Hindi">Hindi</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option   value="true">Yes</option>
            <option   value="false">No</option>
          </select>
        </div>

        <button onClick={handleCreateButton} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
