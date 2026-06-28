import React, { useState } from 'react';
import { ChevronDown, Database } from 'lucide-react';
import './ChartStyles.css';
import { FraudExplanation } from './FraudExplanation';

// Cache expensive Intl formatters outside the component
// to prevent re-instantiation on every render and for every row
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
});

export const TransactionTable = ({ transactions }) => {
    const [expandedTx, setExpandedTx] = useState(null);

    // Helper formatters
    const formatCurrency = (amount) => {
        return currencyFormatter.format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return dateFormatter.format(date);
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
                        <th>Eval Risk</th>
                        <th>Alert Flags</th>
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
                                <tr
                                    onClick={() => isFraud && setExpandedTx(isExpanded ? null : tx.id)}
                                    onKeyDown={(e) => {
                                        if (isFraud && (e.key === 'Enter' || e.key === ' ')) {
                                            e.preventDefault();
                                            setExpandedTx(isExpanded ? null : tx.id);
                                        }
                                    }}
                                    tabIndex={isFraud ? 0 : undefined}
                                    aria-expanded={isFraud ? isExpanded : undefined}
                                    className={isFraud ? "clickable-row" : ""}
                                    style={{ cursor: isFraud ? 'pointer' : 'default' }}
                                >
                                    <td>{formatDate(tx.timestamp)}</td>
                                    <td style={{ fontWeight: 500 }}>{tx.merchant}</td>
                                    <td>
                                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{tx.device} • {tx.location}</span>
                                    </td>
                                    <td>{formatCurrency(tx.amount)}</td>
                                    <td>
                                        <span className={`risk-text ${prediction?.risk_level === 'HIGH' ? 'text-red-500' : prediction?.risk_level === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'}`} style={{ fontWeight: 'bold' }}>
                                            {prediction?.risk_level || 'N/A'}
                                        </span>
                                    </td>
                                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
                                        <span className={`badge ${isFraud ? 'danger' : 'safe'}`}>
                                            {isFraud ? 'Threat Caught' : 'Safe Packet'}
                                        </span>
                                        {isFraud && (
                                            <ChevronDown
                                                size={16}
                                                color="#94a3b8"
                                                style={{
                                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    transition: 'transform 0.2s ease'
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                                {isExpanded && prediction?.top_features && (
                                    <tr className="expanded-row">
                                        <td colSpan="6" style={{ padding: 0 }}>
                                            <FraudExplanation features={prediction.top_features} txId={tx.id} probability={prediction.fraud_probability} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                    {(!transactions || transactions.length === 0) && (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <Database size={32} opacity={0.5} />
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 500, color: '#94a3b8' }}>No Transactions Yet</p>
                                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', opacity: 0.8 }}>Awaiting incoming transactional payload streams.</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
