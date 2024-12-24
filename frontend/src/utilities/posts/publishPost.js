import { getElementStyles } from '../posts/styleUtils.js'
import postService from '../../features/posts/postService'
import elementClassConfig from '../../data/elements' // The JSON file with class configurations

export const publishPost = async (post, postElements, setPost, navigate, imageUrl) => {
  if (!post) return;

  const stylesMap = new Map();
  let bannerImageUrl = imageUrl || null;

  const bannerImage = document.querySelector('.banner img');
  if (bannerImage) {
    bannerImageUrl = bannerImage.src;
  }

  const updatedElements = postElements.map(element => {
    const elementDom = document.getElementById(element.id);
    if (elementDom) {
      const styleObject = getElementStyles(elementDom);
      stylesMap.set(element.id, styleObject);

      let elementType;
      let imageUrl = null;

      // Check for image class
      if (elementDom.classList.contains('image')) {
        elementType = 'image';

        const imgElement = elementDom.querySelector('img');
        if (imgElement) {
          imageUrl = imgElement.src;
        }
      } else {
        // Find the specific class in the JSON configuration
        const matchedClass = Object.keys(elementClassConfig).find(key =>
          Array.isArray(elementClassConfig[key]?.classes) &&
          elementClassConfig[key].classes.some(clsObj => elementDom.classList.contains(clsObj.class))
        );

        // If a match is found, we return the class name, not the category key
        if (matchedClass) {
          const matchedClsObj = elementClassConfig[matchedClass].classes.find(clsObj =>
            elementDom.classList.contains(clsObj.class)
          );
          elementType = matchedClsObj ? matchedClsObj.class : 'default-text';
        } else {
          elementType = 'default-text';
        }
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
