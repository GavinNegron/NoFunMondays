import React from 'react';
import '../../../../public/css/item-shop.css';
import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import UnderConstruction from '@/components/base/construction'

const FortniteShop = () => {

    return (
        <>
            <Head>
                <title>Challenges - NoFunMondays</title>
            </Head>
            <Navbar />
            <main className="main d-flex align-items-center justify-content-center">
                <UnderConstruction/>        
            </main>
            <Footer />
        </>
    );
};

export default FortniteShop;