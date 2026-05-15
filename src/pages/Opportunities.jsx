// src/pages/Opportunities.jsx
import React, { useState } from 'react';
import { opportunities } from '../utils/data';
import OpportunityCard from '../assets/components/OpportunityCard';

const styles = {
  container: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 24px 40px',
  },
  header: {
    marginBottom: 24,
  },
  pageTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(18px, 5vw, 22px)',
    fontWeight: 800,
    color: 'var(--text1)',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: 'var(--text2)',
  },
  filterRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 24,
    flexWrap: 'wrap',
    overflowX: 'auto',
    paddingBottom: 8,
  },
  filterBtn: (active) => ({
    padding: '7px 16px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    background: active ? 'var(--purple)' : 'var(--bg3)',
    color: active ? 'white' : 'var(--text2)',
    border: `1px solid ${active ? 'var(--purple)' : 'var(--border)'}`,
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all var(--transition)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
  },
  status: {
    fontSize: 14,
    color: 'var(--text2)',
    padding: '28px 0',
  },
};

export default function Opportunities({ user, setUser, searchQuery = '' }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [appliedIds, setAppliedIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const filters = ['All', ...Array.from(new Set(opportunities.flatMap((opp) => opp.tags)))];
  const filtered = opportunities
    .filter((opp) => activeFilter === 'All' || opp.tags.includes(activeFilter))
    .filter((opp) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.trim().toLowerCase();
      return [
        opp.title,
        opp.postedBy,
        opp.price,
        ...opp.tags,
      ].some((value) => value?.toLowerCase().includes(query));
    });

  const handleApply = (opp) => {
    if (appliedIds.includes(opp.id)) return;
    setAppliedIds((prev) => [...prev, opp.id]);

    if (setUser) {
      setUser((prev) => ({
        ...prev,
        balance: (prev.balance || 0) + opp.priceNum,
      }));
    }

    setSuccessMessage(`Applied successfully for ${opp.title}! ₦${opp.priceNum.toLocaleString()} added to your wallet.`);
    window.setTimeout(() => setSuccessMessage(''), 4200);
  };

  return (
    <main style={styles.container} className="opportunities-container">
      <div style={styles.header}>
        <div style={styles.pageTitle}>Opportunities 💰</div>
        <div style={styles.pageSubtitle}>Find gigs, earn money, and grow your portfolio.</div>
        {successMessage && (
          <div style={{
            marginTop: 16,
            padding: '14px 18px',
            borderRadius: 16,
            background: 'var(--green-bg)',
            color: 'var(--green)',
            border: '1px solid var(--green)',
            maxWidth: 620,
          }}>
            {successMessage}
          </div>
        )}
      </div>

      <div style={styles.filterRow} className="tabs-container">
        {filters.map((filter) => (
          <button
            key={filter}
            style={styles.filterBtn(activeFilter === filter)}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={styles.status}>No opportunities found for "{activeFilter}".</div>
      ) : (
        <div style={styles.grid} className="opportunities-grid">
          {filtered.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onApply={() => handleApply(opp)}
              isApplied={appliedIds.includes(opp.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
