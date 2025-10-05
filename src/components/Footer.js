import React from "react";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Sobre el Proyecto</h3>
          <p className="footer-text">
            Sistema avanzado de clasificación de exoplanetas utilizando Machine Learning 
            y datos de la misión Kepler de la NASA. Nuestra misión es democratizar 
            el acceso al conocimiento astronómico.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Fuentes de Datos</h3>
          <ul className="footer-links">
            <li><a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noopener noreferrer">NASA Exoplanet Archive</a></li>
            <li><a href="https://www.nasa.gov/mission_pages/kepler/main/index.html" target="_blank" rel="noopener noreferrer">Kepler Mission</a></li>
            <li><a href="https://tess.mit.edu/" target="_blank" rel="noopener noreferrer">TESS Mission</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Tecnologías</h3>
          <div className="tech-badges">
            <span className="tech-badge">React</span>
            <span className="tech-badge">Python</span>
            <span className="tech-badge">FastAPI</span>
            <span className="tech-badge">Scikit-learn</span>
            <span className="tech-badge">Three.js</span>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contacto</h3>
          <p className="footer-text">
            ¿Interesado en colaborar o tienes preguntas?
          </p>
          <div className="social-links">
            <a href="#" className="social-link" title="GitHub">💻</a>
            <a href="#" className="social-link" title="LinkedIn">🔗</a>
            <a href="#" className="social-link" title="Email">📧</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 Exoplanet Explorer. Desarrollado con pasión por la astronomía. 
          Los datos son de dominio público de NASA.
        </p>
        <div className="footer-stats">
          <span>🌍 5,437 exoplanetas</span>
          <span>⭐ 3,892 sistemas estelares</span>
          <span>🔬 1,289 análisis realizados</span>
        </div>
      </div>
    </footer>
  );
}