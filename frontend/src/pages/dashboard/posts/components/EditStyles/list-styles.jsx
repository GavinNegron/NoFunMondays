// React
import { useState, useEffect, useRef } from 'react'
import { useEditorContext } from '../../../../../contexts/EditorContext'

// Utilities
import { handleMouseMove, handleMouseUp, handleMouseDown } from '../../../../../utilities/posts/editor/editorFunctions'
import { handleBlogPostElement } from '../../../../../utilities/posts/postElement/handleBlogPostElement'

// Elements
import Family from '../elements/family'
import Size from '../elements/size'
import Weight from '../elements/weight'
import Margin from '../elements/margin'
import Icons from '../elements/icons'

const EditStyles = () => {
  const {
     blogPostMainRef,
     selectedElement,
     setInputValues,
  } = useEditorContext();
  
  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const updatePosition = () => {
      if (blogPostMainRef.current) {
        const rect = blogPostMainRef.current.getBoundingClientRect()
        const xPos = rect.left
        setPosition(prev => ({ ...prev, x: xPos - 275 }))
      }
    }

    const onWindowLoad = () => {
      setTimeout(updatePosition, 100)
    }

    if (window.document.readyState === 'complete') onWindowLoad()
    else window.addEventListener('load', onWindowLoad)

    return () => window.removeEventListener('load', onWindowLoad)
  }, [blogPostMainRef])

  useEffect(() => {
    if (isDragging) {
      const mouseMoveHandler = handleMouseMove(isDragging, position, setPosition, elementRef)
      const mouseUpHandler = () => handleMouseUp(setIsDragging)

      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)

      return () => {
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
      }
    }
  }, [isDragging, position, setIsDragging])

  useEffect(() => {
    if (selectedElement) {
      const liElements = selectedElement.querySelectorAll('ul li')
      liElements.forEach((li, index) => {
      })
      const initialValues = Array.from(liElements).map(li => ({ textContent: li.textContent }))
      setInputValues(initialValues)
    }
  }, [selectedElement, setInputValues])

  const closeEditor = () => handleBlogPostElement(null)

  return (
      <div className="edit-styles edit-list-styles" style={{ position: 'fixed', top: `${position.y}px`, left: `${position.x}px` }}>
        <div
          className="edit-styles__header"
          style={{ cursor: isDragging ? 'grabbing' : 'move' }}
          onMouseDown={(e) => handleMouseDown(e, setIsDragging, setPosition)}
          ref={elementRef}
        >
          <p>Edit List:</p>
          <i onClick={closeEditor} className="fa-solid fa-light fa-xmark"></i>
        </div>
        <Icons/>
        <div className="edit-styles__container">
          <Family/>
          <Size/>
          <Weight/>
          <Margin/>
        </div>
      </div>
  )
}

export default EditStyles