import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader.jsx';
import OSCard from '../components/OSCard.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { listarOrdens } from '../services/osService.js';

export default function DashboardPage() {
  const [ordens, setOrdens] = useState([]);

  useEffect(() => {
    listarOrdens().then(setOrdens);
  }, []);

  const aguardando = ordens.find((o) => o.status === 'AGUARDANDO_APROVACAO');

  return (
    <div className="app-shell">
      <AppHeader titulo="ProntoAuto" subtitulo="Oficina Central · Hoje" direita={<div className="avatar">CS</div>} />
      <main className="app-content">
        <div className="stats">
          <div className="card stat"><strong>7</strong><span>O.S. abertas</span></div>
          <div className="card stat"><strong>3</strong><span>Concluídas hoje</span></div>
          <div className="card stat"><strong>2</strong><span>Aguardando peças</span></div>
          <div className="card stat"><strong>1</strong><span>Atrasada</span></div>
        </div>

        {aguardando && (
          <div className="alert">
            O.S. #{String(aguardando.id).padStart(4, '0')} — {aguardando.veiculo} aguardando aprovação do cliente há 2h.
          </div>
        )}

        <div className="section-label">Ordens em andamento</div>
        {ordens.map((os) => <OSCard key={os.id} os={os} />)}

        <Link to="/os/nova" className="btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
          Nova ordem de serviço
        </Link>
      </main>
      <BottomNav />
    </div>
  );
}
