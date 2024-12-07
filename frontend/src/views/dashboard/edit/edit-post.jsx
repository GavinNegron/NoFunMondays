import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../404/404';
import Navbar from '../../layout/navbar';
import { Helmet } from 'react-helmet-async';
import loading from '../../../utilities/loading';
import LoadingScreen from '../../templates/base/loading';
import EditorSidebar from './layout/sidebar';
import EditorNavbar from './layout/nav1';
import EditStyles from './layout/styles';
import $ from 'jquery';
import { handleDragStart, handleDrop, handleDragOver } from '../../../utilities/dragUtils';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [elementStyles, setElementStyles] = useState({
    color: '',
    margin: '',
    fontFamily: '',
  });

  // Define the blogPostMainRef here
  const blogPostMainRef = useRef(null);

  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/edit-post.css']), new Promise(resolve => setTimeout(resolve, 500))]);

      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();
        const matchedPost = posts.find(p => p.slug === slug);

        if (matchedPost) {
          setPost(matchedPost);
          setElements([
            { id: 'img', type: 'image', draggable: false, content: matchedPost.imageUrl },
            { id: 'text1', type: 'h1', content: matchedPost.title },
            { id: 'description', type: 'text', content: matchedPost.description }
          ]);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoadingState(false);
      }
    };

    handleLoading();
  }, [slug]);

  const renderElement = (element) => {
    switch (element.type) {
      case 'image':
        return <img src={element.content} alt="Dynamic Element" />;
      case 'header':
        return <h1>{element.content}</h1>;
      case 'text':
        return <p>{element.content}</p>;
      default:
        return <div>{element.content}</div>;
    }
  };

  const handleBlogPostElement = (element) => {
    if (!element) {
      $('.edit-styles').stop(true, true).fadeOut(); 
      return;
    }
  
    setSelectedElement(element);
  
    setElementStyles({
      color: element.style?.color || '',
      margin: element.style?.margin || '',
      fontFamily: element.style?.fontFamily || '',
    });
  
    // Only fade the edit-styles container in if it's not already visible
    if ($('.edit-styles').is(':visible')) {
      // If the element is already visible, stop here
      return;
    }
  
    $('.edit-styles').css('display', 'flex').hide().stop(true, true).fadeIn(); // Fade in the element
  };
  
  

  const handleStyleChange = (property, value) => {
    if (selectedElement) {
      selectedElement.style[property] = value;
      setElementStyles(prevStyles => ({
        ...prevStyles,
        [property]: value,
      }));
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      const isInsideAddElements = event.target.closest('.editor-sidebar__add-elements') || event.target.closest('.addElement');
      if (isInsideAddElements) return;

      if (!isInsideAddElements) {
        $('.editor-sidebar__add-elements').stop(true, true).fadeOut();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
          <EditorNavbar post={post} />
          <EditStyles
            elementStyles={elementStyles}
            handleStyleChange={handleStyleChange}
            handleBlogPostElement={handleBlogPostElement}
            blogPostMainRef={blogPostMainRef} 
          />
          <EditorSidebar handleDragStart={handleDragStart} />
          <div className="blog-post-content">
            <div className="blog-post-main" ref={blogPostMainRef}>
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`blog-post-element ${element.type}`}
                  onDrop={(e) => handleDrop(e, element.id, elements, setElements)}
                  onDragOver={handleDragOver}
                  onClick={(event) => handleBlogPostElement(event.target)}
                >
                  {renderElement(element)}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BlogPost;
