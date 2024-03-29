import axios from 'axios';
import { apiURL } from "../URL";

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${apiURL}/login`, {
      user: formData,
    });

    if (!response.data || response.status !== 200) {
      const errorData = response.data || {};
      throw new Error(errorData.message || 'Login failed');
    }

    const token = response.data.token;

    localStorage.setItem('authToken', token);
    return response.data.status.message;
  } catch (error) {
    throw error;
  }
};
