import React from 'react'

export const renderBlogElements = (element, index, postElements, setPostElements, setSelectedElement, setElementStyles, elements, handleDoubleClick, selectedElement, setDeletedElements, setPost, setImageUrl) => {
  const elementId = `${element.id}`

  return (
    <div
      id={elementId}
      key={elementId}
      className={`blog-post-element ${element.type === 'text' ? element.tag : element.type}`}
      style={element.style || {}}
    >
      {element.type === 'image' ? (
        <img 
          src={element.imageUrl} 
          alt={element.alt}
          style={{ width: '100%' }}  
        />
      ) : (
        <p>{element.content}</p>
      )}
    </div>
  )
}
