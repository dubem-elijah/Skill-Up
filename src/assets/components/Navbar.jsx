// src/components/Navbar.jsx
import React, { useState } from 'react';
import Icon from './Icon';
import Avatar from './Avatar';

export default function Navbar({ user, onMenuClick, onProfileAction, publicMode = false, onGetStarted, theme = 'dark', onToggleTheme = () => {}, searchQuery = '', onSearchChange = () => {} }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'How it works', href: '#how-it-works' },
  ];

  return (
    <nav className="navbar">
      {!publicMode && (
        <button type="button" className="menu-btn" onClick={onMenuClick}>
          <Icon name="menu" size={20} color="var(--text1)" />
        </button>
      )}

      <a href="/" className="brand-link">
        <div className="brand-icon">
          <Icon name="lightning" size={18} color="white" />
        </div>
        <span className="brand-title">SkillUp</span>
      </a>

      {publicMode && (
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="navbar-link">
              {link.label}
            </a>
          ))}
        </div>
      )}

      {!publicMode && (
        <div className="navbar-search">
          <Icon name="search" size={15} color="var(--text2)" />
          <input
            className="search-input"
            placeholder="Search for skills, people, or opportunities..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}

      <div className="navbar-actions">
        <button type="button" className="navbar-theme-toggle" onClick={onToggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} color="var(--text2)" />
        </button>

        {!publicMode ? (
          <>
            {[{ name: 'bell', badge: '3', color: 'var(--purple)' }, { name: 'messages', badge: '2', color: 'var(--pink)' }].map(({ name, badge, color }) => (
              <div key={name} className="navbar-action-icon">
                <Icon name={name} size={17} color="var(--text2)" />
                <span className="navbar-action-badge" style={{ background: color }}>{badge}</span>
              </div>
            ))}
            <div className="navbar-profile-container">
              <button type="button" className="navbar-profile" onClick={() => setDropdownOpen((open) => !open)}>
                <Avatar initials={user?.initials || 'DU'} size="sm" gradient="linear-gradient(135deg,#7c5cfc,#ec4899)" />
                <span className="navbar-profile-name">{user?.name || 'Dubem'}</span>
                <Icon name="chevron" size={14} color="var(--text2)" />
              </button>
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <button type="button" onClick={() => { setDropdownOpen(false); onProfileAction('edit'); }}>
                    <Icon name="edit" size={14} color="var(--text1)" /> Edit Profile
                  </button>
                  <button type="button" onClick={() => { setDropdownOpen(false); onProfileAction('logout'); }}>
                    <Icon name="x" size={14} color="var(--red)" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button type="button" className="navbar-cta" onClick={onGetStarted || (() => {})}>
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
}
