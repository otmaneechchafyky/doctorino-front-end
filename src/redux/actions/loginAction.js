import axios from 'axios';
import { apiUrl } from './apiURL'

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      user: formData,
    });

    if (!response.data || response.status !== 200) {
      const errorData = response.data || {};
      throw new Error(errorData.message || 'Login failed');
    }

    return response.data.data;
  } catch (error) {
    throw error;
  }
};