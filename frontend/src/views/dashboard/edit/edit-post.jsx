import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../404/404';
import Navbar from '../../layout/navbar';
import { Helmet } from 'react-helmet-async';
import loading from '../../../utilities/loading';
import LoadingScreen from '../../templates/base/loading';
import EditorSidebar from './layout/sidebar';
import EditorNavbar from './layout/nav1';
import TextStyles from './layout/text-styles';
import ImageStyles from './layout/image-styles';
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
          setElements(matchedPost.elements || []);
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
      $('.edit-text-styles').stop(true, true).fadeOut(); 
      $('.edit-image-styles').stop(true, true).fadeOut(); 
      return;
    }
    
    setSelectedElement(element);
  
    setElementStyles({
      color: element.style?.color || '',
      margin: element.style?.margin || '',
      fontFamily: element.style?.fontFamily || '',
    });
  
    const text = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6',  'text'];

    if (text.some(cls => element.classList.contains(cls))) {
      if ($('.edit-text-styles').is(':visible')) {
        return;
      }
      
      $('.edit-image-styles').stop(true, true).fadeOut();
      $('.edit-text-styles').css('display', 'flex').hide().stop(true, true).fadeIn();
    }
    if (element.classList.contains('image')) {
      if ($('.edit-image-styles').is(':visible')) {
        return;
      }

      $('.edit-text-styles').stop(true, true).fadeOut();
      $('.edit-image-styles').css('display', 'flex').hide().stop(true, true).fadeIn();
    }
  };

  const handleStyleChange = (property, value) => {
    if (selectedElement) {
      selectedElement.style[property] = value;
      setElementStyles(prevStyles => ({
        ...prevStyles,
        [property]: value,
      }));
      updatePostElements(); // Update the post elements when style changes
    }
  };

  const addElement = (type, content) => {
    const newElement = {
      id: Date.now().toString(),
      type,
      content,
      style: {},
    };
    setElements([...elements, newElement]);
    updatePostElements(); // Save the new element to the database
  };

  const updatePostElements = async () => {
    if (post) {
      const updatedPost = { 
        ...post, 
        elements: elements.map(element => ({
          ...element,
          style: element.style || {} // Ensure the style object exists
        }))
      };
      try {
        const response = await fetch(`/api/posts/${post._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPost),
        });
        if (!response.ok) {
          throw new Error('Failed to update post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const publishPost = async () => {
    if (post) {
      const updatedPost = { 
        ...post, 
        elements: elements.map(element => ({
          ...element,
          style: element.style || {} // Ensure the style object exists
        }))
      };
      try {
        const response = await fetch(`/api/posts/publish/${post._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPost),
        });
        if (!response.ok) {
          throw new Error('Failed to publish post');
        }
        const data = await response.json();
        console.log('Post published:', data);  // Log the result of publishing
        setPost(data);
      } catch (error) {
        console.error('Error publishing post:', error);
      }
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
            <div className="blog-post-main" ref={blogPostMainRef}>
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`blog-post-element ${element.type}`}
                  onDrop={(e) => handleDrop(e, element.id, elements, setElements)}
                  onDragOver={handleDragOver}
                  onClick={(event) => handleBlogPostElement(event.currentTarget)}
                  tabindex='0'
                >
                  {renderElement(element)}
                </div>
              ))}
            </div>
          </div>
          <button onClick={publishPost} className="publish-button">Publish</button>
        </>
      )}
    </div>
  );
}

export default BlogPost;
