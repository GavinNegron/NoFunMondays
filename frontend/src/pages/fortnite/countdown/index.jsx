import React, { useState, useEffect } from 'react';
import '../../../../public/css/item-shop.css';
import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useSelector, useDispatch } from 'react-redux';
import LoadingScreen from '@/components/base/loading';

const Countdown = () => {
    const dispatch = useDispatch();


    return (
        <>
            <Head>
                <title>Season Countdown - NoFunMondays</title>
            </Head>
            <Navbar />
            <main className="main">
                
            </main>
            <Footer />
        </>
    );
};

export default Countdown;
