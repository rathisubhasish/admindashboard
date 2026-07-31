import { LuBuilding2, LuUsers, LuActivity } from 'react-icons/lu'

const STATS = [
  { label: 'Total Tenants', value: '0', icon: LuBuilding2 },
  { label: 'Active Users', value: '0', icon: LuUsers },
  { label: 'Recent Activity', value: '0', icon: LuActivity },
]

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl">Dashboard</h1>
      <p className="mt-1 text-text-secondary">Overview of your workspace</p>

      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div
            className="flex items-center gap-[14px] rounded-xl border border-border bg-surface px-5 py-[18px] shadow-card"
            key={label}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-primary-light text-primary-text">
              <Icon size={20} />
            </div>
            <div>
              <p className="text-xl font-bold text-text-primary">{value}</p>
              <p className="mt-0.5 text-[13px] text-text-secondary">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
