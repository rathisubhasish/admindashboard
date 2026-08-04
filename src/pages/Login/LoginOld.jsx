import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LuBox, LuLayoutDashboard, LuBuilding2, LuUsers, LuSettings } from 'react-icons/lu'
import { useAuth } from '../../context/AuthContext'

const CHART_BARS = [40, 65, 50, 80, 60, 90, 70]

export default function LoginOld() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setError('')
    login(email)
    navigate('/', { replace: true })
  }

  const mockSidebarItemBase = 'flex items-center gap-1.5 px-2 py-1.5 rounded-md text-text-secondary'
  const mockSidebarItemActive = 'bg-primary-light text-primary-text'

  return (
    <div className="min-h-[100svh] flex">
      <div className="max-[860px]:hidden flex-[1.1] flex flex-col justify-between gap-8 px-14 py-10 text-white bg-[linear-gradient(160deg,#3c2f8f_0%,#6d5ef7_55%,#8b7bfa_100%)]">
        <div className="flex items-center gap-2 font-bold text-lg">
          <LuBox size={26} />
          <span>Admin</span>
        </div>

        <div className="flex-1 flex self-center w-full max-w-[460px] min-h-[260px] bg-[#f7faff] rounded-[14px] shadow-[0_20px_45px_rgba(15,23,42,0.35)] overflow-hidden">
          <div className="w-[84px] shrink-0 bg-white border-r border-border px-2.5 py-4 flex flex-col gap-2.5">
            <div className={`${mockSidebarItemBase} ${mockSidebarItemActive}`}>
              <LuLayoutDashboard size={14} />
              <span className="block w-7 h-1.5 rounded bg-[#dde6f3]" />
            </div>
            <div className={mockSidebarItemBase}>
              <LuBuilding2 size={14} />
              <span className="block w-7 h-1.5 rounded bg-[#dde6f3]" />
            </div>
            <div className={mockSidebarItemBase}>
              <LuUsers size={14} />
              <span className="block w-7 h-1.5 rounded bg-[#dde6f3]" />
            </div>
            <div className={mockSidebarItemBase}>
              <LuSettings size={14} />
              <span className="block w-7 h-1.5 rounded bg-[#dde6f3]" />
            </div>
          </div>

          <div className="flex-1 px-5 py-[18px] flex flex-col gap-4">
            <span className="block w-[90px] h-2.5 rounded bg-[#dde6f3]" />
            <div className="flex gap-2.5">
              <div className="flex-1 h-[34px] rounded-lg bg-primary-light" />
              <div className="flex-1 h-[34px] rounded-lg bg-primary-light" />
              <div className="flex-1 h-[34px] rounded-lg bg-primary-light" />
            </div>
            <div className="flex-1 flex items-end gap-2 min-h-[70px] pt-2 border-t border-border">
              {CHART_BARS.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t bg-[linear-gradient(180deg,#a99bfb,#6d5ef7)]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white text-[22px] mb-1.5">Admin Dashboard</h2>
          <p className="text-white/75">Manage your tenants in one place</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-surface p-6">
        <div className="w-full max-w-[360px]">
          <h1 className="text-[26px] mb-1.5">Welcome back</h1>
          <p className="text-text-secondary mb-7">Sign in to manage your tenants</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1.5 text-[13px] font-medium text-text-secondary">
              <span>Email</span>
              <input
                className="border border-border rounded-lg py-2.5 px-3 text-sm text-text-primary bg-bg outline-none transition-colors duration-150 focus:border-primary-text focus:bg-surface"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[13px] font-medium text-text-secondary">
              <span>Password</span>
              <input
                className="border border-border rounded-lg py-2.5 px-3 text-sm text-text-primary bg-bg outline-none transition-colors duration-150 focus:border-primary-text focus:bg-surface"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            {error && <p className="text-danger text-[13px] m-0">{error}</p>}

            <button
              type="submit"
              className="mt-2 bg-accent text-white border-none rounded-lg py-[11px] px-4 text-sm font-semibold cursor-pointer transition-colors duration-150 hover:bg-accent-hover"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
