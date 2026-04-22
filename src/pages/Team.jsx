import React from 'react';
import { motion } from 'framer-motion';
import { HardDrive, Code, Cpu, Monitor, Database, Globe } from 'lucide-react';

const MemberCard = ({ name, role, tags, icon: Icon, specialty, accent }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="glass-panel"
    style={{
      padding: '40px',
      position: 'relative',
      overflow: 'hidden',
      borderTop: `4px solid ${accent}`
    }}
  >
    <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}>
      <Icon size={120} />
    </div>
    
    <div style={{ marginBottom: '20px', color: accent }}>
      <Icon size={48} />
    </div>
    
    <h3 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>{name}</h3>
    <p style={{ color: accent, fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '20px' }}>
      {role}
    </p>
    
    <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.95rem' }}>
      {specialty}
    </p>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {tags.map(tag => (
        <span key={tag} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-main)' }}>
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

export default function Team() {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Corpo Técnico</h2>
        <p style={{ color: 'var(--text-muted)' }}>Mentes por trás da integração entre o mundo físico e o digital.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <MemberCard
          name="Gustavo Almeida"
          role="Hardware Specialist"
          icon={HardDrive}
          accent="var(--accent-secondary)"
          specialty="Especialista em infraestrutura física, montagem técnica de hardware industrial e manutenção de sistemas críticos de informática."
          tags={['Circuitry', 'Server Maintenance', 'Edge Computing', 'Robotics']}
        />
        
        <MemberCard
          name="Carlos Eduardo da Silva Lima"
          role="Frontend Architect"
          icon={Code}
          accent="var(--accent-primary)"
          specialty="Arquiteto de interfaces modernas focado em User Experience (UX), animações matemáticas de alta performance e ecossistema React."
          tags={['React 19', 'UI Design', 'WebGL', 'State Management']}
        />
      </div>

      <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
         {[Cpu, Monitor, Database, Globe].map((Icon, idx) => (
           <div key={idx} className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
             <Icon style={{ color: 'rgba(255,255,255,0.2)' }} size={32} />
           </div>
         ))}
      </div>
    </div>
  );
}
