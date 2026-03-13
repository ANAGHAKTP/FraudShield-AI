import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { 
    ShieldCheck, 
    Lock, 
    Mail, 
    Shield, 
    Activity, 
    LockKeyhole, 
    Eye, 
    EyeOff, 
    ArrowRight, 
    UserPlus,
    ChevronRight
} from 'lucide-react';
import './Login.css';

export const Login = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const endpoint = mode === 'login' 
                ? "http://localhost:3000/auth/login" 
                : "http://localhost:3000/auth/register";

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                if (mode === 'login') {
                    localStorage.setItem("token", data.access_token);
                    window.location.href = "/dashboard";
                } else {
                    alert("Account created successfully. Please login.");
                    setMode('login');
                }
            } else {
                setError(data.message || (mode === 'login' ? 'Login failed.' : 'Registration failed.'));
            }
        } catch (err) {
            setError('Connection error. Please check if the server is running.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card glass-panel">
                <div className="login-header">
                    <ShieldCheck size={64} className="brand-icon" />
                    <h1>FraudShield AI</h1>
                    <p className="subtitle">{mode === 'login' ? 'Secure Enterprise Portal' : 'Create New Account'}</p>
                </div>

                {mode === 'login' && (
                    <div className="feature-highlights">
                        <div className="feature-item">
                            <div className="feature-icon-wrapper">
                                <Shield size={18} />
                                <span className="dot mfa-dot"></span>
                            </div>
                            <div className="feature-text">
                                <span>Multi-Factor</span>
                                <span>Authentication</span>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="feature-item">
                            <div className="feature-icon-wrapper">
                                <Activity size={18} />
                                <span className="dot threat-dot"></span>
                            </div>
                            <div className="feature-text">
                                <span>Real-time</span>
                                <span>Threat Detection</span>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="feature-item">
                            <div className="feature-icon-wrapper">
                                <LockKeyhole size={18} />
                            </div>
                            <div className="feature-text">
                                <span>Encrypted</span>
                                <span>Access</span>
                            </div>
                        </div>
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <Mail className="field-icon" size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input-field">
                        <Lock className="field-icon" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {mode === 'login' && (
                        <div className="form-options">
                            <label className="checkbox-container">
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe} 
                                    onChange={(e) => setRememberMe(e.target.checked)} 
                                />
                                <span className="checkmark"></span>
                                Remember me
                            </label>
                            <a href="#forgot" className="forgot-link">Forgot Password?</a>
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-btn primary-gradient">
                        {mode === 'login' ? 'Access Dashboard' : 'Create Account'} <ArrowRight size={20} />
                    </button>
                </form>

                <div className="horizontal-divider"></div>

                <div className="registration-section">
                    <h3>{mode === 'login' ? 'New to FraudShield AI?' : 'Already have an account?'}</h3>
                    <p>{mode === 'login' ? 'Create an account to get started.' : 'Sign in to access your dashboard.'}</p>
                    
                    <button 
                        className="register-btn"
                        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                    >
                        {mode === 'login' ? <UserPlus size={20} /> : <ChevronRight size={20} />}
                        <span>{mode === 'login' ? 'Create Account' : 'Back to Login'}</span>
                        <ArrowRight size={20} className="arrow-icon" />
                    </button>
                </div>

                <div className="legal-footer">
                    <p>By signing in, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a></p>
                </div>
            </div>
        </div>
    );
};
