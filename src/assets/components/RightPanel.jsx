// src/components/RightPanel.jsx
import React from 'react';
import ProgressBar from './ProgressBar';
import Avatar from './Avatar';
import {
  userProgress,
  opportunities,
  topLearners,
  currentUser,
} from '../../utils/data';

const rankLabel = (i) =>
  i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : String(i + 1);

export default function RightPanel({ onNavigate }) {
  const featuredOpportunity = opportunities?.[0];

  return (
    <aside
      style={{
        width: 'var(--right-width)',
        background: 'var(--bg2)',
        borderLeft: '1px solid var(--border)',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {/* Progress */}
      <div
        style={{
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--text1)',
            }}
          >
            Your Progress
          </span>
          <span
            style={{
              fontSize: 12,
              color: 'var(--purple2)',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            View all
          </span>
        </div>

        {userProgress.map(({ skill, percent, color }) => (
          <ProgressBar
            key={skill}
            label={skill}
            percent={percent}
            color={color}
          />
        ))}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingTop: 14,
            borderTop: '1px solid var(--border)',
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 24 }}>🔥</span>

          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: 'var(--text1)',
                lineHeight: 1,
              }}
            >
              {currentUser.streak}
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--text2)',
                marginTop: 2,
              }}
            >
              Day Streak
            </div>
          </div>

          <span
            style={{
              marginLeft: 'auto',
              fontSize: 12,
              color: 'var(--purple2)',
              fontWeight: 500,
            }}
          >
            Keep it up! 🔥
          </span>
        </div>
      </div>

      {/* Top Learners */}
      <div
        className="top-learners-section"
        style={{
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--text1)',
            }}
          >
            Top Learners
          </span>
          <span
            style={{
              fontSize: 12,
              color: 'var(--purple2)',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            View all
          </span>
        </div>

        {topLearners.map((learner, i) => (
          <div
            key={learner.id}
            className="learner-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 0',
              borderBottom:
                i < topLearners.length - 1
                  ? '1px solid var(--border)'
                  : 'none',
            }}
          >
            <span
              style={{
                width: 24,
                textAlign: 'center',
                fontSize: i === 0 ? 17 : 13,
                fontWeight: 700,
                color:
                  i === 0
                    ? 'var(--amber)'
                    : i === 1
                    ? '#aab'
                    : i === 2
                    ? '#c87'
                    : 'var(--text3)',
                flexShrink: 0,
              }}
            >
              {rankLabel(i)}
            </span>

            <Avatar
              initials={learner.name[0]}
              size="sm"
              gradient={learner.gradient}
            />

            <div
              style={{
                flex: 1,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text1)',
              }}
            >
              {learner.name}
            </div>

            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--purple2)',
              }}
            >
              {learner.xp} XP
            </span>
          </div>
        ))}
      </div>

      {/* Opportunity for You */}
      <div
        className="featured-opportunity-section"
        style={{
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          paddingRight: 14,
          paddingLeft: 14,
          paddingTop: 20,
          overflow: 'visible',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--text1)',
                marginBottom: 4,
              }}
            >
              Opportunity for You
            </div>
            <div
              style={{
                fontSize: 12,
                lineHeight: 1.5,
                color: 'var(--text2)',
              }}
            >
              Curated based on your skills and recent activity.
            </div>
          </div>

          <span
            style={{
              flexShrink: 0,
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--purple)',
              background: 'rgba(124, 92, 252, 0.10)',
              border: '1px solid rgba(124, 92, 252, 0.15)',
              padding: '6px 10px',
              borderRadius: 999,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Top Pick
          </span>
        </div>

        {/* Card */}
        {featuredOpportunity && (
          <div
            className="featured-opportunity-card"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              padding: 20,
              paddingTop:20, 
              paddingBottom: 10,
              borderRadius: 18,
              minHeight: 20,
              overflow: 'visible',
              background:
                'linear-gradient(180deg, var(--bg4), rgba(124, 92, 252, 0.03))',
              border: '1px solid var(--border)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.06)',
            }}
          >

            {/* Top Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background:
                    'linear-gradient(135deg, var(--purple), var(--purple2))',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontSize: 24,
                  boxShadow: '0 8px 20px rgba(124, 92, 252, 0.25)',
                  flexShrink: 0,
                }}
              >
                {featuredOpportunity.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--text1)',
                    lineHeight: 1.35,
                    wordBreak: 'break-word',
                  }}
                >
                  {featuredOpportunity.title}
                </div>

                <div
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    color: 'var(--text3)',
                  }}
                >
                  by {featuredOpportunity.postedBy}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {featuredOpportunity.tags?.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--text2)',
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    padding: '6px 10px',
                    borderRadius: 999,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price & Deadline */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 16,
                alignItems: 'end',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'var(--green)',
                    lineHeight: 1,
                  }}
                >
                  {featuredOpportunity.price}
                </div>

                <div
                  style={{
                    marginTop: 6,
                    fontSize: 11,
                    color: 'var(--text3)',
                  }}
                >
                  ⏰ Deadline: {featuredOpportunity.deadline}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate?.('Opportunities')}
                style={{
                  padding: '11px 18px',
                  borderRadius: 12,
                  border: 'none',
                  background:
                    'linear-gradient(135deg, var(--purple), var(--purple2))',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 20px rgba(124, 92, 252, 0.22)',
                  transition: 'transform 0.2s ease',
                }}
              >
                View Opportunity
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}