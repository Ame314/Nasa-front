import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputs, setInputs] = useState({});
  const [predictResult, setPredictResult] = useState(null);
  const [analisisResult, setAnalisisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let value = e.target.type === "checkbox" ? (e.target.checked ? 1 : 0) : parseFloat(e.target.value);
    setInputs({
      ...inputs,
      [e.target.name]: isNaN(value) ? null : value
    });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", inputs);
      setPredictResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error en /predict");
    }
    setLoading(false);
  };

  const handleAnalisis = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/analisis", inputs);
      setAnalisisResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error en /analisis");
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: "0 auto",
      padding: 20,
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#0b0b1f",
      color: "#fff",
      borderRadius: 10
    }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>🌌 Explorador de Exoplanetas 🚀</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {["koi_period","koi_duration","koi_depth","koi_impact","koi_prad","koi_teq","koi_insol","koi_steff","koi_srad","koi_slogg","koi_kepmag","koi_model_snr"].map(name => (
          <input
            key={name}
            type="number"
            name={name}
            placeholder={name.replace("koi_", "").replace("_", " ")}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 5, border: "none", marginBottom: 5 }}
          />
        ))}
      </div>

      <h3>Flags (0/1)</h3>
      <div style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}>
        {["koi_fpflag_nt","koi_fpflag_ss","koi_fpflag_co","koi_fpflag_ec"].map(name => (
          <label key={name} style={{ marginBottom: 5 }}>
            <input type="checkbox" name={name} onChange={handleChange} style={{ marginRight: 5 }} />
            {name.replace("koi_fpflag_", "").replace("_", " ")}
          </label>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button
          onClick={handlePredict}
          style={{
            flex: 1,
            backgroundColor: "#6f42c1",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Analizando..." : "Predecir"}
        </button>

        <button
          onClick={handleAnalisis}
          style={{
            flex: 1,
            backgroundColor: "#e69f00",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Analizando..." : "Análisis Completo"}
        </button>
      </div>

      {predictResult && (
        <div style={{ marginTop: 20, backgroundColor: "#1f1f3f", padding: 20, borderRadius: 10 }}>
          <h2>Predicción Random Forest:</h2>
          <p><strong>Tipo:</strong> {predictResult.prediccion}</p>
          <h4>Probabilidades:</h4>
          <ul>
            {Object.entries(predictResult.probabilidades).map(([k, v]) => (
              <li key={k}>{k}: {(v*100).toFixed(2)}%</li>
            ))}
          </ul>
        </div>
      )}

      {analisisResult && (
        <div style={{ marginTop: 20, backgroundColor: "#003366", padding: 20, borderRadius: 10 }}>
          <h2>Análisis Completo:</h2>
          <p><strong>Zona habitable:</strong> {analisisResult.planeta?.zona_habitable}</p>
          <p><strong>Índice de habitabilidad:</strong> {analisisResult.planeta?.indice_habitabilidad}</p>
          <h4>Alertas:</h4>
          <ul>
            {analisisResult.alertas?.map((a,i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
