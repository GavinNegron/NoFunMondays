import React from 'react'
import { handleDrop, handleDragOver } from '../../dragUtils'
import { handleBlogPostElement } from './handleBlogPostElement'

export const renderElement = (element, index, postElements, setPostElements, setSelectedElement, setElementStyles, elements, handleDoubleClick, selectedElement, setDeletedElements, setPost, setImageUrl) => {
  const elementId = `${element.id}`;

  const renderContent = () => {
    switch (element.type) {
      case 'image':
        return <img src={element.imageUrl} alt={element.alt} />;
      case 'bullet':
        return (
          <div className="bullet-point">
            <ul>
              {element.listItems?.map((item, idx) => (
                <li key={`${element.id}-item-${idx}`}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case 'text':
      default:
        return <p>{element.content}</p>;
    }
  };

  return (
    <div
      id={elementId}
      data-id={elementId}
      key={elementId}
      className={`blog-post-element ${element.type === 'text' ? element.tag : element.type}`}
      style={element.style || {}}
      onDrop={(e) => handleDrop(e, elementId, postElements, setPostElements)}
      onDragOver={handleDragOver}
      onClick={(event) => handleBlogPostElement(event.currentTarget, setSelectedElement, setElementStyles, elements, setImageUrl)}
      onDoubleClick={(e) => handleDoubleClick(e, setSelectedElement, setPost, setPostElements)}
      tabIndex="0"
    >
      {renderContent()}
    </div>
  );
};