import React, { useMemo, memo, useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer/';
import NotFound from '../404';
import RenderElements from '@/utilities/posts/renderElements';

import '../../../public/css/blog-post.css';

const BlogPost = memo(({ post }) => {
  const postElements = post?.elements || [];

  useEffect(() => {
    if (post?.slug) {
      fetch(`/api/public/page-views?slug=${encodeURIComponent(post.slug)}`, {
        method: 'POST',
      })
    }
  }, [post?.slug]);

  const renderedElements = useMemo(() => {
    return postElements.map((element) => (
      <RenderElements key={element.id} element={element} />
    ));
  }, [postElements]);

  if (!post) {
    return <NotFound />;
  }

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://nofunmondays.com/"
    },
    "headline": post?.title,
    "description": post?.description,
    "image": post?.imageUrl,
    "author": {
      "@type": "Person",
      "name": post?.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "NoFunMondays",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nofunmondays.com/images/NoFunMondays.png"
      }
    },
    "datePublished": post?.createdAt,
    "dateModified": post?.updatedAt
  };

  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.description} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:site_name" content="NoFunMondays" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://nofunmondays.com/blog/${post?.slug}`} />
        <meta property="og:image" content={post?.imageUrl} />
        <meta property="og:image:alt" content={post?.title} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={post?.createdAt} />
        <meta property="article:modified_time" content={post?.updatedAt} />
        <meta property="article:author" content={post?.author} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      </Head>
      <Navbar />
      <main className="main">
        <div className="post">
          <div className="post__inner">
            <div className="post__header d-flex">
              <img src={post?.imageUrl} alt={post?.title} draggable="false" />
            </div>
            <div className="post__content">
              <div className="post__content__header">
                <h1>{post?.title}</h1>
              </div>
              <div className="post__icons">
                <div className="post__icons__inner">
                  <div className="post__icons-icon">
                    <i className="fa-solid fa-eye"></i>
                    <span>{post?.views || 0}</span>
                  </div>
                  <div className="post__icons-icon">
                    <i className="fa-solid fa-heart"></i>
                    <span>{post?.hearts || 0}</span>
                  </div>
                  <div className="post__icons-icon">
                    <i className="fa-solid fa-comment"></i>
                    <span>{post?.comments || 0}</span>
                  </div>
                </div>
              </div>
              <div className="post__elements">{renderedElements}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Script async src="https://platform.twitter.com/widgets.js"></Script>
    </>
  );
});

export default BlogPost;

export async function getServerSideProps(context) {
  try {
    const host = context.req.headers.host;
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const { slug } = context.params;

    let response = await fetch(`${baseUrl}/api/posts/slug/${slug}`);
    if (!response.ok) { 
      const redirectCheck = await fetch(`${baseUrl}/api/posts/recent?type=all`);
      if (!redirectCheck.ok) return { notFound: true };

      const posts = await redirectCheck.json();
      const postWithRedirect = posts.find(post => post.redirects.includes(slug));

      if (postWithRedirect) {
        return {
          redirect: {
            destination: `/blog/${postWithRedirect.slug}`,
            permanent: true,
          },
        };
      }

      return { notFound: true };
    }

    const post = await response.json();
    return { props: { post } };
    
  } catch (error) {
    return { notFound: true };
  }
}
