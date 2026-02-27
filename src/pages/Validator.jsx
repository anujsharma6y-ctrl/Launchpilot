import React, { useState } from 'react';
import { simulateIdeaValidation } from '../lib/ai-engine';
import { useCredit, saveToHistory } from '../lib/storage';
import { Activity, AlertTriangle, Play, ShieldAlert, Sparkles, TrendingUp, DollarSign, Crosshair, Cpu } from 'lucide-react';

const Validator = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        audience: '',
        pricing: 'Subscription ($10-$50/mo)',
        mode: 'NORMAL'
    });

    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');

    const handleValidate = async (e) => {
        e.preventDefault();
        setError('');

        // Check credits
        if (!useCredit('validations')) {
            setError('No validations remaining. Please upgrade your plan.');
            return;
        }

        setLoading(true);
        setReport(null);

        try {
            const result = await simulateIdeaValidation(formData, formData.mode);
            const savedResult = saveToHistory({ ...result, ...formData });
            setReport(savedResult);
        } catch (err) {
            setError('Simulation failed.');
        } finally {
            setLoading(false);
        }
    };

    const getVerdictColor = (verdict) => {
        if (verdict === 'BUILD') return 'var(--success)';
        if (verdict === 'SKIP') return 'var(--danger)';
        return 'var(--warning)';
    };

    return (
        <div className="animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">Idea Validator</h1>
                <p className="page-subtitle">Test market viability and future survival of your SaaS</p>
            </header>

            <div className="grid-2">
                {/* Input Form */}
                <div className="glass-card" style={{ padding: '32px' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                        <Activity color="#7c3aed" /> Engine Inputs
                    </h2>

                    {error && (
                        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertTriangle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleValidate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '600' }}>Idea Name</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. AcmeFlow AI"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '600' }}>Core Description</label>
                            <textarea
                                className="input-field"
                                placeholder="Explain the problem and solution naturally..."
                                rows={4}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '600' }}>Target Audience</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. B2B Sales Teams, Indie Hackers..."
                                value={formData.audience}
                                onChange={e => setFormData({ ...formData, audience: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid-2" style={{ gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '600' }}>Pricing Model</label>
                                <select
                                    className="input-field"
                                    value={formData.pricing}
                                    onChange={e => setFormData({ ...formData, pricing: e.target.value })}
                                >
                                    <option>Free / Ad Supported</option>
                                    <option>Freemium ($5-$15/mo)</option>
                                    <option>Subscription ($10-$50/mo)</option>
                                    <option>Enterprise ($500+/mo)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '600' }}>Brutality Mode</label>
                                <select
                                    className="input-field"
                                    value={formData.mode}
                                    onChange={e => setFormData({ ...formData, mode: e.target.value })}
                                >
                                    <option value="NORMAL">Normal (Honest)</option>
                                    <option value="BRUTAL">Brutal (Unfiltered)</option>
                                    <option value="SAVAGE">Savage (Maximum Reality)</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '16px' }}>
                            {loading ? <Sparkles className="animate-pulse" /> : <Play size={18} />}
                            {loading ? 'Simulating Market Dynamics...' : 'Validate Idea'}
                        </button>
                    </form>
                </div>

                {/* Results Area */}
                <div className="glass-card slide-in" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                    {!report && !loading && (
                        <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            <ShieldAlert size={48} style={{ opacity: 0.5, marginBottom: '16px', margin: '0 auto' }} />
                            <h3>Awaiting Input</h3>
                            <p>Run validation to see TRUTH ENGINE analysis.</p>
                        </div>
                    )}

                    {loading && (
                        <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--btn-glow)' }}>
                            <div className="score-circle" style={{ margin: '0 auto 24px', borderColor: 'rgba(124, 58, 237, 0.5)', borderStyle: 'dashed', animation: 'spin 3s linear infinite' }}>
                                <Cpu size={32} />
                            </div>
                            <h3 className="animate-pulse">Crunching SaaS Failure Data...</h3>
                        </div>
                    )}

                    {report && !loading && (
                        <div className="animate-fade-in" style={{ height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Validation Report</h2>
                                    <span className={`badge ${report.mode === 'SAVAGE' ? 'badge-danger' : report.mode === 'BRUTAL' ? 'badge-warning' : 'badge-info'}`}>
                                        MODE: {report.mode}
                                    </span>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div className="score-circle" style={{ borderColor: getVerdictColor(report.verdict) }}>
                                        {report.futureViabilityScore}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--text-secondary)', fontWeight: '700' }}>VIABILITY</div>
                                </div>
                            </div>

                            <div className="grid-2" style={{ gap: '16px', marginBottom: '32px' }}>
                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px' }}><TrendingUp size={16} /> Demand Score</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{report.demandScore} / 100</div>
                                </div>

                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px' }}><DollarSign size={16} /> Revenue Potential</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{report.revenuePotential}</div>
                                </div>

                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px' }}><Crosshair size={16} /> Competition</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{report.competitionLevel}</div>
                                </div>

                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px' }}><Cpu size={16} /> AI Risk & Longevity</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{report.longevityPrediction}</div>
                                    <div style={{ fontSize: '0.8rem', color: report.aiReplacementRisk === 'High' ? 'var(--danger)' : 'var(--success)' }}>AI Replacement Risk: {report.aiReplacementRisk}</div>
                                </div>
                            </div>

                            <div style={{ padding: '24px', borderRadius: '12px', border: `1px solid ${getVerdictColor(report.verdict)}`, background: 'rgba(0,0,0,0.2)' }}>
                                <h3 style={{ color: getVerdictColor(report.verdict), marginBottom: '16px', fontSize: '1.2rem' }}>VERDICT: {report.verdict}</h3>
                                <p style={{ lineHeight: '1.6', color: 'var(--text-primary)' }}>{report.reasoning}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Validator;
