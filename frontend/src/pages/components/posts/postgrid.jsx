import React from 'react';
import FeaturedPost from './featured-post'
import RecentPosts from './recent-posts'

function PostGrid() {
//test
  return (
    <>
    <div className="postgrid center d-flex">
    <div className="postgrid__inner">
        <FeaturedPost/>
        <RecentPosts/>
    </div>
    </div>
    </>
  );
}

export default PostGrid;