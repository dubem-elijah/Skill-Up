// src/pages/Home.jsx
import React, { useState } from 'react';
import PostInput from '../assets/components/PostInput';
import PostCard from '../assets/components/PostCard';
import { posts as initialPosts } from '../utils/data';

const tabs = ['For you', 'Following', 'Trending', 'Latest'];

const styles = {
  container: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 20px 40px',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid var(--border)',
    marginBottom: 16,
  },
  tab: (active) => ({
    padding: '10px 18px',
    fontSize: 14,
    fontWeight: 500,
    color: active ? 'var(--purple2)' : 'var(--text2)',
    cursor: 'pointer',
    borderBottom: `2px solid ${active ? 'var(--purple2)' : 'transparent'}`,
    marginBottom: -1,
    transition: 'all var(--transition)',
    background: 'none',
    border: 'none',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: active ? 'var(--purple2)' : 'transparent',
    fontFamily: "'DM Sans', sans-serif",
  }),
};

export default function Home({ user }) {
  const [activeTab, setActiveTab] = useState('For you');
  const [posts, setPosts] = useState(initialPosts);

  const handlePost = (payload) => {
    const newPost = {
      id: 'new_' + Date.now(),
      user: {
        name: user.name,
        initials: user.initials,
        isPro: user.isPro,
        gradient: 'linear-gradient(135deg, #7c5cfc, #ec4899)',
      },
      time: 'just now',
      category: payload.taggedSkill?.name || 'General',
      text: payload.text,
      media: payload.media || null,
      taggedSkill: payload.taggedSkill || null,
      challengeType: payload.challengeType || null,
      mediaType: null,
      likes: 0,
      comments: 0,
      likedByNames: '',
      likedByAvatars: [],
      isLiked: false,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <main style={styles.container}>
      <PostInput user={user} onPost={handlePost} />

      <div style={styles.tabs}>
        {tabs.map((tab) => (
          <button key={tab} style={styles.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
