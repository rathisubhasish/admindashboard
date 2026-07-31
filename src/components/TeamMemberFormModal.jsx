import { useState } from 'react'
import { LuX } from 'react-icons/lu'

const ROLES = ['Manager', 'Finance', 'Legal Auth']

const EMPTY_FORM = {
  email: '',
  mobile: '',
  password: '',
  role: ROLES[0],
}

export default function TeamMemberFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) return
    onSubmit(form)
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-[20px] z-50 bg-[rgba(15,23,42,0.4)]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto bg-surface rounded-[14px] shadow-card pt-[24px] px-[28px] pb-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-[20px]">
          <h2>Add Team Member</h2>
          <button
            type="button"
            className="border-none bg-primary-light text-text-secondary w-[30px] h-[30px] rounded-[8px] flex items-center justify-center cursor-pointer hover:text-text-primary"
            onClick={onClose}
          >
            <LuX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[14px]">
            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>Email *</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>Mobile</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                value={form.mobile}
                onChange={(e) => updateField('mobile', e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>Password *</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                type="password"
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>Role</span>
              <select
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                value={form.role}
                onChange={(e) => updateField('role', e.target.value)}
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-[10px] mt-[24px]">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
