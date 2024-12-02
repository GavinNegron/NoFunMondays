import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../404/404';
import Navbar from '../../layout/navbar';
import { Helmet } from 'react-helmet-async';
import loading from '../../../utilities/loading';
import LoadingScreen from '../../templates/base/loading';
import EditorSidebar from './edit-sidebar';
import EditorNavbar from './edit-navbar';
import EditorNavbar2 from './edit-editornav';
import $ from 'jquery';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [elements, setElements] = useState([]);

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

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("text/plain", type);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedType = e.dataTransfer.getData("text/plain");
    const newElement = {
      id: `${draggedType}-${Date.now()}`,
      type: draggedType,
      content: `New ${draggedType.toUpperCase()}`
    };

    const targetIndex = elements.findIndex((el) => el.id === targetId);
    const updatedElements = [...elements];
    updatedElements.splice(targetIndex, 0, newElement);
    setElements(updatedElements);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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

  const handleBlogPostElement = () => {
    $('.editornav').stop(true, true).fadeIn()

    $('.blog-post-content').addClass('navActive')
  }
  const handleClickOutside(item) = (event) => {
    if (!event.target.closest('.addElement')) {
      $(item).stop(true, true).animate({}).fadeOut(200);
    }
  };
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside('.editor-sidebar__add-elements');
  
    return () => {
      document.removeEventListener('click', handleClickOutside('.editor-sidebar__add-elements');
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
          <EditorNavbar2/>
          <EditorSidebar handleDragStart={handleDragStart} />
          <div className="blog-post-content">
            <div className="blog-post-main">
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`blog-post-element ${element.type}`}
                  onDrop={(e) => handleDrop(e, element.id)}
                  onDragOver={handleDragOver}
                  onClick={handleBlogPostElement}
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
