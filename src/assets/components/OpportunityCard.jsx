// src/components/OpportunityCard.jsx
import React from 'react';

export default function OpportunityCard({ opportunity, onApply, isApplied }) {
  const { title, price, tags, icon, deadline, postedBy } = opportunity;

  const handleApply = (event) => {
    event.stopPropagation();
    if (onApply && !isApplied) onApply(opportunity);
  };

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: 18, borderRadius: 12,
        background: 'var(--bg4)', cursor: 'pointer',
        transition: 'all var(--ease)', border: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--purple)';
        e.currentTarget.style.background = 'var(--bg5)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 92, 252, 0.15)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--bg4)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'linear-gradient(135deg, var(--purple-bg), var(--purple-bg2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          flexShrink: 0,
          border: '1px solid var(--border)',
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text1)',
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        {postedBy && (
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>
            by {postedBy}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: '2px 8px',
                borderRadius: 6,
                background: 'var(--bg3)',
                color: 'var(--text2)',
                border: '1px solid var(--border)',
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: 'var(--green)',
              display: 'block',
              marginBottom: 2,
            }}
          >
            {price}
          </span>
          {deadline && (
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>
              ⏰ {deadline}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleApply}
          disabled={isApplied}
          style={{
            width: '100%',
            padding: '8px 14px',
            borderRadius: 8,
            background: isApplied ? 'var(--border)' : 'var(--purple)',
            color: isApplied ? 'var(--text3)' : 'white',
            border: 'none',
            cursor: isApplied ? 'default' : 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            transition: 'all var(--ease)',
            minWidth: 80,
          }}
        >
          {isApplied ? 'Applied' : 'Apply'}
        </button>
      </div>
    </div>
  );
}
