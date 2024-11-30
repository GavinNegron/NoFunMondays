import React from 'react';
import moment from 'moment';

function PostCard( {post} ) {
  const formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
  };

  return (
    <>
        <div className="post-card d-flex col-md-12 flex-md-row col-lg-5 flex-lg-column">
          <div className="post-card__left d-flex">
            <div className="post-card__img">
            <a
              style={{ backgroundImage: `url(${post.imageUrl})`,}}
                href={`/blog/${post.slug}`}
                aria-label={` ${post.title} `} >
            </a>
            </div>
          </div>
          <div className="post-card__right d-flex">
            <div className="post-card__content">
              <div className="post-card__title">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </div>
              <div className="post-card__description">
                <p>{post.description}</p>
              </div>
              <div className="post-card__date">
                <p>{formatDate(post.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default PostCard;