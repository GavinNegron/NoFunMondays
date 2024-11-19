import React, { useState, useEffect } from 'react';
import axios from 'axios'

function PostCard() {
    const [post, setPosts] = useState([]); // Array to store posts
    const [error, setError] = useState(''); // To store error messages

    useEffect(() => {
        axios.get('/api/posts/') 
            .then((response) => {
                setPosts(response.data);
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Failed to fetch posts');
            });
    }, []);
  return (
    <>
    <div class="post-card d-flex col-md-12 flex-md-row col-lg-5 flex-lg-column">
        <div class="post-card__left d-flex">
            <div class="post-card__img">
                <a href="/blog-post"></a>
            </div>
        </div>
        <div class="post-card__right d-flex">
            <div class="post-card__content">
                <div class="post-card__title">
                    <a href="/blog-post">{error}{post.title}</a>
                </div>
                <div class="post-card__description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto modi quas excepturi dolorem exercitationem libero minima beatae rem veritatis deserunt veniam eius, aliquam nesciunt nisi.</p>
                </div>
                <div class="post-card__date">
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default PostCard;
