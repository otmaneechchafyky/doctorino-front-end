import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const authToken = localStorage.getItem('authToken');
  const response = await axios.get("http://127.0.0.1:4000/current_user", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data.data;
});
