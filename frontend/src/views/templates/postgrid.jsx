import React from 'react';
import FeaturedPost from './featured-post'
import RecentPosts from './recent-posts'

function PostGrid() {

  return (
    <>
    <div class="d-flex center postgrid">
    <div class="postgrid__inner">
        <FeaturedPost/>
        <RecentPosts/>
    </div>
    </div>
    </>
  );
}

export default PostGrid;