import React, { useMemo, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer/';
import NotFound from '../404';
import RenderElements from '@/utilities/posts/renderElements';
import Link from 'next/link';
import '../../../public/css/blog-post.css';
import axios from 'axios';

const BlogPost = ({ post, recentPosts }) => {
  useEffect(() => {
    if (post?.slug) {
      axios.post(`/api/public/page-views?slug=${encodeURIComponent(post.slug)}`)
    }
  }, [post?.slug]);

  const elements = post?.elements || [];
  
  const postElements = useMemo(() => elements, [elements]);
  
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
    "headline": post.title,
    "description": post.description,
    "image": post.imageUrl,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "NoFunMondays",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nofunmondays.com/images/NoFunMondays.png"
      }
    },
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={`${post.description}...`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:site_name" content="NoFunMondays" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={`${post.description}...`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://nofunmondays.com/blog/${post.slug}`} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:author" content={post.author} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      </Head>
      <Navbar />
      <main className="main">
        <div className="post">
          <div className="post__inner">
            <div className="post__header d-flex">
              <img src={post.imageUrl} alt={post.title} draggable="false" />
            </div>
            <div className="post__content">
              <div className="post__content__header">
                <h1>{post.title}</h1>
              </div>
              <div className="post__icons">
                <div className="post__icons__inner">
                  <div className="post__icons-icon">
                    <i className="fa-solid fa-eye"></i>
                    <span>{post.views || 0}</span>
                  </div>
                  <div className="post__icons-icon">
                    <i className="fa-solid fa-heart"></i>
                    <span>{post.hearts || 0}</span>
                  </div>
                  <div className="post__icons-icon">
                    <i className="fa-solid fa-comment"></i>
                    <span>{post.comments || 0}</span>
                  </div>
                  <div className="post__icons-icon">
                    <i className="fa-solid fa-share"></i>
                    <span>{post.shares || 0}</span>
                  </div>
                </div>
              </div>
              <div className="post__elements">{renderedElements}</div>
            </div>
          </div>
          <aside className="post__sidebar">
            <div className="post__author no-select">
              <div className="post__author-header">
                <span>Author: </span>
              </div>
              <a target='_blank' href="/authors/gavin-n">
                <div className="post__author-image">
                  <img draggable='false' src="/images/profile.png" alt="user profile image for gavin n, nofunmondays" />
                </div>
              </a>
              <div className="post__author-name">
                <a target='_blank' href="/authors/gavin-n">
                  <span>Gavin N.</span>
                </a>
              </div>
              <div className="post__author-bio">
                <span>Owner and Author on nofunmondays.com</span>
              </div>
            </div>
            <div className="post__recent">
              <div className="post__recent-header">
                <span>Recent Posts</span>
              </div>
              <div className="post__recent-posts">
              {recentPosts.map((recentPost) => (
                <Link key={recentPost._id} target='_blank' href={`/blog/${recentPost?.slug}`}>
                  <div className="post__recent-item">
                    <div className="post__recent-image">
                      <img src={recentPost?.imageUrl} alt={recentPost?.title} />
                    </div>
                    <div className="post__recent-title">
                      <span>{recentPost?.title}</span>
                    </div>
                  </div>
                </Link>
              ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <Script async src="https://platform.twitter.com/widgets.js"></Script>
    </>
  );
};

export default BlogPost;

export async function getServerSideProps(context) {
  try {
    const { slug } = context.params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    let response = await fetch(`${apiUrl}/api/posts/slug/${slug}`);
    
    if (!response.ok) {
      const redirectResponse = await fetch(`${apiUrl}/api/posts/redirects/${slug}`);
      if (redirectResponse.ok) {
        const redirectData = await redirectResponse.json();
        if (redirectData.originalSlug) {
          return {
            redirect: {
              destination: `/blog/${redirectData.originalSlug}`,
              permanent: true,
            },
          };
        }
      }
      return { notFound: true };
    }

    const post = await response.json();

    const recentPostsResponse = await fetch(`${apiUrl}/api/posts/recent?type=all&limit=5&excludeSlug=${slug}`);
    const recentPosts = await recentPostsResponse.json();

    return { props: { post, recentPosts } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}