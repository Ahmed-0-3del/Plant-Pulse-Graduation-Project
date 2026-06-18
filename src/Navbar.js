/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadProfileImage } from "./api/apiService";

function Navbar() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const img = localStorage.getItem("profileImage") || loadProfileImage(email);
    if (img) setProfileImg(img);

    const handler = () => {
      const e = localStorage.getItem("userEmail");
      const i = localStorage.getItem("profileImage") || loadProfileImage(e);
      setProfileImg(i || null);
    };
    window.addEventListener("profileImageUpdated", handler);
    return () => window.removeEventListener("profileImageUpdated", handler);
  }, []);

  return (
    <div>
      <nav>
        <Link to="/" className="logo">
          <img src="/Materials/Logo.png" alt="PlantPulse" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/scan-now"
              className={location.pathname === "/scan-now" ? "active" : ""}
            >
              Scan Now
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <Link to="/profile" className="nav-user">
            <div className="nav-avatar">
              <img
                src={profileImg || "/Materials/Frame-1525-1.png"}
                alt="Profile Picture"
              />
            </div>
          </Link>
        ) : (
          <Link to="/login" className="nav-user">
            <button
              style={{
                background: "#399B25",
                border: "none",
                color: "#fff",
                borderRadius: "8px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Login
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
