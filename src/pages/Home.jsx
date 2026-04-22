import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Users, Monitor, Database } from 'lucide-react';

export default function Home() {
  const { user, login } = useAuth();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '20px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
          Conheça nosso sistema para <br />
          <span className="gradient-text">nos conhecer mais</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 40px' }}>
          Explore as funcionalidades da nossa plataforma integrada e descubra as competências técnicas que movem nossos projetos de hardware e software.
        </p>

        {!user ? (
          <div className="glass-panel" style={{ padding: '30px', display: 'inline-block' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Acesse a Central Ténica</h3>
            <GoogleLogin
              onSuccess={login}
              onError={() => console.log('Login Failed')}
              theme="filled_black"
              shape="pill"
            />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={user.picture} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              <span style={{ fontWeight: '500' }}>Bem-vindo, {user.given_name}</span>
            </div>
          </div>
        )}
      </motion.div>

      <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', maxWidth: '1000px' }}>
        {[
          { icon: <Users className="gradient-text" />, title: 'Nossa Equipe', desc: 'Conheça os profissionais por trás do hardware e do código.' },
          { icon: <Monitor className="gradient-text" />, title: 'Interface Própria', desc: 'Desenvolvimento focado em experiência e fluidez visual.' },
          { icon: <Database className="gradient-text" />, title: 'Gestão de Dados', desc: 'Segurança e agilidade no tratamento de informações técnicas.' }
        ].map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * idx }}
            style={{ textAlign: 'left' }}
          >
            <div style={{ marginBottom: '15px' }}>{React.cloneElement(feat.icon, { size: 32 })}</div>
            <h4 style={{ marginBottom: '10px' }}>{feat.title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
