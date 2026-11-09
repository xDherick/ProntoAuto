import { USE_MOCK, request, wait } from './api.js';

export function isAuthenticated() {
  return Boolean(localStorage.getItem('pa_token'));
}

export async function login(identificador, senha) {
  if (USE_MOCK) {
    await wait();
    if (!identificador || !senha) throw new Error('Informe e-mail ou CNPJ e a senha.');
    localStorage.setItem('pa_token', 'token-simulado');
    return { oficina: 'Oficina Central' };
  }
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identificador, senha }),
  });
  localStorage.setItem('pa_token', data.token);
  return data;
}

export function logout() {
  localStorage.removeItem('pa_token');
}
