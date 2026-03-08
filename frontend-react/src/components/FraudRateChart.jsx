import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './ChartStyles.css';

export const FraudRateChart = ({ fraudRate, totalVol, fraudVol }) => {

    // Structure simple array for categorical single-bar map
    const data = [
        { category: 'Legitimate', count: totalVol - fraudVol },
        { category: 'Flagged', count: fraudVol }
    ];

    const COLORS = {
        'Legitimate': '#3b82f6',
        'Flagged': '#f59e0b'
    };

    return (
        <div className="chart-container glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="chart-title" style={{ margin: 0 }}>System Anomaly Rate</h3>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f59e0b' }}>
                    {fraudRate}%
                </span>
            </div>

            <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                        <XAxis
                            type="number"
                            stroke="#64748b"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <YAxis
                            dataKey="category"
                            type="category"
                            stroke="#64748b"
                            tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 500 }}
                            width={80}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#f8fafc'
                            }}
                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                        />
                        <Bar dataKey="count" name="Evaluations" radius={[0, 4, 4, 0]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.category] || '#3b82f6'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
