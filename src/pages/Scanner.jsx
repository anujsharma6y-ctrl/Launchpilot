import React, { useState } from 'react';
import { simulateLaunchScan } from '../lib/ai-engine';
import { useCredit, saveToHistory } from '../lib/storage';
import { Search, Link as LinkIcon, AlertTriangle, ShieldCheck, Play, Box } from 'lucide-react';

const Scanner = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');

    const handleScan = async (e) => {
        e.preventDefault();
        setError('');

        // Check credits
        if (!useCredit('scans')) {
            setError('No scans remaining. Please upgrade your plan.');
            return;
        }

        setLoading(true);
        setReport(null);

        try {
            const result = await simulateLaunchScan(url);
            const savedResult = saveToHistory(result);
            setReport(savedResult);
        } catch (err) {
            setError('Scan failed.');
        } finally {
            setLoading(false);
        }
    };

    const checklistItems = [
        { key: 'privacyPolicy', label: 'Privacy Policy' },
        { key: 'termsOfService', label: 'Terms of Service' },
        { key: 'sslSecurity', label: 'SSL Security' },
        { key: 'analyticsSetup', label: 'Analytics Setup' },
        { key: 'mobileOptimization', label: 'Mobile Optimization' },
        { key: 'emailCapture', label: 'Email Capture' },
        { key: 'seoMetaTags', label: 'SEO Meta Tags' }
    ];

    return (
        <div className="animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">Readiness Scanner</h1>
                <p className="page-subtitle">Analyze your landing page for technical and business launch readiness</p>
            </header>

            <div className="grid-2">
                {/* Input Form */}
                <div className="glass-card" style={{ padding: '32px' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                        <Search color="#3b82f6" /> Enter URL
                    </h2>

                    {error && (
                        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertTriangle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleScan} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '600' }}>Website URL</label>
                            <div style={{ position: 'relative' }}>
                                <LinkIcon size={18} style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-secondary)' }} />
                                <input
                                    type="url"
                                    className="input-field"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="https://acmeflow.com"
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading} style={{ background: 'linear-gradient(135deg, #3b82f6, #0ea5e9)', marginTop: '16px' }}>
                            {loading ? <Box className="animate-pulse" /> : <Play size={18} />}
                            {loading ? 'Scanning Infrastructure...' : 'Scan Website'}
                        </button>
                    </form>
                </div>

                {/* Results Area */}
                <div className="glass-card slide-in" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                    {!report && !loading && (
                        <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            <ShieldCheck size={48} style={{ opacity: 0.5, marginBottom: '16px', margin: '0 auto' }} />
                            <h3>Awaiting Input</h3>
                            <p>Run scan to see launch readiness checklist.</p>
                        </div>
                    )}

                    {loading && (
                        <div style={{ margin: 'auto', textAlign: 'center', color: '#3b82f6' }}>
                            <div className="score-circle" style={{ margin: '0 auto 24px', borderColor: 'rgba(59, 130, 246, 0.5)', borderStyle: 'dashed', animation: 'spin 3s linear infinite' }}>
                                <Search size={32} />
                            </div>
                            <h3 className="animate-pulse">Analyzing DOM and Headers...</h3>
                        </div>
                    )}

                    {report && !loading && (
                        <div className="animate-fade-in" style={{ height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Readiness Report</h2>
                                    <a href={report.url} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{report.url}</a>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div className="score-circle" style={{ borderColor: report.verdict === 'READY' ? 'var(--success)' : 'var(--danger)' }}>
                                        {report.launchScore}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--text-secondary)', fontWeight: '700' }}>SCORE</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Infrastructure Checklist</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {checklistItems.map((item) => {
                                        const status = report.checklist[item.key];
                                        return (
                                            <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                                                <span style={{ fontWeight: '500' }}>{item.label}</span>
                                                {status ? (
                                                    <span className="badge badge-success">Present</span>
                                                ) : (
                                                    <span className="badge badge-danger">Missing</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={{ padding: '24px', borderRadius: '12px', border: `1px solid ${report.verdict === 'READY' ? 'var(--success)' : 'var(--danger)'}`, background: 'rgba(0,0,0,0.2)' }}>
                                <h3 style={{ color: report.verdict === 'READY' ? 'var(--success)' : 'var(--danger)', marginBottom: '16px', fontSize: '1.2rem' }}>VERDICT: {report.verdict}</h3>
                                <p style={{ lineHeight: '1.6', color: 'var(--text-primary)' }}>{report.explanation}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Scanner;
