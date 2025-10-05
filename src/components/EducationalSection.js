import React, { useState } from "react";

export default function EducationalSection() {
  const [activeTab, setActiveTab] = useState("what");

  return (
    <section className="educational-section" id="about">
      <div className="educational-header">
        <h2 className="educational-title">
          <span className="title-icon">🌠</span>
          Understanding Exoplanets
        </h2>
        <p className="educational-subtitle">
          Discover how we identify and classify worlds beyond our solar system
        </p>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === "what" ? "active" : ""}`}
            onClick={() => setActiveTab("what")}
          >
            <span className="tab-icon">🪐</span>
            What are they?
          </button>
          <button 
            className={`tab ${activeTab === "how" ? "active" : ""}`}
            onClick={() => setActiveTab("how")}
          >
            <span className="tab-icon">🔍</span>
            How are they detected?
          </button>
          <button 
            className={`tab ${activeTab === "data" ? "active" : ""}`}
            onClick={() => setActiveTab("data")}
          >
            <span className="tab-icon">📊</span>
            Analyzed Data
          </button>
          <button 
            className={`tab ${activeTab === "ml" ? "active" : ""}`}
            onClick={() => setActiveTab("ml")}
          >
            <span className="tab-icon">🤖</span>
            Machine Learning
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "what" && (
            <div className="content-panel">
              <h3 className="content-title">What are Exoplanets?</h3>
              <div className="content-grid">
                <div className="content-card">
                  <div className="card-icon">🌍</div>
                  <h4>Definition</h4>
                  <p>
                    Exoplanets are planets that orbit stars outside our solar system. 
                    Since the first confirmed discovery in 1992, more than 5,400 exoplanets 
                    have been identified in our galaxy.
                  </p>
                </div>
                <div className="content-card">
                  <div className="card-icon">🔬</div>
                  <h4>Scientific Importance</h4>
                  <p>
                    Studying exoplanets helps us understand how planetary systems form, 
                    the possibility of extraterrestrial life, and the unique place Earth 
                    holds in the universe.
                  </p>
                </div>
                <div className="content-card">
                  <div className="card-icon">🌡️</div>
                  <h4>Types of Exoplanets</h4>
                  <p>
                    Gas giants like Jupiter, rocky super-Earths, mini-Neptunes with dense 
                    atmospheres, and planets in the habitable zone where liquid water 
                    could exist.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "how" && (
            <div className="content-panel">
              <h3 className="content-title">Detection Methods</h3>
              <div className="method-list">
                <div className="method-item">
                  <div className="method-number">1</div>
                  <div className="method-content">
                    <h4>Transit Method</h4>
                    <p>
                      The most used method by Kepler. When a planet passes in front of its 
                      star, it blocks a small fraction of light. By measuring this periodic 
                      dip in brightness, we can detect the planet and calculate its size 
                      and orbit.
                    </p>
                    <div className="method-stats">
                      <span>✓ Over 3,000 exoplanets discovered</span>
                      <span>✓ 0.01% brightness precision</span>
                    </div>
                  </div>
                </div>
                <div className="method-item">
                  <div className="method-number">2</div>
                  <div className="method-content">
                    <h4>Radial Velocity</h4>
                    <p>
                      Planets exert a small gravitational pull on their star, 
                      causing it to wobble — this motion is detected using the 
                      Doppler shift in the star’s light spectrum.
                    </p>
                  </div>
                </div>
                <div className="method-item">
                  <div className="method-number">3</div>
                  <div className="method-content">
                    <h4>Direct Imaging</h4>
                    <p>
                      With advanced telescopes, we can directly capture light 
                      reflected by giant planets far from bright stars.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="content-panel">
              <h3 className="content-title">Analyzed Parameters</h3>
              <div className="parameters-grid">
                <div className="parameter-category">
                  <h4 className="category-title">
                    <span className="category-icon">🪐</span>
                    Planetary Parameters
                  </h4>
                  <ul className="parameter-list">
                    <li>
                      <strong>Orbital Period (koi_period):</strong> Time the planet 
                      takes to complete one orbit around its star (days)
                    </li>
                    <li>
                      <strong>Planet Radius (koi_prad):</strong> Planet size 
                      relative to Earth (R⊕)
                    </li>
                    <li>
                      <strong>Equilibrium Temperature (koi_teq):</strong> Estimated 
                      surface temperature of the planet (Kelvin)
                    </li>
                    <li>
                      <strong>Insolation Flux (koi_insol):</strong> Amount of 
                      radiation received compared to Earth
                    </li>
                    <li>
                      <strong>Transit Depth (koi_depth):</strong> Fraction of light 
                      blocked during transit (ppm)
                    </li>
                  </ul>
                </div>
                <div className="parameter-category">
                  <h4 className="category-title">
                    <span className="category-icon">⭐</span>
                    Stellar Parameters
                  </h4>
                  <ul className="parameter-list">
                    <li>
                      <strong>Stellar Temperature (koi_steff):</strong> Temperature 
                      of the host star (Kelvin)
                    </li>
                    <li>
                      <strong>Stellar Radius (koi_srad):</strong> Size of the star 
                      relative to the Sun (R☉)
                    </li>
                    <li>
                      <strong>Surface Gravity (koi_slogg):</strong> Strength of the 
                      star’s gravitational field
                    </li>
                    <li>
                      <strong>Kepler Magnitude (koi_kepmag):</strong> Apparent 
                      brightness of the star as seen by Kepler
                    </li>
                  </ul>
                </div>
                <div className="parameter-category">
                  <h4 className="category-title">
                    <span className="category-icon">📡</span>
                    Quality Parameters
                  </h4>
                  <ul className="parameter-list">
                    <li>
                      <strong>Signal-to-Noise Ratio (koi_model_snr):</strong> 
                      Reliability of the transit detection
                    </li>
                    <li>
                      <strong>Transit Duration (koi_duration):</strong> Time the 
                      planet takes to pass in front of the star (hours)
                    </li>
                    <li>
                      <strong>Impact Parameter (koi_impact):</strong> Transit 
                      geometry (0 = central, 1 = grazing)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ml" && (
            <div className="content-panel">
              <h3 className="content-title">Machine Learning System</h3>
              <div className="ml-content">
                <div className="ml-overview">
                  <div className="ml-card">
                    <div className="ml-icon">🧠</div>
                    <h4>Algorithm</h4>
                    <p>Random Forest Classifier with 100 decision trees</p>
                    <div className="ml-metric">94% accuracy</div>
                  </div>
                  <div className="ml-card">
                    <div className="ml-icon">📚</div>
                    <h4>Dataset</h4>
                    <p>Over 9,000 Kepler Objects of Interest (KOIs)</p>
                    <div className="ml-metric">16 features</div>
                  </div>
                  <div className="ml-card">
                    <div className="ml-icon">🎯</div>
                    <h4>Classification</h4>
                    <p>Identifies confirmed candidates and false positives</p>
                    <div className="ml-metric">4 categories</div>
                  </div>
                </div>

                <div className="ml-process">
                  <h4 className="process-title">Classification Process</h4>
                  <div className="process-steps">
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h5>Preprocessing</h5>
                        <p>Data normalization and handling of missing values</p>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h5>Feature Extraction</h5>
                        <p>Selection of the 16 most relevant parameters</p>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h5>Prediction</h5>
                        <p>Classification through ensemble learning</p>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h5>Analysis</h5>
                        <p>Evaluation of habitability and characteristics</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="why-matters">
                  <h4>Why Does It Matter?</h4>
                  <div className="why-grid">
                    <div className="why-item">
                      <span className="why-icon">🔬</span>
                      <p>
                        <strong>Discovery:</strong> Helps identify patterns and 
                        characteristics that humans might overlook.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
