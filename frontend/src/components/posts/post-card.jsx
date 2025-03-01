import React from 'react';
import moment from 'moment';
import Link from 'next/link';

function PostCard({ post }) {
  const formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
  };

  if (!post) {
    return null;
  }

  return (
    <div className="post-card d-flex col-md-12 flex-md-row col-lg-5 flex-lg-column">
      <div className="post-card__left d-flex">
        <div className="post-card__img">
          <Link href={`/blog/${post.slug}`} aria-label={`${post.title || 'Untitled'}`}>
            <img 
              src={post.imageUrl || '/images/placeholder.png'} 
              alt={post.title || 'Post image'} 
              loading="lazy"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          </Link>
        </div>
      </div>
      <div className="post-card__right d-flex">
        <div className="post-card__content">
          <div className="post-card__title">
            <Link href={`/blog/${post.slug}`}>{post.title || 'Untitled'}</Link>
          </div>
          <div className="post-card__description">
            <p>{`${post?.description}...` || 'No description available.'}</p>
          </div>
          <div className="post-card__date">
            <p>{formatDate(post.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;