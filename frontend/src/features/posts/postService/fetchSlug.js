import axios from 'axios';

const fetchSlug = async (slug, setPost, setPostElements, setImageUrl, setNotFound) => {
  try {
    const response = await axios.get(`/api/posts/slug`, {
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