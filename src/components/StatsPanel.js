import React from "react";

export default function StatsPanel({ stats }) {
  const statItems = [
    {
      label: "Total Planets",
      value: stats.totalPlanets,
      icon: "🪐",
      color: "#6f42c1",
      unit: ""
    },
    {
      label: "Habitable Zone",
      value: stats.habitable,
      icon: "🌍",
      color: "#33ffaa",
      unit: ""
    },
    {
      label: "Analyzed",
      value: stats.analyzed,
      icon: "🔬",
      color: "#ff6b6b",
      unit: ""
    },
    {
      label: "Star Systems",
      value: stats.systems,
      icon: "⭐",
      color: "#ffd700",
      unit: ""
    }
  ];

  return (
    <div className="glass-panel stats-panel">
      <h2 className="panel-title">
        <span className="title-icon">📊</span>
        Mission Statistics
      </h2>
      <div className="stats-grid">
        {statItems.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value.toLocaleString()}{stat.unit}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
            <div className="stat-pulse" style={{ backgroundColor: stat.color }}></div>
          </div>
        ))}
      </div>
      
      <div className="activity-bar">
        <div className="activity-label">System Activity</div>
        <div className="activity-graph">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="activity-bar-item"
              style={{ 
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}