import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartStyles.css';

export const FraudTrendChart = ({ data }) => {
    return (
        <div className="chart-container glass-panel">
            <h3 className="chart-title">Fraud Activity (30 Days)</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="date"
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
                            itemStyle={{ color: '#e2e8f0' }}
                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar
                            dataKey="total"
                            name="Total Vol"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="fraud"
                            name="Fraud Vol"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
