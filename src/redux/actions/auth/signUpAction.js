import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from "../URL";

export const addNewUser = createAsyncThunk('users/addNewUser', async (userData) => {
    try {
      const resp = await axios.post(`${apiURL}/signup`, {user: userData});
      return resp.data.status.message;
    } catch (error) {
      return error;
    }
});