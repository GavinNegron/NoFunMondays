import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postAction';
import PostCard from './post-card';

function RecentPosts({ initialPosts, initialLoading }) {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts.post);
  
  const [postLimit, setPostLimit] = useState(6);

  useEffect(() => {
    if (!initialPosts && posts.length === 0 || postLimit !== 6) {
      dispatch(fetchPosts({ limit: postLimit, excludeFeatured: true }));
    }
  }, [dispatch, postLimit, initialPosts, posts.length]); 

  const handleLoadMore = () => {
    setPostLimit((prev) => prev + 4);
  };
  
  return (
    <>
      <div className="recent-posts">
        <div className="recent-posts__header">
          <p>Recent Blog Posts TEST</p>
        </div>
        <div className="recent-posts__inner">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      <div className="recent-posts__load">
        <button className="fortnite-btn" onClick={handleLoadMore} disabled={isLoading || initialLoading}>Load More Posts</button>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const posts = await fetchPosts({ limit: 6, excludeFeatured: true });

  return {
    props: {
      initialPosts: posts,
      initialLoading: false,
    },
  };
}

export default RecentPosts;
