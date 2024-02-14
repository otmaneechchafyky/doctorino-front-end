import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "./URL";

export const fetchAnimal = createAsyncThunk("user/fetchAnimal", async () => {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.get(`${apiURL}/animals`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
});

export const addAnimal = createAsyncThunk(
  "animal/addAnimal",
  async (formData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(`${apiURL}/animals`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding animal:", error);
      throw error;
    }
  }
);

export const editAnimal = createAsyncThunk(
  "animal/editAnimal",
  async (formData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `${apiURL}/animals/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error editing animal:", error);
      throw error;
    }
  }
);

export const deleteAnimal = createAsyncThunk(
  "animal/deleteAnimal",
  async (id, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.delete(`${apiURL}/animals/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      // You can handle errors or simply reject with the error
      return rejectWithValue(error.response.data);
    }
  }
);
