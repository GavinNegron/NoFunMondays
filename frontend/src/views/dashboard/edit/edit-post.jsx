// React
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import $ from 'jquery'

// Layout
import LoadingScreen from '../../templates/base/loading'
import NotFound from '../../404/404'
import Navbar from '../../layout/navbar'
import EditorNavbar from './layout/nav1'
import EditorSidebar from './layout/sidebar'
import TextStyles from './layout/text-styles'
import ImageStyles from './layout/image-styles'

// Dragging
import { handleDragStart, handleDrop, handleDragOver } from '../../../utilities/dragUtils'
import loading from '../../../utilities/loading'

// Posts
import { publishPost } from '../../../utilities/posts/publishPost'
import { handleBlogPostElement } from '../../../utilities/posts/handleBlogPostElement'
import { renderElement } from '../../../utilities/posts/renderElement'
import { handleDoubleClick, handleKeyDown } from '../../../utilities/posts/editorFunctions'

// Data
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

  const handleStyleChange = (property, value) => {
    if (selectedElement) {
      selectedElement.style[property] = value
      setElementStyles(prevStyles => ({ ...prevStyles, [property]: value }))
      setPostElements(prevPostElements =>
        prevPostElements.map(element =>
          element.id === selectedElement.id ? { ...element, style: { ...element.style, [property]: value } } : element
        )
      )
    }
  }

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
          <EditorNavbar 
            post={post} 
            publishPost={publishPost} 
            postElements={postElements} 
            setPost={setPost} 
            setErrorMessage={setErrorMessage} 
          />
          <TextStyles
            elementStyles={elementStyles}
            handleStyleChange={handleStyleChange}
            handleBlogPostElement={handleBlogPostElement}
            blogPostMainRef={blogPostMainRef}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
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
                  onClick={() => $('.edit-text-styles, .edit-image-styles').stop(true, true).fadeOut('fast')}
                  onDoubleClick={(e) => handleDoubleClick(e, selectedElement, setPostElements, setDeletedElements, setSelectedElement, setPost)}
                >
                  <span>{post?.title}</span>
                </div>
                {postElements.map((element, index) =>
                  renderElement(
                    element,
                    index,
                    postElements,
                    setPostElements,
                    setSelectedElement, 
                    setElementStyles,
                    elements,
                    handleDoubleClick,
                    selectedElement,
                    setDeletedElements,
                    setPost
                  )
                )}
              </div>
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      )}
    </div>
  )
}

export default BlogPostEditor
