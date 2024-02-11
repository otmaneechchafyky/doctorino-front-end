import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from './slices/signUpSlice';
import loginReducer from './slices/loginSlice';
import userReducer from './slices/currentUserSlice';
import animalReducer from './slices/animalSlice'
import genreReducer  from "./slices/genreSlice";

const store = configureStore({
  reducer: {
    signup: signUpReducer,
    login: loginReducer,
    currentUser: userReducer,
    animalsData: animalReducer,
    genresData: genreReducer,
  },
});

export default store;