import axios from 'axios';

const userLogin = async (email, password) => {
  const response = await axios.post('/api/auth/user/login', {
    email,
    password,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default userLogin;
