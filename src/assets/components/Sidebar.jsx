// src/components/Sidebar.jsx
import React from "react";
import Icon from "./Icon";
import { skills } from "../../utils/data";

const navItems = [
  { icon: "home", label: "Home", page: "Home" },
  {
    icon: "lightning",
    label: "Progress",
    page: "Progress",
    mobileActiveOnly: true,
  },
  { icon: "learn", label: "Learn", page: "Learn", mobileActiveOnly: false },
  { icon: "challenge", label: "Quiz", page: "Quiz", mobileActiveOnly: false },
  { icon: "community", label: "Community", page: "Community", mobileActiveOnly: false },
  { icon: "opportunities", label: "Opportunities", page: "Opportunities", mobileActiveOnly: false },
  { icon: "messages", label: "Messages", page: "Messages", mobileActiveOnly: false },
  { icon: "bookmarks", label: "Bookmarks", page: "Bookmarks", mobileActiveOnly: false },
  { icon: "wallet", label: "Wallet", page: "Wallet", mobileActiveOnly: false },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside
      style={{
        width: "var(--sidebar-width)",
        background: "var(--bg2)",
        borderRight: "1px solid var(--border)",
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowY: "auto",
        height: "100%",
      }}
    >
      {navItems.map(({ icon, label, page, mobileActiveOnly }) => {
        const active = activePage === page;
        // const classNames = ['sidebar-item'];
        // if (mobileActiveOnly) classNames.push('mobile-active-only');
        // if (active) classNames.push('active');
        return (
          <div
            key={label}
            className={ `${mobileActiveOnly ? "flex lg:hidden!" : "flex"}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 12,
              cursor: "pointer",
              color: active ? "var(--purple2)" : "var(--text2)",
              background: active ? "var(--purple-bg)" : "transparent",
              fontSize: 14,
              fontWeight: 500,
              transition: "all var(--transition)",
              userSelect: "none",
              "@media (max-width: 768px)": {
                gap: 10,
                padding: "8px 12px",
                fontSize: 13,
              },
              "@media (max-width: 640px)": { gap: 8, padding: "6px 10px" },
            }}
            onClick={() => onNavigate(page)}
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.background = "var(--bg3)";
                e.currentTarget.style.color = "var(--text1)";
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text2)";
              }
            }}
          >
            <Icon name={icon} size={18} color="currentColor" />
            <span style={{ "@media (max-width: 640px)": { display: "none" } }}>
              {label}
            </span>
          </div>
        );
      })}

      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--text3)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "16px 14px 8px",
          "@media (max-width: 768px)": {
            fontSize: 9,
            padding: "12px 10px 6px",
          },
          "@media (max-width: 640px)": { display: "none" },
        }}
      >
        Top Skills
      </div>

      {skills.map((s) => (
        <div
          key={s.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "7px 14px",
            borderRadius: 10,
            cursor: "pointer",
            color: "var(--text2)",
            fontSize: 13,
            transition: "all var(--transition)",
            "@media (max-width: 640px)": { display: "none" },
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg3)";
            e.currentTarget.style.color = "var(--text1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text2)";
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: s.color,
              flexShrink: 0,
            }}
          />
          {s.name}
        </div>
      ))}

      <div
        style={{
          fontSize: 12,
          color: "var(--purple2)",
          padding: "6px 14px",
          cursor: "pointer",
          fontWeight: 500,
          "@media (max-width: 640px)": { display: "none" },
        }}
      >
        See all skills →
      </div>

      <div
        style={{
          background: "linear-gradient(135deg,#4a30c8,#7c5cfc)",
          borderRadius: 16,
          padding: "18px 16px",
          flexShrink: 0,
          marginTop: 16,
        }}
      >
        <div style={{ fontSize: 22, marginBottom: 8 }}>👑</div>
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: "white",
            marginBottom: 6,
          }}
        >
          Upgrade to Pro
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.5,
            marginBottom: 14,
          }}
        >
          Unlock all courses, certifications and more.
        </div>
        <button
          style={{
            background: "white",
            color: "var(--purple3)",
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 700,
            fontSize: 13,
            border: "none",
            borderRadius: 10,
            padding: "9px 16px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}
