import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { ShieldCheck, Lock, Mail } from 'lucide-react';
import './Login.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.access_token) {
                localStorage.setItem('token', res.data.access_token);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card glass-panel">
                <div className="login-header">
                    <ShieldCheck size={48} className="brand-icon" />
                    <h2>FraudShield AI</h2>
                    <p>Secure Enterprise Portal</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="primary-btn login-btn">
                        Access Dashboard
                    </button>

                    <p className="login-subtext">Day 11 Prototype • Authentication Layer</p>
                </form>
            </div>
        </div>
    );
};
