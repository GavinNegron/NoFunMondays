import React from 'react';
import '../../../../public/css/countdown.css';
import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import UnderConstruction from '@/components/base/construction'

const SeasonCountdown = () => {

    return (
        <>
            <Head>
                <title>Season Countdown - NoFunMondays</title>
            </Head>
            <Navbar />
            <main className="main d-flex align-items-center justify-content-center">
                <UnderConstruction/>        
            </main>
            <Footer />
        </>
    );
};

export default SeasonCountdown;