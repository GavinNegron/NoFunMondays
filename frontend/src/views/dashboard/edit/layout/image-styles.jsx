import { useState, useEffect, useRef } from 'react'
import { handleMouseMove, handleMouseUp, handleMouseDown } from '../../../../utilities/posts/editorFunctions'

const EditStyles = ({ handleBlogPostElement, blogPostMainRef, setImageUrl, imageUrl, selectedElement }) => {
  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [previewImage, setPreviewImage] = useState('') // State to store preview image
  const elementRef = useRef(null)
  const fileInputRef = useRef(null)

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
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64Image = reader.result

        if (selectedElement?.classList.contains('banner')) {
          setImageUrl(base64Image)
          setPreviewImage(base64Image) // Update preview image for banner
        } else if (selectedElement?.classList.contains('image')) {
          const imgElement = selectedElement.querySelector('img')
          imgElement.src = base64Image
          setPreviewImage(base64Image) // Update preview image for selected element
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const closeEditor = () => handleBlogPostElement(null)

  // Whenever selectedElement changes, reset the preview image based on its current image
  useEffect(() => {
    if (selectedElement) {
      if (selectedElement.classList.contains('banner') && imageUrl) {
        setPreviewImage(imageUrl) // Set preview image for the banner
      } else if (selectedElement.classList.contains('image')) {
        const imgElement = selectedElement.querySelector('img')
        if (imgElement) {
          setPreviewImage(imgElement.src) // Set preview image for the image element
        }
      }
    }
  }, [selectedElement, imageUrl])

  const renderImageSelector = () => (
    <>
      <p>Select Image:</p>
      <img
        src={previewImage || (selectedElement?.classList.contains('banner') ? imageUrl : selectedElement?.querySelector('img')?.src) || ''}
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
  )

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
      <div className="edit-styles__image">
        <div className="edit-styles__image__preview">
          {(selectedElement?.classList.contains('image') || (selectedElement?.classList.contains('banner') && imageUrl)) && renderImageSelector()}
        </div>
      </div>
    </div>
  )
}

export default EditStyles
