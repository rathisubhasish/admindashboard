import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../context/AdminContext.jsx";
import { LuBuilding2, LuEye, LuPlus, LuSearch } from "react-icons/lu";
import Button from "../../common/Button/Button.jsx";
import Table from "../../common/Table/Table.jsx";
import TableSkeleton from "../../common/Table/TableSkeleton.jsx";

const ADMIN_HEADERS = ["First Name", "Last Name", "Email"];

export default function Admins() {
  const { admins, isLoading, error } = useAdmins();
  const [isModalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredAdmins = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return admins;
    return admins.filter((admin) =>
      [admin.firstName, admin.lastName, admin.email].some((value) =>
        value?.toLowerCase().includes(term),
      ),
    );
  }, [admins, search]);

  return (
    <div className="relative">
      <h1 className="text-xl">Admins</h1>
      <p className="text-sm text-text-secondary mt-1">
        Manage all admins in your workspace
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
            placeholder="Search admins"
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary outline-none transition-colors duration-150 focus:border-primary-text"
          />
        </div>
        <div className="w-full flex justify-end items-center gap-6">
          {filteredAdmins.length ? (
            <p className=" text-text-secondary">
              {filteredAdmins.length} Admins
            </p>
          ) : (
            ""
          )}
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
            <span>Add Admin</span>
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
        <span>Add Admin</span>
      </Button>

      {isLoading ? (
        <TableSkeleton count={8} />
      ) : error ? (
        <div className="bg-surface rounded-xl flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
          <LuBuilding2 size={28} className="text-primary-text mb-1" />
          <p className="text-text-primary font-semibold">
            Failed to load tenants
          </p>

          <span className="text-[13px]">Please try again later.</span>
        </div>
      ) : filteredAdmins.length === 0 ? (
        <div className="bg-surface rounded-xl flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary w-full">
          <LuBuilding2 size={28} className="text-primary-text mb-1" />
          <p className="text-text-primary font-semibold">No admins found</p>
          <span className="text-[13px]">
            {admins.length === 0
              ? 'Click "Add Admin" to create the first one.'
              : "Try a different search term."}
          </span>
        </div>
      ) : (
        <div className="w-full min-w-0 max-w-full overflow-hidden">
          <div className="w-full min-w-0 max-w-full overflow-x-auto">
            <Table
              headers={ADMIN_HEADERS}
              rows={filteredAdmins.map((admin) => [
                admin?.firstName || "-",
                admin?.lastName || "-",
                admin?.email || "-",
              ])}
            />
          </div>
        </div>
      )}
    </div>
  );
}
