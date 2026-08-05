import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuPlus, LuBuilding2, LuEye, LuSearch } from 'react-icons/lu'
import TenantFormModal from '../../components/TenantFormModal'
import Table from '../../common/Table/Table'
import { useTenants } from '../../context/TenantContext'

const TENANT_HEADERS = [
  'Logo',
  'Name',
  'Legal Name',
  'Mobile',
  'Email',
  'Address',
  'City',
  'State',
  'Pincode',
  'Country',
]

export default function Tenants() {
  const { tenants, isLoading, addTenant } = useTenants()
  const [isModalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredTenants = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return tenants
    return tenants.filter((tenant) =>
      [tenant.name, tenant.legalName, tenant.email].some((value) => value?.toLowerCase().includes(term))
    )
  }, [tenants, search])

  async function handleAddTenant(form) {
    await addTenant(form)
    setModalOpen(false)
  }

  return (
    <div>
      <h1 className="text-2xl">Tenants</h1>
      <p className="text-text-secondary mt-1">Manage all tenants in your workspace</p>

      <div className="flex items-center justify-between mt-6 mb-4">
        <div className="relative w-full max-w-[320px]">
          <LuSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tenants"
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary outline-none transition-colors duration-150 focus:border-primary-text"
          />
        </div>
        <span className="text-sm text-text-secondary">{filteredTenants.length} Tenants</span>
      </div>

      <button
        type="button"
        className="btn-primary inline-flex items-center gap-2 mb-5"
        onClick={() => setModalOpen(true)}
      >
        <LuPlus size={16} />
        Add Tenant
      </button>

      {isLoading ? (
        <div className="bg-surface border border-border rounded-xl shadow-card flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
          <p>Loading tenants…</p>
        </div>
      ) : filteredTenants.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl shadow-card flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
          <LuBuilding2 size={28} className="text-primary-text mb-1" />
          <p className="text-text-primary font-semibold">No tenants found</p>
          <span className="text-[13px]">
            {tenants.length === 0 ? 'Click "Add Tenant" to create the first one.' : 'Try a different search term.'}
          </span>
        </div>
      ) : (
        <Table
          headers={TENANT_HEADERS}
          rows={filteredTenants.map((tenant) => [
            <div className="w-8 h-8 rounded-full bg-primary-light text-primary-text flex items-center justify-center font-semibold text-[13px] overflow-hidden">
              {tenant.logoPreview ? (
                <img src={tenant.logoPreview} alt={tenant.name} className="w-full h-full object-cover" />
              ) : (
                tenant.name.charAt(0).toUpperCase()
              )}
            </div>,
            tenant.name,
            tenant.legalName || '—',
            tenant.mobile || '—',
            tenant.email,
            tenant.address || '—',
            tenant.city || '—',
            tenant.state || '—',
            tenant.pincode || '—',
            tenant.country || '—',
          ])}
          actions={(_row, index) => (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 bg-surface border border-border rounded-lg px-3 py-[7px] text-[13px] font-medium text-text-primary cursor-pointer transition-colors duration-150 hover:bg-primary-light"
              onClick={() => navigate(`/tenants/${filteredTenants[index].id}`)}
            >
              <LuEye size={14} />
              View
            </button>
          )}
        />
      )}

      {isModalOpen && (
        <TenantFormModal onClose={() => setModalOpen(false)} onSubmit={handleAddTenant} />
      )}
    </div>
  )
}
