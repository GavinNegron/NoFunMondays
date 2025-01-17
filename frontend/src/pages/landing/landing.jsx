import React from 'react';
import Navbar from '../layout/navbar/navbar'
import Footer from '../layout/footer/footer'
import PostGrid from '../components/posts/postgrid'

function Landing() {

  return (
    <>
    <link link rel="stylesheet" href="/css/landing.css"></link>
    THIS IS A TEST DEVELOPMENT 
    <Navbar />
    <main className="main">
    <PostGrid />
    </main>
    <Footer />
    </>
  );
}

export default Landing;