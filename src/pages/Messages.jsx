// src/pages/Messages.jsx
import React, { useState } from 'react';
import Avatar from '../assets/components/Avatar';
import Icon from '../assets/components/Icon';
import { messages as initialMessages } from '../utils/data';
import { useMessages } from '../context/MessageContext';

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    height: '100%',
  },
  listPanel: {
    width: 280,
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg2)',
  },
  listHeader: {
    padding: '20px 18px 14px',
    borderBottom: '1px solid var(--border)',
  },
  listTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 18,
    fontWeight: 800,
    color: 'var(--text1)',
    marginBottom: 12,
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '8px 12px',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: 13,
    color: 'var(--text1)',
    width: '100%',
  },
  listScroll: {
    overflowY: 'auto',
    flex: 1,
    padding: '8px 0',
  },
  msgItem: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 18px',
    cursor: 'pointer',
    background: active ? 'var(--purple-bg2)' : 'transparent',
    borderLeft: `3px solid ${active ? 'var(--purple)' : 'transparent'}`,
    transition: 'all var(--transition)',
  }),
  msgMeta: { flex: 1, minWidth: 0 },
  msgName: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text1)',
    marginBottom: 3,
  },
  msgPreview: {
    fontSize: 12,
    color: 'var(--text2)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  msgRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
    flexShrink: 0,
  },
  msgTime: {
    fontSize: 11,
    color: 'var(--text3)',
  },
  unreadBadge: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: 'var(--purple)',
    color: 'white',
    fontSize: 10,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg)',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 20px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg2)',
  },
  chatName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--text1)',
  },
  chatStatus: {
    fontSize: 12,
    color: 'var(--green)',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  chatMessages: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  bubble: (fromMe) => ({
    maxWidth: '65%',
    alignSelf: fromMe ? 'flex-end' : 'flex-start',
    background: fromMe ? 'var(--purple)' : 'var(--bg2)',
    color: fromMe ? 'white' : 'var(--text1)',
    borderRadius: fromMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    padding: '10px 14px',
    fontSize: 14,
    lineHeight: 1.5,
    border: fromMe ? 'none' : '1px solid var(--border)',
  }),
  bubbleTime: (fromMe) => ({
    fontSize: 11,
    color: 'var(--text3)',
    marginTop: 4,
    textAlign: fromMe ? 'right' : 'left',
    alignSelf: fromMe ? 'flex-end' : 'flex-start',
  }),
  inputBar: {
    display: 'flex',
    gap: 10,
    padding: '14px 20px',
    borderTop: '1px solid var(--border)',
    background: 'var(--bg2)',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '10px 16px',
    fontSize: 14,
    color: 'var(--text1)',
    outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: 'var(--purple)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    boxShadow: 'var(--shadow-purple)',
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    color: 'var(--text2)',
  },
};

const seedChats = {
  m1: [
    { id: 1, text: 'Hey! Saw your portfolio post. Can we collaborate?', fromMe: false, time: '2m ago' },
    { id: 2, text: 'That looks amazing! What kind of collaboration?', fromMe: true, time: '1m ago' },
  ],
  m2: [
    { id: 1, text: 'loved your comment on my portfolio post! 💜', fromMe: false, time: '5m ago' },
    { id: 2, text: 'Thanks! Your portfolio is inspiring', fromMe: true, time: '3m ago' },
  ],
  m3: [
    { id: 1, text: 'liked your comment on their UI/UX design post', fromMe: false, time: '12m ago' },
    { id: 2, text: 'Great feedback on the design!', fromMe: true, time: '10m ago' },
  ],
  m4: [
    { id: 1, text: 'Check out this new JS framework I found 🔥', fromMe: false, time: '1h ago' },
    { id: 2, text: 'This looks interesting! Will check it out', fromMe: true, time: '45m ago' },
  ],
  m5: [
    { id: 1, text: 'liked your post on their Data Science dashboard!', fromMe: false, time: '2h ago' },
    { id: 2, text: 'Thanks for the support!', fromMe: true, time: '1h ago' },
  ],
  m6: [
    { id: 1, text: 'Your application for the landing page task has been received.', fromMe: false, time: '3h ago' },
    { id: 2, text: 'Great! When will I hear back?', fromMe: true, time: '2h ago' },
    { id: 3, text: 'We will review and get back to you within 24 hours.', fromMe: false, time: '1h ago' },
  ],
};

