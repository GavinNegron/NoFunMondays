import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../../features/posts/postSlice/fetchPosts';
import PostCard from './post-card';

function RecentPosts() {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts.fetchPosts);
  const [postLimit, setPostLimit] = useState(6); 

  useEffect(() => {
    dispatch(fetchPosts({ limit: postLimit, excludeFeatured: true }));
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
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            posts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          )}
        </div>
      </div>
      <div className="recent-posts__load">
        <button className="fortnite-btn" onClick={handleLoadMore} disabled={isLoading}>
          Load More Posts
        </button>
      </div>
    </>
  );
}

export default RecentPosts;