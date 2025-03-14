import axios from 'axios';
import { getElementStyles } from '@/utilities/editorFunctions';
import elements from '@/data/elements';
import DOMPurify from 'dompurify';
import { getAuthToken } from '@/utilities/getAuthToken';
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 80)  
}

export const createPost = async (newPost) => {
  const token = getAuthToken();

  const response = await axios.post(`/api/posts`, newPost, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const deletePost = async (postIds) => {
  const token = getAuthToken();

  const ids = Array.isArray(postIds) ? postIds : [postIds];
  const response = await axios.delete(`/api/posts`, { 
    data: { ids },
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true
  });
  return response.data;
};

export const fetchRecentPosts = async (postLimit, type = 'all') => {
  try {
    const response = await axios.get(`/api/posts/recent?limit=${postLimit}&type=${type}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Recent post not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch recent post');
  }
};

export const fetchPosts = async (limit, excludeFeatured = false) => {
  const token = getAuthToken();

  const response = await axios.get(`/api/posts/`, {
    params: { limit, excludeFeatured },
    headers: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true,
  });
  return response.data;
};

export const fetchSlug = async (slug) => {
  const token = getAuthToken();

  const response = await axios.get(`/api/posts/edit/slug/${slug}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true,
  });
  return response.data;
};

export const fetchTitle = async (title) => {
  const response = await axios.get(`/api/posts/title`, {
    params: { title },
  });
  return response.data.available;
};

export const updatePost = async (postId, updatedPost) => {
  const token = getAuthToken();

  const response = await axios.put(`/api/posts/${postId}`, updatedPost, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const getSignedUrl = async (fileName, fileType) => {
  const token = getAuthToken();

  const response = await axios.get(`/api/upload/signed-url?fileName=${fileName}&fileType=${fileType}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const uploadToCloud = async (base64Image) => {
  const token = getAuthToken();
  
  if (!base64Image.startsWith('data:image')) return base64Image;

  const byteString = atob(base64Image.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

  const { signedUrl, publicUrl } = await getSignedUrl(fileName, blob.type);

 await axios.put(signedUrl, blob, {
    headers: {
      'Content-Type': blob.type,
      'Authorization': `Bearer ${token}`,
    },
  });

  return publicUrl;
};

export const fetchPostViews = async (slug, days) => {
  const token = getAuthToken();

  const query = new URLSearchParams();
  if (slug) query.append('slug', slug);
  if (days) query.append('days', days);

  const response = await axios.get(`/api/posts/analytics/views?${query.toString()}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const savePost = async (post, postElements, isFeatured, isChallenge) => {
  const token = getAuthToken();

  let imageUrl = document.querySelector('.banner img')?.src;
  imageUrl = await uploadToCloud(imageUrl);

  const stylesMap = new Map();

  const updatedElements = await Promise.all(
    postElements.map(async (element) => {
      const elementDom = document.getElementById(element.id);
      if (elementDom) {
        stylesMap.set(element.id, getElementStyles(elementDom));

        let elementType;
        let elementImageUrl;
        let elementImageAlt;

        if (elementDom.classList.contains('image')) {
          elementType = 'image';
          elementImageUrl = elementDom.querySelector('img').src;
          elementImageAlt = elementDom.querySelector('img').alt;
          elementImageUrl = await uploadToCloud(elementImageUrl);
        } else {
          const matchedClass = Object.keys(elements).find((key) =>
            Array.isArray(elements[key]?.classes) &&
            elements[key].classes.some((clsObj) => elementDom.classList.contains(clsObj.class))
          );

          if (matchedClass) {
            const matchedClsObj = elements[matchedClass].classes.find((clsObj) =>
              elementDom.classList.contains(clsObj.class)
            );
            elementType = matchedClsObj ? matchedClsObj.class : 'default-text';
          } else {
            elementType = 'default-text';
          }
        }

        let content = elementDom.innerHTML || element.content;
        content = DOMPurify.sanitize(content, { ALLOWED_TAGS: ['a', 'i', 'b', 'u'], ALLOWED_ATTR: ['href', 'target', 'class'] });

        const updatedElement = {
          ...element,
          type: elementType,
          content: elementType === 'bullet' ? null : content,
          style: { ...getElementStyles(elementDom) },
        };

        switch (elementType) {
          case 'image': {
            updatedElement.imageUrl = elementImageUrl;
            updatedElement.imageAlt = elementImageAlt;
            break;
          }

          case 'bullet': {
            const liElements = Array.from(elementDom.querySelectorAll('ul li'));
            updatedElement.listItems = liElements.map((li) => li.textContent);
            break;
          }

          case 'twitter': {
            const tweetDiv = elementDom.querySelector('[data-tweetid]');
            if (tweetDiv) {
              updatedElement.twitterId = tweetDiv.getAttribute('data-tweetid');
            }
            break;
          }
          case 'video': {
            const videoDiv = elementDom.querySelector('[data-videoid]');
            if (videoDiv) {
              updatedElement.videoId = videoDiv.getAttribute('data-videoid');
            }
            break;
          }
        }
        return updatedElement;
      }
      return element;
    })
  );

  const title = document.getElementsByClassName('blog-post-main__title')[0]?.textContent.trim();
  const description = document.querySelector('.editor-sidebar__post-details__input textarea').value;
  const updatedPost = {
    ...post,
    title,
    imageUrl,
    status: 'draft',
    description,
    challenge: isChallenge,
    featured: isFeatured,
    elements: updatedElements,
  };

  const response = await axios.put(`/api/posts/save/${post._id}`, updatedPost, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};

export const publishPost = async (post, postElements, isFeatured, isChallenge) => {
  const token = getAuthToken();

  const imageUrl = document.querySelector('.banner img').src;
  const stylesMap = new Map();

  const updatedElements = postElements.map(element => {
  const elementDom = document.getElementById(element.id);
    if (elementDom) {
      stylesMap.set(element.id, getElementStyles(elementDom));

      let elementType;
      let elementImageUrl;
      let elementImageAlt;

      if (elementDom.classList.contains('image')) {
        elementType = 'image';
        elementImageUrl = elementDom.querySelector('img').src;
        elementImageAlt = elementDom.querySelector('img').alt;
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

      let content = elementDom.innerHTML || element.content;
      content = DOMPurify.sanitize(content, { ALLOWED_TAGS: ['a', 'i', 'b', 'u'], ALLOWED_ATTR: ['href', 'target', 'class'] });

      const updatedElement = {
        ...element,
        type: elementType,
        content: elementType === 'bullet' ? null : content,
        style: { ...getElementStyles(elementDom) },
      };

      switch (elementType) {
        case 'image': {
          updatedElement.imageUrl = elementImageUrl;
          updatedElement.imageAlt = elementImageAlt;
          break;
        }
      
        case 'bullet': {
          const liElements = Array.from(elementDom.querySelectorAll('ul li'));
          updatedElement.listItems = liElements.map(li => li.textContent);
          break;
        }
      
        case 'twitter': {
          const tweetDiv = elementDom.querySelector('[data-tweetid]'); 
          if (tweetDiv) {
            updatedElement.twitterId = tweetDiv.getAttribute('data-tweetid');
          }
          break;
        }
        case 'video': {
          const videoDiv = elementDom.querySelector('[data-videoid]');
          if (videoDiv) {
            updatedElement.videoId = videoDiv.getAttribute('data-videoid');
          }
          break;
        }
      }
      
      return updatedElement;
    }
    return element;
  });

  const title = document.getElementsByClassName('blog-post-main__title')[0]?.textContent.trim();
  const slug = generateSlug(title);
  const description = document.querySelector('.editor-sidebar__post-details__input textarea').value;

  const updatedPost = {
    ...post,
    title,
    slug, 
    challenge: isChallenge,
    featured: isFeatured,
    description,
    status: 'published',
    imageUrl,
    elements: updatedElements,
  };

  const response = await axios.put(`/api/posts/${post._id}`, updatedPost, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });

  axios.put(`/api/posts/save/${post._id}`, updatedPost, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });


  window.location.href = `/dashboard/posts/edit/${slug}`
  return response.data;
};