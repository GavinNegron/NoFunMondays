import React, { useEffect, useState } from 'react';
import Navbar from '../layout/navbar/navbar'
import Footer from '../layout/footer/footer'
import PostGrid from '../components/posts/postgrid'
import loading from '../../utilities/loading'

function Landing() {
  const [setLoadingState] = useState(true); 
  
  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/landing.css']), new Promise(resolve => setTimeout(resolve, 500))])
      setLoadingState(false);
    };
    handleLoading();
  });



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
