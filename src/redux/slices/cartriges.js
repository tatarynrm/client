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
export const fetchCartModels = createAsyncThunk(
  "cargos/fetchCartModels",
  async () => {
    const { data } = await axios.get(`/cart/cart-model`);
    return data;
  }
);
export const fetchCartriges = createAsyncThunk(
  "cargos/fetchCartriges",
  async () => {
    const { data } = await axios.get(`/cart/cartriges`);
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
    [fetchCartModels.pending]: (state) => {
      state.cart.items = [];
      state.cart.status = "loading";
    },
    [fetchCartModels.fulfilled]: (state, action) => {
      state.cart.items = action.payload;
      state.cart.status = "loaded";
    },
    [fetchCartModels.rejected]: (state) => {
      state.cart.items = [];
      state.cart.status = "error";
    },
    [fetchCartriges.pending]: (state) => {
      state.cart.items = [];
      state.cart.status = "loading";
    },
    [fetchCartriges.fulfilled]: (state, action) => {
      state.cart.items = action.payload;
      state.cart.status = "loaded";
    },
    [fetchCartriges.rejected]: (state) => {
      state.cart.items = [];
      state.cart.status = "error";
    },
  },
});

export const cartReducer = cartSlice.reducer;
