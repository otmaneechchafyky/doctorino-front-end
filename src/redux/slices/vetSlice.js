import { createSlice } from "@reduxjs/toolkit";
import { fetchVets, fetchVet } from "../actions/vetActions";

const initialState = {
  vetsArray: null,
  vetsArraystatus: null,
  vetDetails: null,
  vetDetailsStatus: null
};

const vetSlice = createSlice({
  name: "vet",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVets.pending, (state) => {
        state.vetsArray = null;
        state.vetsArraystatus = "loading";
      })
      .addCase(fetchVets.fulfilled, (state, action) => {
        state.vetsArraystatus = "succeeded";
        state.vetsArray = action.payload;
      })
      .addCase(fetchVets.rejected, (state) => {
        state.vetsArray = null;
        state.vetsArraystatus = "failed";
      })
      .addCase(fetchVet.pending, (state) => {
        state.vetDetails = null;
        state.vetDetailsStatus = "loading";
      })
      .addCase(fetchVet.fulfilled, (state, action) => {
        state.vetDetailsStatus = "succeeded";
        state.vetDetails = action.payload;
      })
      .addCase(fetchVet.rejected, (state) => {
        state.vetDetails = null;
        state.vetDetailsStatus = "failed";
      })
  },
});
export default vetSlice.reducer;
