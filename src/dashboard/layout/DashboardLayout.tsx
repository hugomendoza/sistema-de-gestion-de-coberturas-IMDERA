import { Outlet } from 'react-router'
import { Aside } from '../components/aside/aside'

export function DashboardLayout() {
  return (
    <div className="flex min-h-dvh bg-slate-800">
      <Aside />
      <div className="bg-slate-100 w-full">
        <Outlet />
      </div>
    </div>
  )
}
