import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/currentUserAction";

const initialState = {
  userData: null,
  status: "",
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
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userData = null;
        state.status = "failed";
      });
  },
});
export default userSlice.reducer;
