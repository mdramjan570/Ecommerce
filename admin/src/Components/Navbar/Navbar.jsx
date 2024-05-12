import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/logo.png";
import { FaAngleDown } from "react-icons/fa6";
import profile from "../../assets/Ramjan.jpg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-main">
        <div className="left-logo">
          <img src={navlogo} alt="" />
          <div className="logo-text">
            <h1>SHOPPER</h1>
            <p>Admin Panel</p>
          </div>
        </div>
        <div className="right-logo">
          <img src={profile} alt="" />
          <p>
            <FaAngleDown size={20} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
