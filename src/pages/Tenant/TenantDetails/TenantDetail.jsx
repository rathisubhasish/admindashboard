import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LuArrowLeft, LuPlus, LuUsers, LuEye, LuEyeOff } from 'react-icons/lu'
import { useTenants } from '../../../context/TenantContext'
import * as tenantService from '../../../services/tenantService'
import TeamMemberFormModal from '../../../components/TeamMemberFormModal'
import Table from '../../../common/Table/Table'

const TABS = ['Details', 'Members']

const MEMBER_HEADERS = ['ID', 'Tenant ID', 'Email', 'Mobile', 'Password', 'Role', 'Created At', 'Last Login At']

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString()
}

export default function TenantDetail() {
  const { tenantId } = useParams()
  const navigate = useNavigate()
  const { getTenantById } = useTenants()
  const tenant = getTenantById(tenantId)

  const [activeTab, setActiveTab] = useState('Details')
  const [members, setMembers] = useState([])
  const [isMembersLoading, setMembersLoading] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)
  const [visiblePasswordIds, setVisiblePasswordIds] = useState(() => new Set())

  useEffect(() => {
    if (!tenant) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- idiomatic loading-flag reset before an async fetch
    setMembersLoading(true)
    tenantService.getMembers(tenant.id).then((data) => {
      setMembers(data)
      setMembersLoading(false)
    })
  }, [tenant])

  async function handleAddMember(form) {
    const member = await tenantService.createMember(tenant.id, form)
    setMembers((prev) => [...prev, member])
    setModalOpen(false)
  }

  function togglePasswordVisibility(memberId) {
    setVisiblePasswordIds((prev) => {
      const next = new Set(prev)
      if (next.has(memberId)) next.delete(memberId)
      else next.add(memberId)
      return next
    })
  }

  if (!tenant) {
    return (
      <div className="flex flex-col gap-5">
        <button
          type="button"
          className="inline-flex items-center gap-2 self-start bg-transparent border-none text-text-secondary text-sm font-semibold cursor-pointer py-1 px-0 hover:text-text-primary"
          onClick={() => navigate('/tenants')}
        >
          <LuArrowLeft size={16} />
          Back to Tenants
        </button>
        <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
          <p>Tenant not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        className="inline-flex items-center gap-2 self-start bg-transparent border-none text-text-secondary text-sm font-semibold cursor-pointer py-1 px-0 hover:text-text-primary"
        onClick={() => navigate('/tenants')}
      >
        <LuArrowLeft size={16} />
        Back to Tenants
      </button>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary-light text-primary-text flex items-center justify-center font-semibold overflow-hidden w-14 h-14 text-xl">
          {tenant.logoPreview ? (
            <img src={tenant.logoPreview} alt={tenant.name} className="w-full h-full object-cover" />
          ) : (
            tenant.name.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <h1 className="text-[22px]">{tenant.name}</h1>
          <div className="flex items-center gap-[14px] mt-1 text-text-secondary text-[13px]">
            <span>{tenant.email}</span>
            {tenant.mobile && <span>{tenant.mobile}</span>}
            {tenant.city && <span>{tenant.city}{tenant.state ? `, ${tenant.state}` : ''}</span>}
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`bg-transparent border-none py-[10px] px-4 text-sm font-semibold cursor-pointer border-b-[3px] -mb-px ${activeTab === tab ? 'text-primary-text border-primary-text' : 'text-text-secondary border-transparent hover:text-text-primary'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Details' && (
        <div className="bg-surface border border-border rounded-xl shadow-card p-6">
          <h2>Basic Information</h2>
          <p className="text-text-secondary text-[13px] mt-1">Basic information of the tenant</p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-[18px] mt-5">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.04em] text-text-secondary">Name</span>
              <p className="text-sm text-text-primary">{tenant.name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.04em] text-text-secondary">Legal Name</span>
              <p className="text-sm text-text-primary">{tenant.legalName || '—'}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.04em] text-text-secondary">Email</span>
              <p className="text-sm text-text-primary">{tenant.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.04em] text-text-secondary">Mobile</span>
              <p className="text-sm text-text-primary">{tenant.mobile || '—'}</p>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.04em] text-text-secondary">Address</span>
              <p className="text-sm text-text-primary">{tenant.address || '—'}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.04em] text-text-secondary">City</span>
              <p className="text-sm text-text-primary">{tenant.city || '—'}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.04em] text-text-secondary">State</span>
              <p className="text-sm text-text-primary">{tenant.state || '—'}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.04em] text-text-secondary">Pincode</span>
              <p className="text-sm text-text-primary">{tenant.pincode || '—'}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.04em] text-text-secondary">Country</span>
              <p className="text-sm text-text-primary">{tenant.country || '—'}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Members' && (
        <div className="bg-surface border border-border rounded-xl shadow-card p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2>Members</h2>
              <p className="text-text-secondary text-[13px] mt-1">Team members who can access this tenant</p>
            </div>
            <button type="button" className="btn-primary" onClick={() => setModalOpen(true)}>
              <LuPlus size={16} />
              Add Team Member
            </button>
          </div>

          {isMembersLoading ? (
            <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
              <p>Loading members…</p>
            </div>
          ) : members.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
              <LuUsers size={28} className="text-primary-text mb-1" />
              <p className="text-text-primary font-semibold">No team members yet</p>
              <span className="text-[13px]">Click "Add Team Member" to add the first one.</span>
            </div>
          ) : (
            <Table
              headers={MEMBER_HEADERS}
              rows={members.map((member) => [
                member.id,
                member.tenant_id,
                member.email,
                member.mobile || '—',
                <div className="flex items-center gap-2">
                  <span>{visiblePasswordIds.has(member.id) ? member.password : '••••••••'}</span>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center bg-transparent border-none text-text-secondary cursor-pointer p-[2px] hover:text-text-primary"
                    onClick={() => togglePasswordVisibility(member.id)}
                  >
                    {visiblePasswordIds.has(member.id) ? <LuEyeOff size={14} /> : <LuEye size={14} />}
                  </button>
                </div>,
                member.role,
                formatDate(member.created_at),
                formatDate(member.last_login_at),
              ])}
            />
          )}
        </div>
      )}

      {isModalOpen && (
        <TeamMemberFormModal onClose={() => setModalOpen(false)} onSubmit={handleAddMember} />
      )}
    </div>
  )
}
