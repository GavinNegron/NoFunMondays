import React, { useState, useEffect } from 'react';
import '../../../../public/css/item-shop.css';
import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShop } from '@/features/fortniteAPI/fortniteAPIAction';
import LoadingScreen from '@/components/base/loading';

const FortniteShop = () => {
    const dispatch = useDispatch();
    const { shopItems, isLoading } = useSelector((state) => state.fortniteAPI.fortnite);
    const [timeUntilRotation, setTimeUntilRotation] = useState('');

    useEffect(() => {
        dispatch(fetchShop());

        const updateTimeRemaining = () => {
            const now = new Date();
            const nextRotation = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
            const timeDiff = nextRotation - now;

            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimeUntilRotation(`${hours}h ${minutes}m ${seconds}s`);
        };

        updateTimeRemaining();
        const intervalId = setInterval(updateTimeRemaining, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!shopItems || shopItems.length === 0) {
        return null;
    }

    const groupedItems = shopItems
        .filter((item) => !item.tracks || item.brItems)
        .reduce((acc, item) => {
            const name = item.layout?.name;
            if (name) {
                if (!acc[name]) {
                    acc[name] = [];
                }
                acc[name].push(item);
            }
            return acc;
        }, {});

    return (
        <>
            <Head>
                <title>Challenges - NoFunMondays</title>
            </Head>
            <Navbar />
            <main className="main">
             
            </main>
            <Footer />
        </>
    );
};

export default FortniteShop;
