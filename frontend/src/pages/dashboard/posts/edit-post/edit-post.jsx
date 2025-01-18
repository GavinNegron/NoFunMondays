import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEditorContext } from '../../../../contexts/EditorContext';
import { Helmet } from 'react-helmet-async';

// Layout
import LoadingScreen from '../../../components/base/loading';
import NotFound from '../../../404/404';
import Navbar from '../../../layout/navbar/navbar';
import EditorNavbar from '../components/Nav/nav1';
import EditorSidebar from '../components/Sidebar/sidebar';

// Utilities
import { handleDrop, handleDragOver } from '../../../../utilities/dragUtils';
import { handleBlogPostElement } from '../../../../utilities/posts/postElement/handleBlogPostElement';
import RenderElements from '../../../../utilities/posts/postElement/renderElements';
import { handleDoubleClick, handleDelete } from '../../../../utilities/posts/editor/editorFunctions';
import loading from '../../../../utilities/loading';

// Layout
import TextStyles from '../components/EditStyles/text-styles';
import ImageStyles from '../components/EditStyles/image-styles';
import ListStyles from '../components/EditStyles/list-styles';
import EmbedStyles from '../components/EditStyles/embed-styles';

// Features
import {fetchSlug} from '../../../../features/posts/postSlice/fetchSlug';

function BlogPostEditor() {
  const {
    setPost,
    loadingState,
    setLoadingState,
    notFound,
    setNotFound,
    setPostElements,
    selectedElement,
    setSelectedElement,
    setElementStyles,
    errorMessage,
    setImageUrl,
    setDeletedElements,
    blogPostMainRef,
    setShowColorPicker,
  } = useEditorContext();

    const dispatch = useDispatch();
    const { slug } = useParams();
    const { postElements, post } = useSelector((state) => state.posts.fetchSlug);

    useEffect(() => {
      if (slug) {
        dispatch(fetchSlug(slug));
      }
    }, [dispatch, slug]);

    useEffect(() => {
      const handleLoading = async () => {
        await Promise.all([loading(['/css/edit-post.module.css']), new Promise(resolve => setTimeout(resolve, 500))]);
        try {
        } catch (error) {
          setNotFound(true);
        } finally {
          setLoadingState(false);
        }
      };

      handleLoading();
    }, [slug, setPost, setPostElements, setImageUrl, setNotFound, setLoadingState]);

    useEffect(() => {
      const handleKeyDown = (event) => {
        if ((event.key === 'Delete' || event.key === 'Backspace') && selectedElement) {
          const activeElement = document.activeElement;
          const selectedElementNode = document.querySelector(`[data-id="${selectedElement.id}"]`);
          if (selectedElementNode && activeElement === selectedElementNode) {
            handleDelete(event, selectedElement, setPostElements, setDeletedElements, setSelectedElement);
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [selectedElement, setPostElements, setSelectedElement, setDeletedElements]);

    useEffect(() => {
      const handleClick = (e) => {
        if (!e.target.closest('.fa-palette')) {
          if (!e.target.closest('.edit-styles__color-picker-container')) {
            setShowColorPicker(false);
          }
        }
      };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [setShowColorPicker]);

  return (
    <div className="blog-post-container">
      {loadingState && <LoadingScreen />}
      {notFound ? (
        <NotFound />
      ) : (
        <>
          <Helmet>
            <title>{post?.title}</title>
          </Helmet>
          <Navbar />
          <EditorNavbar />
          <EditorSidebar />
          <div className="editor-container">
            <div className="editor">
              <div className="editor__back">
                <a href="/dashboard/posts">
                  <i className="fa-solid fa-arrow-left"></i>
                  <span>Dashboard</span>
                </a>
              </div>
            </div>
          </div>
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
                {post?.imageUrl && <img src={post?.imageUrl} alt={post?.title} draggable="false" />}
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
                {postElements && postElements.length > 0 && postElements.map((element) => (
                  <RenderElements key={element.id} element={element} editor={true} />
                ))}

              </div>
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <TextStyles />
          <ImageStyles />
          <ListStyles />
          <EmbedStyles />
        </>
      )}
    </div>
  );
}

export default BlogPostEditor;