import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const { data } = await axios.get("/users");
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  }
);
export const fetchActiveUsers = createAsyncThunk(
  "users/fetchActiveUsers",
  async () => {
    const { data } = await axios.get(`/users/active`);
    return data;
  }
);
export const fetchFiredUsers = createAsyncThunk(
  "users/fetchFiredUsers",
  async () => {
    const { data } = await axios.get(`/users/fired`);
    return data;
  }
);

const initialState = {
  users: {
    items: [],
    loading: "loading",
  },
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.users.items = [];
      state.users.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = "loaded";
    },
    [fetchUsers.rejected]: (state) => {
      state.users.items = [];
      state.users.status = "error";
    },
    [fetchUserById.pending]: (state) => {
      state.users.items = [];
      state.users.status = "loading";
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = "loaded";
    },
    [fetchUserById.rejected]: (state) => {
      state.users.items = [];
      state.users.status = "error";
    },
    [fetchActiveUsers.pending]: (state) => {
      state.users.items = [];
      state.users.status = "loading";
    },
    [fetchActiveUsers.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = "loaded";
    },
    [fetchActiveUsers.rejected]: (state) => {
      state.users.items = [];
      state.users.status = "error";
    },
    [fetchFiredUsers.pending]: (state) => {
      state.users.items = [];
      state.users.status = "loading";
    },
    [fetchFiredUsers.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = "loaded";
    },
    [fetchFiredUsers.rejected]: (state) => {
      state.users.items = [];
      state.users.status = "error";
    },
  },
});

export const userReducer = userSlice.reducer;
