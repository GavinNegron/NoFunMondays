import { useState, useEffect, useRef } from 'react'
import { handleMouseMove, handleMouseUp, handleMouseDown } from '../../../../../utilities/posts/editor/editorFunctions'
import { useEditorContext } from '../../../../../contexts/EditorContext'
import { handleBlogPostElement } from '../../../../../utilities/posts/postElement/handleBlogPostElement'

// Elements
import Image from './elements/image'
import Margin from './elements/margin'

const EditStyles = () => {
  const {
     blogPostMainRef,
     imageUrl,
     selectedElement,
     setPreviewImage
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

  const closeEditor = () => handleBlogPostElement(null)

  useEffect(() => {
    if (selectedElement) {
      if (selectedElement.classList.contains('banner') && imageUrl) {
        setPreviewImage(imageUrl)
      } else if (selectedElement.classList.contains('image')) {
        const imgElement = selectedElement.querySelector('img')
        if (imgElement) {
          setPreviewImage(imgElement.src) 
        }
      }
    }
  }, [selectedElement, imageUrl])

  return (
    <div
      className="edit-styles edit-image-styles"
      style={{ position: 'fixed', top: `${position.y}px`, left: `${position.x}px` }}
    >
      <div
        className="edit-styles__header"
        style={{ cursor: isDragging ? 'grabbing' : 'move' }}
        onMouseDown={(e) => handleMouseDown(e, setIsDragging, setPosition)}
        ref={elementRef}
      >
        <p>Edit Image:</p>
        <i onClick={closeEditor} className="fa-solid fa-light fa-xmark"></i>
      </div>
      <Image/>
      <Margin/>
    </div>
  )
}

export default EditStyles