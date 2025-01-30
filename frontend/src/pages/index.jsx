import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer/';
import FeaturedPost from '../components/posts/featured-post'
import RecentPosts from '../components/posts/recent-posts'
import Head from 'next/head';
import '../../public/css/landing.css';

function Landing() {
  return (
    <>
      <Head>
        <title>Landing Page test</title>
        <meta name="description" content="Welcome to the landing page of our blog" />
      </Head>
      <Navbar />
      <main className="main">
        <div className="postgrid center d-flex">
            <div className="postgrid__inner">
                <FeaturedPost/>
                <RecentPosts/>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Landing;
