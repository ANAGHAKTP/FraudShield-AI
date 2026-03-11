import React from 'react';
import GaugeChart from 'react-gauge-chart';
import './ChartStyles.css';
import { AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

export const RiskGaugeCard = ({ probability, label }) => {

    const isHighRisk = probability > 0.8;
    const isMediumRisk = probability > 0.4 && probability <= 0.8;

    const riskColorClass = isHighRisk ? 'text-red-500' : isMediumRisk ? 'text-yellow-500' : 'text-green-500';
    const riskText = isHighRisk ? 'HIGH' : isMediumRisk ? 'MEDIUM' : 'LOW';

    return (
        <div className="stat-card glass-panel risk-gauge-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 className="stat-title" style={{ marginBottom: '1rem' }}>Transaction Risk Level</h3>

            <div style={{ width: '100%', maxWidth: '300px' }}>
                <GaugeChart
                    id="risk-gauge"
                    nrOfLevels={3}
                    colors={["#10b981", "#f59e0b", "#ef4444"]}
                    arcWidth={0.3}
                    percent={probability}
                    textColor="#ffffff"
                    hideText={true}
                />
            </div>

            <div className="risk-details" style={{ textAlign: 'center', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {isHighRisk ? <AlertTriangle color="#ef4444" /> : <ShieldCheck color="#10b981" />}
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }} className={riskColorClass}>
                        {riskText} RISK
                    </span>
                </div>
                <p style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
                    Fraud Probability: <span style={{ fontWeight: 'bold' }}>{(probability * 100).toFixed(1)}%</span>
                </p>
                <p style={{ marginTop: '0.25rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>
                    Status: {label}
                </p>
            </div>
        </div>
    );
};
