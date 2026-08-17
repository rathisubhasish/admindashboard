import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

import { useTenants } from "../../../context/TenantContext";
import Button from "../../../common/Button/Button.jsx";
import Modal from "../../../common/Modal/Modal.jsx";
import ErrorMessage from "../../../common/Error/Error.jsx";

export default function TenantSettings() {
  const { tenantId } = useParams();
  const navigate = useNavigate();

  const { getTenantById, deleteTenant } = useTenants();

  const tenant = getTenantById(tenantId);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  async function handleDelete(e) {
    e.preventDefault();

    setApiError("");
    setDeleteLoading(true);

    const result = await deleteTenant(tenant?.id);

    if (!result.success) {
      const fieldErrors = result.error?.errors;

      if (Object.keys(fieldErrors || {}).length > 0) {
        const message = Object.entries(fieldErrors)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");

        setApiError(message);
      } else {
        setApiError(result.error?.message || "Failed to delete tenant");
      }

      setDeleteLoading(false);
      return;
    }

    setDeleteLoading(false);
    setConfirmModalOpen(false);

    navigate("/tenants");
  }

  if (!tenant) {
    return (
      <div className="flex flex-col gap-5">
        <button
          type="button"
          className="inline-flex items-center gap-2 self-start bg-transparent border-none text-text-secondary text-sm font-semibold cursor-pointer py-1 px-0 hover:text-text-primary"
          onClick={() => navigate("/tenants")}
        >
          <LuArrowLeft size={16} />
          Back to Tenants
        </button>

        <div className="flex items-center justify-center py-16 text-text-secondary">
          Tenant not found
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-[22px]">Settings</h1>

        <p className="text-text-secondary text-[13px] mt-1">
          Manage settings for {tenant.name}
        </p>
      </div>

      <div className="w-full flex gap-4 justify-between items-center bg-bg px-4 py-4 rounded-lg">
        <div>
          <p className="text-xl font-medium">Delete Account</p>

          <p className="text-sm text-text-secondary">Remove this tenant</p>
        </div>

        <Button onClick={() => setConfirmModalOpen(true)}>Delete</Button>
      </div>

      {confirmModalOpen && (
        <Modal
          title="Delete Tenant"
          onClose={() => setConfirmModalOpen(false)}
          width={300}
        >
          <div className="w-full flex flex-col gap-4">
            <ErrorMessage message={apiError} />

            <p>Are you sure you want to delete?</p>

            <div className="w-full flex gap-1 items-center justify-end">
              <Button
                variant="primary"
                onClick={handleDelete}
                loading={deleteLoading}
                disabled={deleteLoading}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
