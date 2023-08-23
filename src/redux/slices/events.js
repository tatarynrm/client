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
export const fetchMessAll = createAsyncThunk("users/fetchMessAll", async () => {
  try {
    const { data } = await axios.get("/events/get-all-mess");
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchGoogleMeetLink = createAsyncThunk("users/fetchGoogleMeetLink", async (KOD_OS) => {
  try {
    const { data } = await axios.post("/events/google-meet",{KOD_OS});
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
  reducers: {
    addGoogleMeetEvent: (state, action) => {
      state.events.items = [{GOOGLEMEET:action.payload}];
    },
  },
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
    [fetchMessAll.pending]: (state) => {
      state.events.items = [];
      state.events.status = "loading";
    },
    [fetchMessAll.fulfilled]: (state, action) => {
      state.events.items = action.payload;
      state.events.status = "loaded";
    },
    [fetchMessAll.rejected]: (state) => {
      state.events.items = [];
      state.events.status = "error";
    },
    [fetchGoogleMeetLink.pending]: (state) => {
      state.events.items = [];
      state.events.status = "loading";
    },
    [fetchGoogleMeetLink.fulfilled]: (state, action) => {
      state.events.items = action.payload;
      state.events.status = "loaded";
    },
    [fetchGoogleMeetLink.rejected]: (state) => {
      state.events.items = [];
      state.events.status = "error";
    },
  },
});
export const {
  addGoogleMeetEvent,
 
} = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
