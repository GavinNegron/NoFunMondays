import React from 'react'
import { handleDrop, handleDragOver } from '../dragUtils'
import { handleBlogPostElement } from '../posts/handleBlogPostElement'

export const renderElement = (element, index, postElements, setPostElements, setSelectedElement, setElementStyles, elements, handleDoubleClick, selectedElement, setDeletedElements, setPost, setImageUrl) => {
  const elementId = `${element.id}`

  return (
    <div
      id={elementId}
      key={elementId}
      className={`blog-post-element ${element.type === 'text' ? element.tag : element.type}`}
      style={element.style || {}} 
      onDrop={(e) => handleDrop(e, elementId, postElements, setPostElements)}
      onDragOver={handleDragOver}
      onClick={(event) => handleBlogPostElement(event.currentTarget, setSelectedElement, setElementStyles, elements, setImageUrl)}
      onDoubleClick={(e) => handleDoubleClick(e, selectedElement, setPostElements, setDeletedElements, setSelectedElement, setPost, setImageUrl)}
      tabIndex="0"
    >
      {element.type === 'image' ? (
        <img src={element.imageUrl} alt={element.alt} />
      ) : (
        <p>{element.content}</p>
      )}
    </div>
  )
}