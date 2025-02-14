import { useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer/';
import Head from 'next/head';
import '../../../public/css/landing.css';
import UnderConstruction from '@/components/base/construction'

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
      <main className="main d-flex justify-content-center align-items-center ">
        <UnderConstruction/>
      </main>
      <Footer />
    </>
  );
}

export default Landing;