import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge.jsx';
import ProgressBar from './ProgressBar.jsx';

export default function OSCard({ os }) {
  return (
    <Link to={`/os/${os.id}`} className="card os-card">
      <div className="os-card-top">
        <div>
          <h3>{os.veiculo} · {os.placa}</h3>
          <p>O.S. #{String(os.id).padStart(4, '0')} · {os.servico}</p>
        </div>
        <StatusBadge status={os.status} />
      </div>
      <ProgressBar valor={os.progresso} atrasada={os.status === 'ATRASADA'} />
      <div className="os-card-foot">
        <span>Mecânico: {os.mecanico}</span>
        <span>{os.progresso}% concluído</span>
      </div>
    </Link>
  );
}
