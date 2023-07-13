import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchUr = createAsyncThunk("ur/fetchUr", async (id) => {
  try {
    const { data } = await axios.get(`/ur/${id}`,);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  ur: {
    items: [],
    loading: "loading",
  },
};
const urSlice = createSlice({
  name: "ur",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUr.pending]: (state) => {
      state.ur.items = [];
      state.ur.status = "loading";
    },
    [fetchUr.fulfilled]: (state, action) => {
      state.ur.items = action.payload;
      state.ur.status = "loaded";
    },
    [fetchUr.rejected]: (state) => {
      state.ur.items = [];
      state.ur.status = "error";
    },
  },
});

export const urReducer = urSlice.reducer;
