import React, { useEffect, useState } from "react";
import { FaRegFileAlt, FaUserAlt, FaBell,  FaCheckCircle, FaTimesCircle, FaTruckPickup, FaSpinner, FaPaperPlane } from "react-icons/fa";
import { MdMenu, MdSearch} from "react-icons/md";
import ws1 from "../../assets/ws1.jpeg"
import ws2 from "../../assets/ws2.jpg"
import { FaRegCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./UserReport.css";

// Import necessary components
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const firebaseUrl = "https://register-d6145-default-rtdb.firebaseio.com/users.json";

const UserReport = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // New states for profile and modals
  const [profile, setProfile] = useState({ username: "", email: "", password: "" });
  const [profileKey, setProfileKey] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Fetch the logged in user's profile from firebase using the stored username
  useEffect(() => {
    const fetchProfile = async () => {
      const storedUsername = localStorage.getItem("username");
      if (!storedUsername) return;
      try {
        const response = await fetch(firebaseUrl);
        const data = await response.json();
        if (data) {
          for (let key in data) {
            if (data[key].username === storedUsername) {
              setProfile(data[key]);
              setProfileKey(key);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  // Save updated settings to firebase
  const handleSaveSettings = async () => {
    try {
      const response = await fetch(`https://register-d6145-default-rtdb.firebaseio.com/users/${profileKey}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        alert("Profile updated successfully");
        setIsSettingsModalOpen(false);
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="logo">
          <span className="logo-icon">
            <img src={logo} alt="" />
          </span>
        </div>
        <ul className={`nav-links ${isSidebarOpen ? "active" : ""}`}>
          <li>
            <Link to="/user-dashboard" className="link">
              <MdDashboard className="icon1" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/user-report" className="active link">
              <FaRegFileAlt className="icon1" /> Report
            </Link>
          </li>
          <li>
            <Link to="" className="link">
              <FaRegCalendarAlt className="icon1" /> Schedule
            </Link>
          </li>
          <li>
            <Link to="" className="link">
              <FaGraduationCap className="icon1" /> Education
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
            <FaBell className="icon1 bell" />
            <div className="notification-badge">1</div>
            {/* Profile container now fetches the username from firebase and opens the profile modal on click */}
            <div className="profile-container" onClick={() => setIsProfileModalOpen(true)}>
              <FaUserAlt className="profile-icon" />
              <p style={{ textAlign: "center", fontSize: "14px", color: "#FE7235", marginLeft: "4px" }}>
                {profile.username || "User"}
              </p>
            </div>
          </div>
        </header>

        <section className="stats-section">
          <div className="stat-card">
            <FaRegFileAlt className="icon" style={{ color: "rgb(77, 76, 76)", background: "#e2e4e3", padding: "7px", fontSize: "40px", borderRadius: "50%" }} />
            <h3>Total Reports</h3>
            <p>21</p>
          </div>
          <div className="stat-card">
            <FaTruckPickup className="icon" style={{ color: "rgb(77, 76, 76)", background: "#e2e4e3", padding: "7px", fontSize: "40px", borderRadius: "50%" }}  />
            <h3>Pending Pick-ups</h3>
            <p>12</p>
          </div>
          <div className="stat-card">
            <FaCheckCircle className="icon" style={{ color: "rgb(77, 76, 76)", background: "#e2e4e3", padding: "7px", fontSize: "40px", borderRadius: "50%" }}  />
            <h3>Completed Pick-ups</h3>
            <p>10</p>
          </div>
        </section>

        {/* Reports of submission */}
        <section className="user-illegal">
          <div className="user-box">
         <h3>Report a waste</h3>

         <form className="report-waste-form">
<label for="type"><h4>Type of Waste:</h4></label>
<select>
    <option>Plastic</option>
    <option>organic</option>
    <option>metallic</option>
    <option>glass</option>
    <option>paper</option>
    <option>electronic</option>
    <option>hazardous</option>
    <option>textile</option>
</select>


<label for="description"><h4>Description:</h4></label>
<textarea id="description" placeholder="Describe the waste issue..." required></textarea>

<label for="image"><h4>Upload Image:</h4></label>
<input type="file" id="image" accept="image/*" required/>
<label for="location"><h4>Pick Location:</h4></label>
            <input type="text" id="location" placeholder="Click to select location"  readonly/>

            <button type="submit">Submit Report</button>
         </form>
        

          </div>
          {/* ------------------------------------------ */}

          <div className="user-box">
           
        
        <h3>Report Status</h3>
        <div className="status-steps">
          <div className="step completed">

            <FaPaperPlane className="status-tract"/>
            <span className="step-number">11</span>
            <p>Submitted</p>
          </div>
          <div className="step in-progress">
            <FaSpinner className="status-tract"/>
            <span className="step-number">3</span>
            <p>In Progress</p>
          </div>
          <div className="step pending">
            <FaCheckCircle className="status-tract"/>
            <span className="step-number">7</span>
            <p>Resolved</p>
          </div>
        </div>
    
            
          </div>
{/* -------------------------------------------------------------------- */}
<div className="user-box-img">
     
           
          <div className="waste-img">
            <img src={ws1} alt=""/>
          </div>
          
          </div>
          {/* ------------------------------------------ */}
          <div className="user-box-img">
      
           
          <div className="waste-img">
            <img src={ws2} alt=""/>
          </div>
          
          </div>
          {/* ------------------------------------------ */}

{/* --------------------------------------------------------------------------- */}
        </section>
      </main>

      {/* Profile Options Modal */}
      {isProfileModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-user">
            <h3>Profile Options</h3>
            <div className="modal-option-buttons">
              <button
                onClick={() => {
                  setIsSettingsModalOpen(true);
                  setIsProfileModalOpen(false);
                }}
              >
                Settings
              </button>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <button onClick={() => setIsProfileModalOpen(false)} className="close-modal">
              <FaTimesCircle />
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-user">
            <h3>Edit Profile</h3>
            <label>Username</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
            <label>Email</label>
            <input
              type="email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <label>Password</label>
            <input
              type="password"
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleSaveSettings}>
                <FaCheckCircle />
              </button>
              <button onClick={() => setIsSettingsModalOpen(false)}>
                <FaTimesCircle />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReport;
