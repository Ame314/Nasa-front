import React from "react";
import MiniPlanet3D from "./MiniPlanet3D";

export default function AnalysisPanel({ inputs }) {
  // Function to analyze the input data
  const analyzeInputs = () => {
    const analysis = {
      planetType: "",
      habitability: "",
      orbitType: "",
      stellarType: "",
      detectionQuality: "",
      insights: [],
      warnings: [],
      characteristics: []
    };

    // Planet Radius Analysis (koi_prad)
    if (inputs.koi_prad) {
      if (inputs.koi_prad < 0.5) {
        analysis.planetType = "Sub-Earth (Mercury-like)";
        analysis.insights.push("🪨 Small rocky planet, likely with a thin atmosphere");
      } else if (inputs.koi_prad < 1.5) {
        analysis.planetType = "Earth-like / Super-Earth";
        analysis.characteristics.push({ label: "Size", value: "Similar to Earth", icon: "🌍" });
        analysis.insights.push("🌍 Comparable size to Earth, possibly rocky");
      } else if (inputs.koi_prad < 4) {
        analysis.planetType = "Mini-Neptune";
        analysis.characteristics.push({ label: "Size", value: "Between Earth and Neptune", icon: "🔵" });
        analysis.insights.push("💨 Medium-sized planet, likely with a dense atmosphere");
      } else {
        analysis.planetType = "Gas Giant (Jupiter-like)";
        analysis.characteristics.push({ label: "Size", value: "Gas Giant", icon: "🪐" });
        analysis.insights.push("🪐 Massive planet, mostly composed of gas");
      }
    }

    // Temperature Analysis (koi_teq)
    if (inputs.koi_teq) {
      const temp = inputs.koi_teq;
      if (temp > 1000) {
        analysis.habitability = "❌ Uninhabitable – Extremely Hot";
        analysis.characteristics.push({ label: "Temperature", value: `${temp}K (Oven-like)`, icon: "🔥" });
        analysis.warnings.push("⚠️ Temperature above 1000K – Surface likely molten");
      } else if (temp > 600) {
        analysis.habitability = "❌ Uninhabitable – Very Hot";
        analysis.characteristics.push({ label: "Temperature", value: `${temp}K (Venusian)`, icon: "🌡️" });
        analysis.warnings.push("⚠️ Similar to Venus – Extreme greenhouse effect");
      } else if (temp >= 273 && temp <= 373) {
        analysis.habitability = "✅ Habitable Zone – Liquid Water Possible";
        analysis.characteristics.push({ label: "Temperature", value: `${temp}K (Temperate)`, icon: "💧" });
        analysis.insights.push("🎯 Ideal temperature range for liquid water on the surface");
      } else if (temp < 200) {
        analysis.habitability = "❌ Uninhabitable – Extremely Cold";
        analysis.characteristics.push({ label: "Temperature", value: `${temp}K (Frozen)`, icon: "❄️" });
        analysis.warnings.push("⚠️ Below freezing point – Likely an icy world");
      } else {
        analysis.habitability = "⚠️ Marginal Zone";
        analysis.characteristics.push({ label: "Temperature", value: `${temp}K`, icon: "🌡️" });
      }
    }

    // Orbital Period Analysis (koi_period)
    if (inputs.koi_period) {
      const period = inputs.koi_period;
      if (period < 1) {
        analysis.orbitType = "Ultra-Short Orbit (< 1 day)";
        analysis.characteristics.push({ label: "Orbit", value: `${period.toFixed(2)} days`, icon: "⚡" });
        analysis.insights.push("⚡ Extremely fast orbit – Very close to its star");
      } else if (period < 10) {
        analysis.orbitType = "Close Orbit (1–10 days)";
        analysis.characteristics.push({ label: "Orbit", value: `${period.toFixed(1)} days`, icon: "🔄" });
        analysis.insights.push("🔄 Short orbit – Inner planet like Mercury");
      } else if (period < 365) {
        analysis.orbitType = "Medium Orbit (10–365 days)";
        analysis.characteristics.push({ label: "Orbit", value: `${period.toFixed(0)} days`, icon: "🌐" });
        analysis.insights.push("🌐 Moderate orbit – Possibly in the habitable zone");
      } else {
        analysis.orbitType = "Long Orbit (> 1 year)";
        analysis.characteristics.push({ label: "Orbit", value: `${(period / 365).toFixed(1)} years`, icon: "🌍" });
        analysis.insights.push("🌍 Wide orbit – Outer planet like Mars or beyond");
      }
    }

    // Stellar Insolation Analysis (koi_insol)
    if (inputs.koi_insol) {
      const insol = inputs.koi_insol;
      if (insol > 2) {
        analysis.warnings.push("☀️ High stellar radiation – Surface likely arid");
      } else if (insol >= 0.25 && insol <= 2) {
        analysis.insights.push("☀️ Optimal radiation level for life as we know it");
      } else {
        analysis.warnings.push("🌑 Low stellar radiation – Dark and cold world");
      }
      analysis.characteristics.push({
        label: "Insolation",
        value: `${insol.toFixed(2)}x Earth`,
        icon: "☀️"
      });
    }

    // Stellar Type Analysis (koi_steff)
    if (inputs.koi_steff) {
      const temp = inputs.koi_steff;
      if (temp > 7500) {
        analysis.stellarType = "⭐ Type A Star (Hot – Blue/White)";
      } else if (temp > 6000) {
        analysis.stellarType = "⭐ Type F–G Star (Sun-like)";
        analysis.insights.push("⭐ Star similar to our Sun – Great potential for life");
      } else if (temp > 5200) {
        analysis.stellarType = "⭐ Type G Star (Like our Sun)";
        analysis.insights.push("☀️ Virtually identical to the Sun");
      } else if (temp > 3700) {
        analysis.stellarType = "⭐ Type K Star (Orange Dwarf)";
        analysis.insights.push("🟠 Cooler than the Sun – Long-lived systems");
      } else {
        analysis.stellarType = "⭐ Type M Star (Red Dwarf)";
        analysis.warnings.push("🔴 Red dwarf – Stellar activity could be hazardous");
      }
    }

    // Detection Quality Analysis (koi_model_snr)
    if (inputs.koi_model_snr) {
      const snr = inputs.koi_model_snr;
      if (snr > 20) {
        analysis.detectionQuality = "✅ Excellent Detection (SNR > 20)";
        analysis.characteristics.push({ label: "Confidence", value: "High", icon: "✅" });
      } else if (snr > 10) {
        analysis.detectionQuality = "✓ Good Detection (SNR 10–20)";
        analysis.characteristics.push({ label: "Confidence", value: "Medium–High", icon: "✓" });
      } else if (snr > 7) {
        analysis.detectionQuality = "⚠️ Marginal Detection (SNR 7–10)";
        analysis.characteristics.push({ label: "Confidence", value: "Medium", icon: "⚠️" });
        analysis.warnings.push("⚠️ Weak signal – Needs further confirmation");
      } else {
        analysis.detectionQuality = "❌ Weak Detection (SNR < 7)";
        analysis.characteristics.push({ label: "Confidence", value: "Low", icon: "❌" });
        analysis.warnings.push("❌ Very weak signal – High risk of false positive");
      }
    }

    // Impact Parameter Analysis (koi_impact)
    if (inputs.koi_impact !== undefined && inputs.koi_impact !== "") {
      const impact = inputs.koi_impact;
      if (impact < 0.3) {
        analysis.insights.push("🎯 Central transit – Optimal observation geometry");
      } else if (impact < 0.7) {
        analysis.insights.push("📐 Moderate transit – Good geometry");
      } else {
        analysis.warnings.push("📐 Grazing transit – Challenging observation geometry");
      }
    }

    return analysis;
  };

  const analysis = analyzeInputs();
  const hasData = Object.values(inputs).some(val => val !== "" && val !== null && val !== undefined);

  return (
    <div className="glass-panel analysis-panel">
      <h2 className="panel-title">
        <span className="title-icon">🔬</span>
        Intelligent Analysis
      </h2>

      {!hasData ? (
        <div className="no-data-message">
          <div className="no-data-icon"></div>
          <p>Enter the planet parameters to see a detailed analysis</p>
        </div>
      ) : (
        <div className="analysis-content">
          {/* Mini 3D Planet */}
          <div className="mini-planet-container">
            <MiniPlanet3D inputs={inputs} />
            <div className="planet-label">
              {analysis.planetType || "Exoplanet"}
            </div>
          </div>

          {/* Main Characteristics */}
          {analysis.characteristics.length > 0 && (
            <div className="characteristics-grid">
              {analysis.characteristics.map((char, idx) => (
                <div key={idx} className="characteristic-card">
                  <span className="char-icon">{char.icon}</span>
                  <div className="char-content">
                    <div className="char-label">{char.label}</div>
                    <div className="char-value">{char.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Habitability */}
          {analysis.habitability && (
            <div className="analysis-section habitability">
              <h3 className="section-title">Habitability Evaluation</h3>
              <div className="habitability-status">{analysis.habitability}</div>
            </div>
          )}

          {/* Insights */}
          {analysis.insights.length > 0 && (
            <div className="analysis-section insights">
              <h3 className="section-title">💡 Key Findings</h3>
              <ul className="insights-list">
                {analysis.insights.map((insight, idx) => (
                  <li key={idx} className="insight-item">{insight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {analysis.warnings.length > 0 && (
            <div className="analysis-section warnings">
              <h3 className="section-title">⚠️ Considerations</h3>
              <ul className="warnings-list">
                {analysis.warnings.map((warning, idx) => (
                  <li key={idx} className="warning-item">{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Stellar Information */}
          {analysis.stellarType && (
            <div className="analysis-section stellar">
              <h3 className="section-title">Host Star</h3>
              <div className="stellar-info">{analysis.stellarType}</div>
            </div>
          )}

          {/* Detection Quality */}
          {analysis.detectionQuality && (
            <div className="analysis-section detection">
              <h3 className="section-title">📡 Signal Quality</h3>
              <div className="detection-quality">{analysis.detectionQuality}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
