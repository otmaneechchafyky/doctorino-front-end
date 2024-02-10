import axios from 'axios';
import { apiURL } from "./URL";

export const logoutUser = () => {
  return async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await axios.delete(`${apiURL}/logout`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      localStorage.removeItem('authToken');
      console.log(response.data.message)
      return response.data;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
};
