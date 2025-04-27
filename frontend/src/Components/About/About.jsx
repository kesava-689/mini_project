import './About.css'

import React from 'react'
import about_img from '../../assets/about.png'
import play_icon from '../../assets/play-icon.png'

const About = ({setPlayState}) => {
  return (
    <div className='about'>
      <div className='about-left'>
        <img src={about_img} alt='' className='about-img'/>
        <img src={play_icon} alt='' className='play-icon' onClick={()=>{setPlayState(true)}}/>
      </div>
      <div className='about-right'>
        <h3>ABOUT US </h3><br></br>
        <p>Every meal has a story.
            Some are celebrated. Some are forgotten.
            We exist to rewrite the ending.

            At our platform , we transform leftovers into lifelines.
            Our platform connects kind hearts — donors with extra food, volunteers with willing hands, and communities with empty plates — into a single, powerful network of change.

            We are not just managing food.
            We are managing hope, dignity, and second chances.

            By harnessing technology, real-time tracking, and passionate people, we make sure that good food finds its way to those who need it most — before time steals its value.
            Because for us, every saved meal is more than nutrition; it's a spark of kindness lighting up someone’s day.

            Less Waste. More Hope. Endless Impact.
            Welcome to our platform — where food finds its true purpose.</p>

      </div>
    </div>
  )
}

export default About
