// src/App.jsx
import React, { useState } from 'react';
import Navbar from './assets/components/Navbar';
import Sidebar from './assets/components/Sidebar';
import RightPanel from './assets/components/RightPanel';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import AuthPage from './pages/Auth';
import Opportunities from './pages/Opportunities';
import Messages from './pages/Messages';
import Quiz from './pages/Challenges';
import Community from './pages/Community';
import Bookmarks from './pages/Bookmarks';
import Wallet from './pages/Wallet';
import { currentUser } from './utils/data';
import { MessageProvider } from './context/MessageContext';
import './App.css';

// Pages that don't show the right panel
const FULL_WIDTH_PAGES = ['Messages'];

const pageMap = (user, setUser) => ({
  Home: <Home user={user} setUser={setUser} />,
  Progress: null, // Will be handled separately for responsive behavior
  Learn: <Learn />,
  Profile: <Profile user={user} setUser={setUser} />,
  Opportunities: <Opportunities user={user} setUser={setUser} />,
  Messages: <Messages />,
  Quiz: <Quiz />,
  Community: <Community />,
  Bookmarks: <Bookmarks />,
  Wallet: <Wallet user={user} setUser={setUser} />,
});

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--bg)',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 0,
  },
  sidebar: {
    display: 'flex',
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    overflow: 'auto',
    minHeight: 0,
  },
  rightPanel: {
    display: 'flex',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
  },
};

export default function App() {
  const [activePage, setActivePage] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(currentUser);
  const [authenticated, setAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const showRightPanel = !FULL_WIDTH_PAGES.includes(activePage);

  const handleProfileAction = (action) => {
    if (action === 'edit') {
      setActivePage('Profile');
    }
    if (action === 'logout') {
      setLogoutConfirm(true);
    }
  };

  const handleLogin = (newUser) => {
    setUser(newUser);
    setAuthenticated(true);
    setShowAuth(false);
    setActivePage('Home');
  };

  const confirmLogout = () => {
    setAuthenticated(false);
    setLogoutConfirm(false);
  };

  if (!authenticated) {
    if (showAuth) {
      return (
        <MessageProvider>
          <AuthPage onLogin={handleLogin} onClose={() => setShowAuth(false)} />
        </MessageProvider>
      );
    }

    return (
      <MessageProvider>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
          <Navbar publicMode onGetStarted={() => setShowAuth(true)} />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Landing onGetStarted={() => setShowAuth(true)} />
          </div>
        </div>
      </MessageProvider>
    );
  }

  return (
    <MessageProvider>
      <div style={styles.root}>
        <Navbar user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} onProfileAction={handleProfileAction} />
        <div style={styles.body}>
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              style={styles.overlay}
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar - Always visible on desktop, toggleable on mobile */}
          <div
            style={{
              ...styles.sidebar,
              position: 'relative',
              flexDirection: 'column',
            }}
            className={`sidebar-desktop${sidebarOpen ? ' open' : ''}`}
          >
            <Sidebar
              activePage={activePage}
              onNavigate={(page) => {
                setActivePage(page);
                setSidebarOpen(false);
              }}
            />
          </div>

          {/* Main Area */}
          <div style={styles.mainArea}>
            {activePage === 'Progress' ? (
              // For Progress page, show progress content in main area on small screens
              <div className="progress-main-content">
                <RightPanel onNavigate={(page) => {
                  setActivePage(page);
                  setSidebarOpen(false);
                }} />
              </div>
            ) : (
              pageMap(user, setUser)[activePage] || <Home user={user} setUser={setUser} />
            )}
            {showRightPanel && activePage !== 'Progress' && (
              <div className="right-panel-wrapper">
                <RightPanel onNavigate={(page) => {
                  setActivePage(page);
                  setSidebarOpen(false);
                }} />
              </div>
            )}
          </div>
        </div>

        {logoutConfirm && (
          <div style={styles.overlay} onClick={() => setLogoutConfirm(false)}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: '90%', maxWidth: 420, padding: 24, borderRadius: 20, background: 'var(--bg2)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 12, color: 'var(--text1)' }}>Are you sure you want to log out?</h3>
              <p style={{ color: 'var(--text2)', marginBottom: 24 }}>You will be returned to the login / signup page.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setLogoutConfirm(false)} style={{ padding: '10px 18px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmLogout} style={{ padding: '10px 18px', borderRadius: 12, border: 'none', background: 'var(--purple)', color: 'white', cursor: 'pointer' }}>Log out</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </MessageProvider>
  );
}
