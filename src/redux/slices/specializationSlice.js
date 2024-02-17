import { createSlice } from "@reduxjs/toolkit";
import { fetchSpecializations } from "../actions/specializationActions";

const initialState = {
  specializationArray: [],
  status: null
};

const specializationSlice = createSlice({
  name: "specialization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecializations.pending, (state) => {
        state.specializationArray = null;
      })
      .addCase(fetchSpecializations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.specializationArray = action.payload;
      })
      .addCase(fetchSpecializations.rejected, (state) => {
        state.specializationArray = null;
      });
  },
});
export default specializationSlice.reducer;
