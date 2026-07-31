import { NavLink, useNavigate } from 'react-router-dom'
import { LuBox, LuLayoutDashboard, LuBuilding2, LuSettings, LuLogOut } from 'react-icons/lu'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LuLayoutDashboard, end: true },
  { to: '/tenants', label: 'Tenants', icon: LuBuilding2, end: false },
]

const SIDEBAR_LINK_BASE =
  'flex items-center gap-3 py-[10px] px-3 rounded-lg text-text-secondary no-underline text-sm font-medium border-0 bg-transparent w-full text-left cursor-pointer font-[inherit] transition-colors duration-150 ease-in-out'

const SIDEBAR_LINK_HOVER = 'hover:bg-primary-light hover:text-text-primary'

const SIDEBAR_LINK_ACTIVE = 'bg-primary-light text-primary-text font-semibold'

const ICON_BUTTON =
  'flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary bg-surface cursor-pointer transition-colors duration-150 ease-in-out hover:bg-primary-light hover:text-primary-text'

export default function Sidebar() {
  const { email, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="w-60 shrink-0 bg-surface border-r border-border flex flex-col py-5 px-4 h-[100svh] sticky top-0">
      <div className="flex items-center gap-2 font-bold text-[17px] text-text-primary px-[10px]">
        <LuBox size={22} className="text-primary-text" />
        <span>Admin</span>
      </div>
      {email && <p className="mt-1 px-[10px] text-[13px] text-text-secondary truncate">{email}</p>}

      <div className="flex items-center gap-2 px-[10px] pt-4 pb-6">
        <NavLink to="/settings" className={ICON_BUTTON} aria-label="Settings">
          <LuSettings size={16} />
        </NavLink>
        <button type="button" className={ICON_BUTTON} onClick={handleLogout} aria-label="Logout">
          <LuLogOut size={16} />
        </button>
      </div>

      <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-text-secondary/70">
        Menu
      </p>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `${SIDEBAR_LINK_BASE} ${SIDEBAR_LINK_HOVER}${isActive ? ` ${SIDEBAR_LINK_ACTIVE}` : ''}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
