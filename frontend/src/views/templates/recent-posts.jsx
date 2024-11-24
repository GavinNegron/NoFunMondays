import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postSlice';
import PostCard from './post-card';

function RecentPosts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts); 

  useEffect(() => {
    dispatch(fetchPosts()); 
  }, [dispatch]);
  
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