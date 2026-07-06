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
    ChevronRight,
    Loader2
} from 'lucide-react';
import './Login.css';

export const Login = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const data = { email, password };
            const response = mode === 'login' 
                ? await api.post("/auth/login", data)
                : await api.post("/auth/register", data);

            if (mode === 'login') {
                localStorage.setItem("token", response.data.access_token);
                navigate("/dashboard");
            } else {
                alert("Account created successfully. Please login.");
                setMode('login');
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Connection error. Please check if the server is running.';
            setError(message);
        } finally {
            setIsLoading(false);
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
                        <Mail className="field-icon" size={20} aria-hidden="true" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            aria-label="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input-field">
                        <Lock className="field-icon" size={20} aria-hidden="true" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            aria-label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            className="toggle-password"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
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

                    {error && (
                        <div className="error-message" role="alert">
                            {error}
                        </div>
                    )}

                    <button type="submit" className="login-btn primary-gradient" disabled={isLoading} aria-busy={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="spinner" size={20} aria-hidden="true" />
                                {mode === 'login' ? 'Authenticating...' : 'Creating Account...'}
                            </>
                        ) : (
                            <>
                                {mode === 'login' ? 'Access Dashboard' : 'Create Account'} <ArrowRight size={20} aria-hidden="true" />
                            </>
                        )}
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
