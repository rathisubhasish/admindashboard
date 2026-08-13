import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuArrowLeft, LuPlus, LuUsers, LuEye, LuEyeOff } from "react-icons/lu";
import { useTenants } from "../../../context/TenantContext";
import TenantMembers from "./TenantMembers.jsx";
import Button from "../../../common/Button/Button.jsx";
import Toggle from "../../../common/Toggle/Toggle.jsx";

const TABS = ["Details", "Members", "Settings"];

export default function TenantDetail() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const { getTenantById } = useTenants();
  const tenant = getTenantById(tenantId);

  const [activeTab, setActiveTab] = useState("Details");
  const [status, setStatus] = useState(true);

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
        <div className="rounded-full bg-primary-light text-primary-text flex items-center justify-center font-semibold overflow-hidden w-14 h-14 text-xl">
          {tenant.logoPreview ? (
            <img
              src={tenant.logoPreview}
              alt={tenant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            tenant.name.charAt(0).toUpperCase()
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
                <p className="text-xl font-medium">Disable Account</p>
                <p className="text-sm">Enable/Disable this tenant</p>
              </div>
              <div>
                <Toggle
                    variant="primary"
                    value={status}
                    onChange={setStatus}
                />
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
