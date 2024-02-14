import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginSuccessMessage: null,
  isAuthenticated: false,
  loginError: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loginSuccessMessage = action.payload;
      state.loginError = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.loginSuccessMessage = null;
      if (action.payload === 'Request failed with status code 401') {
        state.loginError = 'Invalid inputs!';
      }
    },
  },
});

export const { loginSuccess, loginFailure } = loginSlice.actions;

export default loginSlice.reducer;
