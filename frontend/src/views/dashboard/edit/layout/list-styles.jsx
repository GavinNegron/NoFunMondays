import { useState, useEffect, useRef } from 'react'
import { handleMouseMove, handleMouseUp, handleMouseDown } from '../../../../utilities/posts/editor/editorFunctions'

const EditStyles = ({ handleBlogPostElement, blogPostMainRef, selectedElement, setSelectedElement }) => {
  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [inputValues, setInputValues] = useState([]);
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
        console.log(`Item ${index + 1}:`, li.textContent)
      })
      const initialValues = Array.from(liElements).map(li => ({ textContent: li.textContent }));
      setInputValues(initialValues);
    }
  }, [selectedElement])

  const handleInputChange = (index, newValue) => {
    const updatedItems = [...inputValues];
    updatedItems[index].textContent = newValue;
    setInputValues(updatedItems);

    if (selectedElement) {
      const liElements = selectedElement.querySelectorAll('ul li');
      const updatedLi = liElements[index];
      if (updatedLi) {
        updatedLi.textContent = newValue;
      }
    }

    setSelectedElement(selectedElement);
  }

  const closeEditor = () => handleBlogPostElement(null)

  return (
    <div
      className="edit-styles edit-list-styles"
      style={{ position: 'fixed', top: `${position.y}px`, left: `${position.x}px` }}
    >
      <div
        className="edit-styles__header"
        style={{ cursor: isDragging ? 'grabbing' : 'move' }}
        onMouseDown={(e) => handleMouseDown(e, setIsDragging, setPosition)}
        ref={elementRef}
      >
        <p>Edit List:</p>
        <i onClick={closeEditor} className="fa-solid fa-light fa-xmark"></i>
      </div>
      <div className="edit-styles__item">
        <div className="edit-styles__item-list">
          <div className="edit-styles__item-list__header">
            <span>List Items: </span>
          </div>
          {selectedElement ? 
              Array.from(selectedElement.querySelectorAll('ul li')).map((li, index) => (
                <input 
                  type='text' 
                  key={index} 
                  value={inputValues[index] ? inputValues[index].textContent : ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              )) 
              : null
            }
        </div>
      </div>
    </div>
  )
}

export default EditStyles
