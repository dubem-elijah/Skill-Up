// src/pages/Community.jsx
import React from 'react';
import Avatar from '../assets/components/Avatar';

const styles = {
  container: { flex: 1, overflowY: 'auto', padding: '32px 32px 40px' },
  title: { fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--text1)', marginBottom: 4 },
  sub: { fontSize: 14, color: 'var(--text2)', marginBottom: 28 },
  sectionTitle: { fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text1)', marginBottom: 14 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14, marginBottom: 32 },
  card: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
    transition: 'border-color 0.15s',
    textAlign: 'center',
  },
  name: { fontSize: 14, fontWeight: 600, color: 'var(--text1)' },
  skill: { fontSize: 12, color: 'var(--text2)' },
  xp: { fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--purple2)' },
  followBtn: {
    padding: '6px 16px',
    borderRadius: 9,
    background: 'var(--purple-bg)',
    border: '1px solid rgba(124,92,252,0.3)',
    color: 'var(--purple2)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans',sans-serif",
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  modal: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 24,
    padding: 32,
    maxWidth: 500,
    width: '90%',
    maxHeight: '85vh',
    overflowY: 'auto',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 20,
    color: 'var(--text1)',
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
    textAlign: 'center',
  },
  profileName: { fontSize: 22, fontWeight: 800, color: 'var(--text1)', marginTop: 16, marginBottom: 6, fontFamily: "'Syne', sans-serif" },
  profileSkill: { fontSize: 14, color: 'var(--purple2)', fontWeight: 600, marginBottom: 12 },
  profileXP: { fontSize: 13, color: 'var(--text2)', marginBottom: 16 },
  bioSection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: '1px solid var(--border)',
  },
  sectionLabel: { fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 },
  bioText: { fontSize: 14, color: 'var(--text1)', lineHeight: 1.6, marginBottom: 12 },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 },
  statBox: {
    background: 'var(--bg3)',
    borderRadius: 12,
    padding: 14,
    textAlign: 'center',
    border: '1px solid var(--border)',
  },
  statValue: { fontSize: 18, fontWeight: 800, color: 'var(--purple2)', fontFamily: "'Syne', sans-serif" },
  statLabel: { fontSize: 11, color: 'var(--text2)', marginTop: 4 },
  skillsList: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  skillTag: {
    background: 'var(--purple-bg)',
    border: '1px solid rgba(124,92,252,0.3)',
    color: 'var(--purple2)',
    padding: '6px 12px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
  },
  actionBtn: (isPrimary) => ({
    width: '100%',
    padding: '12px 18px',
    borderRadius: 12,
    background: isPrimary ? 'var(--purple)' : 'var(--bg3)',
    border: isPrimary ? 'none' : '1px solid var(--border)',
    color: isPrimary ? 'white' : 'var(--text1)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    marginTop: 12,
  }),
};

