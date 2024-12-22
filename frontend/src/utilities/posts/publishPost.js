import { getElementStyles } from '../posts/styleUtils.js'
import postService from '../../features/posts/postService'

export const publishPost = async (post, postElements, setPost, imageUrl) => {
  if (!post) return

  const stylesMap = new Map()
  const updatedElements = postElements.map(element => {
    const elementDom = document.getElementById(element.id)
    if (elementDom) {
      const styleObject = getElementStyles(elementDom)
      stylesMap.set(element.id, styleObject)

      const elementType = Array.from(elementDom.classList).find(cls =>
        post.elements.text && Array.isArray(post.elements.text) && post.elements.text.flatMap(item => item.classes.map(c => c.class)).includes(cls)
      ) || 'default-text'

      return {
        ...element,
        type: elementType,
        content: elementDom.innerText || element.content,
        style: { ...styleObject },
      }
    }
    return element
  })

  const updatedPost = {
    ...post,
    elements: updatedElements,
    imageUrl: imageUrl  
  }

  try {
    const data = await postService.updatePost(post._id, updatedPost)
    setPost(data)
  } catch (error) {
    console.error('Error updating post:', error)
  }
}
