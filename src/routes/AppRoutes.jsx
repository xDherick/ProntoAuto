import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import NovaOSPage from '../pages/NovaOSPage.jsx';
import OSDetalhePage from '../pages/OSDetalhePage.jsx';
import ChecklistPage from '../pages/ChecklistPage.jsx';
import PortalClientePage from '../pages/PortalClientePage.jsx';

// Rotas da oficina (protegidas por login, RF22) e rota publica do cliente (token, RF35).
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/view/:token" element={<PortalClientePage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/os/nova" element={<NovaOSPage />} />
        <Route path="/os/:id" element={<OSDetalhePage />} />
        <Route path="/checklist/:id" element={<ChecklistPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
