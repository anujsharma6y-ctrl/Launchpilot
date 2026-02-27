import React, { useState } from 'react';
import { useCredit } from '../lib/storage';
import { Check, X, CreditCard, Sparkles, Activity } from 'lucide-react';

const Pricing = () => {
    const [upgraded, setUpgraded] = useState(false);

    const handleUpgrade = () => {
        // Just a mock upgrade button
        setUpgraded(true);
        setTimeout(() => setUpgraded(false), 3000);
    };

    return (
        <div className="animate-fade-in">
            <header className="page-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 className="page-title" style={{ fontSize: '2.5rem' }}>Upgrade to LaunchPilot Pro</h1>
                <p className="page-subtitle" style={{ maxWidth: '600px', margin: '16px auto 0' }}>Unlock the Savage Truth Engine and get unlimited market validation for all your startup ideas.</p>
            </header>

            <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '32px' }}>
                {/* Free Plan */}
                <div className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Hobbyist</h2>
                    <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '24px' }}>
                        $0 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '400' }}>/ mo</span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>For solo founders exploring basic SaaS ideas.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Check size={20} color="var(--success)" /> 3 Validations / month
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Check size={20} color="var(--success)" /> 3 Readiness Scans / month
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Check size={20} color="var(--success)" /> Normal & Brutal Modes
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                            <X size={20} /> Savage Truth Engine
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                            <X size={20} /> Export Reports (PDF)
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                            <X size={20} /> Detailed Viability Metrics
                        </div>
                    </div>

                    <button className="btn-secondary" style={{ marginTop: '32px', width: '100%' }} disabled>Current Plan</button>
                </div>

                {/* Pro Plan */}
                <div className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', border: '1px solid #7c3aed', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--btn-gradient)' }} />
                    <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(124, 58, 237, 0.2)', color: '#a78bfa', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Sparkles size={14} /> RECOMMENDED
                    </div>

                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#a78bfa' }}>Pro Founder</h2>
                    <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '24px' }}>
                        $29 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '400' }}>/ mo</span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>For serious builders who need the unfiltered truth.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Check size={20} color="var(--success)" /> <b>Unlimited</b> Validations
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Check size={20} color="var(--success)" /> <b>Unlimited</b> Readiness Scans
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Check size={20} color="var(--success)" /> Savage Truth Engine unlocked
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Check size={20} color="var(--success)" /> Export PDF Reports
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Check size={20} color="var(--success)" /> Advanced AI Engine Metrics
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Check size={20} color="var(--success)" /> Priority email support
                        </div>
                    </div>

                    <button className="btn-primary" style={{ marginTop: '32px', width: '100%' }} onClick={handleUpgrade}>
                        {upgraded ? 'Upgraded! (Mock)' : 'Upgrade to Pro'}
                    </button>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px', color: 'var(--text-secondary)' }}>
                <p>This is a simulated SaaS platform. No real payments are processed.</p>
            </div>
        </div>
    );
};

export default Pricing;
