const updatePost = async (postId, updatedPost) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
  
    if (!response.ok) {
      const errorDetails = await response.text()
      console.error('Failed to update post. Server response:', response.status, errorDetails)
      throw new Error('Failed to update post')
    }
  
    const result = await response.json()
    return result
}

export default updatePost;