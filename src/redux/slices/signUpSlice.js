import { createSlice } from '@reduxjs/toolkit';
import { addNewUser } from '../actions/signUpAction'

const initialState = {
  loading: true,
  signUpMessage: null,
  signUpError: null
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,

  
  extraReducers: (builder) => {
    builder
      // handle AddNewUser's promise
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signUpMessage = action.payload
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.signUpMessage = action.payload
      })
  },
});

export default signUpSlice.reducer;
export const { addUser } = signUpSlice.actions;