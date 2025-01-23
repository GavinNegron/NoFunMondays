// React/Next.JS
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/router';
import Head from 'next/head';

// Layout
import Navbar from '../layout/navbar/navbar';
import Footer from '../layout/footer/footer';
import LoadingScreen from '../components/base/loading';

// Utilities
import RenderElements from '../../utilities/posts/postElement/renderElements';

// Features
import { fetchSlug } from '../../features/posts/postActions/fetchSlug';

// Stylesheets
import '../../../public/css/blog-post.css'

function BlogPost() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const { post, postElements } = useSelector((state) => state.posts.post);
  const [loading, setLoading] = useState(true);


 useEffect(() => {
        const handleLoading = async () => {
          setLoading(true); 
          try {
            if (slug) {
                await dispatch(fetchSlug(slug));
                await new Promise((resolve) => setTimeout(resolve, 500)); 
            }
            } finally {
              setLoading(false);
            }
        };
        handleLoading();
      }, [dispatch, slug]);

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
      <script async src="https://kit.fontawesome.com/5ee52856b3.js" crossOrigin="anonymous"></script>
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
              <div className="post__elements">
              {postElements && postElements.length > 0 && postElements.map((element) => (
                <RenderElements key={element.id} element={element} editor={true} />
              ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BlogPost;