import { useState } from "react";
import Modal from "../common/Modal/Modal";
import Input from "../common/Input/Input";

const ROLES = ["Manager", "Finance", "Legal Auth"];

const EMPTY_FORM = {
  email: "",
  mobile: "",
  password: "",
  role: ROLES[0],
};

export default function TeamMemberFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) return;
    onSubmit(form);
  }

  return (
    <Modal title="Add Team Member" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-[16px] gap-y-[14px]">
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <Input
            label="Mobile"
            value={form.mobile}
            onChange={(e) => updateField("mobile", e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            required
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
          />
          <label className="flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary">
            <span>Role</span>
            <select
              className="border border-border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:border-primary-text focus:bg-surface"
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
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
    </Modal>
  );
}
