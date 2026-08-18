import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuPlus, LuBuilding2, LuEye, LuSearch } from "react-icons/lu";
import TenantFormModal from "../../components/TenantFormModal";
import Table from "../../common/Table/Table";
import { useTenants } from "../../context/TenantContext";
import Button from "../../common/Button/Button.jsx";
import TenantCardView from "./TenantCardView.jsx";
import { TbTableImport } from "react-icons/tb";
import { BiCard } from "react-icons/bi";
import TenantCardSkeleton from "../../components/TenantCard/TenantCardSkeleton.jsx";
import TableSkeleton from "../../common/Table/TableSkeleton.jsx";
import TableActions from "../../common/TableActions/TableActions.jsx";
import Modal from "../../common/Modal/Modal.jsx";
import ErrorMessage from "../../common/Error/Error.jsx";

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
  "Verified",
];

export default function Tenants() {
  const { tenants, isLoading, error, refreshTenants, deleteTenant } =
    useTenants();
  const [isModalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [search, setSearch] = useState("");
  const [cardView, setCardView] = useState(true);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredTenants = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return tenants;
    return tenants.filter((tenant) =>
      [tenant.name, tenant.legalName, tenant.email].some((value) =>
        value?.toLowerCase().includes(term),
      ),
    );
  }, [tenants, search]);

  async function handleDelete(e) {
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
    refreshTenants();
  }

  useEffect(() => {
    refreshTenants();
  }, [refreshTenants]);

  return (
    <div className="relative mb-24">
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
          {filteredTenants.length ? (
            <p className=" text-text-secondary">
              {filteredTenants.length} Tenants
            </p>
          ) : (
            ""
          )}
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
        cardView ? (
          <TenantCardSkeleton count={8} />
        ) : (
          <TableSkeleton />
        )
      ) : error ? (
        <div className="bg-surface rounded-xl flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
          <LuBuilding2 size={28} className="text-primary-text mb-1" />
          <p className="text-text-primary font-semibold">
            Failed to load tenants
          </p>

          <span className="text-[13px]">Please try again later.</span>
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
            <TenantCardView filteredTenants={filteredTenants ?? []} setIsEditModalOpen={setIsEditModalOpen} setConfirmModalOpen={setConfirmModalOpen}/>
          ) : (
            <div className="w-full min-w-0 max-w-full overflow-x-auto relative">
              <Table
                headers={TENANT_HEADERS}
                data={filteredTenants}
                rows={filteredTenants.map((tenant) => [
                  <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-light text-[13px] font-semibold text-primary-text">
                    {tenant.name.charAt(0).toUpperCase()}
                    {tenant.logoUrl && (
                      <img
                        src={tenant.logoUrl}
                        alt={tenant.name}
                        // Presigned URLs expire — fall back to the initial behind it.
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
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
                  (tenant.verified ? "true" : "false") || "—",
                ])}
                actions={(tenant, index) => (
                  <TableActions
                    actions={[
                      {
                        type: "view",
                        label: "View",
                        onClick: () =>
                          navigate(`/tenants/${filteredTenants[index].id}`),
                      },
                      {
                        type: "edit",
                        label: "Edit",
                        onClick: () => setIsEditModalOpen(tenant),
                      },
                      {
                        type: "delete",
                        label: "Delete",
                        onClick: () => setConfirmModalOpen(tenant),
                      },
                    ]}
                  />
                )}
              />
            </div>
          )}
        </div>
      )}

      {isModalOpen && <TenantFormModal onClose={() => setModalOpen(false)} />}
      {confirmModalOpen?.id && (
        <Modal
          title="Delete tenant"
          onClose={() => setConfirmModalOpen(false)}
          width={300}
        >
          <div className="w-full flex flex-col gap-4">
            <ErrorMessage message={apiError} />
            <p>Are you sure you want to delete ?</p>
            <div className="w-full flex gap-1 items-center justify-end">
              <Button
                variant="primary"
                onClick={(e) => handleDelete(e)}
                loading={deleteLoading}
                disabled={deleteLoading}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isEditModalOpen && <TenantFormModal onClose={() => setIsEditModalOpen(null)} tenantData={isEditModalOpen} type="edit" />}
    </div>
  );
}
