import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postSlice';
import PostCard from './post-card';

function RecentPosts() {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts); 

  useEffect(() => {
    dispatch(fetchPosts()); 
  }, [dispatch]);
  
  if (isLoading) return <div>Loading posts...</div>; 
  if (error) return <div className="error">{error}</div>; 

  return (
    <>
    <div className="recent-posts">
        <div className="recent-posts__header">
            <p>Recent Blog Posts</p>
        </div>
        <div className="recent-posts__inner">
        {posts.map((post) => {
          return <PostCard key={post._id} post={post}/>
        })}
        </div>
    </div>
    </>
  );
}

export default RecentPosts;