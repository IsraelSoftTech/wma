import React, { useEffect, useState } from "react";
import { FaRegFileAlt, FaUserAlt, FaBell ,FaVan, FaTaxi, FaCarSide, FaTrash, FaCheckCircle, FaTimesCircle, FaSpinner} from "react-icons/fa";
import { MdMenu, MdSearch, MdSend } from "react-icons/md";
import { BsExclamationTriangle } from "react-icons/bs";
import { FiTrash2, FiEdit, FiUsers } from "react-icons/fi";
import { FaRegCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./AdminReport.css";

// Import necessary components
import logo from "../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";

//abreviate username text
const firebaseUrl = "https://register-d6145-default-rtdb.firebaseio.com/users.json";

const abbreviateUsername = (username) => {
  const words = username.split("_"); // Split by underscore if present

  if (words.length >= 2) {
    return (words[0][0] +  words[1].slice(0, 2)).toUpperCase(); // First letter of first word + First two letters of second word
  } else {
    return username.slice(0, 3).toUpperCase(); // If only one word, take first 3 letters
  }
};


const AdminReport = () => {
  
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [isSearchVisible, setIsSearchVisible] = useState(false);
 
   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
   const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
   const navigate = useNavigate(); // Used for navigation
 
 
   const handleMenuClick = () => {
     setIsSidebarOpen((prev) => !prev);
   };
 
   const handleSearchClick = () => {
     setIsSearchVisible((prev) => !prev);
   };
   const toggleProfileDropdown = () => {
     setIsProfileDropdownOpen((prev) => !prev);
   };
 
   const handleLogout = () => {
     navigate("/"); // Redirect to Signin.jsx
   };
 
   const openEditProfile = () => {
     setIsEditProfileOpen(true);
     setIsProfileDropdownOpen(false);
   };
 
   const closeEditProfile = () => {
     setIsEditProfileOpen(false);
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
 // username display
 const [username, setUsername] = useState("Loading...");
 
 useEffect(() => {
   const fetchUsername = async () => {
     try {
       const response = await fetch(firebaseUrl);
       const users = await response.json();
 
       if (users) {
         const loggedInUser = Object.values(users).find(user => user.role === "admin");
 
         if (loggedInUser) {
           setUsername(abbreviateUsername(loggedInUser.username));
         }
       }
     } catch (error) {
       console.error("Error fetching username:", error);
     }
   };
 
   fetchUsername();
 }, []);
 
   return (
     <div className="dashboard-container">
       {/* Sidebar */}
       <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
         <div className="logo">
           <span className="logo-icon"><img src={logo} alt=""/></span>
         </div>
         <ul className={`nav-links ${isSidebarOpen ? "active" : ""}`}>
   <li>
     <Link to="/admin-dashboard" className="link">
       <MdDashboard className="icon" /> Dashboard
     </Link>
   </li>
   <li>
     <Link to="/report" className="active link">
       <FaRegFileAlt className="icon" /> Report
     </Link>
   </li>
   <li>
     <Link to="/schedule" className="link">
       <FaRegCalendarAlt className="icon" /> Schedule
     </Link>
   </li>
   <li>
     <Link to="/education" className="link">
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
           <div className={`search-box-mobile ${isSearchVisible ? "active" : ""}`}>
             <MdSearch className="search-icon-mobile" onClick={handleSearchClick} />
             <input type="text" placeholder="Place a search" />
           </div>
           <div className="search-box">
             <MdSearch className="search-icon" />
             <input type="text" placeholder="Place a search" />
           </div>
           <div className="top-icons">
             <FaBell className="icon bell" />
             <div className="notification-badge"></div>
             <div className="profile-container">
             <div className="text-profile" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
       <FaUserAlt className="profile-icon" onClick={toggleProfileDropdown} />
       <p style={{ textAlign: "center", fontSize: "14px", color: "#23AE60" }}>{username}</p>
     </div>
               {isProfileDropdownOpen && (
                 <div className="profile-dropdown">
                   <p onClick={openEditProfile}>Edit Profile</p>
                   <p onClick={handleLogout}>Logout</p>
                 </div>
               )}
             </div>
           </div>
         </header>
         {/* Edit Profile Modal */}
         {isEditProfileOpen && (
           <div className="modal-overlay">
             <div className="modal-content">
               <h3 style={{color:"black"}}>Edit Profile</h3>
               <label style={{color:"black"}}>Username:</label>
               <input type="text" value="admin_account" readOnly  style={{color:"black"}}/>
               <label style={{color:"black"}}>Password:</label>
               <input type="text" value="admin_password" readOnly style={{color:"black"}}/>
               <button className="close-btn" onClick={closeEditProfile} style={{color:"black"}}> 
                 Close
               </button>
             </div>
           </div>
         )}
 
 <section className="stats-section">
       <div className="stat-card">
         <BsExclamationTriangle className="icon" style={{color:"rgb(218, 164, 47)"}}/>
         <h3>Illegal Dumpsites</h3>
         <p>21</p>
       </div>
       <div className="stat-card">
         <FaCarSide className="icon" style={{color:"red"}}/>
         <h3>Missed Reports</h3>
         <p>12</p>
       </div>
       <div className="stat-card">
         <FaTrash className="icon" style={{color:"rgb(218, 164, 47)"}} />
         <h3>Overflowing Dumpsites</h3>
         <p>10</p> 
       </div>
       <div className="stat-card">
         <FaTimesCircle className="icon" style={{color:"yellow"}}/>
         <h3>Unresolved Reports</h3>
         <p>10</p> 
       </div>
       <div className="stat-card">
         <FaSpinner className="icon" style={{color:"#23AE60"}}/>
         <h3>In-Progress Reports</h3>
         <p>10</p> 
       </div>
       <div className="stat-card">
         <FaCheckCircle className="icon" style={{color:"#23AE60"}}/>
         <h3>Resolved Reports</h3>
         <p>10</p> 
       </div>
     </section>
 
 
 
         {/* Reports of submission*/}
       
        
          <section className="user-illegal-report">
        
           <div className="user-box" style={{height:"350px"}}>
             <h3 style={{alignItems:"center",display:"flex",gap:"15px"}} >Summary of Submitted Reports < MdSend /> </h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

            <tr>
            <td>001Re</td>
            <td>John Do...</td>
            <td>Illegal Du...</td>
            <td>Mile 4</td>
            <td style={{background:"brown",padding:"2px",borderRadius:"3px"}}>pending</td>
            <td>04/02/2025</td>
            <td>
                  <div className="editDel">
                  <FaCheckCircle className="resolve-icon" style={{color:"#23AE60",fontSize:"20px",cursor:"pointer"}}/>
                    <FiEdit className="edit-icon"/>
                    <FiTrash2 className="delete-icon"/>
              
                  </div>
                </td>
                </tr>
            <tr>
            <td>002Re</td>
            <td>James Bu...</td>
            <td>Dump Repor...</td>
            <td>Mile 90</td>
            <td style={{background:"#23AE60",padding:"2px",borderRadius:"3px"}}>resolved</td>
            <td>05/02/2025</td>
            <td>
                  <div className="editDel">
                  <FaCheckCircle className="resolve-icon" style={{color:"#23AE60",fontSize:"20px",cursor:"pointer"}}/>
                    <FiEdit className="edit-icon"/>
                    <FiTrash2 className="delete-icon"/>
              
                  </div>
                </td>
                </tr>

          </thead>
          <tbody>
           
          </tbody>
        </table>
    

           </div>
         </section>
 
      
       </main>
     </div>
   );
 };
 
export default AdminReport;
