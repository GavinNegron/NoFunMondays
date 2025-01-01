const createPost = async (updatedPost) => {
    const response = await fetch(`/api/posts/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
  
    if (!response.ok) {
      const errorDetails = await response.text()
      console.error('Failed to publish post. Server response:', response.status, errorDetails)
      throw new Error('Failed to publish post')
    }
  
    const result = await response.json()
    return result
}

export default createPost;