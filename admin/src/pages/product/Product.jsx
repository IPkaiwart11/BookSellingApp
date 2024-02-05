// import { useLocation } from "react-router-dom";
// import "./product.css";
// // import Chart from "../../components/chart/Chart";
// // import { productData } from "../../dummyData";
// import { Publish } from "@material-ui/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useMemo, useState } from "react";
// // import { userRequest } from "../../requestMethods";
// import { NavLink } from "react-router-dom";
// import { updateProduct } from "../../redux/apiCalls";

// export default function Product() {
//   const location = useLocation();
//   const productId = location.pathname.split("/")[2];
  // const [pStats, setPStats] = useState([]);

//   const dispatch = useDispatch();
//   const product = useSelector((state) =>
//     state.product.products.find((product) => product._id === productId)
//   );

//   // const MONTHS = useMemo(
//   //   () => [
//   //     "Jan",
//   //     "Feb",
//   //     "Mar",
//   //     "Apr",
//   //     "May",
//   //     "Jun",
//   //     "Jul",
//   //     "Agu",
//   //     "Sep",
//   //     "Oct",
//   //     "Nov",
//   //     "Dec",
//   //   ],
//   //   []
//   // );

//   // useEffect(() => {
//   //   const getStats = async () => {
//   //     try {
//   //       const res = await userRequest.get("orders/income?pid=" + productId);
//   //       const list = res.data.sort((a,b)=>{
//   //           return a._id - b._id
//   //       })
//   //       list.map((item) =>
//   //         setPStats((prev) => [
//   //           ...prev,
//   //           { name: MONTHS[item._id - 1], Sales: item.total },
//   //         ])
//   //       );
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   };
//   //   getStats();
//   // }, [productId, MONTHS]);
//  // State for product details
//  const [productDetails, setProductDetails] = useState({
//   title: product.title,
//   desc: product.desc,
//   price: product.price,
//   inStock: product.inStock
// });

// // Function to handle input changes
// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setProductDetails((prevDetails) => ({
//     ...prevDetails,
//     [name]: value
//   }));
// };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     // updateProduct(id, dispatch);
//       // Dispatch action to update product
//       updateProduct(productId, productDetails,dispatch);
//   };


//   return (
//     <div className="product">
//       <div className="productTitleContainer">
//         <h1 className="productTitle">Product</h1>
//         <NavLink to="/newproduct">
//           <button className="productAddButton">Create</button>
//         </NavLink>
//       </div>
//       <div className="productTop">
//         {/* <div className="productTopLeft">
//           <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
//         </div> */}
//         <div className="productTopRight">
//           <div className="productInfoTop">
//             <img src={product.img} alt="" className="productInfoImg" />
//             <span className="productName">{product.title}</span>
//           </div>
//           <div className="productInfoBottom">
//             <div className="productInfoItem">
//               <span className="productInfoKey">id:</span>
//               <span className="productInfoValue">{product._id}</span>
//             </div>
//             {/* <div className="productInfoItem">
//               <span className="productInfoKey">sales:</span>
//               <span className="productInfoValue">5123</span>
//             </div> */}
//             <div className="productInfoItem">
//               <span className="productInfoKey">in stock:</span>
//               <span className="productInfoValue">{product.inStock}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="productBottom">
//         <form className="productForm">
//           <div className="productFormLeft">
//             <label>Product Name</label>
//             <input type="text" value={productDetails.title} onChange={handleInputChange}/>
//             <label>Product Description</label>
//             <input type="text" value={productDetails.desc} onChange={handleInputChange}/>
//             <label>Price</label>
//             <input type="text" value={productDetails.price} onChange={handleInputChange}/>
//             <label>In Stock</label>
//             <select name="inStock" id="idStock" value={productDetails.inStock} onChange={handleInputChange}>
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//           </div>
//           <div className="productFormRight">
//             <div className="productUpload">
//               <img src={product.img} alt="" className="productUploadImg" onChange={handleInputChange}/>
//               <label for="file">
//                 <Publish />
//               </label>
//               <input type="file" id="file" style={{ display: "none" }} />
//             </div>
//             <button className="productButton" onClick={handleUpdate}>Update</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////
import { useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { updateProduct } from "../../redux/apiCalls";
// import { Axios } from "axios";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  // State for product details
  const [productDetails, setProductDetails] = useState(
    {
    title: "",
    desc: "",
    price: "",
    inStock: true,
    img:"" // Set a default value for inStock
  }
  );

  // Update product details state when product changes
  useEffect(() => {
    if (product) {
      setProductDetails({
        title: product.title,
        desc: product.desc,
        price: product.price,
        inStock: product.inStock,
        img:product.img
      });
    }
  }, [product]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "inStock" ? (value === "true") : value // Convert string to boolean for inStock
    }));
  };

  const handleUpdate = () => {
   updateProduct(productId, productDetails, dispatch);
    console.log("successfully updated product");
    console.log(productId)
    // console.log(productDetails)
   
  };
  
 

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <NavLink to="/newproduct">
          <button className="productAddButton">Create</button>
        </NavLink>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          {/* <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div> */}
          {product && (
  <div className="productInfoTop">
    <img src={product.img} alt="" className="productInfoImg" />
    <span className="productName">{product.title}</span>
  </div>
)}

          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{productDetails._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{productDetails.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" name="title" value={productDetails.title} onChange={handleInputChange} />
            <label>Product Description</label>
            <input type="text" name="desc" value={productDetails.desc} onChange={handleInputChange} />
            <label>Price</label>
            <input type="text" name="price" value={productDetails.price} onChange={handleInputChange} />
            <label>In Stock</label>
            <select name="inStock" id="idStock" value={productDetails.inStock} onChange={handleInputChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              {/* <img src={product.img} alt="" value={productDetails.img} className="productUploadImg" onChange={handleInputChange} /> */}
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button type="button" className="productButton" onClick={handleUpdate}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
