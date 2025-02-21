import React from 'react';
import '../../../../public/css/challenges.css';
import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import UnderConstruction from '@/components/base/construction'
import ChallengePosts from '@/components/posts/challenge-post';
import axios from 'axios';

function FortniteChallenges({ challengePosts }) {
    return (
      <>
        <Head>
          <title>NoFunMondays</title>
          <meta name="description" content="All the latest Fortnite News and Information!" />
          <link rel="canonical" href="https://nofunmondays.com/"/>
          <meta property="og:title" content="NoFunMondays"/>
          <meta property="og:description" content="All the latest Fortnite News and Information!"/>
          <meta property="og:url" content="https://nofunmondays.com/"/>
        </Head>
        <Navbar /> 
        <main className="main">
          <div className="postgrid center d-flex">
          <div className="postgrid__inner">
            <ChallengePosts initialPosts={challengePosts} />
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
      const [ recentResponse ] = await Promise.all([
        axios.get(`${baseURL}/api/posts/recent?type=challenge`),
      ]);
      const challengePosts = recentResponse.data || [];
      return { 
        props: { challengePosts },
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return {
        props: { challengePosts: [] },
      };
    }
  }
  
  
  export default FortniteChallenges;