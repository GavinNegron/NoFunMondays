import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Layout
import LoadingScreen from '../../templates/base/loading'
import NotFound from '../../404/404'
import Navbar from '../../layout/navbar'
import EditorNavbar from './layout/nav1'
import EditorSidebar from './layout/sidebar'
import TextStyles from './layout/editStyles/text-styles'
import ImageStyles from './layout/editStyles/image-styles'
import ListStyles from './layout/editStyles/list-styles'

// Utilities
import { handleDragStart, handleDrop, handleDragOver } from '../../../utilities/dragUtils'
import loading from '../../../utilities/loading'
import { publishPost } from '../../../utilities/posts/postData/publishPost'
import { handleBlogPostElement } from '../../../utilities/posts/postElement/handleBlogPostElement'
import { renderElement } from '../../../utilities/posts/postElement/renderElement'
import { handleDoubleClick, handleDelete } from '../../../utilities/posts/editor/editorFunctions'
import { fetchPost } from '../../../utilities/posts/postData/fetchPost'

// Data
import elements from '../../../data/elements'

function BlogPostEditor() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loadingState, setLoadingState] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [postElements, setPostElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [elementStyles, setElementStyles] = useState({ color: '', margin: '', fontFamily: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [deletedElements, setDeletedElements] = useState([])
  const navigate = useNavigate()

  const blogPostMainRef = useRef(null)

  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/edit-post.css']), new Promise(resolve => setTimeout(resolve, 500))])
      await fetchPost(slug, setPost, setPostElements, setImageUrl, setNotFound)
      setLoadingState(false)
    }
    handleLoading()
  }, [slug])

  const handleStyleChange = (property, value) => {
    if (selectedElement) {
      setPostElements(prevPostElements =>
        prevPostElements.map(element =>
          element.id === selectedElement.id
            ? { ...element, style: { ...element.style, [property]: value } }
            : element
        )
      )
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedElement) {
        const activeElement = document.activeElement
        const selectedElementNode = document.querySelector(`[data-id="${selectedElement.id}"]`)

        if (selectedElementNode && activeElement === selectedElementNode) {
          handleDelete(event, selectedElement, setPostElements, setDeletedElements, setSelectedElement)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedElement, setPostElements, setSelectedElement])

  return (
    <div className="blog-post-container">
      {loadingState && <LoadingScreen />}
      {notFound ? (
        <NotFound />
      ) : (
        <>
          <Helmet>
            <title>{post?.title || 'Blog Post'}</title>
          </Helmet>
          <Navbar imageUrl={imageUrl} />
          <EditorNavbar
            post={post}
            publishPost={publishPost}
            postElements={postElements}
            setPost={setPost}
            imageUrl={imageUrl}
            navigate={navigate}
          />
          <TextStyles
            elementStyles={elementStyles}
            handleStyleChange={handleStyleChange}
            handleBlogPostElement={handleBlogPostElement}
            blogPostMainRef={blogPostMainRef}
            selectedElement={selectedElement}
          />
          <ImageStyles
            handleBlogPostElement={handleBlogPostElement}
            blogPostMainRef={blogPostMainRef}
            selectedElement={selectedElement}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
          <ListStyles
            handleBlogPostElement={handleBlogPostElement}
            blogPostMainRef={blogPostMainRef}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            handleStyleChange={handleStyleChange}
            elementStyles={elementStyles}
          />
          <EditorSidebar
            handleDragStart={handleDragStart}
          />
          <div className="blog-post-content">
            <div
              className="blog-post-main"
              ref={blogPostMainRef}
              onDrop={(e) => handleDrop(e, setDeletedElements, postElements, setPostElements)}
              onDragOver={handleDragOver}
            >
              <div
                className="blog-post-element blog-post-main__image blog-post-element banner"
                tabIndex="0"
                onClick={(event) => handleBlogPostElement(event.currentTarget, setSelectedElement, setElementStyles, elements)}
              >
                <img src={imageUrl} alt={post?.title} />
              </div>
              <div className="blog-post-main__inner">
                <div
                  className="blog-post-element blog-post-main__title blog-post-element title"
                  tabIndex="0"
                  onClick={(event) => handleBlogPostElement(event.currentTarget, setSelectedElement, setElementStyles, elements)}
                  onDoubleClick={(e) => handleDoubleClick(e, setSelectedElement, setPost, setPostElements)}
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
                    setPost,
                    setImageUrl
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
