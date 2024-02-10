import { createSlice } from "@reduxjs/toolkit";
import { fetchAnimal } from "../actions/animalActions";

const initialState = {
  animalsArray: null,
  status: "null",
};

const animalSlice = createSlice({
  name: "animal",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimal.pending, (state) => {
        state.animalsArray = null;
        state.status = "loading";
      })
      .addCase(fetchAnimal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.animalsArray = action.payload;
      })
      .addCase(fetchAnimal.rejected, (state) => {
        state.animalsArray = null;
        state.status = "failed";
      });
  },
});
export default animalSlice.reducer;
