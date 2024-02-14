import { createSlice } from "@reduxjs/toolkit";
import { fetchAnimal, deleteAnimal } from "../actions/animalActions";

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
      })
      .addCase(deleteAnimal.pending, (state) => {
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.animalsArray = state.animalsArray.filter(
          (animal) => animal.id !== action.payload.deletedAnimalId
        );
      })
      .addCase(deleteAnimal.rejected, (action) => {
        console.error("Error deleting animal", action.error.message);
      });
  },
});
export default animalSlice.reducer;
