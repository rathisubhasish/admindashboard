import { LuArrowLeft } from "react-icons/lu";
import { useTenants } from "../../../context/TenantContext";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const TABS = ["Details", "Members", "Settings"];

export default function TenantDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tenantId } = useParams();
  const { getTenantById } = useTenants();
  const tenant = getTenantById(tenantId);

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

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {TABS.map((tab) => {
          const isActive =
            (tab === "Details" &&
              location.pathname === `/tenants/${tenantId}`) ||
            (tab === "Members" &&
              location.pathname === `/tenants/${tenantId}/members`) ||
            (tab === "Settings" &&
              location.pathname === `/tenants/${tenantId}/settings`);

          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                if (tab === "Details") {
                  navigate(`/tenants/${tenantId}`);
                }

                if (tab === "Members") {
                  navigate(`/tenants/${tenantId}/members`);
                }

                if (tab === "Settings") {
                  navigate(`/tenants/${tenantId}/settings`);
                }
              }}
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

      <div>
        <Outlet context={{ tenant }}/>
      </div>
    </div>
  );
}
