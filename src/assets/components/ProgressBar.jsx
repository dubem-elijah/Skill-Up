// src/components/ProgressBar.jsx
import React, { useEffect, useState } from 'react';

export default function ProgressBar({ label, percent, color = 'var(--purple)' }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(percent), 100); return () => clearTimeout(t); }, [percent]);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <span style={{ fontSize: 13, color: 'var(--text1)', fontWeight: 500 }}>{label}</span>
          <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 600 }}>{percent}%</span>
        </div>
      )}
      <div style={{ height: 6, background: 'var(--bg4)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${width}%`, borderRadius: 4,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  );
}
