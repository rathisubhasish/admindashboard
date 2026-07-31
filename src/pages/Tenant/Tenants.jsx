import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuPlus, LuBuilding2, LuEye, LuSearch } from 'react-icons/lu'
import TenantFormModal from '../../components/TenantFormModal'
import { useTenants } from '../../context/TenantContext'

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

      <div className="bg-surface border border-border rounded-xl shadow-card overflow-x-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
            <p>Loading tenants…</p>
          </div>
        ) : filteredTenants.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
            <LuBuilding2 size={28} className="text-primary-text mb-1" />
            <p className="text-text-primary font-semibold">No tenants found</p>
            <span className="text-[13px]">
              {tenants.length === 0 ? 'Click "Add Tenant" to create the first one.' : 'Try a different search term.'}
            </span>
          </div>
        ) : (
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">Logo</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">Name</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">Legal Name</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">Mobile</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">Email</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">Address</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">City</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">State</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">Pincode</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">Country</th>
                <th className="text-left text-sm font-semibold text-text-primary px-4 py-4 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant, index) => (
                <tr key={tenant.id} className={index % 2 === 1 ? 'bg-bg/60' : undefined}>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">
                    <div className="w-8 h-8 rounded-full bg-primary-light text-primary-text flex items-center justify-center font-semibold text-[13px] overflow-hidden">
                      {tenant.logoPreview ? (
                        <img src={tenant.logoPreview} alt={tenant.name} className="w-full h-full object-cover" />
                      ) : (
                        tenant.name.charAt(0).toUpperCase()
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">{tenant.name}</td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">{tenant.legalName || '—'}</td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">{tenant.mobile || '—'}</td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">{tenant.email}</td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">{tenant.address || '—'}</td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">{tenant.city || '—'}</td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">{tenant.state || '—'}</td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">{tenant.pincode || '—'}</td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">{tenant.country || '—'}</td>
                  <td className="px-4 py-4 text-sm text-text-primary whitespace-nowrap">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 bg-surface border border-border rounded-lg px-3 py-[7px] text-[13px] font-medium text-text-primary cursor-pointer transition-colors duration-150 hover:bg-primary-light"
                      onClick={() => navigate(`/tenants/${tenant.id}`)}
                    >
                      <LuEye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <TenantFormModal onClose={() => setModalOpen(false)} onSubmit={handleAddTenant} />
      )}
    </div>
  )
}
