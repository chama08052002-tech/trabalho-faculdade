import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Save, Download, User, Mail, Briefcase, Info } from 'lucide-react';

export default function Register() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    notes: ''
  });

  const [generatedJson, setGeneratedJson] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `registro_${formData.fullName.replace(/\s+/g, '_').toLowerCase()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div style={{ flex: 1, padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel" 
        style={{ width: '100%', maxWidth: '600px', padding: '50px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
          <div style={{ background: 'var(--accent-primary)', padding: '12px', borderRadius: '12px', color: 'var(--bg-primary)' }}>
            <User size={24} />
          </div>
          <h2 style={{ fontSize: '2rem' }}>Registro de Acesso</h2>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <User size={14} /> Nome Completo
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
              placeholder="Ex: João Silva"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Mail size={14} /> E-mail Institucional
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
              placeholder="email@exemplo.com"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              Telefone (Opcional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Briefcase size={14} /> Cargo / Ocupação
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { id: 'Hardware', label: 'Hardware Specialist' },
                { id: 'Dev', label: 'Frontend Architect' },
                { id: 'Admin', label: 'SysAdmin' }
              ].map(role => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, occupation: role.label }))}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: formData.occupation === role.label ? 'var(--accent-primary)' : 'var(--border-color)',
                    background: formData.occupation === role.label ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                    color: formData.occupation === role.label ? 'var(--accent-primary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Info size={14} /> Notas Adicionais
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none', resize: 'none' }}
              placeholder="Descreva suas competências..."
            />
          </div>

          <button 
            type="button" 
            onClick={() => {
              exportJSON();
              setGeneratedJson(formData);
            }}
            className="btn-premium" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}
          >
            <Download size={20} />
            Gerar Protocolo JSON
          </button>
        </form>

        {generatedJson && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '30px', textAlign: 'left' }}
          >
            <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--accent-primary)' }}>JSON Validado:</h4>
            <pre style={{ 
              background: '#000', 
              padding: '15px', 
              borderRadius: '8px', 
              fontSize: '0.8rem', 
              overflowX: 'auto',
              border: '1px solid var(--accent-primary)',
              color: '#00ff00',
              fontFamily: 'var(--font-mono)'
            }}>
              {JSON.stringify(generatedJson, null, 2)}
            </pre>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
