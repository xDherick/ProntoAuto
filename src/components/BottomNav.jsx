import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', rotulo: 'Início', fim: true },
  { to: '/os/318', rotulo: 'O.S.' },
  { to: '/checklist/318', rotulo: 'Checklist' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.fim} className={({ isActive }) => (isActive ? 'ativo' : '')}>
          {l.rotulo}
        </NavLink>
      ))}
      <NavLink to="/login">Equipe</NavLink>
    </nav>
  );
}
