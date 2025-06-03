// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import footerAppLogo from "../assets/icons/Logo.png"; // Assurez-vous que ce chemin est correct

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section footer-logo-section">
          <Link to="/" className="footer-logo-link">
            {" "}
            <img
              src={footerAppLogo}
              alt="FruitVision AI Logo"
              className="footer-logo-image"
            />
          </Link>
          {/* Le texte a été supprimé, mais vous pourriez le rajouter à côté si désiré */}
        </div>

        <div className="footer-section footer-copyright-links">
          <p>Copyright By FruitVision AI {currentYear}</p>
          <span className="separator">|</span>
          <Link to="/mentions-legales" className="footer-link">
            Mentions légales
          </Link>
        </div>

        <div className="footer-section footer-social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>

        <div className="footer-section footer-scroll-top">
          <button onClick={scrollToTop} aria-label="Retour en haut de la page">
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
