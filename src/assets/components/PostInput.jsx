// src/components/PostInput.jsx
import React, { useState, useRef } from 'react';
import Icon from './Icon';
import Avatar from './Avatar';
import { skills } from '../../utils/data';

export default function PostInput({ user, onPost }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [taggedSkill, setTaggedSkill] = useState(null);
  const [challengeType, setChalllengeType] = useState(null);
  const fileInputRef = useRef(null);

  const handleMediaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMedia({ url: event.target.result, type: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!text.trim() && !media && !taggedSkill && !challengeType) return;
    onPost?.({
      text,
      user,
      media: media ? { url: media.url, width: 300, height: 200 } : null,
      taggedSkill,
      challengeType,
    });
    setText('');
    setMedia(null);
    setTaggedSkill(null);
    setChalllengeType(null);
    setOpen(false);
  };

  return (
    <>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <Avatar initials={user.initials} size="md" gradient="linear-gradient(135deg,#7c5cfc,#ec4899)" />
          <div onClick={() => setOpen(true)} style={{ flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: '11px 16px', color: 'var(--text2)', fontSize: 14, cursor: 'pointer' }}>
            What are you learning or building today?
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => { handleMediaClick(); setOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
            <Icon name="media" size={14} color="currentColor" />Add Media
          </button>
          <button onClick={() => setOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
            <Icon name="tag" size={14} color="currentColor" />Tag Skill
          </button>
          <button onClick={() => setOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
            <Icon name="flag" size={14} color="currentColor" />Challenge
          </button>
          <button onClick={() => setOpen(true)} style={{ marginLeft: 'auto', background: 'var(--purple)', color: 'white', border: 'none', borderRadius: 10, padding: '9px 24px', fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Post</button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, padding: 24, width: '90%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--text1)' }}>Create a post</span>
              <button onClick={() => setOpen(false)} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, cursor: 'pointer', color: 'var(--text2)', background: 'var(--bg3)', border: 'none' }}>
                <Icon name="x" size={16} color="var(--text2)" />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <Avatar initials={user.initials} size="md" gradient="linear-gradient(135deg,#7c5cfc,#ec4899)" />
              <div><div style={{ fontWeight: 600, fontSize: 15 }}>{user.name}</div><div style={{ fontSize: 12, color: 'var(--text2)' }}>Sharing publicly</div></div>
            </div>
            <textarea autoFocus value={text} onChange={e => setText(e.target.value)}
              placeholder="What are you learning or building today? Share your progress! 🚀"
              style={{ width: '100%', minHeight: 120, background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', color: 'var(--text1)', fontSize: 14, resize: 'vertical', outline: 'none', marginBottom: 16, lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif" }} />

            {/* Media Preview */}
            {media && (
              <div style={{ marginBottom: 16, borderRadius: 12, overflow: 'hidden' }}>
                <img src={media.url} alt="preview" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                <button onClick={() => setMedia(null)} style={{ width: '100%', padding: '8px', background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 12 }}>Remove Image</button>
              </div>
            )}

            {/* Media Upload */}
            {!media && (
              <button onClick={handleMediaClick} style={{ width: '100%', padding: '12px', background: 'var(--bg3)', border: '1px dashed var(--border)', borderRadius: 12, color: 'var(--text2)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 13, marginBottom: 16 }}>
                <Icon name="media" size={16} color="currentColor" /> Upload Image
              </button>
            )}

            {/* Skill Tagging */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 8 }}>TAG A SKILL</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {skills.slice(0, 5).map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => setTaggedSkill(taggedSkill?.id === skill.id ? null : skill)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      background: taggedSkill?.id === skill.id ? skill.color : 'var(--bg3)',
                      border: taggedSkill?.id === skill.id ? `1px solid ${skill.color}` : '1px solid var(--border)',
                      color: taggedSkill?.id === skill.id ? 'white' : 'var(--text2)',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
              {taggedSkill && (
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 8, padding: '8px', background: 'var(--bg3)', borderRadius: 8 }}>
                  ✓ Tagged skill: <strong>{taggedSkill.name}</strong>
                </div>
              )}
            </div>

            {/* Challenge Type */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 8 }}>CHALLENGE TYPE</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Daily', 'Weekly', 'Monthly'].map(type => (
                  <button
                    key={type}
                    onClick={() => setChalllengeType(challengeType === type ? null : type)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      background: challengeType === type ? 'var(--purple)' : 'var(--bg3)',
                      border: challengeType === type ? `1px solid var(--purple)` : '1px solid var(--border)',
                      color: challengeType === type ? 'white' : 'var(--text2)',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {challengeType && (
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 8, padding: '8px', background: 'var(--bg3)', borderRadius: 8 }}>
                  ✓ Challenge type: <strong>{challengeType}</strong>
                </div>
              )}
            </div>

            <button onClick={handleSubmit} style={{ background: 'var(--purple)', color: 'white', border: 'none', borderRadius: 12, padding: '11px 24px', fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer', width: '100%' }}>Post Update</button>
          </div>
        </div>
      )}
    </>
  );
}

