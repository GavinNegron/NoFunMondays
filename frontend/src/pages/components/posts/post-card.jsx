import React from 'react';
import moment from 'moment';
import Link from 'next/link';

function PostCard({ post }) {
  const formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
  };

  if (!post) {
    return null; // or render a placeholder, loading spinner, or error message
  }

  const imageUrl = post.imageUrl || '/img/placeholder.png'; // default image if imageUrl is undefined
  const slug = post.slug || '#'; // default link if slug is undefined
  const title = post.title || 'Untitled'; // default title if title is undefined
  const description = post.description || 'No description available.'; // default description if description is undefined
  const createdAt = post.createdAt || new Date(); // default date if createdAt is undefined

  return (
    <div className="post-card d-flex col-md-12 flex-md-row col-lg-5 flex-lg-column">
      <div className="post-card__left d-flex">
        <div className="post-card__img">
          <Link
            style={{ backgroundImage: `url(${imageUrl})` }}
            href={`/blog/${slug}`}
            aria-label={` ${title} `}
          />
        </div>
      </div>
      <div className="post-card__right d-flex">
        <div className="post-card__content">
          <div className="post-card__title">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </div>
          <div className="post-card__description">
            <p>{description}</p>
          </div>
          <div className="post-card__date">
            <p>{formatDate(createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;