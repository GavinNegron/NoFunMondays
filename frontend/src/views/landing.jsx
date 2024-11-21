import React from 'react';
import Navbar from './templates/navbar'
import Footer from './templates/footer'
import PostGrid from './templates/postgrid'

function Landing() {

  return (
    <>
    <link rel="stylesheet" href="/css/landing.css"></link>
    <Navbar />
    <main className="main">
    <PostGrid />
    </main>
    <Footer />
    </>
  );
}

export default Landing;