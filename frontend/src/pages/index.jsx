import { useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer/';
import FeaturedPost from '@/components/posts/featured-post';
import RecentPosts from '@/components/posts/recent-posts';
import Head from 'next/head';
import '../../public/css/landing.css';

function Landing({ featuredPost, recentPosts }) {
  useEffect(() => {
  }, [featuredPost, recentPosts]);

  return (
    <>
      <Head>
        <title>NoFunMondays</title>
        <meta name="description" content="Welcome to the landing page of our blog" />
      </Head>
      <Navbar />
      <main className="main">
        <div className="postgrid center d-flex">
          <div className="postgrid__inner">
            <FeaturedPost featuredPost={featuredPost} />
            <RecentPosts initialPosts={recentPosts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const host = context.req.headers.host;
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseURL = `${protocol}://${host}`;

  try {
    const [featuredResponse, recentResponse] = await Promise.all([
      axios.get(`${baseURL}/api/posts/recent?type=featured`),
      axios.get(`${baseURL}/api/posts/recent?type=recent`),
    ]);

    const featuredPost = featuredResponse.data.length > 0 ? featuredResponse.data[0] : null;
    const recentPosts = recentResponse.data || [];

    return {
      props: { featuredPost, recentPosts },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: { featuredPost: null, recentPosts: [] },
    };
  }
}


export default Landing;
