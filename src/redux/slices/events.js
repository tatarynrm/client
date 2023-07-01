import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchEvents = createAsyncThunk("users/fetchUsers", async (KOD_OS) => {
  try {
    const { data } = await axios.post("/events",{KOD_OS});
    return data;
  } catch (error) {
    console.log(error);
  }
});


const initialState = {
  events: {
    items: [],
    loading: "loading",
  },
};
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.events.items = [];
      state.events.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.events.items = action.payload;
      state.events.status = "loaded";
    },
    [fetchEvents.rejected]: (state) => {
      state.events.items = [];
      state.events.status = "error";
    },
  },
});

export const eventsReducer = eventsSlice.reducer;
