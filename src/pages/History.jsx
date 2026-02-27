import React, { useEffect, useState } from 'react';
import { getHistory } from '../lib/storage';
import { History as HistoryIcon, Activity, Search, ExternalLink, Calendar } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const IdeaCard = ({ item }) => (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '8px', color: '#7c3aed' }}>
                        <Activity size={20} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.name}</h3>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={12} /> {formatDate(item.timestamp)}
                        </div>
                    </div>
                </div>
                <div className={`badge ${item.verdict === 'BUILD' ? 'badge-success' : item.verdict === 'SKIP' ? 'badge-danger' : 'badge-warning'}`}>
                    {item.verdict}
                </div>
            </div>

            <div className="grid-3" style={{ gap: '12px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '8px' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Viability</div>
                    <div style={{ fontWeight: '700' }}>{item.futureViabilityScore}/100</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Demand</div>
                    <div style={{ fontWeight: '700' }}>{item.demandScore}/100</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Mode</div>
                    <div style={{ fontWeight: '700', color: '#7c3aed' }}>{item.mode}</div>
                </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', WebkitLineClamp: 2, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical' }}>
                {item.reasoning}
            </p>
        </div>
    );

    const ScanCard = ({ item }) => (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: '#3b82f6' }}>
                        <Search size={20} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {new URL(item.url).hostname} <a href={item.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={14} /></a>
                        </h3>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={12} /> {formatDate(item.timestamp)}
                        </div>
                    </div>
                </div>
                <div className={`badge ${item.verdict === 'READY' ? 'badge-success' : 'badge-danger'}`}>
                    {item.verdict}
                </div>
            </div>

            <div className="grid-2" style={{ gap: '12px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '8px' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Readiness Score</div>
                    <div style={{ fontWeight: '700' }}>{item.launchScore}/100</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Issues Found</div>
                    <div style={{ fontWeight: '700' }}>{Object.values(item.checklist).filter(v => !v).length} missing</div>
                </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', WebkitLineClamp: 2, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical' }}>
                {item.explanation}
            </p>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">Reports History</h1>
                <p className="page-subtitle">Review your past validations and readiness scans</p>
            </header>

            {history.length === 0 ? (
                <div className="glass-card" style={{ padding: '64px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <HistoryIcon size={64} style={{ opacity: 0.2, color: 'var(--text-secondary)' }} />
                    <h2 style={{ fontSize: '1.5rem' }}>No history found</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Run your first validation or scan to populate this list.</p>
                </div>
            ) : (
                <div className="grid-2">
                    {history.map((item) => (
                        item.reportType === 'idea' ? <IdeaCard key={item.id} item={item} /> : <ScanCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
