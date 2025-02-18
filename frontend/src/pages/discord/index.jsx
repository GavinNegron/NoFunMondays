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
        <title>Discord - NoFunMondays</title>
        <meta name="description" content="Join our Discord server for more Fortnite News." />
        <link rel="canonical" href="https://nofunmondays.com/"/>
        <meta property="og:title" content="Contact Us - NoFunMondays"/>
        <meta property="og:description" content="All the latest Fortnite News and Information!"/>
        <meta property="og:url" content="https://nofunmondays.com/"/>
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