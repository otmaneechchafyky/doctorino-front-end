import axios from 'axios';

const API_BASE_URL = 'https://doctorinoapi.onrender.com';

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      user: formData,
    });

    if (!response.data || response.status !== 200) {
      const errorData = response.data || {};
      throw new Error(errorData.message || 'Login failed');
    }

    const token = response.data.token;

    localStorage.setItem('authToken', token);
    console.log(response.data.status.message)
    return response.data.status.message;
  } catch (error) {
    throw error;
  }
};
