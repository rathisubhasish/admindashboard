import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuArrowLeft, LuPlus, LuUsers, LuEye, LuEyeOff } from "react-icons/lu";
import { useTenants } from "../../../context/TenantContext";
import * as tenantService from "../../../services/tenantService";
import TeamMemberFormModal from "../../../components/TeamMemberFormModal";
import Table from "../../../common/Table/Table";
import Button from "../../../common/Button/Button.jsx";

const TABS = ["Details", "Members"];

const MEMBER_HEADERS = [
  "ID",
  "Tenant ID",
  "Email",
  "Mobile",
  "Password",
  "Role",
  "Created At",
  "Last Login At",
];

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

export default function TenantDetail() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const { getTenantById } = useTenants();
  const tenant = getTenantById(tenantId);

  const [activeTab, setActiveTab] = useState("Details");
  const [members, setMembers] = useState([]);
  const [isMembersLoading, setMembersLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [visiblePasswordIds, setVisiblePasswordIds] = useState(() => new Set());

  useEffect(() => {
    if (!tenant) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- idiomatic loading-flag reset before an async fetch
    setMembersLoading(true);
    tenantService.getMembers(tenant.id).then((data) => {
      setMembers(data);
      setMembersLoading(false);
    });
  }, [tenant]);

  async function handleAddMember(form) {
    const member = await tenantService.createMember(tenant.id, form);
    setMembers((prev) => [...prev, member]);
    setModalOpen(false);
  }

  function togglePasswordVisibility(memberId) {
    setVisiblePasswordIds((prev) => {
      const next = new Set(prev);
      if (next.has(memberId)) next.delete(memberId);
      else next.add(memberId);
      return next;
    });
  }

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

      {activeTab === "Members" && (
        <>
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2>Members</h2>
              <p className="text-text-secondary text-[13px] mt-1">
                Team members who can access this tenant
              </p>
            </div>
            <Button
              variant="primary"
              shape="pill"
              className="
                !hidden
                !px-4 !py-2
                shadow
                sm:!flex
                hover:scale-[1.02] hover:shadow
                active:scale-95
                max-sm:left-4 max-sm:right-4
              "
              onClick={() => setModalOpen(true)}
            >
              <LuPlus size={18} strokeWidth={2.5} />
              <span>Add Team Member</span>
            </Button>
          </div>
          <div className="bg-surface border border-border rounded-xl shadow-card p-6">
            {isMembersLoading ? (
              <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
                <p>Loading members…</p>
              </div>
            ) : members.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
                <LuUsers size={28} className="text-primary-text mb-1" />
                <p className="text-text-primary font-semibold">
                  No team members yet
                </p>
                <span className="text-[13px]">
                  Click "Add Team Member" to add the first one.
                </span>
              </div>
            ) : (
              <Table
                headers={MEMBER_HEADERS}
                rows={members.map((member) => [
                  member.id,
                  member.tenant_id,
                  member.email,
                  member.mobile || "—",
                  <div className="flex items-center gap-2">
                    <span>
                      {visiblePasswordIds.has(member.id)
                        ? member.password
                        : "••••••••"}
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center bg-transparent border-none text-text-secondary cursor-pointer p-[2px] hover:text-text-primary"
                      onClick={() => togglePasswordVisibility(member.id)}
                    >
                      {visiblePasswordIds.has(member.id) ? (
                        <LuEyeOff size={14} />
                      ) : (
                        <LuEye size={14} />
                      )}
                    </button>
                  </div>,
                  member.role,
                  formatDate(member.created_at),
                  formatDate(member.last_login_at),
                ])}
              />
            )}
          </div>
        </>
      )}

      <Button
        variant="primary"
        shape="pill"
        className="
                !fixed bottom-5 right-5 z-40
                !px-5 !py-3
                shadow-lg
                sm:hidden
                hover:scale-[1.02] hover:shadow-xl
                active:scale-95
                max-sm:left-4 max-sm:right-4
              "
        onClick={() => setModalOpen(true)}
      >
        <LuPlus size={18} strokeWidth={2.5} />
        <span>Add Team Member</span>
      </Button>

      {isModalOpen && (
        <TeamMemberFormModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddMember}
        />
      )}
    </div>
  );
}
