'use client';

import React, { useState, useEffect } from 'react';
import { LuClock } from "react-icons/lu";
import './index.scss';
import Image from 'next/image';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString();
    const formattedDate = currentTime.toLocaleDateString();

    return (
        <div className='clock-wrapper'>
            <Image src={"/calendar.png"} alt="clock" width={70} height={70} />
            <div className='clock-container'>
                <div className='time-container'>
                    <LuClock className='clock-icon' />
                    <p className='time'>{formattedTime}</p>
                </div>
                <div className='date-container'>
                    <p className='date'>Today</p>
                    <p className='today'>{formattedDate}</p>
                </div>
            </div>
        </div>
    );
};

export default Clock;