const members = [
  {
    name: 'Miracle Dev',
    skill: 'Full Stack',
    xp: '12.5k XP',
    gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    initials: 'MD',
    bio: 'Passionate full-stack developer with 4 years of experience. Love building scalable web applications and mentoring junior developers.',
    projects: 12,
    followers: 234,
    following: 89,
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
  },
  {
    name: 'John Success',
    skill: 'Web Dev',
    xp: '10.8k XP',
    gradient: 'linear-gradient(135deg,#7c5cfc,#3b82f6)',
    initials: 'JS',
    bio: 'Frontend specialist crafting beautiful user experiences. Obsessed with clean code and responsive design.',
    projects: 18,
    followers: 156,
    following: 45,
    skills: ['HTML/CSS', 'JavaScript', 'Vue.js', 'Figma', 'UI Design'],
  },
  {
    name: 'Precious UI',
    skill: 'UI/UX',
    xp: '9.2k XP',
    gradient: 'linear-gradient(135deg,#ec4899,#7c5cfc)',
    initials: 'PU',
    bio: 'UX/UI designer focused on creating intuitive interfaces. Advocate for accessible and inclusive design.',
    projects: 24,
    followers: 312,
    following: 67,
    skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems', 'Animation'],
  },
  {
    name: 'Ada Obi',
    skill: 'Data Science',
    xp: '8.1k XP',
    gradient: 'linear-gradient(135deg,#22c55e,#14b8a6)',
    initials: 'AO',
    bio: 'Data scientist leveraging machine learning to solve real-world problems. Enthusiastic about data visualization.',
    projects: 8,
    followers: 189,
    following: 53,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis', 'SQL'],
  },
  {
    name: 'Tunde Codes',
    skill: 'Mobile Dev',
    xp: '7.5k XP',
    gradient: 'linear-gradient(135deg,#3b82f6,#7c5cfc)',
    initials: 'TC',
    bio: 'Mobile app developer building amazing iOS and Android experiences. Open source contributor.',
    projects: 14,
    followers: 145,
    following: 78,
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
  },
  {
    name: 'Zara Design',
    skill: 'Graphic Design',
    xp: '6.9k XP',
    gradient: 'linear-gradient(135deg,#f59e0b,#ec4899)',
    initials: 'ZD',
    bio: 'Creative graphic designer with a passion for branding and visual storytelling. Always exploring new design trends.',
    projects: 31,
    followers: 267,
    following: 92,
    skills: ['Adobe Suite', 'Branding', 'Typography', 'Illustration', 'Web Design'],
  },
];

export default function Community() {
  const [following, setFollowing] = React.useState(new Set());
  const [selectedProfile, setSelectedProfile] = React.useState(null);

  const handleFollow = (name) => {
    const newFollowing = new Set(following);
    if (newFollowing.has(name)) {
      newFollowing.delete(name);
    } else {
      newFollowing.add(name);
    }
    setFollowing(newFollowing);
  };

  const handleProfileClick = (member) => {
    setSelectedProfile(member);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  return (
    <main style={styles.container}>
      <div style={styles.title}>Community 🤝</div>
      <div style={styles.sub}>Connect with learners and builders across Nigeria and beyond.</div>
      <div style={styles.sectionTitle}>Top Members This Week</div>
      <div style={styles.grid}>
        {members.map((m) => (
          <div
            key={m.name}
            style={styles.card}
            onClick={() => handleProfileClick(m)}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border2)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <Avatar initials={m.initials} size="lg" gradient={m.gradient} />
            <div style={styles.name}>{m.name}</div>
            <div style={styles.skill}>{m.skill}</div>
            <div style={styles.xp}>{m.xp}</div>
            <button
              style={styles.followBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleFollow(m.name);
              }}
            >
              {following.has(m.name) ? '✓ Following' : '+ Follow'}
            </button>
          </div>
        ))}
      </div>

      {selectedProfile && (
        <div style={styles.overlay} onClick={handleCloseModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={handleCloseModal}>✕</button>

            <div style={styles.profileHeader}>
              <Avatar initials={selectedProfile.initials} size="xl" gradient={selectedProfile.gradient} />
              <div style={styles.profileName}>{selectedProfile.name}</div>
              <div style={styles.profileSkill}>{selectedProfile.skill}</div>
              <div style={styles.profileXP}>{selectedProfile.xp}</div>
            </div>

            <div style={styles.bioSection}>
              <div style={styles.sectionLabel}>About</div>
              <div style={styles.bioText}>{selectedProfile.bio}</div>
            </div>

            <div style={styles.statsGrid}>
              <div style={styles.statBox}>
                <div style={styles.statValue}>{selectedProfile.projects}</div>
                <div style={styles.statLabel}>Projects</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statValue}>{selectedProfile.followers}</div>
                <div style={styles.statLabel}>Followers</div>
              </div>
            </div>

            <div style={styles.bioSection}>
              <div style={styles.sectionLabel}>Skills</div>
              <div style={styles.skillsList}>
                {selectedProfile.skills.map((skill) => (
                  <div key={skill} style={styles.skillTag}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <button
              style={styles.actionBtn(true)}
              onClick={() => {
                handleFollow(selectedProfile.name);
              }}
            >
              {following.has(selectedProfile.name) ? '✓ Following' : '+ Follow'}
            </button>
            <button
              style={styles.actionBtn(false)}
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
