

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
   

    addProduct: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.products.find((product) => product.id === id);
    
      if (!existingProduct) {
        state.products.push(action.payload);
        state.quantity += 1; // Increment by 1 for each unique product
      }
    
      state.total += action.payload.price * action.payload.quantity;
    },

    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        state.total += (quantity - product.quantity) * product.price;
        product.quantity = quantity;
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      const removedProductIndex = state.products.findIndex((product) => product.id === productId);
    
      if (removedProductIndex !== -1) {
        const removedProduct = state.products[removedProductIndex];
        state.quantity -= 1; // Decrement by 1 for each removed unique product
        state.total -= removedProduct.price * removedProduct.quantity;
        state.products.splice(removedProductIndex, 1);
      }
    },
    
    
    
  },
});




export const { addProduct, updateProductQuantity, removeProduct } =
  cartSlice.actions;

export default cartSlice.reducer;

