import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "./URL";

export const fetchSpecializations = createAsyncThunk("specialization/fetchSpecializations", async () => {
  const authToken = localStorage.getItem('authToken');
  const response = await axios.get(`${apiURL}/specializations`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  // console.log(response.data)
  return response.data;
});