import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchAllZap = createAsyncThunk(
  "cargos/fetchAllZap",
  async (todayDate) => {
    try {
      const { data } = await axios.post("/zap/all",{todayDate:todayDate});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchZap = createAsyncThunk(
  "cargos/fetchZap",
  async (KOD_OS) => {
    try {
      const { data } = await axios.post("/zap", {KOD_OS});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchZapById = createAsyncThunk(
  "cargos/fetchZapById",
  async (id) => {
    try {
      const data = await axios.get(`/zap/${id}`);
      if (data.status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchGroups = createAsyncThunk(
  "cargos/fetchGroups",
  async (kod) => {
    try {
      const data = await axios.post(`/zap/groups`, { kod: kod });
      if (data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchMyZap = createAsyncThunk(
  "cargos/fetchGroups",
  async (kod) => {
    const { data } = await axios.post(`/zap/groups`, { kod: kod });
    return data;
  }
);

const initialState = {
  zap: {
    items: [],
    groups: [],
    loading: "loading",
  },
};
const zapSlice = createSlice({
  name: "zap",
  initialState,
  reducers: {
    addReduxZap: (state, action) => {
      state.zap.items = [...state.zap.items, action.payload];
    },
    changeCommentsCount: (state, action) => {
      const id = action.payload;
      const counterComm = state.zap.items.find((item) => item.KOD === id);
      if (counterComm) {
        counterComm.COUNTCOMM += 1;
      }
      state.zap.items = [...state.zap.items];
    },
    deleteReduxZap: (state, action) => {
      const id = action.payload;
      state.zap.items = state.zap.items.filter((item) => item.KOD !== id);
    },
    refreshReduxZap: (state, action) => {
      const id = action.payload;
      const dateZap = state.zap.items.find((item) => item.KOD === id);
      if (dateZap) {
        const date = new Date();
        date.toISOString();
        dateZap.DATUPDATE = date;
      }
      state.zap.items = [...state.zap.items];
    },
    showEditReduxZap: (state, action) => {
      const { pKodZap, pZapText, pZav, pRozv,zapCina } = action.payload;
      const editZap = state.zap.items.find((item) => item.KOD === pKodZap);
      if (editZap) {
        editZap.ZAPTEXT = pZapText;
        editZap.ZAV = pZav;
        editZap.ROZV = pRozv;
        editZap.ZAPCINA=zapCina;
      }
      state.zap.items = [...state.zap.items];
    },
    showEditReduxZapText: (state, action) => {
      const { pKodZap, pZapText} = action.payload;
      const editZap = state.zap.items.find((item) => item.KOD === pKodZap);
      if (editZap) {
        editZap.ZAPTEXT = pZapText;
      }
      state.zap.items = [...state.zap.items];
    },
    showEditReduxZapCarCount: (state, action) => {
      const { pKilAmZakr, pKodZap} = action.payload;
      const editZap = state.zap.items.find((item) => item.KOD === pKodZap);
      if (editZap) {
        editZap.KILAMACT = editZap.KILAMACT - pKilAmZakr;
      }
      state.zap.items = [...state.zap.items];
    },
  },
  extraReducers: {
    [fetchAllZap.pending]: (state) => {
      state.zap.items = [];
      state.zap.status = "loading";
    },
    [fetchAllZap.fulfilled]: (state, action) => {
      state.zap.items = action.payload;
      state.zap.status = "loaded";
    },
    [fetchAllZap.rejected]: (state) => {
      state.zap.items = [];
      state.zap.status = "error";
    },
    [fetchZap.pending]: (state) => {
      state.zap.items = [];
      state.zap.status = "loading";
    },
    [fetchZap.fulfilled]: (state, action) => {
      state.zap.items = action.payload;
      state.zap.status = "loaded";
    },
    [fetchZap.rejected]: (state) => {
      state.zap.items = [];
      state.zap.status = "error";
    },
    [fetchZapById.pending]: (state) => {
      state.zap.items = [];
      state.zap.status = "loading";
    },
    [fetchZapById.fulfilled]: (state, action) => {
      state.zap.items = action.payload;
      state.zap.status = "loaded";
    },
    [fetchZapById.rejected]: (state) => {
      state.zap.items = [];
      state.zap.status = "error";
    },
    [fetchGroups.pending]: (state) => {
      state.zap.groups = [];
      state.zap.status = "loading";
    },
    [fetchGroups.fulfilled]: (state, action) => {
      state.zap.groups = action.payload;
      state.zap.status = "loaded";
    },
    [fetchGroups.rejected]: (state) => {
      state.zap.groups = [];
      state.zap.status = "error";
    },
  },
});
export const {
  addReduxZap,
  deleteReduxZap,
  changeCommentsCount,
  refreshReduxZap,
  showEditReduxZap,
  showEditReduxZapText,
  showEditReduxZapCarCount
} = zapSlice.actions;
export const zapReducer = zapSlice.reducer;
