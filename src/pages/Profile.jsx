// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import Avatar from '../assets/components/Avatar';
import PostCard from '../assets/components/PostCard';
import ProgressBar from '../assets/components/ProgressBar';
import Icon from '../assets/components/Icon';
import { posts, userProgress, skills } from '../utils/data';

const styles = {
  container: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 0 40px',
  },
  banner: {
    height: 160,
    background: 'linear-gradient(135deg, #3a1f99 0%, #7c5cfc 50%, #ec4899 100%)',
    position: 'relative',
  },
  avatarWrap: {
    position: 'absolute',
    bottom: -28,
    left: 32,
    border: '4px solid var(--bg)',
    borderRadius: '50%',
  },
  body: {
    padding: '40px 32px 0',
  },
  topRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  name: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: 'var(--text1)',
    marginBottom: 4,
  },
  handle: {
    fontSize: 14,
    color: 'var(--text2)',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: 'var(--text1)',
    lineHeight: 1.6,
    maxWidth: 520,
    marginBottom: 14,
  },
  statsRow: {
    display: 'flex',
    gap: 24,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  stat: {
    textAlign: 'center',
  },
  statNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 20,
    fontWeight: 800,
    color: 'var(--text1)',
  },
  statLabel: {
    fontSize: 12,
    color: 'var(--text2)',
  },
  editBtn: {
    padding: '9px 20px',
    borderRadius: 12,
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    color: 'var(--text1)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid var(--border)',
    marginBottom: 24,
    paddingLeft: 32,
  },
  tab: (active) => ({
    padding: '10px 18px',
    fontSize: 14,
    fontWeight: 500,
    color: active ? 'var(--purple2)' : 'var(--text2)',
    cursor: 'pointer',
    borderBottom: `2px solid ${active ? 'var(--purple2)' : 'transparent'}`,
    marginBottom: -1,
    background: 'none',
    border: 'none',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: active ? 'var(--purple2)' : 'transparent',
    fontFamily: "'DM Sans', sans-serif",
  }),
  tabContent: {
    padding: '0 32px',
  },
  skillsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  skillBadge: (color) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 14px',
    borderRadius: 10,
    background: color + '18',
    border: `1px solid ${color}44`,
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--text1)',
  }),
  progressSection: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--text1)',
    marginBottom: 16,
  },
  badgesRow: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  badge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    padding: '14px 18px',
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 14,
    minWidth: 80,
  },
  badgeIcon: { fontSize: 28 },
  badgeLabel: { fontSize: 11, color: 'var(--text2)', textAlign: 'center' },
};

const badges = [
  { icon: '🔥', label: '12-Day Streak' },
  { icon: '⚡', label: 'Quick Learner' },
  { icon: '💻', label: 'Web Dev' },
  { icon: '🏆', label: 'Top 10%' },
  { icon: '🎯', label: 'Goal Setter' },
];

