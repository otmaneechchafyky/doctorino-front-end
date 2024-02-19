import { createSlice } from "@reduxjs/toolkit";
import { fetchAppointments } from "../actions/appointmentActions";

const initialState = {
  appointmentsArray: null,
  status: "null",
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.appointmentsArray = null;
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointmentsArray = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state) => {
        state.appointmentsArray = null;
        state.status = "failed";
      });
  },
});
export default appointmentSlice.reducer;
