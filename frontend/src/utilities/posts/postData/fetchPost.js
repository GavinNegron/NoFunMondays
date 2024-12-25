export const fetchPost = async (slug, setPost, setPostElements, setImageUrl, setNotFound) => {
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) throw new Error('Failed to fetch posts')
  
      const posts = await response.json()
      const matchedPost = posts.find(p => p.slug === slug)
  
      if (matchedPost) {
        setPost(matchedPost)
        setPostElements(matchedPost.elements || [])
        setImageUrl(matchedPost.imageUrl || '')
      } else {
        setNotFound(true)
      }
    } catch {
      setNotFound(true)
    }
  }