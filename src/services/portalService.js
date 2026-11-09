import { USE_MOCK, request, wait } from './api.js';

const portal = {
  oficina: 'Oficina Central',
  veiculo: 'Toyota Corolla 2020 · ABC-1234',
  quilometragem: '52.340 km',
  queixa: 'Barulho ao frear e luz de troca de óleo acesa no painel.',
  diagnostico: 'Pastilhas de freio desgastadas e óleo do motor vencido. Recomendamos a troca de ambos.',
  status: 'AGUARDANDO_APROVACAO',
  itens: [
    { descricao: 'Troca de óleo 5W-30', quantidade: 1, valorUnitario: 120 },
    { descricao: 'Filtro de óleo', quantidade: 1, valorUnitario: 35 },
    { descricao: 'Mão de obra', quantidade: 1, valorUnitario: 120 },
  ],
  evidencias: [
    { id: 1, categoria: 'ANTES', legenda: 'Pastilha dianteira desgastada' },
    { id: 2, categoria: 'ANTES', legenda: 'Nível de óleo abaixo do mínimo' },
    { id: 3, categoria: 'DEPOIS', legenda: 'Pastilhas novas instaladas' },
  ],
};

export async function buscarPorToken(token) {
  if (USE_MOCK) { await wait(); return { ...portal, token }; }
  return request(`/portal/${token}`);
}

// Uma unica decisao por OS (RNF07): o backend rejeita a segunda tentativa.
export async function registrarDecisao(token, decisao, motivo) {
  if (USE_MOCK) { await wait(); return { decisao, motivo, decididoEm: new Date().toISOString() }; }
  return request(`/portal/${token}/decisao`, {
    method: 'POST',
    body: JSON.stringify({ decisao, motivo }),
  });
}
