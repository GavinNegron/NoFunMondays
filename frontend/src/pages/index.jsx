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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@600;700;800;900&family=Ubuntu:wght@700&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=ubuntu:wght@700;800&family=Libre+Franklin:wght@900&display=swap"></link>
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
