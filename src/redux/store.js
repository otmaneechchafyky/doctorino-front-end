import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from './slices/signUpSlice';
import loginReducer from './slices/loginSlice';
import userReducer from './slices/currentUserSlice';

const store = configureStore({
  reducer: {
    signup: signUpReducer,
    login: loginReducer,
    currentUser: userReducer,
  },
});

export default store;