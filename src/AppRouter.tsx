import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './auth/pages/LoginPage'
import { DashboardLayout } from './dashboard/layout/DashboardLayout'
import { StatsPage } from './dashboard/pages/StatsPage'
import { ClassesPage } from './dashboard/pages/ClassesPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route */}
        <Route path="/auth/login" element={<LoginPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="estadisticas" replace />} />
          <Route path="estadisticas" element={<StatsPage />} />
          <Route path="clases" element={<ClassesPage />} />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard/estadisticas" replace />} />
        <Route path="*" element={<Navigate to="/dashboard/estadisticas" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
