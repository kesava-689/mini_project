import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import About from "./Components/About/About";
import Gallery from "./Components/Gallery/Gallery";
import Contact from "./Components/Contact/Contact";
import DonorLogin from "./Components/DonorLogin/DonorLogin";
import FoodWasteInitiative from "./Components/FoodWasteInitiative/FoodWasteInitiative";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import Mission_Vision from "./Components/Mission_Vision/Mission_Vision";
import Navbar from "./Components/Navbar/Navbar";
import PartnerLogin from "./Components/PartnerLogin/PartnerLogin";
import Programs from "./Components/Programs/Programs";
import SignInOptions from "./Components/SignInOptions/SignInOptions";
import Testimonials from "./Components/Testimonials/Testimonials";
import Title from "./Components/Title/Title";
import Vedioplayer from "./Components/Vedioplayer/Vedioplayer";
import VolunteerLogin from "./Components/VolnteerLogin/VolunteerLogin";
import Signup from "./Components/Signup/Signup";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard"; // ✅ Added
import AdminSettings from './Components/AdminDashboard/AdminSettings/AdminSettings';
import Reports from './Components/AdminDashboard/Reports/Reports';
import Donations from './Components/AdminDashboard/Donations/Donations';
import ManageUsers from './Components/AdminDashboard/ManageUsers/ManageUsers';
import DonorPage from "./Components/Donor/DonorPage";
import VolunteerPage from "./Components/Volunteer/VolunteerPage";
import PartnerPage from "./Components/Partner/PartnerPage";
import ReceiverDashboard from "./Components/Partner/ReceiverDashboard";
import DonationsDashboard from "./Components/Partner/DonationDashboard";
import RequestApproval from "./Components/AdminDashboard/RequestApproval/RequestApproval";
import GalleryFull from './Components/Gallery/GalleryFull';
import AboutFoodWaste from "./Components/Hero/AboutWebsite";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/partner-dashboard","/admin-dashboard","/donorpage","/volunteerpage","/receiver-dashboard","/donation-dashboard",];
  const [playState, setPlayState] = useState(false);

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div className="container">
                <Mission_Vision />
                <Title subtitle="Our Program" title="What We Offer" />
                <Programs />
                <FoodWasteInitiative />
                <About setPlayState={setPlayState}  title="About Us"/>
                <Title subtitle="Gallery" title="Program Photos" />
                <Gallery />
                <Title subtitle="Testimonials" title="What People Say" />
                <Testimonials />
                <Title subtitle="Contact Us" title="Get in Touch" />
                <Contact />
              </div>
              <Vedioplayer playState={playState} setPlayState={setPlayState} />
            </>
          }
        />
        <Route path="/about" element={<AboutFoodWaste />} />
        <Route path='/gallery-full' element={<GalleryFull />} />
        <Route path="/signin-options" element={<SignInOptions />} />
        <Route path="/volunteer" element={<VolunteerLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/donor" element={<DonorLogin />} />
        <Route path="/partner" element={<PartnerLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/donations" element={<Donations />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/donorpage" element={<DonorPage/>}/>
        <Route path="/volunteerpage" element={<VolunteerPage/>}/>
        <Route path="/partner-page" element={<PartnerPage />} />
        <Route path="/donation-dashboard" element={<DonationsDashboard />} />
        <Route path="/receiver-dashboard" element={<ReceiverDashboard />} />
        <Route path="/admin/RequestApproval" element={<RequestApproval />} />
        
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;