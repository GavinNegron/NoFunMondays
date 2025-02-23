import React, { useState, useEffect } from 'react';
import '../../../../public/css/countdown.css';
import Head from 'next/head';
import Navbar from '@/components/layout/navbar';

const SeasonCountdown = () => {
    const targetDate = new Date('May 2, 2025 02:00:00 GMT-5').getTime();
    const [timeLeft, setTimeLeft] = useState(null);

    function calculateTimeLeft() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: '00', hours: '00', minutes: '00', seconds: '00' };
        }

        const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
        const hours = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Season Countdown - NoFunMondays</title>
            </Head>
            <Navbar />
            <main className="main d-flex justify-content-center align-items-center">
                <div className="fortnite-countdown">
                    <div className="fortnite-countdown__inner">
                        <div className="fortnite-countdown__image">
                            <img src="/images/lawless2.jpg" alt="" />
                        </div>
                        <div className="fortnite-countdown__timer">
                            <div className="fortnite-countdown__timer-header">
                                <span>{timeLeft.days}&nbsp;&nbsp;:</span>
                                <span>{timeLeft.hours}&nbsp;&nbsp;:</span>
                                <span>{timeLeft.minutes}&nbsp;&nbsp;:</span>
                                <span>{timeLeft.seconds}</span>
                            </div>
                            <div className="fortnite-countdown__timer-label">
                                <span>DAY</span>
                                <span>HRS</span>
                                <span>MIN</span>
                                <span>SEC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SeasonCountdown;