import React from 'react';

export const FraudExplanation = ({ features, txId, probability }) => {
    return (
        <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderLeft: '4px solid #ef4444' }}>
            <h4 style={{ color: '#ef4444', margin: '0 0 0.5rem 0', fontWeight: 600 }}>
                Transaction {txId}
            </h4>
            <div style={{ marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <strong>Risk: HIGH</strong> <br />
                Fraud Probability: {Number(probability || 0).toFixed(2)}
            </div>
            <h5 style={{ color: '#fca5a5', margin: '0 0 0.25rem 0' }}>Top Risk Factors:</h5>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0, color: '#cbd5e1', fontSize: '0.9rem' }}>
                {features.map((f, i) => {
                    let label = `${f.feature} anomaly`;
                    if (String(f.feature).toLowerCase() === 'amount') label = 'Amount spike';

                    return (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>
                            {label} (impact {f.impact.toFixed(2)})
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
