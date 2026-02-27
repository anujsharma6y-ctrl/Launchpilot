import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './lib/storage';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Validator from './pages/Validator';
import Scanner from './pages/Scanner';
import History from './pages/History';
import Pricing from './pages/Pricing';

// Components
import Layout from './components/Layout';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <Layout toggleTheme={toggleTheme} theme={theme} user={user} setUser={setUser}>{children}</Layout>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} user={user} />} />

        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/validator" element={<ProtectedRoute><Validator /></ProtectedRoute>} />
        <Route path="/scanner" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
