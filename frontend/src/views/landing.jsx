import React from 'react';
import Navbar from './layout/navbar'
import Footer from './layout/footer'
import PostGrid from './templates/posts/postgrid'

function Landing() {

  return (
    <>
    <Navbar />
    <main className="main">
    <PostGrid />
    </main>
    <Footer />
    </>
  );
}

export default Landing;