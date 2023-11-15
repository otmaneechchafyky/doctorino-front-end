import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
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
