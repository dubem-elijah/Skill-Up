// src/assets/components/Avatar.jsx
import React from 'react';

const sizes = {
  xs: { width: 24, height: 24, fontSize: 9 },
  sm: { width: 32, height: 32, fontSize: 11 },
  md: { width: 40, height: 40, fontSize: 14 },
  lg: { width: 46, height: 46, fontSize: 16 },
  xl: { width: 56, height: 56, fontSize: 20 },
};

export default function Avatar({ initials, gradient, size = 'md', style = {}, className = '' }) {
  const s = sizes[size] || sizes.md;
  return (
    <div className={className} style={{
      width: s.width, height: s.height, borderRadius: '50%',
      background: gradient || 'linear-gradient(135deg, #7c5cfc, #ec4899)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: s.fontSize, fontWeight: 700, color: 'white', flexShrink: 0,
      fontFamily: "'DM Sans', sans-serif", ...style,
    }}>
      {initials}
    </div>
  );
}
