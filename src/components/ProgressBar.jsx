export default function ProgressBar({ valor, atrasada = false }) {
  return (
    <div className={`progress ${atrasada ? 'atrasada' : ''}`} role="progressbar" aria-valuenow={valor} aria-valuemin={0} aria-valuemax={100}>
      <div style={{ width: `${valor}%` }} />
    </div>
  );
}
