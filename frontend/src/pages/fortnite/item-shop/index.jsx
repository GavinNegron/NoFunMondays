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
    const [hoursUntilRotation, setHoursUntilRotation] = useState(0);

    useEffect(() => {
        dispatch(fetchShop());

        const updateTimeRemaining = () => {
            const now = new Date();
            const nextRotation = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0)); // Next 00:00 UTC
            const timeDiff = nextRotation - now;
            const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert ms to hours
            setHoursUntilRotation(hoursRemaining);
        };

        updateTimeRemaining();
        const intervalId = setInterval(updateTimeRemaining, 60000); // Update every minute

        return () => clearInterval(intervalId); // Clean up interval on component unmount
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
                <title>Daily Item Shop Rotation</title>
            </Head>
            <Navbar />
            <main className="main">
                <div className="shop">
                    <div className="shop__inner">
                        <div className="shop__header">
                            <span>Fortnite Item Shop | February 2nd 2025</span>
                        </div>
                        <div className="shop__description">
                            <span>Daily item shop rotation for Fortnite Battle Royale | shop updates daily at 00:00 UTC.</span>
                        </div>
                        <div className="shop__new-shop">
                            <span>Shop rotation in: {hoursUntilRotation} hours</span>
                        </div>
                        {Object.keys(groupedItems).map((name) => (
                            <div key={name} className="shop__row">
                                <div className="shop__row-header">
                                    <span>{name}</span>
                                </div>
                                <div className="shop__items">
                                    {groupedItems[name].map((item) => {
                                        const rarityClass = item.brItems?.[0]?.rarity?.displayValue?.toLowerCase().replace(/\s+/g, '-') || 'common';
                                        return (
                                            <div
                                                key={item.id}
                                                className={`shop-item ${rarityClass}`}
                                                style={{
                                                    backgroundColor: item.brItems?.[0]?.colors?.textBackgroundColor || 'transparent',
                                                }}
                                            >
                                                <div className="shop-item__content">
                                                    <div className="shop-item__img">
                                                        <img
                                                            src={item.brItems?.[0]?.images?.featured || item.newDisplayAsset?.renderImages?.[0]?.image}
                                                            alt={item.bundle?.name || item.brItems?.[0]?.name}
                                                        />
                                                    </div>
                                                    <span className="shop-item__header">
                                                        {item.bundle?.name || item.brItems?.[0]?.name || (item.instruments?.[0]?.name)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default FortniteShop;
