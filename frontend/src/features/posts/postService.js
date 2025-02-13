import axios from 'axios';
import { getElementStyles } from '@/utilities/posts/editorFunctions';
import elements from '@/data/elements';
import DOMPurify from 'dompurify';

export const createPost = async (newPost) => {
  const response = await axios.post(`/api/posts`, newPost, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`/api/posts/${postId}`);
  return response.data;
};

export const fetchRecentPosts = async (type) => {
  try {
    const response = await axios.get(`/api/posts/recent?type=${type}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Recent post not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch recent post');
  }
};


export const fetchPosts = async (limit, excludeFeatured = false) => {
  const response = await axios.get(`/api/posts/`, {
    params: { limit, excludeFeatured },
  });
  return response.data;
};

export const fetchSlug = async (slug) => {
  const response = await axios.get(`/api/posts/slug/${slug}`);
  return response.data;
};

export const fetchTitle = async (title) => {
  const response = await axios.get(`/api/posts/title`, {
    params: { title },
  });
  return response.data.available;
};

export const updatePost = async (postId, updatedPost) => {
  const response = await axios.put(`/api/posts/${postId}`, updatedPost, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const publishPost = async (post, postElements) => {
  const imageUrl = document.querySelector('.banner img').src;
  const stylesMap = new Map();

  const updatedElements = postElements.map(element => {
  const elementDom = document.getElementById(element.id);
    if (elementDom) {
      stylesMap.set(element.id, getElementStyles(elementDom));

      let elementType;
      let elementImageUrl;

      if (elementDom.classList.contains('image')) {
        elementType = 'image';
        elementImageUrl = elementDom.querySelector('img').src;
      } else {
        const matchedClass = Object.keys(elements).find(key =>
          Array.isArray(elements[key]?.classes) &&
          elements[key].classes.some(clsObj => elementDom.classList.contains(clsObj.class))
        );

        if (matchedClass) {
          const matchedClsObj = elements[matchedClass].classes.find(clsObj =>
            elementDom.classList.contains(clsObj.class)
          );
          elementType = matchedClsObj ? matchedClsObj.class : 'default-text';
        } else {
          elementType = 'default-text';
        }
      }

      let content = elementDom.innerText || element.content;
      content = DOMPurify.sanitize(content);

      const updatedElement = {
        ...element,
        type: elementType,
        content: elementType === 'bullet' ? null : content,
        style: { ...getElementStyles(elementDom) },
      };

      switch (elementType) {
        case 'image': {
          updatedElement.imageUrl = elementImageUrl;
          break;
        }
      
        case 'bullet': {
          const liElements = Array.from(elementDom.querySelectorAll('ul li'));
          updatedElement.listItems = liElements.map(li => li.textContent);
          break;
        }
      
        case 'twitter': {
          const tweetDiv = elementDom.querySelector('[data-tweetid]'); 
          console.log(tweetDiv ? tweetDiv.getAttribute('data-tweetid') : 'not found');
          if (tweetDiv) {
            updatedElement.twitterId = tweetDiv.getAttribute('data-tweetid');
          }
          break;
        }
      }
      
      return updatedElement;
    }
    return element;
  });

  const updatedPost = {
    ...post,
    status: 'published',
    imageUrl,
    elements: updatedElements,
  };

  const response = await axios.put(`/api/posts/${post._id}`, updatedPost, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};