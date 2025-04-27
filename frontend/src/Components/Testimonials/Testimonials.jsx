import React, { useRef } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/user-1.png'
import user_2 from '../../assets/user-2.png'
import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'

const Testimonials = () => {
    const slider = useRef();
    let tx = 0;

    const slideForward = () => {
        if(tx > -50){
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    }
    const slideBackward = () => {
        if(tx < 0){
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    }

    return (
        <div className='testimonials'>
            <img src={next_icon} alt='' className='next-btn' onClick={slideForward}/>
            <img src={back_icon} alt='' className='back-btn' onClick={slideBackward}/>
            <div className='slider'>
                <ul ref={slider}>
                    <li>
                        <div className='slide'>
                            <div className='user-info'>
                                <img src={user_1} alt='' />
                                <div>
                                    <h3>Aadhya</h3>
                                    <span>Hyderabad</span>
                                </div>
                            </div>
                            <div className='para-text'>
                                <p>"Thanks to this Food Wastage Management System, our restaurant has been able to donate surplus food daily. It’s heartwarming to see food reaching those who need it most instead of being wasted."</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='slide'>
                            <div className='user-info'>
                                <img src={user_2} alt='' />
                                <div>
                                    <h3>Daksh</h3>
                                    <span>Bangalore</span>
                                </div>
                            </div>
                            <div className='para-text'>
                                <p>"The platform has made it so easy for our NGO to collect leftover food from donors. It has improved our efficiency and allowed us to feed hundreds of people every week. A truly noble initiative!"</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='slide'>
                            <div className='user-info'>
                                <img src={user_3} alt='' />
                                <div>
                                    <h3>Anvi</h3>
                                    <span>Helping Hands, India</span>
                                </div>
                            </div>
                            <div className='para-text'>
                                <p>"I highly recommend this system to all organizations looking to minimize food wastage. It connects donors with volunteers seamlessly and ensures that food reaches people with dignity and respect."</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='slide'>
                            <div className='user-info'>
                                <img src={user_4} alt='' />
                                <div>
                                    <h3>Zara</h3>
                                    <span>Vizag</span>
                                </div>
                            </div>
                            <div className='para-text'>
                                <p>"Being a volunteer through this platform has been a rewarding experience. The scheduling, pickup, and delivery processes are smooth, making it easy to serve the community effectively."</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Testimonials
