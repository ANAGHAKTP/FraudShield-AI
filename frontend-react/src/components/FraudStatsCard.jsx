import React from 'react';
import './ChartStyles.css';

export const FraudStatsCard = ({ title, value, subtext, icon: Icon, colorClass }) => {
    return (
        <div className={`stat-card glass-panel ${colorClass}`}>
            <div className="stat-content">
                <div className="stat-icon-wrapper">
                    {Icon && <Icon size={24} />}
                </div>
                <div className="stat-data">
                    <h3 className="stat-title">{title}</h3>
                    <p className="stat-value">{value}</p>
                    {subtext && <span className="stat-subtext">{subtext}</span>}
                </div>
            </div>
        </div>
    );
};
