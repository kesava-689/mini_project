import React, { useState } from "react";
import DonorNavbar from "./Pages/DonorNavbar"; // if you're using it
import DonorDashboardLayout from "./Pages/DonorDashboardLayout";
import "./DonorPage.css";
import DonateFood from "./Pages/DonateFood";
import ViewDonations from "./Pages/viewDonations";
import HistoryExport from "./Pages/HistoryExport";
import DonorNotifications from "./Pages/DonorNotifications";
import UpdatePassword from "./Pages/UpdatePassword";
import DonorChat from "./Pages/DonorChat";

const DonorPage = () => {
  const [selectedFunctionality, setSelectedFunctionality] = useState("Donate Food");

  const renderContent = () => {
    switch (selectedFunctionality) {
      case "Donate Food":
        return <DonateFood />;
      case "View My Donations":
        return <ViewDonations/>;
      case "Edit Profile":
        return <UpdatePassword/>;
      case "Notifications":
        return <DonorNotifications/>;
      case "Messages / Chat":
        return <DonorChat/>
      case "History Export":
        return <HistoryExport/>
      case "Logout":
        localStorage.clear();
        window.location.href = "/signin-options";
        return null;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="donor-page-container">
    <div className="donor-navbar">
      <DonorNavbar />
    </div>
      <div className="donor-main">
        <DonorDashboardLayout onSelect={setSelectedFunctionality} />
        <div className="donor-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DonorPage;
