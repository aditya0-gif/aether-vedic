// ─── API Base URL ──────────────────────────────────────────────────────────
const BASE = import.meta.env.VITE_API_URL || '/api';

// ─── Generic fetch wrapper ─────────────────────────────────────────────────
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('aether_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }
  return data;
};

// ─── Auth ──────────────────────────────────────────────────────────────────
export const register = (payload) =>
  apiFetch('/register', { method: 'POST', body: JSON.stringify(payload) });

export const login = (payload) =>
  apiFetch('/login', { method: 'POST', body: JSON.stringify(payload) });

export const getProfile = () => apiFetch('/profile');

// ─── Astrology ─────────────────────────────────────────────────────────────
export const fetchHoroscope = (sign) =>
  apiFetch('/horoscope', { method: 'POST', body: JSON.stringify({ sign }) });

export const fetchAIHoroscope = (sign, question = '') =>
  apiFetch('/ai-horoscope', { method: 'POST', body: JSON.stringify({ sign, question }) });

export const fetchBirthChart = (payload) =>
  apiFetch('/birth-chart', { method: 'POST', body: JSON.stringify(payload) });

// ─── Payments ──────────────────────────────────────────────────────────────
export const createCheckoutSession = () =>
  apiFetch('/create-checkout-session', { method: 'POST' });

export const activatePremiumDev = () =>
  apiFetch('/activate-premium', { method: 'POST' });
