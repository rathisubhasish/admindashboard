import { useState } from 'react'
import { LuUpload } from 'react-icons/lu'
import Modal from '../common/Modal/Modal'
import Input from '../common/Input/Input'

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
    <Modal title="Add Tenant" onClose={onClose}>
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
          <Input label="Name" required value={form.name} onChange={(e) => updateField('name', e.target.value)} />
          <Input label="Legal Name" value={form.legalName} onChange={(e) => updateField('legalName', e.target.value)} />
          <Input label="Mobile" value={form.mobile} onChange={(e) => updateField('mobile', e.target.value)} />
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
          <Input
            label="Address"
            containerClassName="col-span-full"
            value={form.address}
            onChange={(e) => updateField('address', e.target.value)}
          />
          <Input label="City" value={form.city} onChange={(e) => updateField('city', e.target.value)} />
          <Input label="State" value={form.state} onChange={(e) => updateField('state', e.target.value)} />
          <Input label="Pincode" value={form.pincode} onChange={(e) => updateField('pincode', e.target.value)} />
          <Input label="Country" value={form.country} onChange={(e) => updateField('country', e.target.value)} />
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
    </Modal>
  )
}
