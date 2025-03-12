import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecentPosts } from '@/features/posts/postAction';
import { resetPosts } from '@/features/posts/postSlice';
import moment from 'moment';
import Link from 'next/link';

function PostsContainer({ 
  postType = 'recent', 
  initialPosts = [], 
  featuredPost = null,
  initialLimit = 6
}) {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts.post);
  
  const [postLimit, setPostLimit] = useState(initialLimit);
  const [loadedPosts, setLoadedPosts] = useState(initialPosts || []);

  useEffect(() => {
    dispatch(resetPosts());
  }, [dispatch]);

  useEffect(() => {
    setLoadedPosts(initialPosts);
  }, [initialPosts]);

  useEffect(() => {
    if (postLimit > initialLimit && posts.length > 0) {
      setLoadedPosts(posts);
    }
  }, [posts, postLimit, initialLimit]);

  useEffect(() => {
    if (postLimit > initialLimit) {
      dispatch(fetchRecentPosts({ postLimit, type: postType }));
    }
  }, [dispatch, postLimit, postType, initialLimit]);

  const handleLoadMore = () => {
    setPostLimit((prev) => prev + 4);
  };

  const formatDate = (date) => moment(date).format('MM/DD/YYYY');

  const getHeaderText = () => {
    switch(postType) {
      case 'featured':
        return 'Featured Article:';
      case 'challenge':
        return 'Chapter 6 Season 2 Challenges';
      case 'recent':
      default:
        return 'Recent Blog Posts';
    }
  };

  const renderPostCard = (post) => {
    if (!post) {
      return null;
    }

    return (
      <div className="post-card d-flex col-md-12 flex-md-row col-lg-5 flex-lg-column" key={post._id}>
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
  };

  const renderFeaturedPost = () => {
    if (!featuredPost) return null;
    
    return (
      <div className="featured-post">
        <div className="featured-post__header">
          <p>{getHeaderText()}</p>
        </div>
        <div className="featured-post__inner d-flex col-12">
          <div className="featured-post__left d-flex col-12 col-md-12 col-lg-7">
            <div className="featured-post__img">
              {featuredPost?.imageUrl && (
                <Link
                  style={{ backgroundImage: `url(${featuredPost?.imageUrl})` }}
                  href={`/blog/${featuredPost?.slug}`}
                  aria-label={` ${featuredPost?.title} `}
                ></Link>
              )}
            </div>
          </div>
          <div className="featured-post__right d-flex col-12 col-md-12 col-lg-5">
            <div className="featured-post__content">
              <div className="featured-post__title">
                <Link href={`/blog/${featuredPost?.slug}`}>{featuredPost?.title}</Link>
              </div>
              <div className="featured-post__description">
                <p>{`${featuredPost?.description}...` || 'No description available.'}</p>
              </div>
              <div className="featured-post__date">
                <p>{formatDate(featuredPost?.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPostsList = () => {
    const containerClass = `${postType}-posts`;
    
    return (
      <>
        <div className={containerClass}>
          <div className={`${containerClass}__header`}>
            <p>{getHeaderText()}</p>
          </div>
          <div className={`${containerClass}__inner`}>
            {loadedPosts.map(post => renderPostCard(post))}
          </div>
        </div>
        {loadedPosts.length > 0 && (
          <div className={`${containerClass}__load`}>
            <button 
              className="fortnite-btn" 
              onClick={handleLoadMore} 
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More Posts'}
            </button>
          </div>
        )}
      </>
    );
  };
  
  if (postType === 'featured') {
    return renderFeaturedPost();
  }
  
  return renderPostsList();
}

export default PostsContainer;