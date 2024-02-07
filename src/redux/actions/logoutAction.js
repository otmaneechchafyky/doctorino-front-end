import axios from 'axios';

export const logoutUser = () => {
  return async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await axios.delete('https://doctorinoapi.onrender.com/logout', {
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
