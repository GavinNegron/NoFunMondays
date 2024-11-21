import React from 'react';
import Navbar from './templates/navbar'
import Footer from './templates/footer'
import PostGrid from './templates/postgrid'

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