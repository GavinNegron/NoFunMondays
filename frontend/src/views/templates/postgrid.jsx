import React from 'react';
import FeaturedPost from './featured-post'
import RecentPosts from './recent-posts'

function PostGrid() {

  return (
    <>
    <div className="d-flex center postgrid">
    <div className="postgrid__inner">
        <FeaturedPost/>
        <RecentPosts/>
    </div>
    </div>
    </>
  );
}

export default PostGrid;