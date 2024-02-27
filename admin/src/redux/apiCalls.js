import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
// import axios from 'axios';
// import { getProductStart, getProductSuccess, getProductFailure } from './productRedux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    console.log("login successfull!")
  } catch (err) {
    dispatch(loginFailure());
  }
};
// export const login = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await publicRequest.post("/login", user);
//     dispatch(loginSuccess(res.data));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };





export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
// export const getProducts = async (dispatch) => {
//   dispatch(getProductStart());
//   try {
//     const res = await axios.get('http://localhost:5000/api/products');
//     dispatch(getProductSuccess(res.data));
//   } catch (err) {
//     console.error(err);
//     dispatch(getProductFailure());
//   }
// };



// export const deleteProduct = async (id, dispatch) => {
//   dispatch(deleteProductStart());
//   try {
//     // const res = await userRequest.delete(`/products/${id}`);
//     dispatch(deleteProductSuccess(id));
//   } catch (err) {
//     dispatch(deleteProductFailure());
//   }
// };
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`); // Assuming the endpoint is '/products/:id'
    // Dispatch the success action if the deletion was successful
    dispatch(deleteProductSuccess(id));
    return res.data; // Optional: Return the response data if needed
  } catch (error) {
    // Dispatch the failure action if an error occurs
    dispatch(deleteProductFailure());
    throw new Error("Error deleting product:", error);
  }
};

// export const updateProduct = async (id, product, dispatch) => {
//   dispatch(updateProductStart());
//   try {
//     // update
//     dispatch(updateProductSuccess({ id, product }));
//   } catch (err) {
//     dispatch(updateProductFailure());
//     console.log("updating error", err)
//   }
// };
export const updateProduct = async (id, product, dispatch) => {
  try {
    const res = await userRequest.put(`/products/${id}`, product); // Assuming the endpoint is '/products/:id'
    // Dispatch the success action if the update was successful
    dispatch(updateProductSuccess({ id, product: res.data }));
    return res.data; // Optional: Return the updated product data if needed
  } catch (error) {
    // Dispatch the failure action if an error occurs
    dispatch(updateProductFailure());
    throw new Error("Error updating product:", error);
  }
};


export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};


