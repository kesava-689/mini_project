// import './Navbar.css';
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Link } from 'react-scroll';
// import { NavLink } from 'react-router-dom';
// import React from 'react';
// import Service from '../Services/Services';
// import AdminLogin from '../AdminLogin/AdminLogin'; // ✅ Import the AdminLogin component
// import logo from '../../assets/logo.png';
// import menu_icon from '../../assets/menu-icon.png';

// const Navbar = () => {
//   const location = useLocation();
//   const isHomePage = location.pathname === '/';
//   const [sticky, setSticky] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showAdminLogin, setShowAdminLogin] = useState(false); // ✅ Admin login popup toggle

//   useEffect(() => {
//     const handleScroll = () => {
//       setSticky(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
//         setShowAdminLogin(true);
//       }
//     };
  
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);
//   return (
//     <>
//       {/* <nav className={`container ${sticky ? 'dark-nav' : ''}`}> */}
//       {/* <nav className={`container ${isHomePage && sticky ? 'dark-nav' : ''} ${!isHomePage ? 'always-visible-nav' : ''}`}> */}
//       <nav className={`container 
//           ${isHomePage && sticky ? 'dark-nav' : ''} 
//           ${!isHomePage ? 'always-visible-nav' : ''} 
//           ${sticky ? 'scrolled' : ''}`}
//       >
//         <img src={logo} alt="Logo" className='logo' />
//         <ul className={mobileMenu ? 'mobile-menu' : 'hide-mobile-menu'}>
//           <li><Link to="hero" smooth={true} offset={0} duration={500}>Home</Link></li>
//           <li><Link to="program" smooth={true} offset={-260} duration={500}>Program</Link></li>
//           <li><Link to="about" smooth={true} offset={-150} duration={500}>About Us</Link></li>
//           <li><Link to="#" onClick={() => setShowPopup(true)}>Services</Link></li>
//           <li><Link to="campus" smooth={true} offset={-260} duration={500}>Gallery</Link></li>
//           <li><Link to="testimonials" smooth={true} offset={-260} duration={500}>Testimonials</Link></li>
//           <li><Link to="contact" smooth={true} offset={-260} duration={500}>Contact Us</Link></li>

//           <li><NavLink to="/signin-options" className="btn">Sign In</NavLink></li>
//           <li><NavLink to="/signup" className="btn">Sign Up</NavLink></li>

//           {/* ✅ Admin Button 
//           <li>
//             <button
//               className="btn"
//               style={{ backgroundColor: '#333', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '5px' }}
//               onClick={() => setShowAdminLogin(true)}
//             >
//               Admin
//             </button>
//           </li>
//           */}
//         </ul>

//         <img src={menu_icon} alt="Menu" className="menu-icon" onClick={() => setMobileMenu(!mobileMenu)} />
//       </nav>

//       {showPopup && <Service closePopup={() => setShowPopup(false)} />}
//       {showAdminLogin && <AdminLogin closeModal={() => setShowAdminLogin(false)} />} {/* ✅ Admin login modal */}
//     </>
//   );
// };

// export default Navbar;














import './Navbar.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import React from 'react';
import Service from '../Services/Services';
import AdminLogin from '../AdminLogin/AdminLogin';
import logo from '../../assets/logo.png';
import menu_icon from '../../assets/menu-icon.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        setShowAdminLogin(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <nav className={`container 
          ${isHomePage && sticky ? 'dark-nav' : ''} 
          ${!isHomePage ? 'always-visible-nav' : ''} 
          ${sticky ? 'scrolled' : ''}`}
      >
        <img src={logo} alt="Logo" className='logo' onClick={handleHomeClick} style={{ cursor: 'pointer' }} />
        
        <ul className={mobileMenu ? 'mobile-menu' : 'hide-mobile-menu'}>
          
          {/* Common Items */}
          <li onClick={handleHomeClick} style={{cursor:'pointer'}}>Home</li>

          {/* Only show full menu if Home page */}
          {isHomePage && (
            <>
              <li><Link to="program" smooth={true} offset={-260} duration={500}>Program</Link></li>
              <li><Link to="about" smooth={true} offset={-150} duration={500}>About Us</Link></li>
              <li><Link to="campus" smooth={true} offset={-260} duration={500}>Gallery</Link></li>
              <li><Link to="testimonials" smooth={true} offset={-260} duration={500}>Testimonials</Link></li>
              <li><Link to="contact" smooth={true} offset={-260} duration={500}>Contact Us</Link></li>
            </>
          )}
          
          {/* Always show Sign In and Sign Up */}
          <li><NavLink to="/signin-options" className="btn">Log in</NavLink></li>
          <li><NavLink to="/signup" className="btn">Sign Up</NavLink></li>
          
        </ul>

        <img src={menu_icon} alt="Menu" className="menu-icon" onClick={() => setMobileMenu(!mobileMenu)} />
      </nav>

      {showPopup && <Service closePopup={() => setShowPopup(false)} />}
      {showAdminLogin && <AdminLogin closeModal={() => setShowAdminLogin(false)} />}
    </>
  );
};

export default Navbar;
