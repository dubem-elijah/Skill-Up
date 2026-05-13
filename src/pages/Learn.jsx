// src/pages/Learn.jsx
import React, { useState } from 'react';
import { courses } from '../utils/data';
import ProgressBar from '../assets/components/ProgressBar';

const styles = {
  container: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 24px 40px',
  },
  pageTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: 'var(--text1)',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: 'var(--text2)',
    marginBottom: 24,
  },
  filterRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  filterBtn: (active) => ({
    padding: '7px 16px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    background: active ? 'var(--purple)' : 'var(--bg3)',
    color: active ? 'white' : 'var(--text2)',
    border: `1px solid ${active ? 'var(--purple)' : 'var(--border)'}`,
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all var(--transition)',
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 16,
    marginBottom: 32,
  },
  courseCard: (color) => ({
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 18,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'border-color var(--transition)',
  }),
  courseTop: (color) => ({
    background: color + '18',
    padding: '20px 20px 16px',
    borderBottom: '1px solid var(--border)',
  }),
  courseIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  courseTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: 'var(--text1)',
    marginBottom: 4,
  },
  courseCategory: {
    fontSize: 12,
    color: 'var(--text2)',
  },
  courseBottom: {
    padding: '14px 20px',
  },
  courseMeta: {
    display: 'flex',
    gap: 12,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  metaItem: {
    fontSize: 12,
    color: 'var(--text2)',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  levelBadge: (level) => ({
    fontSize: 10,
    padding: '2px 8px',
    borderRadius: 6,
    background: level === 'Beginner' ? 'var(--green-bg)' : level === 'Intermediate' ? 'var(--amber-bg)' : 'var(--purple-bg)',
    color: level === 'Beginner' ? 'var(--green)' : level === 'Intermediate' ? 'var(--amber)' : 'var(--purple2)',
    fontWeight: 600,
  }),
  startBtn: (color, hasProgress) => ({
    width: '100%',
    padding: '9px',
    borderRadius: 10,
    background: hasProgress ? color + '22' : color,
    color: hasProgress ? color : 'white',
    border: hasProgress ? `1px solid ${color}44` : 'none',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    marginTop: 12,
    transition: 'all var(--transition)',
  }),
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text1)',
    marginBottom: 16,
  },
  lessonHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  lessonCard: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  lessonTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 20,
    fontWeight: 800,
    color: 'var(--text1)',
    marginBottom: 12,
  },
  lessonText: {
    fontSize: 14,
    color: 'var(--text2)',
    lineHeight: 1.75,
  },
  lessonNav: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  navButton: {
    padding: '11px 18px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all var(--transition)',
  },
};

export default function Learn() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCourse, setActiveCourse] = useState(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const filters = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];

  const filtered = activeFilter === 'All'
    ? courses
    : courses.filter((c) => c.category === activeFilter);

  const handleStartCourse = (course) => {
    setActiveCourse(course);
    setLessonIndex(0);
  };

  const handlePrevious = () => {
    setLessonIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (!activeCourse) return;
    setLessonIndex((prev) => Math.min(prev + 1, activeCourse.pages.length - 1));
  };

  if (activeCourse) {
    const page = activeCourse.pages[lessonIndex];

    return (
      <main style={styles.container}>
        <div style={styles.lessonHeader}>
          <div>
            <div style={styles.pageTitle}>{activeCourse.title}</div>
            <div style={styles.pageSubtitle}>Lesson {lessonIndex + 1} of {activeCourse.pages.length}</div>
          </div>
          <div style={styles.lessonNav}>
            <button
              style={{ ...styles.navButton, background: 'var(--bg3)', color: 'var(--text1)' }}
              onClick={() => setActiveCourse(null)}
            >
              ← Back to courses
            </button>
            <button
              style={{ ...styles.navButton, background: 'var(--purple)', color: 'white' }}
              onClick={handlePrevious}
              disabled={lessonIndex === 0}
            >
              Previous
            </button>
            <button
              style={{ ...styles.navButton, background: 'var(--purple)', color: 'white' }}
              onClick={handleNext}
              disabled={lessonIndex === activeCourse.pages.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div style={styles.lessonCard}>
          <div style={styles.lessonTitle}>{page.title}</div>
          <div style={styles.lessonText}>{page.content}</div>
        </div>

        <div style={styles.courseBottom}>
          <div style={styles.courseMeta}>
            <span style={styles.metaItem}>Instructor: {activeCourse.instructor}</span>
            <span style={styles.metaItem}>Duration: {activeCourse.duration}</span>
            <span style={styles.metaItem}>Level: {activeCourse.level}</span>
          </div>
          <ProgressBar label="Course progress" percent={Math.round(((lessonIndex + 1) / activeCourse.pages.length) * 100)} color={activeCourse.color} />
        </div>
      </main>
    );
  }

  return (
    <main style={styles.container}>
      <div style={styles.pageTitle}>Learn & Grow 📚</div>
      <div style={styles.pageSubtitle}>Pick a course, build a skill, earn on SkillUp.</div>

      <div style={styles.filterRow}>
        {filters.slice(0, 6).map((f) => (
          <button key={f} style={styles.filterBtn(activeFilter === f)} onClick={() => setActiveFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>
        {activeFilter === 'All' ? 'All Courses' : activeFilter}
      </div>

      <div style={styles.grid}>
        {filtered.map((course) => (
          <div
            key={course.id}
            style={styles.courseCard(course.color)}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border2)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div style={styles.courseTop(course.color)}>
              <div style={styles.courseIcon}>{course.icon || '📘'}</div>
              <div style={styles.courseTitle}>{course.title}</div>
              <div style={styles.courseCategory}>{course.category}</div>
            </div>
            <div style={styles.courseBottom}>
              <div style={styles.courseMeta}>
                <span style={styles.metaItem}>📖 {course.lessons} lessons</span>
                <span style={styles.metaItem}>⏱ {course.duration}</span>
                <span style={styles.levelBadge(course.level)}>{course.level}</span>
              </div>
              {course.progress > 0 && (
                <ProgressBar label="" percent={course.progress} color={course.color} />
              )}
              <button style={styles.startBtn(course.color, course.progress > 0)} onClick={() => handleStartCourse(course)}>
                {course.progress > 0 ? `Continue — ${course.progress}%` : 'Start Course →'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
