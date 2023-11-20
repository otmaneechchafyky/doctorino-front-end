import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/currentUserAction";

const initialState = {
  userData: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userData = null;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userData = null;
        state.status = "failed";
        state.error = null;
      });
  },
});
export default userSlice.reducer;
