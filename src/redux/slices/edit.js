import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  zapEdit: false,
  zapAddSlice: false,
  eventsOpen: false,
  mailOpen: false,
  zapDeleteStatus: false,
  zapZakrStatus: false,
  addZapSuccess:false,
  googleMeetOpen:false,
  zapEditData: {
    zav: "",
    rozv: "",
    zapText: "",
    zapKod: "",
    zapKodOs: "",
  },
  zapDeleteData: {
    pKodAuthor: "",
    pKodZap: "",
  },
};
const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editZapRedux: (state) => {
      state.zapEdit = !state.zapEdit;
    },
    editZapAddSlice: (state) => {
      state.zapAddSlice = !state.zapAddSlice;
    },
    eventsOpenChange: (state) => {
      state.eventsOpen = !state.eventsOpen;
    },
    emailOpenChange: (state) => {
      state.mailOpen = !state.mailOpen;
    },
    editZapEditData: (state, action) => {
      state.zapEditData = action.payload;
    },
    editZapDeleteData: (state, action) => {
      state.zapDeleteData = action.payload;
    },
    editZapDeleteStatus: (state, action) => {
      state.zapDeleteStatus = !state.zapDeleteStatus;
    },
    editZapZakrStatus: (state, action) => {
      state.zapZakrStatus = !state.zapZakrStatus;
    },
    changeAddZapSuccess: (state, action) => {
      state.addZapSuccess = !state.addZapSuccess;
    },
    changeGoogleMeetOpen: (state, action) => {
      state.googleMeetOpen = !state.googleMeetOpen;
    },
  },
});
export const {
  editZapRedux,
  editZapAddSlice,
  editZapEditData,
  eventsOpenChange,
  editZapDeleteStatus,
  editZapZakrStatus,
  editZapDeleteData,
  emailOpenChange,
  changeAddZapSuccess,
  changeGoogleMeetOpen
} = editSlice.actions;
export const editReducer = editSlice.reducer;
