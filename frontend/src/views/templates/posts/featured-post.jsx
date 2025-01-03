import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeaturedPost } from '../../../features/posts/postSlice/index';
const moment = require('moment');

function FeaturedPost() {
  const dispatch = useDispatch();
  const { featuredPost, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (featuredPost === undefined && !isLoading) {
      dispatch(fetchFeaturedPost());
    }
  }, [dispatch, featuredPost, isLoading]);
  
  if (!featuredPost) {
    return null; 
  }

  const formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
  };

  return (
    <div className="featured-post">
      <div className="featured-post__header">
        <p>Featured Article:</p>
      </div>
      <div className="featured-post__inner d-flex col-12">
        <div className="featured-post__left d-flex col-12 col-md-12 col-lg-7">
          <div className="featured-post__img">
            {featuredPost.imageUrl && (
              <a
                style={{ backgroundImage: `url(${featuredPost.imageUrl})` }}
                href={`/blog/${featuredPost.slug}`}
                aria-label={` ${featuredPost.title} `}
              ></a>
            )}
          </div>
        </div>
        <div className="featured-post__right d-flex col-12 col-md-12 col-lg-5">
          <div className="featured-post__content">
            <div className="featured-post__title">
              <a href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</a>
            </div>
            <div className="featured-post__description">
              <p>{featuredPost.description}</p>
            </div>
            <div className="featured-post__date">
              <p>{formatDate(featuredPost.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
