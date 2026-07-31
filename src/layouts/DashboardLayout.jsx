import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout() {
  return (
    <div className="flex min-h-svh bg-bg">
      <Sidebar />
      <main className="flex-1 py-8 px-10 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
