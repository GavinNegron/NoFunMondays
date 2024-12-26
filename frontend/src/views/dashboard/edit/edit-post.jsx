import React, { useEffect, Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { useEditorContext } from '../../../contexts/EditorContext';
import { Helmet } from 'react-helmet-async'

// Layout
import LoadingScreen from '../../templates/base/loading'
import NotFound from '../../404/404'
import Navbar from '../../layout/navbar'
import EditorNavbar from './layout/nav1'
import EditorSidebar from './layout/sidebar'

// Utilities
import { handleDrop, handleDragOver } from '../../../utilities/dragUtils'
import loading from '../../../utilities/loading'
import { handleBlogPostElement } from '../../../utilities/posts/postElement/handleBlogPostElement'
import RenderElement from '../../../utilities/posts/postElement/renderElement'
import { handleDoubleClick, handleDelete } from '../../../utilities/posts/editor/editorFunctions'
import { fetchPost } from '../../../utilities/posts/postData/fetchPost'

// Lazy loading components
const TextStyles = lazy(() => import('./layout/editStyles/text-styles'));
const ImageStyles = lazy(() => import('./layout/editStyles/image-styles'));
const ListStyles = lazy(() => import('./layout/editStyles/list-styles'));

function BlogPostEditor() {
  const { slug } = useParams();
  const {
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
    setElementStyles,
    errorMessage,
    imageUrl,
    setImageUrl,
    setDeletedElements,
    blogPostMainRef,
  } = useEditorContext();

  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/edit-post.css']), new Promise(resolve => setTimeout(resolve, 500))])
      await fetchPost(slug, setPost, setPostElements, setImageUrl, setNotFound)
      setLoadingState(false)
    }
    handleLoading()
  }, [slug, setImageUrl, setLoadingState, setPost, setPostElements, setNotFound])

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
  }, [selectedElement, setPostElements, setSelectedElement, setDeletedElements])

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
          <Navbar />
          <EditorNavbar />
          <Suspense fallback={<LoadingScreen />}>
            <TextStyles />
            <ImageStyles />
            <ListStyles />
          </Suspense>
          <EditorSidebar />
          <div className="blog-post-content">
            <div
              className="blog-post-main"
              ref={blogPostMainRef}
              onDrop={(e) => handleDrop(e, postElements, setPostElements)}
              onDragOver={handleDragOver}
            >
              <div
                className="blog-post-element blog-post-main__image blog-post-element banner"
                tabIndex="0"
                onClick={(e) => handleBlogPostElement(e.currentTarget, setSelectedElement, setElementStyles)}
              >
                <img src={imageUrl} alt={post?.title} />
              </div>
              <div className="blog-post-main__inner">
                <div
                  className="blog-post-element blog-post-main__title blog-post-element title"
                  tabIndex="0"
                  onClick={(e) => handleBlogPostElement(e.currentTarget, setSelectedElement, setElementStyles)}
                  onDoubleClick={(e) => handleDoubleClick(e, setSelectedElement, setPost, setPostElements)}
                >
                  <span>{post?.title}</span>
                </div>
                {postElements.map((element, index) =>
                  <RenderElement key={element.id} element={element} index={index} />              
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