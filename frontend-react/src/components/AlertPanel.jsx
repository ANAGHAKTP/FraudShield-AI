import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { api } from '../services/api';
import './AlertPanel.css';

// ⚡ Bolt Optimization: Cache Intl.DateTimeFormat instance outside the component
// to prevent expensive re-instantiations on every render and loop iteration.
const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
});

export const AlertPanel = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await api.get('/alerts');
                setAlerts(res.data);
            } catch (error) {
                console.error("Failed to fetch alerts:", error);
            }
        };

        fetchAlerts();

        const interval = setInterval(fetchAlerts, 10000); // refresh every 10s
        return () => clearInterval(interval);
    }, []);

    if (alerts.length === 0) return null;

    return (
        <div className="alert-panel-container" role="alert" aria-live="assertive">
            <div className="alert-header">
                <AlertTriangle className="alert-icon pulse" size={24} />
                <h3>⚠ High Risk Transaction Detected</h3>
            </div>
            <div className="alert-list">
                {alerts.map((alert, index) => (
                    <div key={index} className="alert-item">
                        <span className="alert-tx">Transaction {alert.transaction_id}</span>
                        <span className="alert-prob">flagged ({Number(alert.probability).toFixed(2)})</span>
                        <span className="alert-time">{timeFormatter.format(new Date(alert.created_at))}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
