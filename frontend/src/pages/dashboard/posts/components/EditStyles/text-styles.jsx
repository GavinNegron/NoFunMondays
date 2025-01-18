// React
import { useState, useEffect, useRef } from 'react'
import { useEditorContext } from '../../../../../contexts/EditorContext';

// Utilities
import { handleMouseUp, handleMouseDown, handleMouseMove } from '../../../../../utilities/posts/editor/editorFunctions'
import { handleBlogPostElement } from '../../../../../utilities/posts/postElement/handleBlogPostElement';

// Elements
import Icons from '../elements/icons'
import Family from '../elements/family'
import Type from '../elements/type'
import Size from '../elements/size';
import Weight from '../elements/weight'
import Margin from '../elements/margin';

const EditStyles = () => {
  const {
    elementId, 
    elementStyles, 
    blogPostMainRef, 
    selectedElement,
    style,
    setStyle,
  } = useEditorContext()

  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef.current) {
      const computedStyle = window.getComputedStyle(elementRef.current)
      setStyle(prevStyle => ({
        ...prevStyle,
        fontSize: parseInt(computedStyle.fontSize, 10) || 18,
      }))
    }
  }, [elementId, setStyle])

  useEffect(() => {
    if (elementStyles?.color !== style.color) setStyle(prevStyle => ({ ...prevStyle, color: elementStyles?.color || '#000000' }))
  }, [elementId, elementStyles?.color, style.color, setStyle])

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
    if (selectedElement) {
      const computedStyle = window.getComputedStyle(selectedElement)
  
      setStyle(prevStyle => ({
        ...prevStyle,
        color: computedStyle.color || '#000000',
        fontSize: parseInt(computedStyle.fontSize, 10) || 18,
        fontFamily: computedStyle.fontFamily || '',
        fontWeight: computedStyle.fontWeight || 'normal',
        marginTop: parseInt(computedStyle.marginTop, 10) || 0,
        marginLeft: parseInt(computedStyle.marginLeft, 10) || 0,
        marginBottom: parseInt(computedStyle.marginBottom, 10) || 0,
        marginRight: parseInt(computedStyle.marginRight, 10) || 0,
      }))
    }
  }, [selectedElement, elementId, setStyle])

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

  return (
    <div className="edit-styles edit-text-styles" style={{ position: 'fixed', top: `${position.y}px`, left: `${position.x}px` }}>
      <div className="edit-styles__header" style={{ cursor: isDragging ? 'grabbing' : 'move' }} onMouseDown={(e) => handleMouseDown(e, setIsDragging, setPosition)} ref={elementRef}>
        <p>Edit Text:</p>
        <i onClick={() => handleBlogPostElement(null)} className="fa-solid fa-light fa-xmark"></i>
      </div>
      <Icons/>
      <div className="edit-styles__container">
        <Family/>
        <Type/>
        <Size/>
        <Weight/>
        <Margin/>
      </div>
    </div>
  )
}

export default EditStyles