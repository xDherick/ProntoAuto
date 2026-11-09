// Estados minimos da OS (RF27) mais os estados de andamento exibidos no painel.
const mapa = {
  RASCUNHO: ['Rascunho', 'azul'],
  AGUARDANDO_APROVACAO: ['Aguardando', 'laranja'],
  APROVADO: ['Aprovado', 'verde'],
  RECUSADO: ['Recusado', 'vermelho'],
  CANCELADO: ['Cancelado', 'vermelho'],
  EM_ANDAMENTO: ['Em andamento', 'verde'],
  ATRASADA: ['Atrasada', 'vermelho'],
};

export default function StatusBadge({ status }) {
  const [rotulo, cor] = mapa[status] || [status, 'azul'];
  return <span className={`badge badge-${cor}`}>{rotulo}</span>;
}
