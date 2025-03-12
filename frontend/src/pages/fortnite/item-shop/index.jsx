import React, { useState, useEffect } from 'react';
import '../../../../public/css/item-shop.css';
import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import LoadingScreen from '@/components/base/loading';

const FortniteShop = ({ shopItems }) => {
    const [timeUntilRotation, setTimeUntilRotation] = useState('');

    useEffect(() => {
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
    }, []);

    // Show loading screen if shopItems is undefined or null
    if (shopItems === undefined || shopItems === null) {
        return <LoadingScreen />;
    }

    if (shopItems.length === 0) {
        return <p>No items available</p>;
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
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    return (
        <>
            <Head>
                <title>Daily Item Shop Rotation - NoFunMondays</title>
            </Head>
            <Navbar />
            <main className="main">
                <div className="shop">
                    <div className="shop__inner">
                        <div className="shop__header">
                            <span>Fortnite Item Shop | {formattedDate}</span>
                        </div>
                        <div className="shop__description">
                            <span>Daily item shop rotation for Fortnite Battle Royale | shop updates daily at 00:00 UTC.</span>
                        </div>
                        <div className="shop__new-shop">
                            <span>Shop rotation in: {timeUntilRotation}</span>
                        </div>
                        {Object.keys(groupedItems).map((name) => (
                            <div key={name} className="shop__row">
                                <div className="shop__row-header">
                                    <span>{name}</span>
                                </div>
                                <div className="shop__items">
                                    {groupedItems[name].map((item, index) => {
                                        const rarityClass = item.brItems?.[0]?.rarity?.displayValue?.toLowerCase().replace(/\s+/g, '-') || 'common';
                                        const imageUrl = item.brItems?.[0]?.images?.featured || 
                                                        item.brItems?.[0]?.images?.icon || 
                                                        item.newDisplayAsset?.renderImages?.[0]?.image;

                                        return (
                                            <div
                                                key={item.id || `${name}-${index}`}
                                                className={`shop-item ${rarityClass}`}
                                                style={{
                                                    backgroundColor: item.brItems?.[0]?.colors?.textBackgroundColor || 'transparent',
                                                }}
                                            >
                                                <div className="shop-item__content">
                                                    <div className="shop-item__img">
                                                        <img
                                                            src={imageUrl}
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

export async function getServerSideProps() {
    try {
        const response = await fetch('https://fortnite-api.com/v2/shop');
        const data = await response.json();

        const shopItems = data.data?.entries || [];

        return {
            props: {
                shopItems,
            },
        };
    } catch (error) {
        console.error('Error fetching shop items:', error);
        return {
            props: {
                shopItems: null, 
            },
        };
    }
}
