// src/services/auth.js — Mock auth (swap with Firebase/Supabase)
const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));
const KEY = 'skillup_user';

export async function login({ email, password }) {
  await delay();
  if (!email || !password) throw new Error('Email and password required.');
  const user = { id: 'u_' + Date.now(), name: email.split('@')[0], email, initials: email[0].toUpperCase(), isPro: false, streak: 0, xp: 0 };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export async function signup({ name, email, password }) {
  await delay(600);
  if (!name || !email || !password) throw new Error('All fields required.');
  const user = { id: 'u_' + Date.now(), name, email, initials: name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2), isPro: false, streak: 0, xp: 0 };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export async function logout() { await delay(100); localStorage.removeItem(KEY); }
export function getCurrentUser() { try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; } }
