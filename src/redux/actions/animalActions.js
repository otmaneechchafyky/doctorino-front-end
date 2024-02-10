import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "./URL"

export const fetchAnimal = createAsyncThunk("user/fetchAnimal", async () => {
    const authToken = localStorage.getItem('authToken');
  const response = await axios.get(`${apiURL}/animals`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  console.log(response.data)
  return response.data;
});
