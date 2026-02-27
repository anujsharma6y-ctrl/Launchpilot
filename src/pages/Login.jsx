import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { loginUser } from '../lib/storage';

const Login = ({ setUser, user }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // If already logged in, go to dashboard
    if (user) {
        navigate('/');
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) return;

        // Mock authentication
        const newUser = loginUser(email);
        setUser(newUser);
        navigate('/');
    };

    return (
        <div className="auth-container animate-fade-in">
            <div className="glass-card" style={{ padding: '48px', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <Rocket size={48} color="#7c3aed" />
                    </div>
                    <h1 className="page-title" style={{ fontSize: '1.8rem' }}>LaunchPilot AI</h1>
                    <p className="page-subtitle">Login to Validate Your SaaS</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="founder@startup.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                        Enter Truth Engine
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Free version includes 3 validations/month.
                </div>
            </div>
        </div>
    );
};

export default Login;
