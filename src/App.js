import React, { useState } from "react";
import axios from "axios";
import Planet3D from "./components/Planet3D";
import StatsPanel from "./components/StatsPanel";
import PredictionPanel from "./components/PredictionPanel";
import ChartsPanel from "./components/ChartsPanel";
import InfoPanel from "./components/InfoPanel";
import AnalysisPanel from "./components/AnalysisPanel";
import "./styles/cosmic.css";

function App() {
  const [inputs, setInputs] = useState({
    koi_period: "",
    koi_duration: "",
    koi_depth: "",
    koi_impact: "",
    koi_prad: "",
    koi_teq: "",
    koi_insol: "",
    koi_steff: "",
    koi_srad: "",
    koi_slogg: "",
    koi_kepmag: "",
    koi_model_snr: "",
  });

  const [predictResult, setPredictResult] = useState(null);
  const [mood, setMood] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalPlanets: 5437,
    habitable: 24,
    analyzed: 1289,
    systems: 3892,
  });

  // 🧠 Validación: solo números y punto decimal
  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (value === "" || regex.test(value)) {
      const parsedValue = value === "" ? "" : parseFloat(value);
      setInputs({ ...inputs, [name]: isNaN(parsedValue) ? "" : parsedValue });
    }
  };

  const handlePredict = async () => {
    const hasEmpty = Object.values(inputs).some((v) => v === "");
    if (hasEmpty) {
      alert("Por favor ingresa solo números en todos los campos antes de analizar 🧪");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", inputs);
      setPredictResult(res.data);

      const type = res.data.prediccion?.toLowerCase() || "";
      if (type.includes("habitable")) setMood("habitable");
      else if (type.includes("gas")) setMood("gaseous");
      else if (type.includes("hot")) setMood("hot");
      else if (type.includes("cold")) setMood("cold");
      else setMood("neutral");

      setStats((prev) => ({ ...prev, analyzed: prev.analyzed + 1 }));
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor. Verifica que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Fondo 3D */}
      <Planet3D mood={mood} />

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="main-title">
            <span className="icon">🌌</span>
            EXOPLANET EXPLORER
            <span className="icon">🚀</span>
          </h1>
          <div className="header-subtitle">Advanced Planetary Analysis System</div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="dashboard-grid">
        <StatsPanel stats={stats} />

        <PredictionPanel
          inputs={inputs}
          handleChange={handleChange}
          handlePredict={handlePredict}
          loading={loading}
          predictResult={predictResult}
        />

        <ChartsPanel inputs={inputs} mood={mood} />
        <InfoPanel predictResult={predictResult} />

        {/* 🔬 Panel de Análisis Inteligente */}
        <AnalysisPanel inputs={inputs} />
      </div>

      {/* Efectos estelares */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
    </div>
  );
}

export default App;
