import { getElementStyles } from '../editor/styleUtils';
import { updatePost } from '../../../features/posts/postService';
import elementClassConfig from '../../../data/elements'; 
import DOMPurify from 'dompurify';

export const publishPost = async (post, postElements, setPost, imageUrl) => {
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
      let elementImageUrl = null;

      if (elementDom.classList.contains('image')) {
        elementType = 'image';
        const imgElement = elementDom.querySelector('img');
        if (imgElement) {
          elementImageUrl = imgElement.src;
        }
      } else {
        const matchedClass = Object.keys(elementClassConfig).find(key =>
          Array.isArray(elementClassConfig[key]?.classes) &&
          elementClassConfig[key].classes.some(clsObj => elementDom.classList.contains(clsObj.class))
        );

        if (matchedClass) {
          const matchedClsObj = elementClassConfig[matchedClass].classes.find(clsObj =>
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
        style: { ...styleObject },
      };

      if (elementType === 'image') {
        updatedElement.imageUrl = elementImageUrl;
      }

      if (elementType === 'bullet') {
        const liElements = Array.from(elementDom.querySelectorAll('ul li'));
        updatedElement.listItems = liElements.map(li => li.textContent);
      }

      if (elementType === 'twitter') {
        const twitterInput = elementDom.querySelector('input.twitter');
        if (twitterInput && twitterInput.value) {
          updatedElement.twitterId = twitterInput.value;
        }
      }

      return updatedElement;
    }
    return element;
  });

  const updatedPost = {
    ...post,
    imageUrl: bannerImageUrl,
    elements: updatedElements,
    status: 'published',
  };
  try {
    const data = await updatePost(post._id, updatedPost);
    setPost(data);

  } catch (error) {
    console.error('Error updating post:', error);
  }
};
