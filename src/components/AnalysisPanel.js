import React from "react";
import MiniPlanet3D from "./MiniPlanet3D";

export default function AnalysisPanel({ inputs }) {
  // Función para analizar los datos ingresados
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

    // Análisis del Radio del Planeta (koi_prad)
    if (inputs.koi_prad) {
      if (inputs.koi_prad < 0.5) {
        analysis.planetType = "Sub-Tierra (Mercurio-like)";
        analysis.insights.push("🪨 Planeta pequeño, probablemente rocoso con poca atmósfera");
      } else if (inputs.koi_prad < 1.5) {
        analysis.planetType = "Tipo Tierra/Super-Tierra";
        analysis.characteristics.push({ label: "Tamaño", value: "Similar a la Tierra", icon: "🌍" });
        analysis.insights.push("🌍 Tamaño comparable a la Tierra, posible planeta rocoso");
      } else if (inputs.koi_prad < 4) {
        analysis.planetType = "Mini-Neptuno";
        analysis.characteristics.push({ label: "Tamaño", value: "Entre Tierra y Neptuno", icon: "🔵" });
        analysis.insights.push("💨 Planeta de tamaño medio, probablemente con atmósfera densa");
      } else {
        analysis.planetType = "Gigante Gaseoso (Júpiter-like)";
        analysis.characteristics.push({ label: "Tamaño", value: "Gigante Gaseoso", icon: "🪐" });
        analysis.insights.push("🪐 Planeta masivo, principalmente compuesto de gas");
      }
    }

    // Análisis de Temperatura (koi_teq)
    if (inputs.koi_teq) {
      const temp = inputs.koi_teq;
      if (temp > 1000) {
        analysis.habitability = "❌ Inhabitable - Extremadamente Caliente";
        analysis.characteristics.push({ label: "Temperatura", value: `${temp}K (Horno)`, icon: "🔥" });
        analysis.warnings.push("⚠️ Temperatura superior a 1000K - Superficie fundida probable");
      } else if (temp > 600) {
        analysis.habitability = "❌ Inhabitable - Muy Caliente";
        analysis.characteristics.push({ label: "Temperatura", value: `${temp}K (Venusiano)`, icon: "🌡️" });
        analysis.warnings.push("⚠️ Similar a Venus - Efecto invernadero extremo");
      } else if (temp >= 273 && temp <= 373) {
        analysis.habitability = "✅ Zona Habitable - Agua Líquida Posible";
        analysis.characteristics.push({ label: "Temperatura", value: `${temp}K (Templada)`, icon: "💧" });
        analysis.insights.push("🎯 Temperatura perfecta para agua líquida en superficie");
      } else if (temp < 200) {
        analysis.habitability = "❌ Inhabitable - Extremadamente Frío";
        analysis.characteristics.push({ label: "Temperatura", value: `${temp}K (Congelado)`, icon: "❄️" });
        analysis.warnings.push("⚠️ Temperatura bajo punto de congelación - Mundo helado");
      } else {
        analysis.habitability = "⚠️ Zona Marginal";
        analysis.characteristics.push({ label: "Temperatura", value: `${temp}K`, icon: "🌡️" });
      }
    }

    // Análisis del Periodo Orbital (koi_period)
    if (inputs.koi_period) {
      const period = inputs.koi_period;
      if (period < 1) {
        analysis.orbitType = "Órbita Ultra-Corta (< 1 día)";
        analysis.characteristics.push({ label: "Órbita", value: `${period.toFixed(2)} días`, icon: "⚡" });
        analysis.insights.push("⚡ Órbita extremadamente rápida - Muy cerca de su estrella");
      } else if (period < 10) {
        analysis.orbitType = "Órbita Cercana (1-10 días)";
        analysis.characteristics.push({ label: "Órbita", value: `${period.toFixed(1)} días`, icon: "🔄" });
        analysis.insights.push("🔄 Órbita corta - Planeta interno tipo Mercurio");
      } else if (period < 365) {
        analysis.orbitType = "Órbita Media (10-365 días)";
        analysis.characteristics.push({ label: "Órbita", value: `${period.toFixed(0)} días`, icon: "🌐" });
        analysis.insights.push("🌐 Órbita moderada - Zona habitable posible");
      } else {
        analysis.orbitType = "Órbita Larga (> 1 año)";
        analysis.characteristics.push({ label: "Órbita", value: `${(period/365).toFixed(1)} años`, icon: "🌍" });
        analysis.insights.push("🌍 Órbita amplia - Planeta externo tipo Marte o más");
      }
    }

    // Análisis de Insolación (koi_insol)
    if (inputs.koi_insol) {
      const insol = inputs.koi_insol;
      if (insol > 2) {
        analysis.warnings.push("☀️ Alta radiación estelar - Superficie probablemente árida");
      } else if (insol >= 0.25 && insol <= 2) {
        analysis.insights.push("☀️ Nivel de radiación óptimo para vida como la conocemos");
      } else {
        analysis.warnings.push("🌑 Baja radiación estelar - Mundo oscuro y frío");
      }
      analysis.characteristics.push({ 
        label: "Insolación", 
        value: `${insol.toFixed(2)}x Tierra`, 
        icon: "☀️" 
      });
    }

    // Análisis de la Estrella (koi_steff)
    if (inputs.koi_steff) {
      const temp = inputs.koi_steff;
      if (temp > 7500) {
        analysis.stellarType = "⭐ Estrella Tipo A (Caliente - Azul/Blanca)";
      } else if (temp > 6000) {
        analysis.stellarType = "⭐ Estrella Tipo F-G (Sol-like)";
        analysis.insights.push("⭐ Estrella similar al Sol - Excelente para vida");
      } else if (temp > 5200) {
        analysis.stellarType = "⭐ Estrella Tipo G (Como nuestro Sol)";
        analysis.insights.push("☀️ Estrella idéntica a nuestro Sol");
      } else if (temp > 3700) {
        analysis.stellarType = "⭐ Estrella Tipo K (Enana Naranja)";
        analysis.insights.push("🟠 Estrella más fría que el Sol - Vida longeva");
      } else {
        analysis.stellarType = "⭐ Estrella Tipo M (Enana Roja)";
        analysis.warnings.push("🔴 Enana roja - Actividad estelar puede ser problemática");
      }
    }

    // Análisis de Calidad de Detección (koi_model_snr)
    if (inputs.koi_model_snr) {
      const snr = inputs.koi_model_snr;
      if (snr > 20) {
        analysis.detectionQuality = "✅ Detección Excelente (SNR > 20)";
        analysis.characteristics.push({ label: "Confianza", value: "Alta", icon: "✅" });
      } else if (snr > 10) {
        analysis.detectionQuality = "✓ Detección Buena (SNR 10-20)";
        analysis.characteristics.push({ label: "Confianza", value: "Media-Alta", icon: "✓" });
      } else if (snr > 7) {
        analysis.detectionQuality = "⚠️ Detección Marginal (SNR 7-10)";
        analysis.characteristics.push({ label: "Confianza", value: "Media", icon: "⚠️" });
        analysis.warnings.push("⚠️ Señal débil - Requiere confirmación adicional");
      } else {
        analysis.detectionQuality = "❌ Detección Débil (SNR < 7)";
        analysis.characteristics.push({ label: "Confianza", value: "Baja", icon: "❌" });
        analysis.warnings.push("❌ Señal muy débil - Alto riesgo de falso positivo");
      }
    }

    // Análisis del parámetro de impacto (koi_impact)
    if (inputs.koi_impact !== undefined && inputs.koi_impact !== "") {
      const impact = inputs.koi_impact;
      if (impact < 0.3) {
        analysis.insights.push("🎯 Tránsito central - Observación óptima");
      } else if (impact < 0.7) {
        analysis.insights.push("📐 Tránsito moderado - Buena geometría");
      } else {
        analysis.warnings.push("📐 Tránsito rasante - Geometría difícil");
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
        Análisis Inteligente
      </h2>

      {!hasData ? (
        <div className="no-data-message">
          <div className="no-data-icon">📊</div>
          <p>Ingresa los parámetros del planeta para ver el análisis detallado</p>
        </div>
      ) : (
        <div className="analysis-content">
          {/* Mini Planeta 3D */}
          <div className="mini-planet-container">
            <MiniPlanet3D inputs={inputs} />
            <div className="planet-label">
              {analysis.planetType || "Exoplaneta"}
            </div>
          </div>

          {/* Características Principales */}
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

          {/* Habitabilidad */}
          {analysis.habitability && (
            <div className="analysis-section habitability">
              <h3 className="section-title">🌍 Evaluación de Habitabilidad</h3>
              <div className="habitability-status">{analysis.habitability}</div>
            </div>
          )}

          {/* Insights */}
          {analysis.insights.length > 0 && (
            <div className="analysis-section insights">
              <h3 className="section-title">💡 Hallazgos Clave</h3>
              <ul className="insights-list">
                {analysis.insights.map((insight, idx) => (
                  <li key={idx} className="insight-item">{insight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Advertencias */}
          {analysis.warnings.length > 0 && (
            <div className="analysis-section warnings">
              <h3 className="section-title">⚠️ Consideraciones</h3>
              <ul className="warnings-list">
                {analysis.warnings.map((warning, idx) => (
                  <li key={idx} className="warning-item">{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Información Estelar */}
          {analysis.stellarType && (
            <div className="analysis-section stellar">
              <h3 className="section-title">Estrella Anfitriona</h3>
              <div className="stellar-info">{analysis.stellarType}</div>
            </div>
          )}

          {/* Calidad de Detección */}
          {analysis.detectionQuality && (
            <div className="analysis-section detection">
              <h3 className="section-title">📡 Calidad de Señal</h3>
              <div className="detection-quality">{analysis.detectionQuality}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}