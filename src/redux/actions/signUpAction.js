import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://doctorinoapi.onrender.com/signup';

export const addNewUser = createAsyncThunk('users/addNewUser', async (userData) => {
    try {
      const resp = await axios.post(url, {user: userData});
      return resp.data.status.message;
    } catch (error) {
      return error;
    }
});