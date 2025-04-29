import './Testimonials.css';

import React, { useRef, useState } from 'react';

import back_icon from '../../assets/back-icon.png';
import next_icon from '../../assets/next-icon.png';
import user_1 from '../../assets/user-1.png';
import user_2 from '../../assets/user-2.png';
import user_3 from '../../assets/user-3.png';
import user_4 from '../../assets/user-4.png';

const Testimonials = () => {
    const slider = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            img: user_1,
            name: "Aadhya",
            location: "Hyderabad",
            text: 'Thanks to this Food Wastage Management System, our restaurant has been able to donate surplus food daily. It’s heartwarming to see food reaching those who need it most instead of being wasted.'
        },
        {
            img: user_2,
            name: "Daksh",
            location: "Bangalore",
            text: 'The platform has made it so easy for our NGO to collect leftover food from donors. It has improved our efficiency and allowed us to feed hundreds of people every week. A truly noble initiative!'
        },
        {
            img: user_3,
            name: "Anvi",
            location: "Chennai",
            text: 'I highly recommend this system to all organizations looking to minimize food wastage. It connects donors with volunteers seamlessly and ensures that food reaches people with dignity and respect.'
        },
        {
            img: user_4,
            name: "Zara",
            location: "Vizag",
            text: 'Being a volunteer through this platform has been a rewarding experience. The scheduling, pickup, and delivery processes are smooth, making it easy to serve the community effectively.'
        },
    ];

    const nextSlide = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Go back to first slide
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(slides.length - 1); // Go to last slide
        }
    };

    return (
        <div className="testimonials">
            <div className="slider-wrapper">
                <img src={back_icon} alt="Back" className="back-btn" onClick={prevSlide} />
                <div className="slider">
                    <ul ref={slider} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {slides.map((slide, index) => (
                            <li key={index}>
                                <div className="slide">
                                    <div className="user-info">
                                        <img src={slide.img} alt={slide.name} />
                                        <div>
                                            <h3>{slide.name}</h3>
                                            <span>{slide.location}</span>
                                        </div>
                                    </div>
                                    <div className="para-text">
                                        <p>{slide.text}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <img src={next_icon} alt="Next" className="next-btn" onClick={nextSlide} />
            </div>
        </div>
    );
};

export default Testimonials;
