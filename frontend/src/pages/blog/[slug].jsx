import React, { useEffect, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';

import LoadingScreen from '../../components/base/loading';
import Navbar from '../layout/navbar/navbar';
import Footer from '../layout/footer/footer';
import RenderElements from '../../utilities/posts/postElement/renderElements';

import { fetchSlug } from '../../features/posts/postAction';

import '../../../public/css/blog-post.css';

const BlogPost = memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const { post, postElements, loading } = useSelector((state) => state.posts.post);

  useEffect(() => {
    const handleLoading = async () => {
      if (!slug) return;
      await dispatch(fetchSlug(slug));
    };
    handleLoading();
  }, [dispatch, slug]);

  const renderedElements = useMemo(() => {
    return postElements?.map((element) => (
      <RenderElements key={element.id} element={element} editor={true} />
    ));
  }, [postElements]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <Navbar />
      <main className="main">
        <div className="post">
          <div className="post__inner">
            <div className="post__header d-flex">
              <img src={post.imageUrl} alt={post.title} draggable="false" />
            </div>
            <div className="post__content">
              <div className="post__content-header">
                <p>{post.title}</p>
              </div>
              <div className="post__elements">{renderedElements}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
});

export default BlogPost;