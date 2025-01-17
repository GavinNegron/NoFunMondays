import React from 'react';
import Navbar from '../layout/navbar/navbar'
import Footer from '../layout/footer/footer'
import PostGrid from '../components/posts/postgrid'

function Landing() {

  return (
    <>
    <link link rel="stylesheet" href="/css/landing.css"></link>
    <Navbar />
    <main className="main">
      <div>THIS IS A STAGE ..</div>
    <PostGrid />
    </main>
    <Footer />
    </>
  );
}

export default Landing;