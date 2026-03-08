import React, { useState } from 'react';
import './ChartStyles.css';
import { FraudExplanation } from './FraudExplanation';

export const TransactionTable = ({ transactions }) => {
    const [expandedTx, setExpandedTx] = useState(null);

    // Helper formatters
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="table-container glass-panel">
            <h3 className="chart-title" style={{ marginBottom: '1rem' }}>Recent Activity Database</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Access Date</th>
                        <th>Terminal Node</th>
                        <th>Ping Trace</th>
                        <th>Metric Load</th>
                        <th>Risk Flags</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((tx) => {
                        // Extract prediction safely depending on array format payload
                        const prediction = Array.isArray(tx.Predictions) ? tx.Predictions[0] : tx.Predictions;
                        const isFraud = prediction?.label === 'fraud';

                        const isExpanded = expandedTx === tx.id;

                        return (
                            <React.Fragment key={tx.id}>
                                <tr onClick={() => isFraud && setExpandedTx(isExpanded ? null : tx.id)} style={{ cursor: isFraud ? 'pointer' : 'default' }}>
                                    <td>{formatDate(tx.timestamp)}</td>
                                    <td style={{ fontWeight: 500 }}>{tx.merchant}</td>
                                    <td>
                                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{tx.device} • {tx.location}</span>
                                    </td>
                                    <td>{formatCurrency(tx.amount)}</td>
                                    <td>
                                        <span className={`badge ${isFraud ? 'danger' : 'safe'}`}>
                                            {isFraud ? 'Threat Caught' : 'Safe Packet'}
                                        </span>
                                    </td>
                                </tr>
                                {isExpanded && prediction?.top_features && (
                                    <tr className="expanded-row">
                                        <td colSpan="5" style={{ padding: 0 }}>
                                            <FraudExplanation features={prediction.top_features} txId={tx.id} probability={prediction.fraud_probability} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                    {(!transactions || transactions.length === 0) && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                Awaiting incoming transactional payload streams.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
