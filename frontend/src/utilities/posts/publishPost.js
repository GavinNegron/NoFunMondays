import { getElementStyles } from '../posts/styleUtils.js'
import postService from '../../features/posts/postService'

export const publishPost = async (post, postElements, setPost, navigate, imageUrl) => {
  if (!post) return;

  const stylesMap = new Map();
  let bannerImageUrl = imageUrl || null;  // Use the passed imageUrl or fallback to null

  const bannerImage = document.querySelector('.banner img');
  if (bannerImage) {
    bannerImageUrl = bannerImage.src;
  }

  const updatedElements = postElements.map(element => {
    const elementDom = document.getElementById(element.id);
    if (elementDom) {
      const styleObject = getElementStyles(elementDom);
      stylesMap.set(element.id, styleObject);

      let elementType = 'default-text';
      let imageUrl = null;

      if (elementDom.classList.contains('image')) {
        elementType = 'image';

        const imgElement = elementDom.querySelector('img');

        if (imgElement) {
          imageUrl = imgElement.src;
        }
      } else {
        elementType = Object.keys(post.elements).find(key =>
          Array.isArray(post.elements[key]?.classes) &&
          post.elements[key].classes.some(clsObj => elementDom.classList.contains(clsObj.class))
        ) || 'default-text';
      }

      const content = elementType === 'image' ? 'image' : (elementDom.innerText || element.content);

      return {
        ...element,
        type: elementType,
        content,
        imageUrl,
        style: { ...styleObject },
      };
    }
    return element;
  });

  const updatedPost = {
    ...post,
    imageUrl: bannerImageUrl,
    elements: updatedElements,
  };

  try {
    const data = await postService.updatePost(post._id, updatedPost);
    setPost(data);

    if (navigate) {
      navigate(`/dashboard/posts/edit/${data.slug}`);
    }
  } catch (error) {
    console.error('Error updating post:', error);
  }
};
