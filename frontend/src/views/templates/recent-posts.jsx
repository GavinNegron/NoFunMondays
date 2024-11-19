import React from 'react';
import PostCard from './post-card'

function RecentPosts() {

  return (
    <>
    <div class="recent-posts">
        <div class="recent-posts__header">
            <p>Recent Blog Posts</p>
        </div>
        <div class="recent-posts__inner">
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        </div>
    </div>
    </>
  );
}

export default RecentPosts;
