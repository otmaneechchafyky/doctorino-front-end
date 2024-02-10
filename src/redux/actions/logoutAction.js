import axios from 'axios';

export const logoutUser = () => {
  return async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await axios.delete('http://127.0.0.1:3000/logout', {
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
