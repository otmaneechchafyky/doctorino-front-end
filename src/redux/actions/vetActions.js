import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "./URL";

export const fetchVets = createAsyncThunk("vets/fetchVets", async () => {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.get(`${apiURL}/vets`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  // console.log(response.data)
  return response.data;
});

export const fetchVet = createAsyncThunk("vets/fetchVet", async(id) => {
    const authToken = localStorage.getItem("authToken");
    const response = await axios.get(`${apiURL}/vets/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    // console.log(response.data)
    return response.data;
});