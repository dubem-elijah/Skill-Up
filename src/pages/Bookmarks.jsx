// src/pages/Bookmarks.jsx
import React from 'react';
import PostCard from '../assets/components/PostCard';
import { posts } from '../utils/data';

const styles = {
  container: { flex: 1, overflowY: 'auto', padding: '32px 24px 40px' },
  title: { fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--text1)', marginBottom: 4 },
  sub: { fontSize: 14, color: 'var(--text2)', marginBottom: 24 },
};

export default function Bookmarks({ openProfile }) {
  return (
    <main style={styles.container}>
      <div style={styles.title}>Bookmarks 🔖</div>
      <div style={styles.sub}>Posts you've saved for later.</div>
      {posts.slice(0, 2).map((p) => (
        <PostCard key={p.id} post={p} onProfileClick={openProfile} />
      ))}
    </main>
  );
}
