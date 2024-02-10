import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "./apiURL";

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (userData) => {
    try {
      const resp = await axios.post(`${apiUrl}/signup`, { user: userData });
      return resp.data.status.message;
    } catch (error) {
      return error.response.data.status.message;
    }
  }
);
