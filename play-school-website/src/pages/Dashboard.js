import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/footer";
import SideNavbar from "../components/SideNavbar";
import GalleryAdmin from "../components/GalleryAdmin";
import "../styles/Dashboard.css"; // Import the CSS file
import AboutAdmin from "../components/AboutAdmin";
import NewsAdmin from "../components/NewsAdmin";
import FaqAdmin from "../components/FaqAdmin";
import HomeAdmin from "../components/HomeAdmin";
import ContactAdmin from "../components/ContactAdmin";


const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard"); // State to track active component

  useEffect(() => {
    // Function to handle JWT removal
    const handleLogout = () => {
      localStorage.removeItem("token");
      console.log("JWT removed from localStorage");
    };

    // Attach event listeners
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleLogout(); // Remove JWT when tab becomes hidden
      }
    };

    window.addEventListener("beforeunload", handleLogout);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleLogout);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Function to handle component switching
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="dashboard-page">
      <AdminNavbar />
      <div className="dashboard-layout">
        <SideNavbar onComponentChange={handleComponentChange} />
        <div className="dashboard-container">
          {activeComponent === "dashboard" && <h1>Welcome to the Admin Dashboard</h1>}
          {activeComponent === "gallery" && <GalleryAdmin />}
          {activeComponent === "about" && <AboutAdmin />}
          {activeComponent === "news" && <NewsAdmin />}
          {activeComponent === "faqs" && <FaqAdmin />}
          {activeComponent === "home" && <HomeAdmin />}
          {activeComponent === "contact" && <ContactAdmin />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
