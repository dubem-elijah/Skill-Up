// src/components/RightPanel.jsx
import React from 'react';
import ProgressBar from './ProgressBar';
import OpportunityCard from './OpportunityCard';
import Avatar from './Avatar';
import { userProgress, opportunities, topLearners, currentUser } from '../../utils/data';

const rankLabel = (i) => i === 0 ? '👑' : i === 2 ? '🥉' : String(i + 1);

export default function RightPanel({ onNavigate }) {
  return (
    <aside style={{ width: 'var(--right-width)', background: 'var(--bg2)', borderLeft: '1px solid var(--border)', padding: 18, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>

      {/* Progress */}
      <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text1)' }}>Your Progress</span>
          <span style={{ fontSize: 12, color: 'var(--purple2)', cursor: 'pointer', fontWeight: 500 }}>View all</span>
        </div>
        {userProgress.map(({ skill, percent, color }) => <ProgressBar key={skill} label={skill} percent={percent} color={color} />)}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid var(--border)', marginTop: 4 }}>
          <span style={{ fontSize: 24 }}>🔥</span>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: 'var(--text1)', lineHeight: 1 }}>{currentUser.streak}</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>Day Streak</div>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--purple2)', cursor: 'pointer', fontWeight: 500 }}>Keep it up! 🔥</span>
        </div>
      </div>

      {/* Opportunities */}
      <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }} className="opportunities-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text1)' }}>Opportunities for you</span>
          <span
            style={{ fontSize: 12, color: 'var(--purple2)', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => onNavigate?.('Opportunities')}
          >
            View all
          </span>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          {opportunities.slice(0, 4).map((opp) => (
            <div key={opp.id} className="opportunity-card" style={{ borderRadius: 12, overflow: 'hidden' }}>
              <OpportunityCard opportunity={opp} onApply={() => onNavigate?.('Opportunities')} />
            </div>
          ))}
        </div>
      </div>

      {/* Top Learners */}
      <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, padding: 16 }} className="top-learners-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text1)' }}>Top Learners</span>
          <span style={{ fontSize: 12, color: 'var(--purple2)', cursor: 'pointer', fontWeight: 500 }}>View all</span>
        </div>
        {topLearners.map((learner, i) => (
          <div key={learner.id} className="learner-item" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < topLearners.length-1 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ width: 24, textAlign: 'center', fontSize: i===0?17:13, fontWeight: 700, color: i===0?'var(--amber)':i===1?'#aab':i===2?'#c87':'var(--text3)', flexShrink: 0 }}>{rankLabel(i)}</span>
            <Avatar initials={learner.name[0]} size="sm" gradient={learner.gradient} />
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--text1)' }}>{learner.name}</div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--purple2)' }}>{learner.xp} XP</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
