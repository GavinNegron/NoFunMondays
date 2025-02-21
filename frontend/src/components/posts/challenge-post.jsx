import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChallengePosts } from '@/features/posts/postAction';
import PostCard from './post-card';

function ChallengePosts({ initialPosts }) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts.post);
  
  const [postLimit, setPostLimit] = useState(6);
  const [loadedPosts, setLoadedPosts] = useState(initialPosts || []);

  useEffect(() => {
    if (posts.length === 0) {
      setLoadedPosts(initialPosts);
    } else {
      setLoadedPosts(posts);
    }
  }, [posts, initialPosts]);

  useEffect(() => {
    if (postLimit > 6) {
      dispatch(fetchChallengePosts({ limit: postLimit, excludeFeatured: true }));
    }
  }, [dispatch, postLimit]);

  const handleLoadMore = () => {
    setPostLimit((prev) => prev + 4);
  };
  
  return (
    <>
      <div className="challenge-posts">
        <div className="challenge-posts__header">
          <p>Chapter 6 Season 2 Challenges</p>
        </div>
        <div className="challenge-posts__inner">
          {loadedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      <div className="challenge-posts__load">
        <button className="fortnite-btn" onClick={handleLoadMore} disabled={loadedPosts.length < postLimit}>Load More Posts</button>
      </div>
    </>
  );
}

export default ChallengePosts;
