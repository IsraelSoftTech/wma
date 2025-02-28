import React, { useEffect, useState } from "react";
import { FaRegFileAlt, FaUserAlt, FaBell ,FaVan, FaTaxi, FaCarSide, FaTrash, FaCheckCircle, FaTimesCircle, FaSpinner, FaTruckPickup} from "react-icons/fa";
import { MdMenu, MdSearch, MdSend } from "react-icons/md";
import { BsExclamationTriangle } from "react-icons/bs";
import { FaRegCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./UserDash.css";

// Import necessary components
import logo from "../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";




const UserDash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [isSearchVisible, setIsSearchVisible] = useState(false);
 

   const navigate = useNavigate(); // Used for navigation
 
 
   const handleMenuClick = () => {
     setIsSidebarOpen((prev) => !prev);
   };
 
   
   
 // graph
 const data = {
   labels: ["Jan", "Feb", "Mar", "Apr", "May"],
   datasets: [
     {
       label: "Reports Analysis",
       data: [10, 25, 15, 30, 40], // Adjust these values to match the image trend
       backgroundColor: "#23AE60",
       color:"#fff",
       borderColor: "#fff",
       fill: true,
       tension: 0.4, // Curve effect
     },
   ],
 };
 
 const options = {
   responsive: true,
   maintainAspectRatio: false,
   scales: {
     y: { beginAtZero: true },
   },
 };
 
 
   return (
     <div className="dashboard-container">
       {/* Sidebar */}
       <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
         <div className="logo">
           <span className="logo-icon"><img src={logo} alt=""/></span>
         </div>
         <ul className={`nav-links ${isSidebarOpen ? "active" : ""}`}>
   <li>
     <Link to="/user-dashboard" className="active link">
       <MdDashboard className="icon" /> Dashboard
     </Link>
   </li>
   <li>
     <Link to="" className="link">
       <FaRegFileAlt className="icon" /> Report
     </Link>
   </li>
   <li>
     <Link to="" className="link">
       <FaRegCalendarAlt className="icon" /> Schedule
     </Link>
   </li>
   <li>
     <Link to="" className="link">
       <FaGraduationCap  className="icon" /> Education
     </Link>
   </li>
  
 </ul>
       </aside>
 
       {/* Main Content */}
       <main className="main-content">
       <header className="topbar">
         
           <h2>WASTE MANAGEMENT APPLICATION</h2>
           <MdMenu className="menu-icon" onClick={handleMenuClick} />
           <div className="search-box">
             <MdSearch className="search-icon" />
             <input type="text" placeholder="Place a search" />
           </div>
           <div className="top-icons">
             <FaBell className="icon bell" />
             <div className="notification-badge"></div>
             <div className="profile-container">
           
       <FaUserAlt className="profile-icon"/>
     
             </div>
           </div>
         </header>
         
 <section className="stats-section">
       <div className="stat-card">
         <BsExclamationTriangle className="icon" style={{color:"white",background:"#23AE60",padding:"5px",fontSize:"40px",borderRadius:"4px"}}/>
         <h3>Total Reports</h3>
         <p>21</p>
       </div>
       <div className="stat-card">
         <FaTruckPickup className="icon" style={{color:"white",background:"#23AE60",padding:"5px",fontSize:"40px",borderRadius:"4px"}}/>
         <h3>Pending Pick-ups</h3>
         <p>12</p>
       </div>
       <div className="stat-card">
         <FaTrash className="icon" style={{color:"white",background:"#23AE60",padding:"5px",fontSize:"40px",borderRadius:"4px"}}/>
         <h3>Completed Pick-ups</h3>
         <p>10</p> 
       </div>
    
     </section>
 
 
 
         {/* Reports of submission*/}
       
        
          <section className="user-illegal">
        
           <div className="user-box" style={{display:"grid",gap:"4px"}}>
             <h3>Recent Reports</h3>
             <ul>
             <div className="recent-reports">
              <div className="left-recent">
<FaTrash className="left-recent-icon"/>
<div className="left-recent-text">
  <p>Pastic Waste</p>
  <p className="location-text">Mile 4</p>
</div>
              </div>
              <p className="recent-report-pending">pending</p>
             </div>
             </ul>

             <ul>
             <div className="recent-reports">
              <div className="left-recent">
<FaTrash className="left-recent-icon"/>
<div className="left-recent-text">
  <p>Electronic Waste</p>
  <p className="location-text">City Chemist</p>
</div>
              </div>
              <p className="recent-report-progress">in progress</p>
             </div>
             </ul>
             <ul>
             <div className="recent-reports">
              <div className="left-recent">
<FaTrash className="left-recent-icon"/>
<div className="left-recent-text">
  <p>Pastic Waste</p>
  <p className="location-text">Mile 4</p>
</div>
              </div>
              <p className="recent-report-pending">pending</p>
             </div>
             </ul>

           </div>
           {/* ------------------------------------------ */}
           <div className="user-box" style={{display:"grid",gap:"4px"}} >
             <h3>Up Coming Pick-ups </h3>
             <ul>
              <div className="upcoming-pickup">
                <div className="right-upcoming">
                  <FaTruckPickup className="right-upcoming-icon"/>
                  <div className="right-upcoming-text">
                    <p>General Wastes</p>
                    <p className="time-text">12/09/2025</p>
                  </div>
                  
                </div>
                <p className="upcoming-report-schedule">scheduled</p>
              </div>
             </ul>
             <ul>
              <div className="upcoming-pickup">
                <div className="right-upcoming">
                  <FaTruckPickup className="right-upcoming-icon"/>
                  <div className="right-upcoming-text">
                    <p>Recyclable wastes</p>
                    <p className="time-text">13/09/2025</p>
                  </div>
                  
                </div>
                <p className="upcoming-report-not-scheduled">not scheduled</p>
              </div>
             </ul>
           </div>
         </section>
 
      
       </main>
     </div>
   );
 };

export default UserDash
