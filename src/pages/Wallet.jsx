// src/pages/Wallet.jsx
import React, { useState } from 'react';

const styles = {
  container: { flex: 1, overflowY: 'auto', padding: '32px 32px 40px' },
  actionBox: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 18,
    padding: 20,
    marginTop: 24,
    maxWidth: 480,
  },
  actionTitle: { fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text1)', marginBottom: 12 },
  inputRow: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid var(--border)',
    background: 'var(--bg3)',
    color: 'var(--text1)',
    fontSize: 14,
    outline: 'none',
  },
  actionSubmit: {
    marginTop: 12,
    padding: '11px 16px',
    borderRadius: 12,
    border: 'none',
    background: 'var(--purple)',
    color: 'white',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
  },
  feedback: {
    marginTop: 14,
    padding: '12px 14px',
    borderRadius: 12,
    background: 'var(--green-bg)',
    color: 'var(--green)',
    border: '1px solid var(--green)',
    maxWidth: 480,
  },
  title: { fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--text1)', marginBottom: 4 },
  sub: { fontSize: 14, color: 'var(--text2)', marginBottom: 28 },
  balanceCard: {
    background: 'linear-gradient(135deg, #4a30c8, #7c5cfc)',
    borderRadius: 22,
    padding: '28px 28px',
    marginBottom: 24,
    maxWidth: 380,
    position: 'relative',
    overflow: 'hidden',
  },
  balanceLabel: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 },
  balanceAmount: { fontFamily: "'Syne',sans-serif", fontSize: 38, fontWeight: 800, color: 'white', marginBottom: 20 },
  cardRow: { display: 'flex', gap: 12 },
  cardBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: 11,
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans',sans-serif",
    backdropFilter: 'blur(4px)',
  },
  sectionTitle: { fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text1)', marginBottom: 14 },
  txList: { display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 500 },
  txItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 14,
    padding: '14px 16px',
  },
  txIcon: { width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 },
  txInfo: { flex: 1 },
  txTitle: { fontSize: 14, fontWeight: 600, color: 'var(--text1)', marginBottom: 3 },
  txDate: { fontSize: 12, color: 'var(--text2)' },
  txAmount: (positive) => ({ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: positive ? 'var(--green)' : 'var(--red)' }),
};

const transactions = [
  { icon: '💰', bg: '#22c55e22', title: 'Hired for Landing Page', date: 'May 2, 2026', amount: '+₦50,000', positive: true },
  { icon: '📚', bg: '#7c5cfc22', title: 'Pro Subscription', date: 'May 1, 2026', amount: '-₦5,000', positive: false },
  { icon: '💰', bg: '#22c55e22', title: 'UI/UX Freelance Gig', date: 'Apr 28, 2026', amount: '+₦80,000', positive: true },
  { icon: '🎓', bg: '#3b82f622', title: 'Course Purchase', date: 'Apr 25, 2026', amount: '-₦3,500', positive: false },
  { icon: '💰', bg: '#22c55e22', title: 'Bug Fix Contract', date: 'Apr 20, 2026', amount: '+₦30,000', positive: true },
];

