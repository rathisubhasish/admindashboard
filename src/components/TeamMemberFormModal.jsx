import { useState } from "react";
import Modal from "../common/Modal/Modal";
import Input from "../common/Input/Input";
import {useTenants} from "../context/TenantContext.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {tenantSchema} from "../schemas/tenant/tenantSchema.js";
import {tenantMemberSchema} from "../schemas/tenant/tenantMemberSchema.js";
import * as tenantService from "../services/tenantService";
import Button from "../common/Button/Button.jsx";
import ErrorMessage from "../common/Error/Error.jsx";

const ROLES = ["MANAGER", "FINANCE", "LEGAL", "SALES"];

const EMPTY_FORM = {
  email: "",
  mobile: "",
  password: "",
  role: ROLES[0],
};

export default function TeamMemberFormModal({ onClose, id, setNeedRefresh }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tenantMemberSchema)
  });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onFormSubmit(data) {
    const payload = {
      ...data,
      role: form.role,
    };
    const result = await tenantService.createMember(id, payload);

    if (!result) {
      setApiError(result.error?.message || "Failed to add member");
      return;
    }

    setNeedRefresh(true);
    onClose();
  }

  return (
    <Modal title="Add Team Member" onClose={onClose}>
      <div className="w-full overflow-x-hidden">
      {apiError && <ErrorMessage message={apiError} variant={"background"} />}
      <br />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="grid grid-cols-2 gap-x-[16px] gap-y-[14px]">
          <Input
              label="First Name*"
              {...register("firstName")}
              showErrorIcon={false}
              error={errors.firstName?.message}
          />
          <Input
              label="Last Name*"
              {...register("lastName")}
              showErrorIcon={false}
              error={errors.lastName?.message}
          />
          <Input
              label="Email*"
              type="email"
              {...register("email")}
              showErrorIcon={false}
              error={errors.email?.message}
          />
          <Input
              label="Mobile*"
              {...register("mobile")}
              showErrorIcon={false}
              error={errors.mobile?.message}
          />
          <Input
              label="Password*"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              showErrorIcon={false}
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
          <Button variant="primary" type="submit" disabled={isSubmitting}
                  loading={isSubmitting}>
            Add Member
          </Button>
        </div>
      </form>
      </div>
    </Modal>
  );
}
