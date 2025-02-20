import axios from 'axios';
import DOMPurify from 'dompurify';

export const contact = async (email, name, message) => {
  const sanitizedData = {
    email: DOMPurify.sanitize(email),
    name: DOMPurify.sanitize(name),
    message: DOMPurify.sanitize(message),
  };

  const response = await axios.post('/api/public/contact', sanitizedData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
