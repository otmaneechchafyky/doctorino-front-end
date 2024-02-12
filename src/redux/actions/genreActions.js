import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "./URL";

export const fetchGenre = createAsyncThunk("user/fetchGenre", async () => {
  const authToken = localStorage.getItem('authToken');
  const response = await axios.get(`${apiURL}/genres`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  // console.log(response.data)
  return response.data;
});