import axios from 'axios';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer/';
import PostsContainer from '@/components/posts/PostContainer';
import Head from 'next/head';
import '../../public/css/landing.css';

function Landing({ featuredPost, recentPosts }) {
  return (
    <>
      <Head>
        <title>NoFunMondays</title>
        <meta name="title" content="NoFunMondays" />
        <meta name="description" content="Stay updated with the latest Fortnite news, leaks, patch notes, item shop updates, and in-game events. Get all the latest news and info in one place!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nofunmondays.com/" />
        <meta property="og:title" content="NoFunMondays" />
        <meta property="og:description" content="Stay updated with the latest Fortnite news, leaks, patch notes, item shop updates, and in-game events. Get all the latest news and info in one place!" />
        <meta property="og:image" content="https://nofunmondays.com/images/meta-img.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nofunmondays.com/" />
        <meta property="twitter:title" content="NoFunMondays" />
        <meta property="twitter:description" content="Stay updated with the latest Fortnite news, leaks, patch notes, item shop updates, and in-game events. Get all the latest news and info in one place!" />
        <meta property="twitter:image" content="https://nofunmondays.com/images/meta-img.jpg" />
      </Head>
      <Navbar /> 
      <main className="main">
        <div className="postgrid center d-flex">
          <div className="postgrid__inner">
            <PostsContainer postType="featured" initialPosts={[]} featuredPost={featuredPost} />
            <PostsContainer postType="recent" initialPosts={recentPosts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [featuredResponse, recentResponse] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/recent?type=featured`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/recent?type=recent&limit=6`),
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