import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuPlus, LuBuilding2, LuEye, LuSearch } from "react-icons/lu";
import TenantFormModal from "../../components/TenantFormModal";
import Table from "../../common/Table/Table";
import { useTenants } from "../../context/TenantContext";
import Button from "../../common/Button/Button.jsx";
import TenantCard from "../../components/TenantCard/TenantCard.jsx";
import TenantCardView from "./TenantCardView.jsx";
import { TbTableImport } from "react-icons/tb";
import { BiCard } from "react-icons/bi";

const TENANT_HEADERS = [
  "Logo",
  "Name",
  "Legal Name",
  "Mobile",
  "Email",
  "Address",
  "City",
  "State",
  "Pincode",
  "Country",
];

export default function Tenants() {
  const { tenants, isLoading, addTenant } = useTenants();
  const [isModalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cardView, setCardView] = useState(true);
  const navigate = useNavigate();

  const filteredTenants = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return tenants;
    return tenants.filter((tenant) =>
      [tenant.name, tenant.legalName, tenant.email].some((value) =>
        value?.toLowerCase().includes(term),
      ),
    );
  }, [tenants, search]);

  async function handleAddTenant(form) {
    await addTenant(form);
    setModalOpen(false);
  }

  return (
    <div className="relative">
      <h1 className="text-xl">Tenants</h1>
      <p className="text-sm text-text-secondary mt-1">
        Manage all tenants in your workspace
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full mb-6">
        <div className="relative w-full sm:max-w-[320px]">
          <LuSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tenants"
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary outline-none transition-colors duration-150 focus:border-primary-text"
          />
        </div>
        <div className="w-full flex justify-end items-center gap-6">
          <p className=" text-text-secondary">
            {filteredTenants.length} Tenants
          </p>
          <p
            className="flex items-center cursor-pointer gap-1 text-text-secondary"
            onClick={() => setCardView(!cardView)}
          >
            {cardView ? (
              <>
                <TbTableImport size={16} />
                <span>Table View</span>
              </>
            ) : (
              <>
                <BiCard size={16} />
                <span>Card View</span>
              </>
            )}
          </p>
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
            <span>Add Tenant</span>
          </Button>
        </div>
      </div>

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
        <span>Add Tenant</span>
      </Button>

      {isLoading ? (
        <div className="bg-surface border border-border rounded-xl shadow-card flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
          <p>Loading tenants…</p>
        </div>
      ) : filteredTenants.length === 0 ? (
        <div className="bg-surface rounded-xl flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary w-full">
          <LuBuilding2 size={28} className="text-primary-text mb-1" />
          <p className="text-text-primary font-semibold">No tenants found</p>
          <span className="text-[13px]">
            {tenants.length === 0
              ? 'Click "Add Tenant" to create the first one.'
              : "Try a different search term."}
          </span>
        </div>
      ) : (
        <div className="w-full min-w-0 max-w-full overflow-hidden">
          {cardView ? (
            <TenantCardView filteredTenants={filteredTenants} />
          ) : (
            <div className="w-full min-w-0 max-w-full overflow-x-auto">
              <Table
                headers={TENANT_HEADERS}
                rows={filteredTenants.map((tenant) => [
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-light text-[13px] font-semibold text-primary-text">
                    {tenant.logoPreview ? (
                      <img
                        src={tenant.logoPreview}
                        alt={tenant.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      tenant.name.charAt(0).toUpperCase()
                    )}
                  </div>,

                  tenant.name,
                  tenant.legalName || "—",
                  tenant.mobile || "—",
                  tenant.email,
                  tenant.address || "—",
                  tenant.city || "—",
                  tenant.state || "—",
                  tenant.pincode || "—",
                  tenant.country || "—",
                ])}
                actions={(_row, index) => (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-[7px] text-[13px] font-medium text-text-primary transition-colors duration-150 hover:bg-primary-light"
                    onClick={() =>
                      navigate(`/tenants/${filteredTenants[index].id}`)
                    }
                  >
                    <LuEye size={14} />
                    View
                  </button>
                )}
              />
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <TenantFormModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddTenant}
        />
      )}
    </div>
  );
}
