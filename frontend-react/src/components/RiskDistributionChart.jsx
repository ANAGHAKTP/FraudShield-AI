import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './ChartStyles.css';

export const RiskDistributionChart = ({ data }) => {
    // Expects: [{ type: 'Safe Volume', count: 120 }, { type: 'Fraud Detected', count: 4 }]
    const COLORS = {
        'Safe Volume': '#10b981',
        'Fraud Detected': '#ef4444'
    };

    return (
        <div className="chart-container glass-panel">
            <h3 className="chart-title">Risk Distribution</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        barSize={60}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickMargin={10}
                        />
                        <YAxis
                            stroke="#64748b"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#f8fafc'
                            }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar dataKey="value" name="Volume" radius={[6, 6, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#3b82f6'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
