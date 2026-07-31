import { useState } from 'react'
import { LuX, LuUpload } from 'react-icons/lu'

const EMPTY_FORM = {
  name: '',
  legalName: '',
  logoFile: null,
  logoPreview: '',
  mobile: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  country: '',
}

export default function TenantFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleLogoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    updateField('logoFile', file)
    updateField('logoPreview', URL.createObjectURL(file))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
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
          <h2>Add Tenant</h2>
          <button
            type="button"
            className="border-none bg-primary-light text-text-secondary w-[30px] h-[30px] rounded-[8px] flex items-center justify-center cursor-pointer hover:text-text-primary"
            onClick={onClose}
          >
            <LuX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-[8px] mb-[20px]">
            <label className="w-[72px] h-[72px] rounded-full border-[1.5px] border-dashed border-border bg-primary-light text-primary-text flex items-center justify-center cursor-pointer overflow-hidden">
              {form.logoPreview ? (
                <img src={form.logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
              ) : (
                <LuUpload size={20} />
              )}
              <input type="file" accept="image/*" onChange={handleLogoChange} hidden />
            </label>
            <span className="text-[12px] text-text-secondary">Upload logo</span>
          </div>

          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[14px]">
            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>Name *</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>Legal Name</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                value={form.legalName}
                onChange={(e) => updateField('legalName', e.target.value)}
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
              <span>Email *</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary col-span-full">
              <span>Address</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>City</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>State</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                value={form.state}
                onChange={(e) => updateField('state', e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>Pincode</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                value={form.pincode}
                onChange={(e) => updateField('pincode', e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
              <span>Country</span>
              <input
                className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
                value={form.country}
                onChange={(e) => updateField('country', e.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-end gap-[10px] mt-[24px]">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Tenant
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
