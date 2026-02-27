import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCredits, getHistory } from '../lib/storage';
import { Activity, Search, History, CreditCard, BatteryFull, CheckCircle, Target } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({ validations: 0, scans: 0, history: [] });
    const navigate = useNavigate();

    useEffect(() => {
        const history = getHistory();
        const creds = getCredits();
        setStats({
            validations: creds.validations,
            scans: creds.scans,
            history
        });
    }, []);

    const totalValidations = stats.history.filter(i => i.reportType === 'idea').length;
    const totalScans = stats.history.filter(i => i.reportType === 'scan').length;

    return (
        <div className="animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">Executive Dashboard</h1>
                <p className="page-subtitle">SaaS metrics and launch readiness overview</p>
            </header>

            {/* Stats Overview */}
            <div className="grid-3" style={{ marginBottom: '40px' }}>
                <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3b82f6' }}>
                        <Target size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800' }}>{totalValidations}</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Total Validations</div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: '#10b981' }}>
                        <CheckCircle size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800' }}>{totalScans}</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Total Scans</div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
                    <div style={{ padding: '16px', background: 'var(--btn-gradient)', borderRadius: '12px', color: 'white', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.5)' }}>
                        <BatteryFull size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.validations}</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Validations Left</div>
                    </div>
                </div>
            </div>

            {/* Action Cards */}
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Quick Actions</h2>
            <div className="grid-2">
                <div className="glass-card" style={{ padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/validator')}>
                    <Activity size={40} color="#7c3aed" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Launch Validator</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Simulate market conditions and test your SaaS idea with the Truth Engine.</p>
                    <button className="btn-primary">New Validation</button>
                </div>

                <div className="glass-card" style={{ padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/scanner')}>
                    <Search size={40} color="#3b82f6" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Readiness Scanner</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Analyze your landing page for technical and business launch readiness.</p>
                    <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #3b82f6, #0ea5e9)' }}>Scan URL</button>
                </div>

                <div className="glass-card" style={{ padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/history')}>
                    <History size={40} color="#f59e0b" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Reports History</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>View previous analysis reports, scores, and readiness checklists.</p>
                    <button className="btn-secondary">View Archives</button>
                </div>

                <div className="glass-card" style={{ padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/pricing')}>
                    <CreditCard size={40} color="#10b981" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Upgrade Plan</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Unlock unlimited scans, deeper viability metrics, and Savage mode.</p>
                    <button className="btn-secondary" style={{ borderColor: '#10b981', color: '#10b981' }}>View Plans</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
