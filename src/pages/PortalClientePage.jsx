import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader.jsx';
import BudgetSummary from '../components/BudgetSummary.jsx';
import EvidenceGallery from '../components/EvidenceGallery.jsx';
import { buscarPorToken, registrarDecisao } from '../services/portalService.js';

// Portal publico acessado por link com token (RF12, RF35): sem login para o cliente.
// Mostra dados, queixa, evidencias e orcamento (RF13, RF36) e permite aprovar ou recusar (RF14, RF15, RF37).
export default function PortalClientePage() {
  const { token } = useParams();
  const [dados, setDados] = useState(null);
  const [decisao, setDecisao] = useState(null);
  const [recusando, setRecusando] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    buscarPorToken(token).then(setDados);
  }, [token]);

  if (!dados) return <div className="app-shell"><p style={{ padding: 20 }}>Carregando...</p></div>;

  async function decidir(tipo) {
    setEnviando(true);
    const resposta = await registrarDecisao(token, tipo, motivo);
    setDecisao({ tipo, quando: new Date(resposta.decididoEm) });
    setEnviando(false);
  }

  return (
    <div className="app-shell">
      <AppHeader titulo={dados.oficina} subtitulo="Orçamento do seu veículo" />
      <main className="app-content" style={{ paddingBottom: 24 }}>
        <div className="card">
          <b>{dados.veiculo}</b>
          <div className="kv">
            <div><small>Quilometragem</small><b>{dados.quilometragem}</b></div>
          </div>
        </div>

        <div className="section-label">O que foi relatado</div>
        <div className="card">{dados.queixa}</div>

        <div className="section-label">O que encontramos</div>
        <div className="card">{dados.diagnostico}</div>

        <div className="section-label">Fotos do veículo</div>
        <EvidenceGallery evidencias={dados.evidencias} />

        <div className="section-label">Orçamento</div>
        <BudgetSummary itens={dados.itens} />

        {decisao ? (
          <div className={decisao.tipo === 'APROVADO' ? 'alert' : 'alert'} style={{ background: decisao.tipo === 'APROVADO' ? 'var(--verde-claro)' : 'var(--vermelho-claro)' }}>
            {decisao.tipo === 'APROVADO' ? 'Orçamento aprovado.' : 'Orçamento recusado.'} Registrado em{' '}
            {decisao.quando.toLocaleString('pt-BR')}. Obrigado!
          </div>
        ) : recusando ? (
          <>
            <label className="field card">
              Motivo da recusa (opcional)
              <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} />
            </label>
            <div className="btn-row">
              <button className="btn btn-outline" onClick={() => setRecusando(false)}>Voltar</button>
              <button className="btn btn-danger" disabled={enviando} onClick={() => decidir('RECUSADO')}>Confirmar recusa</button>
            </div>
          </>
        ) : (
          <div className="btn-row">
            <button className="btn btn-outline" onClick={() => setRecusando(true)}>Recusar</button>
            <button className="btn" disabled={enviando} onClick={() => decidir('APROVADO')}>Aprovar</button>
          </div>
        )}
      </main>
    </div>
  );
}
