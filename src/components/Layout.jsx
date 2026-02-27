import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Rocket,
    LayoutDashboard,
    Search,
    History as HistoryIcon,
    CreditCard,
    LogOut,
    Moon,
    Sun,
    Activity
} from 'lucide-react';
import { logoutUser } from '../lib/storage';

const Layout = ({ children, toggleTheme, theme, user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="app-container slide-in">
            <aside className="sidebar">
                <NavLink to="/" className="sidebar-logo">
                    <Rocket size={28} />
                    <span>LaunchPilot.AI</span>
                </NavLink>

                <nav className="sidebar-nav">
                    <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink to="/validator" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Activity size={20} />
                        Idea Validator
                    </NavLink>
                    <NavLink to="/scanner" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Search size={20} />
                        Launch Scanner
                    </NavLink>
                    <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <HistoryIcon size={20} />
                        Reports History
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <NavLink to="/pricing" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <CreditCard size={20} />
                        Upgrade Plan
                    </NavLink>

                    <button className="theme-toggle-btn" onClick={toggleTheme}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                        </span>
                    </button>

                    <button className="theme-toggle-btn" onClick={handleLogout} style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <LogOut size={18} />
                            Log Out
                        </span>
                    </button>
                </div>
            </aside>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
