import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/signUpSlice';
import loginReducer from './slices/loginSlice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
  },
});

export default store;