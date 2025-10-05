import React from "react";

export default function InfoPanel({ predictResult }) {
  const planetTypes = [
    {
      name: "Habitable Zone",
      icon: "🌍",
      color: "#33ffaa",
      description: "Planets within the habitable zone where liquid water could exist",
      count: 24
    },
    {
      name: "Gas Giants",
      icon: "🪐",
      color: "#ffaa00",
      description: "Large planets composed mainly of hydrogen and helium",
      count: 1834
    },
    {
      name: "Hot Jupiters",
      icon: "🔥",
      color: "#ff3333",
      description: "Gas giants in very close orbits around their stars",
      count: 412
    },
    {
      name: "Ice Giants",
      icon: "❄️",
      color: "#0099ff",
      description: "Cold planets far from their host stars",
      count: 287
    }
  ];

  const recentDiscoveries = [
    { name: "KOI-7923.01", type: "Earth-like", distance: "1,234 ly", status: "Confirmed" },
    { name: "KOI-8156.02", type: "Super Earth", distance: "892 ly", status: "Candidate" },
    { name: "KOI-9234.01", type: "Gas Giant", distance: "2,156 ly", status: "Confirmed" },
  ];

  return (
    <div className="glass-panel info-panel">
      <h2 className="panel-title">
        <span className="title-icon">ℹ️</span>
        Mission Control
      </h2>

      {/* Planet Types Grid */}
      <div className="planet-types-grid">
        {planetTypes.map((type, idx) => (
          <div key={idx} className="planet-type-card" style={{ borderTopColor: type.color }}>
            <div className="planet-type-header">
              <span className="planet-type-icon">{type.icon}</span>
              <span className="planet-type-count" style={{ color: type.color }}>
                {type.count}
              </span>
            </div>
            <div className="planet-type-name">{type.name}</div>
            <div className="planet-type-desc">{type.description}</div>
          </div>
        ))}
      </div>

      {/* Recent Discoveries */}
      <div className="discoveries-section">
        <h3 className="section-title">Recent Discoveries</h3>
        <div className="discoveries-list">
          {recentDiscoveries.map((discovery, idx) => (
            <div key={idx} className="discovery-item">
              <div className="discovery-header">
                <span className="discovery-name">{discovery.name}</span>
                <span className={`discovery-status ${discovery.status.toLowerCase()}`}>
                  {discovery.status}
                </span>
              </div>
              <div className="discovery-details">
                <span className="discovery-type">{discovery.type}</span>
                <span className="discovery-distance">{discovery.distance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="system-status">
        <h3 className="section-title">System Status</h3>
        <div className="status-grid">
          <div className="status-item">
            <div className="status-indicator online"></div>
            <span>Kepler Observatory</span>
          </div>
          <div className="status-item">
            <div className="status-indicator online"></div>
            <span>TESS Mission</span>
          </div>
          <div className="status-item">
            <div className="status-indicator warning"></div>
            <span>Database Sync</span>
          </div>
          <div className="status-item">
            <div className="status-indicator online"></div>
            <span>ML Pipeline</span>
          </div>
        </div>
      </div>
    </div>
  );
}