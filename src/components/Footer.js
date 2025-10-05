import React from "react";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Sobre el Proyecto</h3>
          <p className="footer-text">
            Advanced exoplanet classification system using Machine Learning 
and data from NASA's Kepler mission. Our mission is to democratize 
access to astronomical knowledge.
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
            Team: Radiación X
          </p>
         <p className="footer-text">
            <strong>Contacto:</strong><br />
            Amelie Grob - <a href="mailto:agrob@pucese.edu.ec">agrob@pucese.edu.ec</a><br />
            Eliana Lucas - <a href="mailto:emlucas@pucese.edu.ec">emlucas@pucese.edu.ec</a><br />
            Fátima Quintero - <a href="mailto:fdquintero@pucese.edu.ec">fdquintero@pucese.edu.ec</a><br />
            Mateo Quintero - <a href="mailto:mateo.quinteror2022@gmail.com">mateo.quinteror2022@gmail.com</a><br />
            <span style={{ color: "#888" }}>
                Andy Torres y Andrés Carvajal: <em>¡No hicieron nada! <span role="img" aria-label="carcajada">😂</span></em>
            </span>
        </p>

        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 Exoplanet Explorer. Developed with a passion for astronomy. 
          The data is in the public domain from NASA.
        </p>
        <div className="footer-stats">
          <span>🌍 5,437 exoplanets</span>
          <span>⭐ 3,892 stellar systems</span>
          <span>🔬 1,289 analyses performed</span>
        </div>
      </div>
    </footer>
  );
}