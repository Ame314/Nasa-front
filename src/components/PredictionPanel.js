import React from "react";

export default function PredictionPanel({ inputs, handleChange, handleFlagChange, handlePredict, loading, predictResult }) {
  const fields = [
    { name: "koi_period", label: "Orbital Period", unit: "days", icon: "🔄" },
    { name: "koi_duration", label: "Transit Duration", unit: "hours", icon: "⏱️" },
    { name: "koi_depth", label: "Transit Depth", unit: "ppm", icon: "📉" },
    { name: "koi_impact", label: "Impact Parameter", unit: "", icon: "🎯" },
    { name: "koi_prad", label: "Planet Radius", unit: "R⊕", icon: "📏" },
    { name: "koi_teq", label: "Equilibrium Temp", unit: "K", icon: "🌡️" },
    { name: "koi_insol", label: "Insolation Flux", unit: "F⊕", icon: "☀️" },
    { name: "koi_steff", label: "Stellar Temp", unit: "K", icon: "🔥" },
    { name: "koi_srad", label: "Stellar Radius", unit: "R☉", icon: "⭐" },
    { name: "koi_slogg", label: "Stellar Gravity", unit: "log10(cm/s²)", icon: "🌟" },
    { name: "koi_kepmag", label: "Kepler Magnitude", unit: "mag", icon: "💫" },
    { name: "koi_model_snr", label: "Signal to Noise", unit: "", icon: "📡" },
  ];

  const flags = [
    { name: "koi_fpflag_nt", label: "Not Transit-Like", icon: "🚫" },
    { name: "koi_fpflag_ss", label: "Stellar Eclipse", icon: "⭐" },
    { name: "koi_fpflag_co", label: "Centroid Offset", icon: "📍" },
    { name: "koi_fpflag_ec", label: "Ephemeris Match", icon: "⏰" },
  ];

  return (
    <div className="glass-panel prediction-panel">
      <h2 className="panel-title">
        <span className="title-icon">🔮</span>
        Planetary Parameters
      </h2>
      
      <div className="input-grid">
        {fields.map((field) => (
          <div key={field.name} className="input-group">
            <label className="input-label">
              <span className="label-icon">{field.icon}</span>
              {field.label}
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                name={field.name}
                value={inputs[field.name]}
                onChange={handleChange}
                placeholder="Enter value"
                className="cosmic-input"
                step="any"
              />
              {field.unit && <span className="input-unit">{field.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* False Positive Flags */}
      <div className="flags-section">
        <h3 className="flags-title">
          <span className="title-icon">🚩</span>
          False Positive Flags
        </h3>
        <p className="flags-description">
          Mark any flags that indicate potential issues with the detection
        </p>
        <div className="flags-grid">
          {flags.map((flag) => (
            <label key={flag.name} className="flag-checkbox">
              <input
                type="checkbox"
                name={flag.name}
                checked={inputs[flag.name] === 1}
                onChange={handleFlagChange}
              />
              <span className="flag-icon">{flag.icon}</span>
              <span className="flag-label">{flag.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handlePredict} 
        disabled={loading}
        className={`predict-button ${loading ? 'loading' : ''}`}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Analyzing...
          </>
        ) : (
          <>
            <span className="button-icon">🚀</span>
            Launch Prediction
            <span className="button-glow"></span>
          </>
        )}
      </button>

      {predictResult && (
        <div className="result-container">
          <div className="result-header">
            <span className="result-icon">✨</span>
            Prediction Result
          </div>
          <div className="result-content">
            <div className="result-text">{predictResult.prediccion}</div>
            {predictResult.probabilidades && (
              <div className="probabilities-section">
                <h4 className="prob-title">Classification Probabilities</h4>
                {Object.entries(predictResult.probabilidades).map(([key, value]) => (
                  <div key={key} className="prob-item">
                    <div className="prob-label">{key}</div>
                    <div className="prob-bar-container">
                      <div 
                        className="prob-bar-fill"
                        style={{ width: `${value * 100}%` }}
                      ></div>
                    </div>
                    <div className="prob-value">{(value * 100).toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}