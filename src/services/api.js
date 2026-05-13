// src/services/api.js — Mock API layer (swap with real fetch/axios for backend)
import { posts, opportunities, courses, topLearners, messages } from '../utils/data';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export async function getFeed() { await delay(); return posts; }
export async function likePost(postId) { await delay(100); return { success: true, postId }; }
export async function createPost(payload) { await delay(400); return { id: 'p_' + Date.now(), ...payload, time: 'just now', likes: 0, comments: 0, likedByNames: '', likedByAvatars: [], isLiked: false }; }
export async function getOpportunities() { await delay(); return opportunities; }
export async function getCourses() { await delay(); return courses; }
export async function getTopLearners() { await delay(); return topLearners; }
export async function getMessages() { await delay(); return messages; }
export async function sendMessage(conversationId, text) { await delay(200); return { id: 'msg_' + Date.now(), conversationId, text, sentAt: new Date().toISOString(), fromMe: true }; }
