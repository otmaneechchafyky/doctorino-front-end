import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from './slices/authSlices/signUpSlice';
import loginReducer from './slices/authSlices/loginSlice';
import userReducer from './slices/currentUserSlice';
import animalReducer from './slices/animalSlice'
import genreReducer  from "./slices/genreSlice";
import vetReducer from "./slices/vetSlice";
import specializationReducer from './slices/specializationSlice';
import appointmentReducer from './slices/appointmentSlice';

const store = configureStore({
  reducer: {
    signup: signUpReducer,
    login: loginReducer,
    currentUser: userReducer,
    animalsData: animalReducer,
    genresData: genreReducer,
    vetsData: vetReducer,
    specializationsData: specializationReducer,
    appointmentsData: appointmentReducer,
  },
});

export default store;