import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://127.0.0.1:4000/signup';

export const addNewUser = createAsyncThunk('users/addNewUser', async (userData) => {
    try {
      const resp = await axios.post(url, {user: userData});
      return resp.data;
    } catch (error) {
      return error.message;
    }
});