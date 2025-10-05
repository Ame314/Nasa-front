import React, { useState } from "react";

export default function EducationalSection() {
  const [activeTab, setActiveTab] = useState("what");

  return (
    <section className="educational-section" id="about">
      <div className="educational-header">
        <h2 className="educational-title">
          <span className="title-icon">🌠</span>
          Entendiendo los Exoplanetas
        </h2>
        <p className="educational-subtitle">
          Descubre cómo identificamos y clasificamos mundos más allá de nuestro sistema solar
        </p>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === "what" ? "active" : ""}`}
            onClick={() => setActiveTab("what")}
          >
            <span className="tab-icon">🪐</span>
            ¿Qué son?
          </button>
          <button 
            className={`tab ${activeTab === "how" ? "active" : ""}`}
            onClick={() => setActiveTab("how")}
          >
            <span className="tab-icon">🔍</span>
            ¿Cómo se detectan?
          </button>
          <button 
            className={`tab ${activeTab === "data" ? "active" : ""}`}
            onClick={() => setActiveTab("data")}
          >
            <span className="tab-icon">📊</span>
            Datos Analizados
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
              <h3 className="content-title">¿Qué son los Exoplanetas?</h3>
              <div className="content-grid">
                <div className="content-card">
                  <div className="card-icon">🌍</div>
                  <h4>Definición</h4>
                  <p>
                    Los exoplanetas son planetas que orbitan estrellas fuera de nuestro 
                    sistema solar. Desde el primer descubrimiento confirmado en 1992, 
                    hemos identificado más de 5,400 exoplanetas en nuestra galaxia.
                  </p>
                </div>
                <div className="content-card">
                  <div className="card-icon">🔬</div>
                  <h4>Importancia Científica</h4>
                  <p>
                    Estudiar exoplanetas nos ayuda a entender la formación de sistemas 
                    planetarios, la posibilidad de vida extraterrestre y el lugar único 
                    que ocupa la Tierra en el universo.
                  </p>
                </div>
                <div className="content-card">
                  <div className="card-icon">🌡️</div>
                  <h4>Tipos de Exoplanetas</h4>
                  <p>
                    Gigantes gaseosos como Júpiter, súper-Tierras rocosas, mini-Neptunos 
                    con atmósferas densas, y planetas en la zona habitable donde podría 
                    existir agua líquida.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "how" && (
            <div className="content-panel">
              <h3 className="content-title">Métodos de Detección</h3>
              <div className="method-list">
                <div className="method-item">
                  <div className="method-number">1</div>
                  <div className="method-content">
                    <h4>Método del Tránsito</h4>
                    <p>
                      El más utilizado por Kepler. Cuando un planeta pasa frente a su 
                      estrella, bloquea una pequeña fracción de luz. Midiendo esta 
                      disminución periódica del brillo, podemos detectar el planeta 
                      y calcular su tamaño y órbita.
                    </p>
                    <div className="method-stats">
                      <span>✓ Más de 3,000 exoplanetas descubiertos</span>
                      <span>✓ Precisión del 0.01% en brillo</span>
                    </div>
                  </div>
                </div>
                <div className="method-item">
                  <div className="method-number">2</div>
                  <div className="method-content">
                    <h4>Velocidad Radial</h4>
                    <p>
                      Los planetas ejercen un pequeño tirón gravitacional en su estrella, 
                      causando un bamboleo detectado por el efecto Doppler en el espectro 
                      de luz de la estrella.
                    </p>
                  </div>
                </div>
                <div className="method-item">
                  <div className="method-number">3</div>
                  <div className="method-content">
                    <h4>Imagen Directa</h4>
                    <p>
                      Con telescopios avanzados, podemos capturar directamente la luz 
                      reflejada por planetas gigantes alejados de estrellas brillantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="content-panel">
              <h3 className="content-title">Parámetros Analizados</h3>
              <div className="parameters-grid">
                <div className="parameter-category">
                  <h4 className="category-title">
                    <span className="category-icon">🪐</span>
                    Parámetros Planetarios
                  </h4>
                  <ul className="parameter-list">
                    <li>
                      <strong>Período Orbital (koi_period):</strong> Tiempo que tarda 
                      el planeta en completar una órbita alrededor de su estrella (días)
                    </li>
                    <li>
                      <strong>Radio del Planeta (koi_prad):</strong> Tamaño del planeta 
                      en relación a la Tierra (R⊕)
                    </li>
                    <li>
                      <strong>Temperatura de Equilibrio (koi_teq):</strong> Temperatura 
                      estimada de la superficie del planeta (Kelvin)
                    </li>
                    <li>
                      <strong>Flujo de Insolación (koi_insol):</strong> Cantidad de 
                      radiación que recibe comparada con la Tierra
                    </li>
                    <li>
                      <strong>Profundidad del Tránsito (koi_depth):</strong> Fracción 
                      de luz bloqueada durante el tránsito (ppm)
                    </li>
                  </ul>
                </div>
                <div className="parameter-category">
                  <h4 className="category-title">
                    <span className="category-icon">⭐</span>
                    Parámetros Estelares
                  </h4>
                  <ul className="parameter-list">
                    <li>
                      <strong>Temperatura Estelar (koi_steff):</strong> Temperatura 
                      de la estrella anfitriona (Kelvin)
                    </li>
                    <li>
                      <strong>Radio Estelar (koi_srad):</strong> Tamaño de la estrella 
                      en relación al Sol (R☉)
                    </li>
                    <li>
                      <strong>Gravedad Superficial (koi_slogg):</strong> Intensidad 
                      del campo gravitacional de la estrella
                    </li>
                    <li>
                      <strong>Magnitud Kepler (koi_kepmag):</strong> Brillo aparente 
                      de la estrella visto por Kepler
                    </li>
                  </ul>
                </div>
                <div className="parameter-category">
                  <h4 className="category-title">
                    <span className="category-icon">📡</span>
                    Parámetros de Calidad
                  </h4>
                  <ul className="parameter-list">
                    <li>
                      <strong>Relación Señal/Ruido (koi_model_snr):</strong> Confiabilidad 
                      de la detección del tránsito
                    </li>
                    <li>
                      <strong>Duración del Tránsito (koi_duration):</strong> Tiempo que 
                      dura el paso del planeta frente a la estrella (horas)
                    </li>
                    <li>
                      <strong>Parámetro de Impacto (koi_impact):</strong> Geometría 
                      del tránsito (0 = central, 1 = rasante)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ml" && (
            <div className="content-panel">
              <h3 className="content-title">Sistema de Machine Learning</h3>
              <div className="ml-content">
                <div className="ml-overview">
                  <div className="ml-card">
                    <div className="ml-icon">🧠</div>
                    <h4>Algoritmo</h4>
                    <p>Random Forest Classifier con 100 árboles de decisión</p>
                    <div className="ml-metric">94% de precisión</div>
                  </div>
                  <div className="ml-card">
                    <div className="ml-icon">📚</div>
                    <h4>Conjunto de Datos</h4>
                    <p>Más de 9,000 Objetos de Interés Kepler (KOIs)</p>
                    <div className="ml-metric">16 características</div>
                  </div>
                  <div className="ml-card">
                    <div className="ml-icon">🎯</div>
                    <h4>Clasificación</h4>
                    <p>Identifica candidatos confirmados y falsos positivos</p>
                    <div className="ml-metric">4 categorías</div>
                  </div>
                </div>

                <div className="ml-process">
                  <h4 className="process-title">Proceso de Clasificación</h4>
                  <div className="process-steps">
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h5>Preprocesamiento</h5>
                        <p>Normalización de datos y manejo de valores faltantes</p>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h5>Extracción de Características</h5>
                        <p>Selección de 16 parámetros más relevantes</p>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h5>Predicción</h5>
                        <p>Clasificación mediante ensemble learning</p>
                      </div>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h5>Análisis</h5>
                        <p>Evaluación de habitabilidad y características</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="why-matters">
                  <h4>¿Por qué es importante?</h4>
                  <div className="why-grid">
                    <div className="why-item">
                      <span className="why-icon">🔬</span>
                      <p>
                        <strong>Descubrimiento:</strong> Permite identificar patrones 
                        y características que los humanos podrían pasar por alto
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