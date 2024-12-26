import React, { createContext, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [deletedElements, setDeletedElements] = useState([]);
  const navigate = useNavigate();

  const blogPostMainRef = useRef(null);

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

  return (
    <EditorContext.Provider
      value={{
        post,
        setPost,
        loadingState,
        setLoadingState,
        notFound,
        setNotFound,
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
        navigate,
        handleStyleChange, 
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return React.useContext(EditorContext);
};
