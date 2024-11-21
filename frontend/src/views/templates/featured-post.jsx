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
    <div class="featured-post">
        <div class="featured-post__header">
            <p>Featured Article:</p>
        </div>
        <div class="featured-post__inner d-flex col-12">
            <div class="featured-post__left d-flex col-12 col-md-12 col-lg-7">
                <div class="featured-post__img">
                <a
                    style={{ backgroundImage: `url(${featuredPost.imageUrl})`,}}
                    href="/blog-post"
                    aria-label={` ${featuredPost.title} `} >
                </a>
                </div>
            </div>
            <div class="featured-post__right d-flex col-12 col-md-12 col-lg-5">
                <div class="featured-post__content">
                    <div class="featured-post__title">
                        <a href="blog-post">{featuredPost.title}</a>
                    </div>
                    <div class="featured-post__description">
                        <p>{featuredPost.description}</p>
                    </div>
                    <div class="featured-post__date">
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