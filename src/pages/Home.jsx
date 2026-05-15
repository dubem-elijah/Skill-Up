// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
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

export default function Home({ user, openProfile, searchQuery = '' }) {
  const POSTS_STORAGE_KEY = 'skillup_posts';
  const [activeTab, setActiveTab] = useState('For you');
  const [posts, setPosts] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(POSTS_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.warn('Failed to parse saved posts', error);
        }
      }
    }
    return initialPosts;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    }
  }, [posts]);

  const handleComment = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: (post.comments || 0) + 1 }
          : post
      )
    );
  };

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

      {posts.filter((post) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.trim().toLowerCase();
        return [
          post.user?.name,
          post.category,
          post.text,
          post.taggedSkill?.name,
          post.taggedSkill?.category,
        ].some((value) => value?.toLowerCase().includes(query));
      }).map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onProfileClick={openProfile}
          currentUser={user}
          onComment={handleComment}
        />
      ))}
      {!posts.some((post) => {
        if (!searchQuery.trim()) return false;
        const query = searchQuery.trim().toLowerCase();
        return [
          post.user?.name,
          post.category,
          post.text,
          post.taggedSkill?.name,
          post.taggedSkill?.category,
        ].some((value) => value?.toLowerCase().includes(query));
      }) && searchQuery.trim() && (
        <div style={{ color: 'var(--text2)', padding: '24px 0', fontSize: 14 }}>
          No posts found for "{searchQuery}".
        </div>
      )}
    </main>
  );
}
