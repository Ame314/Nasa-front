import React, { useState } from "react";
import axios from "axios";
import Planet3D from "./components/Planet3D";
import StatsPanel from "./components/StatsPanel";
import PredictionPanel from "./components/PredictionPanel";
import ChartsPanel from "./components/ChartsPanel";
import InfoPanel from "./components/InfoPanel";
import AnalysisPanel from "./components/AnalysisPanel";
import EducationalSection from "./components/EducationalSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
      alert("Por favor ingresa todos los valores numéricos antes de analizar");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        ...inputs,
        koi_fpflag_nt: 0,
        koi_fpflag_ss: 0,
        koi_fpflag_co: 0,
        koi_fpflag_ec: 0
      };

      console.log("Enviando datos:", dataToSend);
      const res = await axios.post("http://127.0.0.1:8000/predict", dataToSend);
      console.log("Respuesta recibida:", res.data);
      setPredictResult(res.data);

      const type = res.data.prediccion?.toLowerCase() || "";
      if (type.includes("habitable") || type.includes("earth")) setMood("habitable");
      else if (type.includes("gas") || type.includes("jupiter")) setMood("gaseous");
      else if (type.includes("hot")) setMood("hot");
      else if (type.includes("cold") || type.includes("ice")) setMood("cold");
      else setMood("neutral");

      setStats((prev) => ({ ...prev, analyzed: prev.analyzed + 1 }));
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Respuesta del servidor:", error.response?.data);
      alert("Error al conectar con el servidor. Verifica que el backend esté corriendo en http://127.0.0.1:8000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Planet3D mood={mood} />
      <Header />

      <main className="main-content">
        <EducationalSection />

        <div className="dashboard-grid" id="analysis">
          <StatsPanel stats={stats} />
          <PredictionPanel
            inputs={inputs}
            handleChange={handleChange}
            handlePredict={handlePredict}
            loading={loading}
            predictResult={predictResult}
          />
          <AnalysisPanel inputs={inputs} />
          <ChartsPanel inputs={inputs} mood={mood} />
          <InfoPanel predictResult={predictResult} />
        </div>
      </main>

      <Footer />

      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
    </div>
  );
}

export default App;