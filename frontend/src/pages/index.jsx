import Navbar from './layout/navbar/navbar';
import Footer from './layout/footer/footer';
import FeaturedPost from './components/posts/featured-post'
import RecentPosts from './components/posts/recent-posts'
import Head from 'next/head';
import '../../public/css/landing.css'

function Landing() {
  return (
    <>
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="Welcome to the landing page of our blog" />
        <script async src="https://kit.fontawesome.com/5ee52856b3.js" crossOrigin="anonymous"></script>
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
