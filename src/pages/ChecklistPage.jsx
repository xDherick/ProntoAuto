import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader.jsx';
import BottomNav from '../components/BottomNav.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

const blocos = {
  Motor: ['Nível de óleo do motor', 'Nível do fluido de arrefecimento', 'Correia dentada (estado visual)', 'Filtro de ar', 'Velas de ignição', 'Bobinas de ignição'],
  Freios: ['Pastilhas dianteiras', 'Pastilhas traseiras', 'Discos de freio', 'Fluido de freio', 'Freio de mão'],
  Suspensão: ['Amortecedores', 'Buchas e bieletas', 'Pivôs e terminais', 'Molas'],
  Visual: ['Pneus (desgaste e calibragem)', 'Lanternas e faróis', 'Palhetas do limpador', 'Lataria e vidros'],
};

// Checklist de inspecao por blocos: Motor, Freios, Suspensao e Visual.
export default function ChecklistPage() {
  const { id } = useParams();
  const [aba, setAba] = useState('Motor');
  const [marcados, setMarcados] = useState({
    Motor: ['Nível de óleo do motor', 'Nível do fluido de arrefecimento', 'Correia dentada (estado visual)', 'Filtro de ar'],
  });
  const [obs, setObs] = useState('');
  const [salvo, setSalvo] = useState(false);

  const itens = blocos[aba];
  const feitos = marcados[aba] || [];

  function alternar(item) {
    setSalvo(false);
    setMarcados((atual) => {
      const lista = atual[aba] || [];
      return { ...atual, [aba]: lista.includes(item) ? lista.filter((i) => i !== item) : [...lista, item] };
    });
  }

  return (
    <div className="app-shell">
      <AppHeader titulo="Checklist de inspeção" subtitulo={`Toyota Corolla · O.S. #${String(id).padStart(4, '0')}`} direita={<Link to={`/os/${id}`} style={{ color: '#fff' }}>Voltar</Link>} />
      <main className="app-content">
        <div className="tabs">
          {Object.keys(blocos).map((nome) => (
            <button key={nome} className={`tab ${nome === aba ? 'ativo' : ''}`} onClick={() => setAba(nome)}>{nome}</button>
          ))}
        </div>

        <div className="row" style={{ fontSize: 14 }}>
          <span>Progresso do bloco</span>
          <b style={{ color: 'var(--verde)' }}>{feitos.length} / {itens.length}</b>
        </div>
        <ProgressBar valor={Math.round((feitos.length / itens.length) * 100)} />

        <div className="card">
          {itens.map((item) => (
            <label key={item} className={`check-item ${feitos.includes(item) ? 'feito' : ''}`}>
              <input type="checkbox" checked={feitos.includes(item)} onChange={() => alternar(item)} />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <label className="field card">
          Observação do mecânico
          <textarea value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Adicionar observação..." />
        </label>

        <button className="btn" onClick={() => setSalvo(true)}>{salvo ? 'Inspeção salva' : 'Salvar inspeção'}</button>
      </main>
      <BottomNav />
    </div>
  );
}
