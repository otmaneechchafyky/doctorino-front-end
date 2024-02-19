import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "./URL";

export const fetchAppointments = createAsyncThunk("appointment/fetchappointments", async () => {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.get(`${apiURL}/appointments`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  console.log(response.data)
  return response.data;
});

export const CreateAppointment = createAsyncThunk(
  "Appointments/CreateAppointment",
  async (formData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(`${apiURL}/appointments`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },       
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
        console.error("Error Creating an appointment", error.response.data);
    }
  }
);
