import { USE_MOCK, request, wait } from './api.js';

const ordens = [
  { id: 318, veiculo: 'Toyota Corolla', placa: 'ABC-1234', servico: 'Troca de óleo + filtros', mecanico: 'João P.', status: 'EM_ANDAMENTO', progresso: 70 },
  { id: 317, veiculo: 'Ford Ka', placa: 'XYZ-5678', servico: 'Revisão geral', mecanico: 'Rafael S.', status: 'AGUARDANDO_APROVACAO', progresso: 30 },
  { id: 312, veiculo: 'Honda Civic', placa: 'DEF-9012', servico: 'Suspensão dianteira', mecanico: 'Pedro L.', status: 'ATRASADA', progresso: 50 },
];

const detalhe = {
  id: 318,
  cliente: { nome: 'Marcos Silva', whatsapp: '(62) 99999-0000' },
  veiculo: { modelo: 'Corolla 2020', placa: 'ABC-1234' },
  kmEntrada: '52.340 km',
  previsao: 'Hoje 17h',
  status: 'EM_ANDAMENTO',
  servicos: [
    { nome: 'Troca de óleo 5W-30', situacao: 'Concluído', mecanico: 'João P.', hora: '09:15' },
    { nome: 'Filtro de óleo', situacao: 'Concluído', mecanico: 'João P.', hora: '09:30' },
    { nome: 'Filtro de ar', situacao: 'Em andamento', mecanico: 'João P.' },
    { nome: 'Verificação de freios', situacao: 'Pendente' },
  ],
  itens: [
    { tipo: 'MAO_DE_OBRA', descricao: 'Mão de obra', quantidade: 1, valorUnitario: 180 },
    { tipo: 'PECA', descricao: 'Peças / insumos', quantidade: 1, valorUnitario: 95 },
  ],
};

export const calcularTotal = (itens) =>
  itens.reduce((soma, item) => soma + item.quantidade * item.valorUnitario, 0);

export async function listarOrdens() {
  if (USE_MOCK) { await wait(); return ordens; }
  return request('/os');
}

export async function buscarOS(id) {
  if (USE_MOCK) { await wait(); return { ...detalhe, id: Number(id) }; }
  return request(`/os/${id}`);
}

export async function criarOS(dados) {
  if (USE_MOCK) {
    await wait();
    return { id: 319, token: '0e470439c6416834da6c5eda57cf1f2c', ...dados };
  }
  return request('/os', { method: 'POST', body: JSON.stringify(dados) });
}

export async function enviarEvidencia(osId, categoria, arquivo) {
  if (USE_MOCK) { await wait(); return { osId, categoria, nome: arquivo?.name }; }
  const form = new FormData();
  form.append('categoria', categoria);
  form.append('arquivo', arquivo);
  return request(`/os/${osId}/evidencias`, { method: 'POST', body: form });
}
