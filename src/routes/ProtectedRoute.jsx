import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService.js';

// Bloqueia as telas da oficina quando nao ha sessao (RNF05: isolamento por oficina).
export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
