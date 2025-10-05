import React from "react";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="logo-section">
          <div className="logo-icon">🔭</div>
          <div className="logo-text">
            <h1 className="logo-title">EXOPLANET EXPLORER</h1>
            <p className="logo-subtitle">Advanced exoplanet classification system using machine learning 
            and data from NASA's Kepler mission</p>
          </div>
        </div>
        
        <nav className="header-nav">
          <a href="#about" className="nav-link">
            <span className="nav-icon"></span>
             About
          </a>
          <a href="#analysis" className="nav-link">
            <span className="nav-icon"></span>
            Analysis
          </a>
        </nav>
      </div>
      

    </header>
  );
}