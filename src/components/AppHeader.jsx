export default function AppHeader({ titulo, subtitulo, direita }) {
  return (
    <header className="app-header">
      <div>
        <h1>{titulo}</h1>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
      {direita}
    </header>
  );
}
