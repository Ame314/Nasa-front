import React from "react";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="logo-section">
          <div className="logo-icon">🔭</div>
          <div className="logo-text">
            <h1 className="logo-title">EXOPLANET EXPLORER</h1>
            <p className="logo-subtitle">Advanced Planetary Classification System</p>
          </div>
        </div>
        
        <nav className="header-nav">
          <a href="#about" className="nav-link">
            <span className="nav-icon">📚</span>
            Acerca de
          </a>
          <a href="#analysis" className="nav-link">
            <span className="nav-icon">🔬</span>
            Análisis
          </a>
          <a href="#data" className="nav-link">
            <span className="nav-icon">📊</span>
            Datos
          </a>
        </nav>
      </div>
      
      <div className="header-banner">
        <div className="banner-content">
          <span className="banner-icon">🌌</span>
          <p className="banner-text">
            Explorando los confines del universo • Más de 5,400 exoplanetas catalogados • 
            Sistema de Machine Learning con 94% de precisión
          </p>
          <span className="banner-icon">🚀</span>
        </div>
      </div>
    </header>
  );
}