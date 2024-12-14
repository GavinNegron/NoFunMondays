import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import $ from 'jquery'
import DOMPurify from 'dompurify'

import LoadingScreen from '../../templates/base/loading'
import NotFound from '../../404/404'
import Navbar from '../../layout/navbar'
import EditorNavbar from './layout/nav1'
import EditorSidebar from './layout/sidebar'
import TextStyles from './layout/text-styles'
import ImageStyles from './layout/image-styles'

import { handleDragStart, handleDrop, handleDragOver } from '../../../utilities/dragUtils'
import loading from '../../../utilities/loading'

import elements from '../../../data/elements.json'

function BlogPostEditor() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loadingState, setLoadingState] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [postElements, setPostElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [elementStyles, setElementStyles] = useState({ color: '', margin: '', fontFamily: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [deletedElements, setDeletedElements] = useState([])

  const blogPostMainRef = useRef(null)

  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/edit-post.css']), new Promise(resolve => setTimeout(resolve, 500))])

      try {
        const response = await fetch('/api/posts')
        if (!response.ok) throw new Error('Failed to fetch posts')

        const posts = await response.json()
        const matchedPost = posts.find(p => p.slug === slug)

        if (matchedPost) {
          setPost(matchedPost)
          setPostElements(matchedPost.elements || [])
        } else {
          setNotFound(true)
        }
      } catch (error) {
        setNotFound(true)
      } finally {
        setLoadingState(false)
      }
    }
    handleLoading()
  }, [slug])

  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const updatePostElements = async () => {
    if (post) {
      const updatedPost = {
        ...post,
        elements: postElements.map(element => ({
          ...element,
          style: element.style || {},
        })),
      }

      try {
        const response = await fetch(`/api/posts/${post._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPost),
        })
        if (!response.ok) throw new Error('Failed to update post')

        const data = await response.json()
        setPost(data)
        setErrorMessage('')
        console.log('Post updated successfully:', data)
      } catch (error) {
        setErrorMessage('Error updating post. Please try again.')
        console.error('Error updating post:', error)
      }
    }
  }

  const debouncedUpdatePostElements = debounce(() => {
    console.log('Calling debounced update')
    updatePostElements()
  }, 500)

  const publishPost = async () => {
    if (post) {
      let updatedCustomCss = ''
      const stylesMap = new Map()

      const updatedElements = postElements.map((element) => {
        const elementDom = document.getElementById(element.id)

        if (elementDom) {
          const computedStyles = window.getComputedStyle(elementDom)
          const styleObject = {
            color: computedStyles.color,
            margin: computedStyles.margin,
            fontFamily: computedStyles.fontFamily,
            fontSize: computedStyles.fontSize,
            fontWeight: computedStyles.fontWeight,
            fontStyle: computedStyles.fontStyle,
            textDecoration: computedStyles.textDecoration,
            textAlign: computedStyles.textAlign
          }

          stylesMap.set(element.id, styleObject)

          return {
            ...element,
            style: { ...styleObject },
          }
        }

        return element
      })

      stylesMap.forEach((style, id) => {
        const cssClass = `#${id}`
        const cssRules = `
          ${cssClass} {
            color: ${style.color};
            margin: ${style.margin};
            font-family: ${style.fontFamily};
            font-size: ${style.fontSize};
            font-weight: ${style.fontWeight};
            font-style: ${style.fontStyle};
            text-decoration: ${style.textDecoration};
            text-align: ${style.textAlign};
          }
        `
        updatedCustomCss += cssRules
      })

      const updatedPost = {
        ...post,
        elements: updatedElements,
        customCss: updatedCustomCss,
      }

      try {
        const response = await fetch(`/api/posts/${post._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPost),
        })

        if (!response.ok) throw new Error('Failed to update post')

        const data = await response.json()

        for (const deletedElement of deletedElements) {
          await fetch(`/api/posts/${post._id}/elements/${deletedElement.id}`, {
            method: 'DELETE',
          })
        }

        setPost(data)
        setDeletedElements([])
        console.log('Post updated successfully:', data)
      } catch (error) {
        console.error('Error updating post:', error)
      }
    }
  }

  const handleStyleChange = (property, value) => {
    if (selectedElement) {
      selectedElement.style[property] = value
      setElementStyles(prevStyles => ({ ...prevStyles, [property]: value }))

      setPostElements(prevPostElements => {
        return prevPostElements.map((element) =>
          element.id === selectedElement.id
            ? { ...element, style: { ...element.style, [property]: value } }
            : element
        )
      })
    }
  }

  const handleKeyDown = (event) => {
    console.log('Key pressed:', event.key)
    console.log('Selected Element:', selectedElement)
  
    if ((event.key === 'Delete' || event.key === 'Backspace') && selectedElement) {
      console.log('Deleting element:', selectedElement)
      setPostElements((prevPostElements) =>
        prevPostElements.filter((element) => element.id !== selectedElement.id)
      )
  
      setDeletedElements((prevDeleted) => [...prevDeleted, selectedElement])
      setSelectedElement(null)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedElement])

  const handleBlogPostElement = (elementDiv, element) => {
    console.log('Element clicked:', element)
  
    if (!element) {
      console.error('Element is undefined or null')
      return
    }
  
    setSelectedElement(element)
  
    console.log('Selected Element:', element)
    console.log('Current element styles:', element.style)
  
    setElementStyles({
      color: element.style?.color || '',
      margin: element.style?.margin || '',
      fontFamily: element.style?.fontFamily || '',
    })
  
    if (!element) {
      $('.edit-text-styles, .edit-image-styles').stop(true, true).fadeOut()
      return
    }
  
    const textClasses = elements.text[0]?.classes.map(item => item.class) || []
    const imageClasses = elements.image[0]?.classes || []
  
    if (element.classList && textClasses.some(cls => element.classList.contains(cls))) {
      if ($('.edit-text-styles').is(':visible')) return
      $('.edit-image-styles').stop(true, true).fadeOut()
      $('.edit-text-styles').css('display', 'flex').hide().stop(true, true).fadeIn()
    }
  
    if (element.classList && imageClasses.some(cls => element.classList.contains(cls))) {
      if ($('.edit-image-styles').is(':visible')) return
      $('.edit-text-styles').stop(true, true).fadeOut()
      $('.edit-image-styles').css('display', 'flex').hide().stop(true, true).fadeIn()
    }
  }
  
  const handleContentChange = (element, newContent) => {
    const sanitizedContent = DOMPurify.sanitize(newContent);
  
    setPostElements(prevPostElements => 
      prevPostElements.map(el => 
        el.id === element.id ? { ...el, content: sanitizedContent } : el
      )
    );
  
    debouncedUpdatePostElements();
  }

  const renderElement = (element, index) => {
    const elementId = `${element.type}${post._id}${index}`;
    element.id = elementId;
  
    console.log('Rendering element:', element);
  
    const handleFocus = (e) => {
      e.target.focus();
    };
  
    return (
      <div
        id={elementId}
        key={elementId}
        className={`blog-post-element ${element.type === 'text' ? element.tag : element.type} ${selectedElement === element ? 'selected' : ''}`}
        onDrop={(e) => handleDrop(e, elementId, postElements, setPostElements)}
        onDragOver={handleDragOver}
        onClick={(event) => handleBlogPostElement(event.currentTarget, element)}
        tabIndex="0"
      >
        {element.type === 'image' ? (
          <img src={element.src} alt={element.alt} />
        ) : (
          <div
            contentEditable={selectedElement === element ? 'true' : 'false'}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{ __html: element.content }}
            onFocus={handleFocus}
            onBlur={(e) => handleContentChange(element, e.target.innerHTML)}
          ></div>
        )}
      </div>
    );
  };

  const customCss = post?.customCss || ''

  return (
    <div className="blog-post-container">
      {loadingState && <LoadingScreen />}
      {notFound ? (
        <NotFound />
      ) : (
        <>
          <Helmet>
            <title>{post?.title || 'Blog Post'}</title>
            {post && customCss && <style>{customCss}</style>}
          </Helmet>
          <Navbar />
          <EditorNavbar post={post} publishPost={publishPost} />
          <TextStyles
            elementStyles={elementStyles}
            handleStyleChange={handleStyleChange}
            handleBlogPostElement={handleBlogPostElement}
            blogPostMainRef={blogPostMainRef}
            selectedElement={selectedElement}
          />
          <ImageStyles
            elementStyles={elementStyles}
            handleStyleChange={handleStyleChange}
            handleBlogPostElement={handleBlogPostElement}
            blogPostMainRef={blogPostMainRef}
          />
          <EditorSidebar handleDragStart={handleDragStart} />
          <div className="blog-post-content">
            <div
              className="blog-post-main"
              ref={blogPostMainRef}
              onDrop={(e) => handleDrop(e, null, postElements, setPostElements)}
              onDragOver={handleDragOver}
            >
              <div className="blog-post-main__image blog-post-element banner" tabIndex="0">
                <img src={post?.imageUrl} alt={post?.title} />
              </div>
              <div className="blog-post-main__inner">
                <div
                  className="blog-post-main__title blog-post-element title"
                  tabIndex="0"
                  onClick={(event) => handleBlogPostElement(event.currentTarget)}
                >
                  <span>{post?.title}</span>
                </div>
                {postElements.map(renderElement)}
              </div>
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={() => publishPost()}>Publish Post</button>
        </>
      )}
    </div>
  )
}

export default BlogPostEditor
