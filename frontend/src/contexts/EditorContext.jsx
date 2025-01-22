import React, { createContext, useState, useRef, useCallback, useContext } from 'react'

const EditorContext = createContext()

export const EditorProvider = ({ children }) => {
  const [post, setPost] = useState(null)
  const [postElements, setPostElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [elementStyles, setElementStyles] = useState({ color: '', margin: '', fontFamily: '' })
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [style, setStyle] = useState({
    color: elementStyles.color || '#000000',
    fontSize: elementStyles.fontSize || 18,
    fontFamily: elementStyles.fontFamily || '',
    fontWeight: elementStyles.fontWeight || 'normal',
    currentType: elementStyles.class || 'default-text',
    marginTop: elementStyles.marginTop || 0,
    marginLeft: elementStyles.marginLeft || 0,
    marginBottom: elementStyles.marginBottom || 0,
    marginRight: elementStyles.marginRight || 0,
  })
  const [showColorPicker, setShowColorPicker] = useState(false)

  const blogPostMainRef = useRef(null)
  const fileInputRef = useRef(null)

  const toggleColorPicker = () => setShowColorPicker(prev => !prev)

  const handleStyleChange = useCallback(
    (property, value) => {
      if (selectedElement) {
        setPostElements(prev =>
          prev.map(element =>
            element.id === selectedElement.id
              ? { ...element, style: { ...element.style, [property]: value } }
              : element
          )
        )
      }
    },
    [selectedElement]
  )

  const handleFileChange = (e, isNewPost = false) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Image = reader.result
      setImage(base64Image)

      if (isNewPost) {
        setImageUrl(base64Image)
        setPreviewImage(base64Image)
      } else if (selectedElement) {
        if (selectedElement.classList.contains('banner')) {
          setImageUrl(base64Image)
        } else if (selectedElement.classList.contains('image')) {
          const imgElement = selectedElement.querySelector('img')
          if (imgElement) imgElement.src = base64Image
        }
        setPreviewImage(base64Image)
      }
    }
    reader.readAsDataURL(file)
  }

  const renderImageSelector = (isNewPost = false) => {
    const previewSrc =
      previewImage ||
      (isNewPost
        ? '/img/placeholder.png'
        : selectedElement?.classList.contains('banner')
        ? imageUrl
        : selectedElement?.querySelector('img')?.src) ||
      '/img/placeholder.png'

    return (
      <>
        {!isNewPost && <p>Select Image:</p>}
        <img
          src={previewSrc}
          alt="Selected preview"
          style={{ maxWidth: '100%' }}
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          onChange={e => handleFileChange(e, isNewPost)}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </>
    )
  }

  return (
    <EditorContext.Provider
      value={{
        post,
        setPost,
        postElements,
        setPostElements,
        selectedElement,
        setSelectedElement,
        elementStyles,
        setElementStyles,
        image,
        setImage,
        imageUrl,
        setImageUrl,
        style,
        setStyle,
        previewImage,
        setPreviewImage,
        blogPostMainRef,
        handleStyleChange,
        showColorPicker,
        setShowColorPicker,
        toggleColorPicker,
        renderImageSelector,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useEditorContext = () => useContext(EditorContext)
