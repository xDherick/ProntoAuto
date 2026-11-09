import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { criarOS } from '../services/osService.js';

// Tela de Nova OS: queixa, quilometragem e fotos iniciais (RF02, RF03, RF05, RF25, RF28).
// Fluxo pensado para abrir a OS e gerar o link em ate 3 minutos (RNF02).
export default function NovaOSPage() {
  const navigate = useNavigate();
  const inputFotos = useRef(null);
  const [placa, setPlaca] = useState('');
  const [km, setKm] = useState('');
  const [queixa, setQueixa] = useState('');
  const [fotos, setFotos] = useState([]);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function gerar(evento) {
    evento.preventDefault();
    if (!placa.trim() || !queixa.trim()) {
      setErro('Informe a placa e a descrição do problema (RNE-001).');
      return;
    }
    setErro('');
    setSalvando(true);
    const os = await criarOS({ placa, quilometragem: km, queixa, fotosAntes: fotos.length });
    setSalvando(false);
    navigate(`/os/${os.id}`);
  }

  return (
    <div className="app-shell">
      <AppHeader titulo="Nova OS" subtitulo="Registro de entrada do veículo" direita={<Link to="/" style={{ color: '#fff' }}>Voltar</Link>} />
      <form className="app-content" onSubmit={gerar}>
        <label className="field">
          Placa do veículo
          <input value={placa} onChange={(e) => setPlaca(e.target.value.toUpperCase())} placeholder="ABC-1234" />
        </label>
        <label className="field">
          Quilometragem atual
          <input value={km} onChange={(e) => setKm(e.target.value)} inputMode="numeric" placeholder="52340" />
        </label>
        <label className="field">
          Descrição do problema / queixa
          <textarea value={queixa} onChange={(e) => setQueixa(e.target.value)} placeholder="O que o cliente relatou?" />
        </label>

        <input
          ref={inputFotos}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          hidden
          onChange={(e) => setFotos(Array.from(e.target.files))}
        />
        <button type="button" className="btn" style={{ background: '#2b3544' }} onClick={() => inputFotos.current.click()}>
          Anexar fotos (evidências){fotos.length > 0 ? ` · ${fotos.length}` : ''}
        </button>

        {erro && <p className="error">{erro}</p>}
        <button className="btn" type="submit" disabled={salvando}>
          {salvando ? 'GERANDO...' : 'GERAR ORÇAMENTO E LINK'}
        </button>
      </form>
      <BottomNav />
    </div>
  );
}
