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
      <div>No Fun Mondays staging test.</div>
    <PostGrid />
    </main>
    <Footer />
    </>
  );
}

export default Landing;