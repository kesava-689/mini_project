// import Hero from './Components/Hero/Hero'
// import Navbar from './Components/Navbar/Navbar'
// import Title from './Components/Title/Title'
// import Programs from './Components/Programs/Programs'
// import Campus from './Components/Campus/Campus'
// import { useState } from 'react'
// import React from 'react'
// import About from './Components/About/About'
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import Contact from './Components/Contact/Contact'
// import Footer from './Components/Footer/Footer'
// import Testimonials from './Components/Testimonials/Testimonials'
// import Vedioplayer from './Components/Vedioplayer/Vedioplayer'
// const App = () => {
//   const [playState, setPlayState] = useState(false);

//   return (
//     <div>
//       <Navbar />
//       <Hero />
//       <div className="container">
//       <Title subtitle='Our Program' title='What We Offer'/>
//       <Programs />
//       <About setPlayState={setPlayState}/>
//       <Title subtitle='Gallery' title='Campus Photos'/>
//       <Campus />
//       <Title subtitle='Testimonials' title='What Student Says'/>
//       <Testimonials />
//       <Title subtitle='Contact Us' title='Get in Touch'/>
//       <Contact />
//       <Footer />
//       </div>
//       <Vedioplayer playState={playState} setPlayState={setPlayState}/>
//     </div>
//   )
// }

// export default App



import './Navbar.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import React from 'react'
import logo from '../../assets/logo.png'
import menu_icon from '../../assets/menu-icon.png'

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  }
  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
        <img src={logo} alt="" className='logo'/>
        <ul className={mobileMenu? '' :'hide-mobile-menu'}>
          <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
          <li><Link to='program' smooth={true} offset={-260} duration={500}>Program</Link></li>
          <li><Link to='about' smooth={true} offset={-150} duration={500}>About Us</Link></li>
          <li><Link to='services' smooth={true} offset={-260} duration={500}>Services</Link></li>
          <li><Link to='campus' smooth={true} offset={-260} duration={500}>Campus</Link></li>
          <li><Link to='testimonials' smooth={true} offset={-260} duration={500}>Testimonials</Link></li>
          <li><Link to='contact' smooth={true} offset={-260} duration={500}>Contact Us</Link></li>
          <li><Link to='signin-options' smooth={true} offset={-260} duration={500} className='btn'>Sign In</Link></li>
        </ul>
        <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default Navbar
