import { useState, useEffect, useRef } from 'react'

// Utilities
import { handleMouseMove, handleMouseUp, handleMouseDown } from '../../../../utilities/posts/editorFunctions'
import { handleImageChange } from '../../../../utilities/posts/styleUtils'

const EditStyles = ({ elementStyles, handleBlogPostElement, blogPostMainRef, setImageUrl, imageUrl }) => {
  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const elementRef = useRef(null)
  const fileInputRef = useRef(null)

  const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 5 MB in bytes

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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        alert('File size exceeds the 10 MB limit. Please choose a smaller file.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        handleImageChange(reader.result, setImageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="edit-styles edit-image-styles" style={{ position: 'absolute', top: `${position.y}px`, left: `${position.x}px` }}>
      <div className="edit-styles__header" style={{ cursor: isDragging ? 'grabbing' : 'move' }} onMouseDown={(e) => handleMouseDown(e, setIsDragging, setPosition)} ref={elementRef}>
        <p>Edit Image:</p>
        <i onClick={() => handleBlogPostElement(null)} className="fa-solid fa-light fa-xmark"></i>
      </div>
      <div className="edit-styles__image">
    
      <div className="edit-styles__image__preview">
        {imageUrl && (
          <>
            <p>Select Image:</p>
            <img
              src={imageUrl}
              alt="Selected preview"
              style={{ maxWidth: '100%' }}
              onClick={() => fileInputRef.current?.click()} 
            />
            <input
              ref={fileInputRef}
              type="file"
              id="imageFile"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
      </div>
    </div>
  )
}

export default EditStyles
