import React from 'react';
import '../../../../public/css/challenges.css';
import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import PostsContainer from '@/components/posts/PostContainer';
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
            <PostsContainer postType='challenge' initialPosts={challengePosts} />
          </div>
        </div>
        </main>
        <Footer />
      </>
    );
  }
  
  export async function getServerSideProps() {
    try {
      const [ recentResponse ] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/recent?type=challenge&limit=6`),
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