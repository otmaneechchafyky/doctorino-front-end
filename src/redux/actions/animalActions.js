import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAnimal = createAsyncThunk("user/fetchAnimal", async () => {
    const authToken = localStorage.getItem('authToken');
  const response = await axios.get("https://doctorinoapi.onrender.com/animals", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  console.log(response.data)
  return response.data;
});
