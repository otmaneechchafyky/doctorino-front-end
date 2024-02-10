import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "./URL";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const authToken = localStorage.getItem('authToken');
  const response = await axios.get(`${apiURL}/current_user`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
});
