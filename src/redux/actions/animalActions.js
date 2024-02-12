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

export const addAnimal = createAsyncThunk("user/addAnimal", async (formData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await axios.post(`${apiURL}/animals`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error("Error adding animal:", error);
    throw error
  }
})