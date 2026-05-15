// src/assets/components/PostCard.jsx
import React, { useState } from 'react';
import Icon from './Icon';
import Avatar from './Avatar';
import { useMessages } from '../../context/MessageContext';

function PortfolioPreview() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#1e1e30,#252540)', display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: '#e0e0ff', lineHeight: 1.2, marginBottom: 8 }}>
          Hi, I'm <span style={{ color: '#9d7dfd' }}>Esther</span><br />Web Developer
        </h2>
        <p style={{ fontSize: 11, color: '#9898b8', marginBottom: 12, lineHeight: 1.4 }}>I build beautiful and functional websites<br />that solve real problems.</p>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ fontSize: 10, padding: '5px 10px', borderRadius: 6, background: '#7c5cfc', color: 'white', border: 'none', cursor: 'pointer' }}>View Projects</button>
          <button style={{ fontSize: 10, padding: '5px 10px', borderRadius: 6, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#9898b8', cursor: 'pointer' }}>Contact Me</button>
        </div>
      </div>
      <div style={{ width: 160, background: '#1a1a2e', padding: 10, fontFamily: 'monospace', fontSize: 9, color: '#6060a0', overflow: 'hidden' }}>
        {[['const','kw',' useState','fn','() {',''], ['  ','','return','kw',' (',''], ['    <','','div','fn','>',''], ['      <','','h1','fn','>',''], ["        Hi, I'm Esther",''], ['      </','','h1','fn','>',''], ['    </','','div','fn','>',''], ['  )',''], ['export default','kw']].map((line, i) => (
          <div key={i} style={{ marginBottom: 2 }}>
            {Array.isArray(line[0]) ? line.map(([t,type],j) => <span key={j} style={{ color: type==='kw'?'#7c5cfc':type==='fn'?'#5dcaa5':'#6060a0' }}>{t}</span>) :
              line.filter((_, i) => i % 2 === 0).map((text, j) => <span key={j} style={{ color: line[j*2+1]==='kw'?'#7c5cfc':line[j*2+1]==='fn'?'#5dcaa5':'#6060a0' }}>{text}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function BankingPreview() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#1a1a2e,#16213e)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16 }}>
      {['Login','Dashboard','Transfer'].map((label, i) => (
        <div key={label} style={{ width: 100, height: 160, background: '#13131e', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', padding: 8 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: '#9898b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
          <div style={{ background: 'linear-gradient(135deg,#5a3ecc,#7c5cfc)', height: 50, borderRadius: 8, marginBottom: 6, padding: '6px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Balance</span>
            <strong style={{ fontSize: 9, color: 'white', fontFamily: "'Syne',sans-serif" }}>₦{(120000+i*30000).toLocaleString()}</strong>
          </div>
          {[1,0.7,1,0.6,1].map((w,j) => <div key={j} style={{ height: 10, background: '#22223a', borderRadius: 4, marginBottom: 4, width: `${w*100}%` }} />)}
        </div>
      ))}
    </div>
  );
}

export default function PostCard({ post, onProfileClick, currentUser, onComment }) {
  const { addInteractionMessage } = useMessages();
  const [liked, setLiked] = useState(post.isLiked || post.likedByMe);
  const [likes, setLikes] = useState(post.likes);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Support both data structures
  const author = post.user?.name || post.author;
  const initials = post.user?.initials || post.initials;
  const gradient = post.user?.gradient || `linear-gradient(135deg, ${post.avatarColor?.[0] || '#7c5cfc'}, ${post.avatarColor?.[1] || '#ec4899'})`;
  const isPro = post.user?.isPro || post.isPro;
  const authorProfile = {
    id: post.user?.id || post.authorId || author,
    name: author,
    initials,
    gradient,
    role: post.user?.role || 'Full Stack Developer',
    bio: post.user?.bio || 'Building the future, one commit at a time.',
    xp: post.user?.xp || 0,
    streak: post.user?.streak || 0,
    isPro,
  };

  const handleLike = () => {
    setLiked((l) => !l);
    setLikes((n) => (liked ? n - 1 : n + 1));

    if (!liked) {
      addInteractionMessage(
        'like',
        {
          name: author,
          initials: initials,
          gradient: gradient,
        },
        null,
        post.text
      );
    }
  };

  const handleToggleComment = () => {
    setShowCommentBox((prev) => !prev);
  };

  const submitComment = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;

    onComment?.(post.id);
    addInteractionMessage(
      'comment',
      {
        name: currentUser?.name || author,
        initials: currentUser?.initials || initials,
        gradient: currentUser?.gradient || gradient,
      },
      author,
      trimmed
    );
    setCommentText('');
    setShowCommentBox(false);
  };

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: 18, marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => onProfileClick?.(authorProfile)}
          style={{ padding: 0, border: 'none', background: 'transparent', cursor: onProfileClick ? 'pointer' : 'default' }}
        >
          <Avatar initials={initials} size="lg" gradient={gradient} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <button
              type="button"
              onClick={() => onProfileClick?.(authorProfile)}
              style={{ padding: 0, border: 'none', background: 'transparent', cursor: onProfileClick ? 'pointer' : 'default', fontWeight: 600, fontSize: 15, color: 'var(--text1)' }}
            >
              {author}
            </button>
            {isPro && <span style={{ background: 'var(--purple-bg)', color: 'var(--purple2)', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(124,92,252,0.3)' }}>Pro</span>}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)' }}><span style={{ color: 'var(--purple2)' }}>Learning</span> · {post.taggedSkill?.name || 'General'}</div>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>{post.time}</span>
        <button style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text2)', borderRadius: 8, background: 'none', border: 'none' }}>
          <Icon name="more" size={16} color="var(--text2)" />
        </button>
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text1)', marginBottom: 14, whiteSpace: 'pre-line' }}>{post.text}</div>

      {/* Media Upload */}
      {post.media && (
        <div style={{ borderRadius: 14, overflow: 'hidden', background: 'var(--bg3)', marginBottom: 14, border: '1px solid var(--border)', width: '100%' }}>
          <img src={post.media.url} alt="post media" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {post.mediaType && (
        <div style={{ borderRadius: 14, overflow: 'hidden', background: 'var(--bg3)', height: 200, marginBottom: 14, border: '1px solid var(--border)' }}>
          {post.mediaType === 'portfolio' && <PortfolioPreview />}
          {post.mediaType === 'banking' && <BankingPreview />}
        </div>
      )}

      {/* Challenge Type */}
      {post.challengeType && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14, padding: '10px 12px', background: 'var(--bg3)', borderRadius: 10, border: '1px solid var(--border)' }}>
          <Icon name="flag" size={14} color="var(--purple)" />
          <span style={{ fontSize: 12, color: 'var(--text1)' }}>Challenge: <strong style={{ color: 'var(--purple)' }}>{post.challengeType}</strong></span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={handleLike}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: liked ? 'var(--red)' : 'var(--text2)', cursor: 'pointer', padding: '6px 12px', borderRadius: 10, background: 'none', border: 'none', fontFamily: "'DM Sans',sans-serif" }}>
          <Icon name="heart" size={16} color={liked ? 'var(--red)' : 'currentColor'} />{likes}
        </button>
        <button onClick={handleToggleComment}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text2)', cursor: 'pointer', padding: '6px 12px', borderRadius: 10, background: 'none', border: 'none', fontFamily: "'DM Sans',sans-serif" }}>
          <Icon name="comment" size={16} color="currentColor" />{post.comments}
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text2)', cursor: 'pointer', padding: '6px 12px', borderRadius: 10, background: 'none', border: 'none', fontFamily: "'DM Sans',sans-serif" }}>
          <Icon name="share" size={16} color="currentColor" />
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={{ padding: '7px 14px', borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Support</button>
          <button style={{ padding: '7px 16px', borderRadius: 10, background: 'var(--purple)', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="hire" size={14} color="white" />Hire
          </button>
        </div>
      </div>

      {showCommentBox && (
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            style={{ width: '100%', minHeight: 90, resize: 'vertical', padding: 12, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: 'none' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button
              type="button"
              onClick={() => setShowCommentBox(false)}
              style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text2)', fontFamily: "'DM Sans',sans-serif", cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submitComment}
              style={{ padding: '10px 16px', borderRadius: 12, border: 'none', background: 'var(--purple)', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}
            >
              Post comment
            </button>
          </div>
        </div>
      )}

      {post.likedByNames && (
        <div style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex' }}>
            {post.likedByAvatars.slice(0,3).map((ini, i) => (
              <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', background: ['linear-gradient(135deg,#7c5cfc,#ec4899)','linear-gradient(135deg,#3b82f6,#14b8a6)','linear-gradient(135deg,#f59e0b,#ef4444)'][i], border: '1.5px solid var(--bg2)', marginRight: -6, fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white' }}>{ini[0]}</div>
            ))}
          </div>
          <span>Liked by <strong style={{ color: 'var(--text1)' }}>{post.likedByNames}</strong></span>
        </div>
      )}
    </div>
  );
}
