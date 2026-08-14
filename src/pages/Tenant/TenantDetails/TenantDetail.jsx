import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuArrowLeft, LuPlus, LuUsers, LuEye, LuEyeOff } from "react-icons/lu";
import { useTenants } from "../../../context/TenantContext";
import TenantMembers from "./TenantMembers.jsx";
import Button from "../../../common/Button/Button.jsx";
import Toggle from "../../../common/Toggle/Toggle.jsx";
import Modal from "../../../common/Modal/Modal.jsx";
import ErrorMessage from "../../../common/Error/Error.jsx";

const TABS = ["Details", "Members", "Settings"];

export default function TenantDetail() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const { getTenantById,deleteTenant } = useTenants();
  const tenant = getTenantById(tenantId);

  const [activeTab, setActiveTab] = useState("Details");
  const [confirmModalOpen, setConfirmModalOpen] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const data = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "legalName",
      label: "Legal Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "mobile",
      label: "Mobile",
    },
    {
      key: "address",
      label: "Address",
    },
    {
      key: "city",
      label: "City",
    },
    {
      key: "state",
      label: "State",
    },
    {
      key: "pincode",
      label: "Pincode",
    },
    {
      key: "country",
      label: "Country",
    },
  ];


  async function handleDelete(e){
    e.preventDefault();
    setApiError("");
    setDeleteLoading(true);
    const result = await deleteTenant(confirmModalOpen?.id);
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
    setConfirmModalOpen(null);
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
        <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
          <p>Tenant not found</p>
        </div>
      </div>
    );
  }

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

      <div className="flex items-center gap-4">
        <div className="relative rounded-full bg-primary-light text-primary-text flex items-center justify-center font-semibold overflow-hidden w-14 h-14 text-xl">
          {tenant.name.charAt(0).toUpperCase()}
          {tenant.logoUrl && (
            <img
              src={tenant.logoUrl}
              alt={tenant.name}
              // Presigned URLs expire — fall back to the initial behind it.
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h1 className="text-[22px]">{tenant.name}</h1>
          <div className="flex items-center gap-[14px] mt-1 text-text-secondary text-[13px]">
            <span>{tenant.email}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`
              relative
              -mb-px
              rounded-t-lg
              px-4
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-200
              ease-in-out
              cursor-pointer
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary/30
              ${
                isActive
                  ? "bg-primary-light text-primary-text"
                  : "text-text-secondary hover:text-text-primary"
              }
            `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeTab === "Details" && (
        <div className="bg-surface">
          <h2>Basic Information</h2>
          <p className="text-text-secondary text-[13px]">
            Basic information of the tenant
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-[18px] mt-5">
            {data.map((item, idx) => (
              <div className="flex flex-col gap-1" key={idx}>
                <span className="text-xs font-semibold uppercase tracking-[0.04em] text-primary">
                  {item.label}
                </span>
                <p className="text-sm text-text-primary">
                  {tenant[item.key] ? tenant[item.key] : "-"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Members" && <TenantMembers id={tenant?.id} />}

      {activeTab === "Settings" && (
          <div>
            <br />
            <div className="w-full flex gap-4 justify-between items-center bg-bg px-4 py-4 rounded-lg">
              <div>
                <p className="text-xl font-medium">Delete Account</p>
                <p className="text-sm">Remove this tenant</p>
              </div>
              <div>
                <Button onClick={() => setConfirmModalOpen(tenant)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
      )}
      {confirmModalOpen?.id && <Modal title="Delete Tenant" onClose={() => setConfirmModalOpen(false)} width={300}>
        <div className="w-full flex flex-col gap-4">
          <ErrorMessage message={apiError} />
          <p>Are you sure you want to delete ?</p>
          <div className="w-full flex gap-1 items-center justify-end">
            <Button variant="primary" onClick={(e) => handleDelete(e)} loading={deleteLoading} disabled={deleteLoading}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>}
    </div>
  );
}
