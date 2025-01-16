import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const fetchSlug = async (slug, setPost, setPostElements, setImageUrl, setNotFound) => {
  try {
    const response = await axios.get(`${URL}/api/posts/slug`, {
      params: { slug },
    });
    
    const matchedPost = response.data;

    if (matchedPost) {
      setPost(matchedPost);
      setPostElements(matchedPost.elements || []);
      setImageUrl(matchedPost.imageUrl || '');
    } else {
      setNotFound(true);
    }
  } catch (error) {
    setNotFound(true);
  }
};

export default fetchSlug;