import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaGlobeAmericas, FaBars, FaTimes } from "react-icons/fa";

import appLogo from "../assets/icons/logo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  const handleAnalyzeClick = () => {
    navigate("/analyze");
    setIsMenuOpen(false);
  };

  const scrollToOurTool = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);
    if (location.pathname === "/") {
      event.preventDefault();
      const section = document.getElementById("our-tool-section-target");
      if (section) {
        const navbarHeight = navbarRef.current?.offsetHeight || 70;
        const offset = 20;
        const sectionTop =
          section.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight -
          offset;
        window.scrollTo({ top: sectionTop, behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home and then scroll (or just navigate to the hash)
      navigate("/#our-tool-section-target");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        // Breakpoint from CSS
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={`navbar-weefizz-style ${isScrolled ? "scrolled" : ""}`}
    >
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={appLogo} alt="FruitVision AI Logo" className="logo-image" />
        </Link>

        <div
          className="navbar-burger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/#our-tool-section-target" onClick={scrollToOurTool}>
              Notre Outil
            </Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link
              to="/catalog"
              className={location.pathname === "/catalog" ? "active" : ""}
            >
              Catalogue
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <div
            className="language-selector"
            onClick={() => {
              alert("Fonctionnalité de langue à implémenter");
              setIsMenuOpen(false);
            }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter")
                alert("Fonctionnalité de langue à implémenter");
            }}
          >
            <FaGlobeAmericas className="globe-icon" /> FR{" "}
            <span className="arrow-down">▼</span>
          </div>
          <button onClick={handleAnalyzeClick} className="navbar-cta-button">
            Analyser Maintenant
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
