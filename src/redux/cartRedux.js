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
      const { _id } = action.payload;
      const dupe = state.products.find((obj) => obj._id === _id);
      if (!dupe) {
        console.log("p:", dupe);
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price;
      } else {
        return state;
      }
    },

    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
      state.total -= action.payload.price;
    },
    clearCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addProduct, clearCart, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
