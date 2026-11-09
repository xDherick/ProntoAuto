// Evidencias separadas em "Antes" e "Depois" (RF29, RF30).
function Grupo({ titulo, classe, itens }) {
  if (itens.length === 0) return null;
  return (
    <div>
      <div className="gallery-title">{titulo} ({itens.length})</div>
      <div className="gallery">
        {itens.map((e) => (
          <figure key={e.id} className="thumb" style={{ margin: 0 }}>
            <div className={`img ${classe}`}>Foto {e.id}</div>
            <p>{e.legenda}</p>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function EvidenceGallery({ evidencias }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Grupo titulo="Antes do serviço" classe="antes" itens={evidencias.filter((e) => e.categoria === 'ANTES')} />
      <Grupo titulo="Depois do serviço" classe="depois" itens={evidencias.filter((e) => e.categoria === 'DEPOIS')} />
    </div>
  );
}
