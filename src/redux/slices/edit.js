import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  zapEdit: false,
  zapAddSlice: false,
  eventsOpen: false,
  mailOpen: false,
  zapDeleteStatus: false,
  addZapSuccess:false,
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
    changeAddZapSuccess: (state, action) => {
      state.addZapSuccess = !state.addZapSuccess;
    },
  },
});
export const {
  editZapRedux,
  editZapAddSlice,
  editZapEditData,
  eventsOpenChange,
  editZapDeleteStatus,
  editZapDeleteData,
  emailOpenChange,
  changeAddZapSuccess
} = editSlice.actions;
export const editReducer = editSlice.reducer;