export default function Wallet({ user, setUser }) {
  const balance = user?.balance ?? 0;
  const [action, setAction] = useState(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [feedback, setFeedback] = useState('');
  const [txList, setTxList] = useState(transactions);

  const formatAmount = (value) => {
    const parsed = Number(value.toString().replace(/[^0-9]/g, ''));
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const clearForm = () => {
    setAmount('');
    setRecipient('');
    setAction(null);
  };

  const showFeedback = (text) => {
    setFeedback(text);
    window.clearTimeout(window.walletFeedbackTimeout);
    window.walletFeedbackTimeout = window.setTimeout(() => setFeedback(''), 4200);
  };

  const addTransaction = (tx) => {
    setTxList((prev) => [tx, ...prev]);
  };

  const handleSubmit = () => {
    const numericAmount = formatAmount(amount);
    if (numericAmount <= 0) {
      showFeedback('Enter a valid amount.');
      return;
    }

    if (!setUser) {
      showFeedback('Unable to update balance right now.');
      return;
    }

    if (action === 'withdraw') {
      if (numericAmount > balance) {
        showFeedback('Not enough balance to withdraw that amount.');
        return;
      }

      setUser((prev) => ({ ...prev, balance: (prev.balance || 0) - numericAmount }));
      addTransaction({
        icon: '🏧',
        bg: '#ef444422',
        title: 'Withdrawn funds',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: `-₦${numericAmount.toLocaleString()}`,
        positive: false,
      });
      showFeedback(`Withdrawn ₦${numericAmount.toLocaleString()} successfully.`);
      clearForm();
      return;
    }

    if (action === 'add') {
      setUser((prev) => ({ ...prev, balance: (prev.balance || 0) + numericAmount }));
      addTransaction({
        icon: '➕',
        bg: '#22c55e22',
        title: 'Added money',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: `+₦${numericAmount.toLocaleString()}`,
        positive: true,
      });
      showFeedback(`Added ₦${numericAmount.toLocaleString()} to your wallet.`);
      clearForm();
      return;
    }

    if (action === 'transfer') {
      if (!recipient.trim()) {
        showFeedback('Enter a recipient for transfer.');
        return;
      }
      if (numericAmount > balance) {
        showFeedback('Not enough balance to transfer that amount.');
        return;
      }

      setUser((prev) => ({ ...prev, balance: (prev.balance || 0) - numericAmount }));
      addTransaction({
        icon: '📤',
        bg: '#f59e0b22',
        title: `Transfer to ${recipient}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: `-₦${numericAmount.toLocaleString()}`,
        positive: false,
      });
      showFeedback(`Transferred ₦${numericAmount.toLocaleString()} to ${recipient}.`);
      clearForm();
      return;
    }
  };

  const actionLabel = {
    withdraw: 'Withdraw funds',
    add: 'Add money',
    transfer: 'Transfer money',
  }[action] || '';

  return (
    <main style={styles.container}>
      <div style={styles.title}>Wallet 💳</div>
      <div style={styles.sub}>Manage your earnings and payments.</div>

      <div style={styles.balanceCard}>
        <div style={styles.balanceLabel}>Total Balance</div>
        <div style={styles.balanceAmount}>₦{balance.toLocaleString()}</div>
        <div style={styles.cardRow}>
          <button
            type="button"
            style={styles.cardBtn}
            onClick={() => setAction('withdraw')}
          >
            Withdraw
          </button>
          <button
            type="button"
            style={styles.cardBtn}
            onClick={() => setAction('add')}
          >
            Add Money
          </button>
          <button
            type="button"
            style={styles.cardBtn}
            onClick={() => setAction('transfer')}
          >
            Transfer
          </button>
        </div>
        {/* decorative circles */}
        <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', right: -40, top: -40, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', right: 60, bottom: -60, pointerEvents: 'none' }} />
      </div>

      {action && (
        <div style={styles.actionBox}>
          <div style={styles.actionTitle}>{actionLabel}</div>
          <div style={styles.inputRow}>
            <input
              type="text"
              placeholder="Amount (₦)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />
            {action === 'transfer' && (
              <input
                type="text"
                placeholder="Recipient name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={styles.input}
              />
            )}
            <button type="button" style={styles.actionSubmit} onClick={handleSubmit}>
              Confirm {actionLabel}
            </button>
          </div>
          {feedback && <div style={styles.feedback}>{feedback}</div>}
        </div>
      )}

      <div style={styles.sectionTitle}>Recent Transactions</div>
      <div style={styles.txList}>
        {txList.map((tx, i) => (
          <div key={i} style={styles.txItem}>
            <div style={{ ...styles.txIcon, background: tx.bg }}>{tx.icon}</div>
            <div style={styles.txInfo}>
              <div style={styles.txTitle}>{tx.title}</div>
              <div style={styles.txDate}>{tx.date}</div>
            </div>
            <div style={styles.txAmount(tx.positive)}>{tx.amount}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
