import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader.jsx';
import BottomNav from '../components/BottomNav.jsx';
import BudgetSummary from '../components/BudgetSummary.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { buscarOS } from '../services/osService.js';

const dotPorSituacao = { 'Concluído': ['dot-ok', '✓'], 'Em andamento': ['dot-and', '…'], Pendente: ['dot-pen', '·'] };

export default function OSDetalhePage() {
  const { id } = useParams();
  const [os, setOs] = useState(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    buscarOS(id).then(setOs);
  }, [id]);

  if (!os) return <div className="app-shell"><p style={{ padding: 20 }}>Carregando...</p></div>;

  async function copiarLink() {
    const link = `${window.location.origin}/view/0e470439c6416834da6c5eda57cf1f2c`;
    try { await navigator.clipboard.writeText(link); } catch { /* ambiente sem clipboard */ }
    setCopiado(true);
  }

  return (
    <div className="app-shell">
      <AppHeader
        titulo={`O.S. #${String(os.id).padStart(4, '0')}`}
        subtitulo={`Toyota ${os.veiculo.modelo} · ${os.veiculo.placa}`}
        direita={<StatusBadge status={os.status} />}
      />
      <main className="app-content">
        <div className="section-label">Dados do cliente</div>
        <div className="card">
          <div className="row">
            <div><b>{os.cliente.nome}</b><br /><small>{os.cliente.whatsapp}</small></div>
          </div>
          <div className="kv">
            <div><small>Veículo</small><b>{os.veiculo.modelo}</b></div>
            <div><small>Placa</small><b>{os.veiculo.placa}</b></div>
            <div><small>KM entrada</small><b>{os.kmEntrada}</b></div>
            <div><small>Previsão</small><b>{os.previsao}</b></div>
          </div>
        </div>

        <div className="section-label">Serviços</div>
        <div className="card">
          {os.servicos.map((s, i) => {
            const [classe, icone] = dotPorSituacao[s.situacao];
            return (
              <div className="servico" key={s.nome}>
                <span className={`dot ${classe}`}>{s.situacao === 'Pendente' ? i + 1 : icone}</span>
                <div>
                  <div>{s.nome}</div>
                  <small style={{ color: 'var(--texto-suave)' }}>
                    {s.situacao}{s.mecanico ? ` · ${s.mecanico}` : ''}{s.hora ? ` · ${s.hora}` : ''}
                  </small>
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-label">Valor estimado</div>
        <BudgetSummary itens={os.itens} />

        <div className="btn-row">
          <button className="btn btn-outline" onClick={copiarLink}>{copiado ? 'Link copiado' : 'Enviar orçamento'}</button>
          <Link to={`/checklist/${os.id}`} className="btn" style={{ textAlign: 'center', textDecoration: 'none' }}>Checklist</Link>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
