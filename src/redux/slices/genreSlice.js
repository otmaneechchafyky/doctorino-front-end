import { createSlice } from "@reduxjs/toolkit";
import { fetchGenre } from "../actions/genreActions";

const initialState = {
  genresArray: [],
  status: null
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenre.pending, (state) => {
        state.genresArray = null;
      })
      .addCase(fetchGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genresArray = action.payload;
        console.log(state.genresArray)
      })
      .addCase(fetchGenre.rejected, (state) => {
        state.genresArray = null;
      });
  },
});
export default genreSlice.reducer;
