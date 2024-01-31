import { createSlice } from "@reduxjs/toolkit";
import { fetchAnimal } from "../actions/animalActions";

const initialState = {
  animalData: null,
  status: "",
};

const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimal.pending, (state) => {
        state.animalData = null;
        state.status = "loading";
      })
      .addCase(fetchAnimal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.animalData = action.payload;
      })
      .addCase(fetchAnimal.rejected, (state) => {
        state.animalData = null;
        state.status = "failed";
      });
  },
});
export default animalSlice.reducer;
