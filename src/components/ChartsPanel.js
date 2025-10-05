import React from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ChartsPanel({ inputs, mood }) {
  // Datos simulados para visualización
  const orbitData = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    distance: 90 + Math.sin(i) * 10 + Math.random() * 5,
    velocity: 30 + Math.cos(i) * 5 + Math.random() * 3
  }));

  const planetaryData = [
    { param: 'Radius', value: inputs.koi_prad || 1.2, max: 10 },
    { param: 'Temp', value: (inputs.koi_teq || 300) / 100, max: 20 },
    { param: 'Insolation', value: inputs.koi_insol || 1.5, max: 5 },
    { param: 'Period', value: (inputs.koi_period || 10) / 10, max: 10 },
    { param: 'Impact', value: inputs.koi_impact || 0.5, max: 1 },
  ];

  const spectralData = Array.from({ length: 8 }, (_, i) => ({
    wavelength: 400 + i * 50,
    intensity: 50 + Math.random() * 50
  }));

  const moodColors = {
    habitable: '#33ffaa',
    gaseous: '#ffaa00',
    hot: '#ff3333',
    cold: '#0099ff',
    neutral: '#6f42c1'
  };

  const currentColor = moodColors[mood] || moodColors.neutral;

  return (
    <div className="glass-panel charts-panel">
      <h2 className="panel-title">
        <span className="title-icon">📈</span>
        Data Visualization
      </h2>

      <div className="charts-grid">
        {/* Orbital Trajectory */}
        <div className="chart-container">
          <h3 className="chart-title">Orbital Trajectory</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={orbitData}>
              <defs>
                <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentColor} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={currentColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(20, 10, 40, 0.9)', 
                  border: '1px solid rgba(120, 80, 255, 0.3)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="distance" 
                stroke={currentColor} 
                fillOpacity={1} 
                fill="url(#colorDistance)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Planetary Characteristics Radar */}
        <div className="chart-container">
          <h3 className="chart-title">Planetary Profile</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={planetaryData}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis dataKey="param" stroke="rgba(255,255,255,0.7)" />
              <PolarRadiusAxis stroke="rgba(255,255,255,0.3)" />
              <Radar 
                name="Parameters" 
                dataKey="value" 
                stroke={currentColor} 
                fill={currentColor} 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Spectral Analysis */}
        <div className="chart-container">
          <h3 className="chart-title">Spectral Analysis</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={spectralData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="wavelength" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(20, 10, 40, 0.9)', 
                  border: '1px solid rgba(120, 80, 255, 0.3)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="intensity" fill={currentColor} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Velocity Curve */}
        <div className="chart-container">
          <h3 className="chart-title">Radial Velocity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={orbitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(20, 10, 40, 0.9)', 
                  border: '1px solid rgba(120, 80, 255, 0.3)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="velocity" 
                stroke={currentColor} 
                strokeWidth={2}
                dot={{ fill: currentColor, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}