export default function Profile({ user, setUser, profileUser, openProfile }) {
  const profile = profileUser || user;
  const isOwnProfile = !profileUser || profileUser.id === user.id;
  const [activeTab, setActiveTab] = useState('Posts');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: profile.name,
    role: profile.role || 'Full Stack Developer',
    bio: profile.bio || 'Building the future, one commit at a time 🚀 | Web Dev & UI/UX | Open to opportunities',
  });
  const tabs = ['Posts', 'Skills', 'Badges'];

  useEffect(() => {
    setForm({
      name: profile.name,
      role: profile.role || 'Full Stack Developer',
      bio: profile.bio || 'Building the future, one commit at a time 🚀 | Web Dev & UI/UX | Open to opportunities',
    });
  }, [profile]);

  const saveProfile = () => {
    if (!isOwnProfile) return;

    const initials = form.name
      .split(' ')
      .map((word) => word[0] || '')
      .join('')
      .substring(0, 2)
      .toUpperCase();

    setUser({
      ...user,
      name: form.name,
      initials: initials || 'DU',
      role: form.role,
      bio: form.bio,
    });
    setEditing(false);
  };

  return (
    <div style={styles.container}>
      {/* Banner */}
      <div style={styles.banner}>
        <div style={styles.avatarWrap}>
          <Avatar initials={profile.initials} size="xl" gradient={profile.gradient || 'linear-gradient(135deg, #7c5cfc, #ec4899)'} />
          {isOwnProfile && (
            <button onClick={() => setEditing(true)} style={{ position: 'absolute', right: -4, bottom: 6, width: 34, height: 34, borderRadius: 12, background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="edit" size={14} color="var(--text2)" />
            </button>
          )}
        </div>
      </div>

      {/* Profile info */}
      <div style={styles.body}>
        <div style={styles.topRow}>
          <div>
            <div style={styles.name}>{profile.name}</div>
            <div style={styles.handle}>@{profile.name.toLowerCase()} · {profile.role || 'Web Developer'}</div>
            <div style={styles.bio}>
              {profile.bio || 'Building the future, one commit at a time 🚀 | Web Dev & UI/UX | Open to opportunities'}
            </div>
            <div style={styles.statsRow}>
              {[
                { num: '2.4k', label: 'Followers' },
                { num: '318', label: 'Following' },
                { num: `${profile.xp || user.xp || 7200}`, label: 'XP' },
                { num: `${profile.streak || user.streak || 12}`, label: 'Day Streak 🔥' },
              ].map(({ num, label }) => (
                <div key={label} style={styles.stat}>
                  <div style={styles.statNum}>{num}</div>
                  <div style={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          {isOwnProfile && (
            <button style={styles.editBtn} onClick={() => setEditing(true)}>
              <Icon name="edit" size={14} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 250 }}>
          <div style={{ width: '92%', maxWidth: 520, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 24, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, margin: 0, color: 'var(--text1)' }}>Edit Profile</h2>
              <button onClick={() => setEditing(false)} style={{ border: 'none', background: 'transparent', color: 'var(--text2)', cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              <label style={{ fontSize: 13, color: 'var(--text2)' }}>Full name</label>
              <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} style={{ width: '100%', padding: '12px 14px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', outline: 'none' }} />
              <label style={{ fontSize: 13, color: 'var(--text2)' }}>Role</label>
              <input value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))} style={{ width: '100%', padding: '12px 14px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', outline: 'none' }} />
              <label style={{ fontSize: 13, color: 'var(--text2)' }}>Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))} style={{ width: '100%', minHeight: 120, padding: '12px 14px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', outline: 'none', resize: 'vertical' }} />
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setEditing(false)} style={{ padding: '12px 18px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', cursor: 'pointer' }}>Cancel</button>
                <button type="button" onClick={saveProfile} style={{ padding: '12px 18px', borderRadius: 14, border: 'none', background: 'var(--purple)', color: 'white', cursor: 'pointer' }}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map((t) => (
          <button key={t} style={styles.tab(activeTab === t)} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>

      <div style={styles.tabContent}>
        {activeTab === 'Posts' && posts.slice(0, 2).map((p) => <PostCard key={p.id} post={p} onProfileClick={openProfile} />)}

        {activeTab === 'Skills' && (
          <>
            <div style={styles.skillsGrid}>
              {skills.map((s) => (
                <div key={s.id} style={styles.skillBadge(s.color)}>
                  <span>{s.icon}</span> {s.name}
                </div>
              ))}
            </div>
            <div style={styles.progressSection}>
              <div style={styles.sectionTitle}>Progress</div>
              {userProgress.map(({ skill, percent, color }) => (
                <ProgressBar key={skill} label={skill} percent={percent} color={color} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'Badges' && (
          <div style={styles.badgesRow}>
            {badges.map((b) => (
              <div key={b.label} style={styles.badge}>
                <span style={styles.badgeIcon}>{b.icon}</span>
                <span style={styles.badgeLabel}>{b.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
