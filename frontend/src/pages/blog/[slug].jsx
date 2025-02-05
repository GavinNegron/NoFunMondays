import React, { useMemo, memo } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import useSWR from 'swr';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer/';
import NotFound from '../404';
import RenderElements from '../../utilities/posts/renderElements';

import '../../../public/css/blog-post.css';

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const BlogPost = memo(({ post }) => {
  const postElements = post?.elements || [];

  const { data } = useSWR(
    post ? `/api/page-views?slug=${encodeURIComponent(post.slug)}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  const views = data?.pageViews;
  console.log("Data received:", data);


  const renderedElements = useMemo(() => {
    return postElements.map((element) => (
      <RenderElements key={element.id} element={element} />
    ));
  }, [postElements]);

  if (!post) {
    return <NotFound />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nofunmondays.com/posts/${post?.slug}`
    },
    headline: post?.title,
    description: post?.excerpt,
    image: post?.imageUrl,
    dateCreated: post?.createdAt,
    datePublished: post?.createdAt,
    dateModified: post?.updatedAt,
    author: {
      "@type": "Person",
      name: post?.author,
      url: post?.author
    },
    publisher: {
      "@type": "Person",
      name: "No Fun Mondays",
      logo: {
        "@type": "ImageObject",
        url: "https://nofunmondays.com/favicon.ico"
      }
    },
    inLanguage: "en-US",
    isFamilyFriendly: "true"
  };

  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.description} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <Navbar />
      <main className="main">
        <div className="post">
          <div className="post__inner">
            <div className="post__header d-flex">
              <img src={post?.imageUrl} alt={post?.title} draggable="false" />
            </div>
            <div className="post__content">
              <div className="post__content-header">
                <p>{post?.title}</p>
                <p>{views} views</p>
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

export async function getServerSideProps({ params }) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://nofunmondays.com' 
      : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/posts/slug/${params.slug}`);

    if (!response.ok) { 
      return { notFound: true };
    }

    const post = await response.json(); 

    return { props: { post } };
    
  } catch (error) {
    return { notFound: true };
  }
}
