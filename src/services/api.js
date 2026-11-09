// Ponto unico de comunicacao com o backend (RNF10).
// Enquanto a API Node.js nao esta integrada, as chamadas retornam dados simulados.
const API_URL = import.meta.env.VITE_API_URL || 'https://api.prontoauto.app';
export const USE_MOCK = true;

export async function request(path, options = {}) {
  const token = localStorage.getItem('pa_token');
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!response.ok) throw new Error(`Erro ${response.status} ao chamar ${path}`);
  return response.json();
}

export const wait = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));
