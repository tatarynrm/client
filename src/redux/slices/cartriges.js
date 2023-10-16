import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchCart = createAsyncThunk(
  "cargos/fetchCart",
  async () => {
    try {
      const { data } = await axios.get("/cart/cart");
      return data.rows;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchPrinters = createAsyncThunk(
  "cargos/fetchPrinters",
  async () => {
    const { data } = await axios.get(`/cart/printers`);
    return data;
  }
);

const initialState = {
  cart: {
    items: [],
    loading: "loading",
  },
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCart.pending]: (state) => {
      state.cart.items = [];
      state.cart.status = "loading";
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cart.items = action.payload;
      state.cart.status = "loaded";
    },
    [fetchCart.rejected]: (state) => {
      state.cart.items = [];
      state.cart.status = "error";
    },
    [fetchPrinters.pending]: (state) => {
      state.cart.items = [];
      state.cart.status = "loading";
    },
    [fetchPrinters.fulfilled]: (state, action) => {
      state.cart.items = action.payload;
      state.cart.status = "loaded";
    },
    [fetchPrinters.rejected]: (state) => {
      state.cart.items = [];
      state.cart.status = "error";
    },
  },
});

export const cartReducer = cartSlice.reducer;
