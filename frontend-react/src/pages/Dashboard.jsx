import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Activity, CreditCard, LogOut, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { FraudStatsCard } from '../components/FraudStatsCard';
import { FraudTrendChart } from '../components/FraudTrendChart';
import { RiskDistributionChart } from '../components/RiskDistributionChart';
import { RiskGaugeCard } from '../components/RiskGaugeCard';
import { FraudRateChart } from '../components/FraudRateChart';
import { TransactionTable } from '../components/TransactionTable';
import { AlertPanel } from '../components/AlertPanel';
import './Dashboard.css';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        transactions: 0,
        fraudRate: 0,
        fraudVol: 0
    });
    const [trendData, setTrendData] = useState([]);
    const [highRiskData, setHighRiskData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [latestPrediction, setLatestPrediction] = useState({ probability: 0, label: 'legitimate' });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [rateRes, countRes, trendRes, txRes] = await Promise.all([
                    api.get('/analytics/fraud-rate'),
                    api.get('/analytics/transactions-count'),
                    api.get('/analytics/trend'),
                    api.get('/transactions')
                ]);

                setStats({
                    transactions: countRes.data.count,
                    fraudRate: (rateRes.data.fraud_rate * 100).toFixed(2),
                    fraudVol: rateRes.data.fraud_transactions
                });

                setTrendData(trendRes.data);

                const safe = countRes.data.count - rateRes.data.fraud_transactions;
                setHighRiskData([
                    { name: 'Safe Volume', value: safe },
                    { name: 'Fraud Detected', value: rateRes.data.fraud_transactions }
                ]);

                setTransactions(txRes.data);

                if (txRes.data.length > 0) {
                    const latest = txRes.data[0];
                    if (latest.Predictions && latest.Predictions.length > 0) {
                        setLatestPrediction({
                            probability: latest.Predictions[0].fraud_probability,
                            label: latest.Predictions[0].label
                        });
                    }
                }

            } catch (error) {
                console.error("Dashboard failed to load analytics:", error);
                if (error.response?.status === 401) {
                    handleLogout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <Loader2 className="spinner" size={48} />
                <p>Loading Intelligence Matrix...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <nav className="dashboard-sidebar glass-panel">
                <div className="brand">
                    <ShieldAlert className="brand-icon" size={28} />
                    <h2>FraudShield</h2>
                </div>
                <div className="nav-items">
                    <button className="nav-btn active"><Activity size={20} /> Metric Feeds</button>
                    <button className="nav-btn"><CreditCard size={20} /> Ledger Log</button>
                </div>
                <div className="sidebar-footer">
                    <button className="nav-btn logout" onClick={handleLogout}>
                        <LogOut size={20} /> Safely Disconnect
                    </button>
                </div>
            </nav>

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Intelligence Threat Overview</h1>
                        <p>Real-time machine learning threat prevention analysis utilizing day-12 BarChart integrations.</p>
                    </div>
                </header>

                <AlertPanel />

                {/* Top Metrics Grid */}
                <div className="metrics-grid">
                    <FraudStatsCard
                        title="Total Authenticated Volume"
                        value={stats.transactions}
                        icon={Activity}
                        colorClass="blue"
                    />
                    <FraudStatsCard
                        title="Intercepted Threats"
                        value={stats.fraudVol}
                        icon={ShieldAlert}
                        colorClass="red"
                    />
                    <FraudStatsCard
                        title="System Uptime"
                        value="99.9%"
                        subtext="Fully synced"
                        icon={Activity}
                        colorClass="green"
                    />
                </div>

                {/* Charts Grid */}
                <div className="charts-grid-triplet">
                    {/* The new Day 12 Vertical BarChart metric comparison */}
                    <div className="main-chart">
                        <FraudRateChart
                            fraudRate={stats.fraudRate}
                            totalVol={stats.transactions}
                            fraudVol={stats.fraudVol}
                        />
                    </div>
                </div>

                <div className="charts-grid" style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1.5rem' }}>
                    <div className="main-chart">
                        <FraudTrendChart data={trendData} />
                    </div>
                    <div className="side-chart">
                        <RiskDistributionChart data={highRiskData} />
                    </div>
                    <div className="side-chart">
                        <RiskGaugeCard probability={latestPrediction.probability} label={latestPrediction.label} />
                    </div>
                </div>

                {/* Data Table */}
                <div className="table-wrapper">
                    <TransactionTable transactions={transactions} />
                </div>
            </main>
        </div>
    );
};
