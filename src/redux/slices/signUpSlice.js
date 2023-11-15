import { createSlice } from '@reduxjs/toolkit';
import { addNewUser } from '../actions/signUpAction'

const initialState = {
  usersList: [],
  loading: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,

  
  extraReducers: (builder) => {
    builder
      // handle AddNewUser's promise
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewUser.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default usersSlice.reducer;
export const { addUser } = usersSlice.actions;