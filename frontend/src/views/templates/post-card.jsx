import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function PostCard() {
  const [post, setPosts] = useState([]);
  const [error, setError] = useState(''); 

  useEffect(() => {
    console.log('Fetching posts...');
    axios
      .get('/api/posts/')  
      .then((response) => {
        console.log('Posts fetched successfully:', response.data);
        setPosts(response.data);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError(err.response?.data?.message || 'Failed to fetch posts');
      });
  }, []);
  
  const formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
  }

  return (
    <>
      {error && <div className="error">{error}</div>} 
      {post.map((post, index) => (
        <div key={index} className="post-card d-flex col-md-12 flex-md-row col-lg-5 flex-lg-column">
          <div className="post-card__left d-flex">
            <div className="post-card__img">
              <a style = {{
                backgroundImage: `url(${post.imageUrl})`
              }}href="/blog-post"></a>
            </div>
          </div>
          <div className="post-card__right d-flex">
            <div className="post-card__content">
              <div className="post-card__title">
                <a href="/blog-post">{post.title}</a>
              </div>
              <div className="post-card__description">
                <p>{post.description}</p>
              </div>
              <div className="post-card__date">
                <p>{formatDate(post.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default PostCard;