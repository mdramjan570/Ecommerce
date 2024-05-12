import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
import instragam_icon from "../Assets/instagram_icon.png";
import printerest_icon from "../Assets/pintester_icon.png";
import whatapp_icon from "../Assets/whatsapp_icon.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Office</li>
        <li>About</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
          <img src={instragam_icon} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={printerest_icon} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={whatapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
