import React, { createContext, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [postElements, setPostElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [elementStyles, setElementStyles] = useState({ color: '', margin: '', fontFamily: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [deletedElements, setDeletedElements] = useState([]);
  const [inputValues, setInputValues] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const [style, setStyle] = useState({
    color: elementStyles?.color || '#000000',
    fontSize: elementStyles?.fontSize || 18,
    fontFamily: elementStyles?.fontFamily || '',
    fontWeight: elementStyles?.fontWeight || 'normal',
    currentType: elementStyles?.class || 'default-text',
    marginTop: elementStyles?.marginTop || 0,
    marginLeft: elementStyles?.marginLeft || 0,
    marginBottom: elementStyles?.marginBottom || 0,
    marginRight: elementStyles?.marginRight || 0,
  })
  const [showColorPicker, setShowColorPicker] = useState(false)
  
  const blogPostMainRef = useRef(null);
  const colorPickerRef = useRef(null)
  const fileInputRef = useRef(null)

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker)
  }
  const router = useRouter();

  const handleStyleChange = useCallback((property, value) => {
    if (selectedElement) {
      setPostElements(prevPostElements =>
        prevPostElements.map(element =>
          element.id === selectedElement.id
            ? { ...element, style: { ...element.style, [property]: value } }
            : element
        )
      );
    }
  }, [selectedElement, setPostElements]);
  
  const handleFileChange = (e, isNewPost = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setImage(base64Image);

        if (isNewPost) {
          setImageUrl(base64Image);
          setPreviewImage(base64Image);
        } else if (selectedElement) {
          if (selectedElement.classList.contains('banner')) {
            setImageUrl(base64Image);
          } else if (selectedElement.classList.contains('image')) {
            const imgElement = selectedElement.querySelector('img');
            if (imgElement) imgElement.src = base64Image;
          }
          setPreviewImage(base64Image);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const renderImageSelector = (isNewPost = false) => {
    const previewSrc =
      previewImage ||
      (isNewPost
        ? '/img/placeholder.png'
        : selectedElement?.classList.contains('banner')
        ? imageUrl
        : selectedElement?.querySelector('img')?.src) ||
      '/img/placeholder.png';
  
    return (
      <>
        {!isNewPost && <p>Select Image:</p>}
        <Image
          width={'100'} height={'100'}
          src={previewSrc}
          alt="Selected preview"
          style={{ maxWidth: '100%' }}
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          id="imageFile"
          onChange={(e) => handleFileChange(e, isNewPost)}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </>
    );
  };
  
  

  return (
    <EditorContext.Provider
      value={{
        post,
        setPost,
        loadingState,
        setLoadingState,
        notFound,
        setNotFound,
        setTitle, 
        title,
        setImage, 
        image,
        postElements,
        setPostElements,
        selectedElement,
        setSelectedElement,
        elementStyles,
        setElementStyles,
        errorMessage,
        setErrorMessage,
        imageUrl,
        setImageUrl,
        deletedElements,
        setDeletedElements,
        blogPostMainRef,
        router,
        handleStyleChange, 
        inputValues,
        setInputValues,
        style,
        setStyle,
        toggleColorPicker,
        showColorPicker,
        setShowColorPicker,
        colorPickerRef,
        renderImageSelector,
        previewImage,
        setPreviewImage
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return React.useContext(EditorContext);
};