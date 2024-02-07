import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const authToken = localStorage.getItem('authToken');
  const response = await axios.get("https://doctorinoapi.onrender.com/current_user", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data.data;
});
