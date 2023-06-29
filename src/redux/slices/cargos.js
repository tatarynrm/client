// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../utils/axios";

// export const fetchCargos = createAsyncThunk("cargos/fetchCargos", async () => {
//   try {
//     const { data } = await axios.get("/cargos");
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// });
// export const fetchCargoById = createAsyncThunk(
//   "cargos/fetchCargoById",
//   async (id) => {
//     const { data } = await axios.get(`/cargos/${id}`);
//     return data;
//   }
// );

// const initialState = {
//   cargos: {
//     items: [],
//     loading: "loading",
//   },
// };
// const cargosSlice = createSlice({
//   name: "cargos",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [fetchCargos.pending]: (state) => {
//       state.cargos.items = [];
//       state.cargos.status = "loading";
//     },
//     [fetchCargos.fulfilled]: (state, action) => {
//       state.cargos.items = action.payload;
//       state.cargos.status = "loaded";
//     },
//     [fetchCargos.rejected]: (state) => {
//       state.cargos.items = [];
//       state.cargos.status = "error";
//     },
//     [fetchCargoById.pending]: (state) => {
//       state.cargos.items = [];
//       state.cargos.status = "loading";
//     },
//     [fetchCargoById.fulfilled]: (state, action) => {
//       state.cargos.items = action.payload;
//       state.cargos.status = "loaded";
//     },
//     [fetchCargoById.rejected]: (state) => {
//       state.cargos.items = [];
//       state.cargos.status = "error";
//     },
//   },
// });

// export const cargosReducer = cargosSlice.reducer;
