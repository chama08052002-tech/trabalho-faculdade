import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, UserPlus, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Equipe', path: '/equipe', icon: <Users size={20} />, protected: true },
    { name: 'Cadastro', path: '/cadastro', icon: <UserPlus size={20} />, protected: true },
  ];

  return (
    <nav className="glass-panel" style={{ margin: '20px', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '20px', zIndex: 100 }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>
        <span className="gradient-text">EXPLORE NOSSO TRABALHO</span>
      </Link>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {navItems.map((item) => {
          if (item.protected && !user) return null;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontWeight: '500',
                fontSize: '0.9rem',
                transition: '0.3s'
              }}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}

        {user && (
          <button onClick={logout} className="btn-premium" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <LogOut size={16} />
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}