export default function Messages({ openProfile }) {
  const { dynamicMessages } = useMessages();
  const [activeId, setActiveId] = useState(initialMessages[0].id);
  const [chats, setChats] = useState(seedChats);
  const [input, setInput] = useState('');

  // Merge static and dynamic messages
  const allMessages = [...dynamicMessages, ...initialMessages];
  const messages = allMessages.length > 0 ? allMessages : initialMessages;

  const active = messages.find((m) => m.id === activeId);
  const chatHistory = chats[activeId] || [];

  const send = () => {
    if (!input.trim()) return;
    setChats((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), { id: Date.now(), text: input, fromMe: true, time: 'now' }],
    }));
    setInput('');
  };

  return (
    <div style={styles.container}>
      {/* List */}
      <div style={styles.listPanel}>
        <div style={styles.listHeader}>
          <div style={styles.listTitle}>Messages</div>
          <div style={styles.searchBox}>
            <Icon name="search" size={14} color="var(--text2)" />
            <input style={styles.searchInput} placeholder="Search messages..." />
          </div>
        </div>
        <div style={styles.listScroll}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={styles.msgItem(activeId === msg.id)}
              onClick={() => setActiveId(msg.id)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openProfile?.({
                    id: msg.user.id || msg.id,
                    name: msg.user.name,
                    initials: msg.user.initials,
                    gradient: msg.user.gradient,
                    role: 'Member',
                    bio: 'Active member in the SkillUp community.',
                    xp: 0,
                    streak: 0,
                  });
                }}
                style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <Avatar initials={msg.user.initials} size="md" gradient={msg.user.gradient} />
              </button>
              <div style={styles.msgMeta}>
                <div style={styles.msgName}>{msg.user.name}</div>
                <div style={styles.msgPreview}>{msg.lastMessage}</div>
              </div>
              <div style={styles.msgRight}>
                <span style={styles.msgTime}>{msg.time}</span>
                {msg.unread > 0 && <span style={styles.unreadBadge}>{msg.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div style={styles.chatPanel}>
        {active ? (
          <>
            <div style={styles.chatHeader}>
              <button
                type="button"
                onClick={() => openProfile?.({
                  id: active.user.id || active.id,
                  name: active.user.name,
                  initials: active.user.initials,
                  gradient: active.user.gradient,
                  role: 'Member',
                  bio: 'Active member in the SkillUp community.',
                  xp: 0,
                  streak: 0,
                })}
                style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <Avatar initials={active.user.initials} size="md" gradient={active.user.gradient} />
              </button>
              <div>
                <div style={styles.chatName}>{active.user.name}</div>
                <div style={styles.chatStatus}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} /> Online</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                {['phone', 'video'].map((ic) => (
                  <div key={ic} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text2)' }}>
                    <Icon name="more" size={16} />
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.chatMessages}>
              {chatHistory.map((msg) => (
                <React.Fragment key={msg.id}>
                  <div style={styles.bubble(msg.fromMe)}>{msg.text}</div>
                  <div style={styles.bubbleTime(msg.fromMe)}>{msg.time}</div>
                </React.Fragment>
              ))}
            </div>

            <div style={styles.inputBar}>
              <input
                style={styles.textInput}
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
              />
              <button style={styles.sendBtn} onClick={send}>
                <Icon name="send" size={17} color="white" />
              </button>
            </div>
          </>
        ) : (
          <div style={styles.emptyState}>
            <div style={{ fontSize: 48 }}>💬</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--text1)' }}>Select a conversation</div>
            <div style={{ fontSize: 14 }}>Choose from your messages on the left</div>
          </div>
        )}
      </div>
    </div>
  );
}
