import React from 'react'
import { handleDrop, handleDragOver } from '../../dragUtils'
import { handleBlogPostElement } from './handleBlogPostElement'
import { useEditorContext } from '../../../contexts/EditorContext'
import { handleDoubleClick } from '../editor/editorFunctions'

const RenderElement = ({ element }) => {
  const {
    postElements,
    setPostElements,
    setSelectedElement,
    setElementStyles,
    elements,
    setPost,
    setImageUrl
  } = useEditorContext()

  if (!element) return null; 

  const elementId = `${element.id}`

  const renderContent = () => {
    switch (element.type) {
      case 'image':
        return <img src={element.imageUrl} alt={element.alt} />
      case 'bullet':
        return (
          <div className="bullet-point">
            <ul>
              {(element.listItems && element.listItems.length > 0)
                ? element.listItems.map((item, idx) => (
                    <li key={`${element.id}-item-${idx}`}>{item}</li>
                  ))
                : <li>List Item 1</li>
              }
            </ul>
          </div>
        )
      case 'text':
      default:
        return <p>{element.content}</p>
    }
  }

  return (
    <div
      id={elementId}
      data-id={elementId}
      key={elementId}
      className={`blog-post-element ${element.type === 'text' ? element.tag : element.type}`}
      style={element.style || {}}
      onDrop={(e) => handleDrop(e, postElements, setPostElements)}
      onDragOver={handleDragOver}
      onClick={(event) => handleBlogPostElement(event.currentTarget, setSelectedElement, setElementStyles, elements, setImageUrl)}
      onDoubleClick={(e) => handleDoubleClick(e, setSelectedElement, setPost, setPostElements)}
      tabIndex="0"
    >
      {renderContent()}
    </div>
  )
}

export default RenderElement
