import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeaturedPost } from '../../features/posts/postSlice';

function FeaturedPost() {
    const dispatch = useDispatch();
    const { featuredPost, error } = useSelector((state) => state.posts);

    useEffect(() => {
        if (!featuredPost && !error) {
        dispatch(fetchFeaturedPost());
        }
    }, [dispatch, featuredPost, error]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!featuredPost) {
        return <div>No featured post available.</div>;
    }

  return (
    <>
    <div className="featured-post">
        <div className="featured-post__header">
            <p>Featured Article:</p>
        </div>
        <div className="featured-post__inner d-flex col-12">
            <div className="featured-post__left d-flex col-12 col-md-12 col-lg-7">
                <div className="featured-post__img">
                <a
                    style={{ backgroundImage: `url(${featuredPost.imageUrl})`,}}
                    href="/blog-post"
                    aria-label={` ${featuredPost.title} `} >
                </a>
                </div>
            </div>
            <div className="featured-post__right d-flex col-12 col-md-12 col-lg-5">
                <div className="featured-post__content">
                    <div className="featured-post__title">
                        <a href="blog-post">{featuredPost.title}</a>
                    </div>
                    <div className="featured-post__description">
                        <p>{featuredPost.description}</p>
                    </div>
                    <div className="featured-post__date">
                        <p>{featuredPost.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default FeaturedPost;