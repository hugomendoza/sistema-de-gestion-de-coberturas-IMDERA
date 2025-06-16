import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { LoginPage } from './auth/pages/LoginPage'
import { PromotorClassesPage } from './dashboard/pages/PromotorClassesPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      {/* Auth Routes */}
      <Routes>
        <Route index path="/auth/login" element={<LoginPage />} />
      </Routes>
      {/* Dashboard Routes */}
      <Routes>
        <Route path="/dashboard" element={<PromotorClassesPage />} />
      </Routes>

      {/* Redirects */}
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
