// src/utils/helpers.js
export function formatNumber(n) { if (n>=1e6) return (n/1e6).toFixed(1).replace(/\.0$/,'')+'M'; if (n>=1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'')+'k'; return String(n); }
export function formatNaira(amount) { return '₦' + Number(amount).toLocaleString('en-NG'); }
export function truncate(text, maxLength=100) { return text.length<=maxLength ? text : text.slice(0,maxLength).trim()+'…'; }
export function getInitials(name) { return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }
export function timeAgo(date) { const diff=Date.now()-new Date(date).getTime(); const mins=Math.floor(diff/60000); if(mins<1)return'just now'; if(mins<60)return`${mins}m ago`; const hrs=Math.floor(mins/60); if(hrs<24)return`${hrs}h ago`; return`${Math.floor(hrs/24)}d ago`; }
export function clamp(v,min,max) { return Math.min(Math.max(v,min),max); }
