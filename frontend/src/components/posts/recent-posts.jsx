import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecentPosts } from '@/features/posts/postAction';
import PostCard from './post-card';

function RecentPosts({ initialPosts }) {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts.post);
  
  const [postLimit, setPostLimit] = useState(6);
  const [loadedPosts, setLoadedPosts] = useState(initialPosts || []);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setLoadedPosts(posts);
    } else if (initialPosts && initialPosts.length > 0) {
      setLoadedPosts(initialPosts);
    }
  }, [posts, initialPosts]);

  useEffect(() => {
    if (postLimit > 6) {
      dispatch(fetchRecentPosts({ postLimit, type: 'recent' }));
    }
  }, [dispatch, postLimit]);

  const handleLoadMore = () => {
    setPostLimit((prev) => prev + 4);
  };
  
  return (
    <>
      <div className="recent-posts">
        <div className="recent-posts__header">
          <p>Recent Blog Posts</p>
        </div>
        <div className="recent-posts__inner">
          {loadedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      <div className="recent-posts__load">
        <button 
          className="fortnite-btn" 
          onClick={handleLoadMore} 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More Posts'}
        </button>
      </div>
    </>
  );
}

export default RecentPosts;