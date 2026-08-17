import { useCallback, useEffect, useState } from "react";
import Button from "../../../common/Button/Button.jsx";
import * as tenantService from "../../../services/tenantService.js";
import { LuPlus, LuUsers } from "react-icons/lu";
import Table from "../../../common/Table/Table.jsx";
import TeamMemberFormModal from "../../../components/TeamMemberFormModal.jsx";
import TableSkeleton from "../../../common/Table/TableSkeleton.jsx";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../common/Modal/Modal.jsx";
import ErrorMessage from "../../../common/Error/Error.jsx";
import TableActions from "../../../common/TableActions/TableActions.jsx";

export default function TenantMembers({ id }) {
  const [members, setMembers] = useState([]);
  const [isMembersLoading, setMembersLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);

  function formatDate(value) {
    if (!value) return "—";
    return new Date(value).toLocaleString();
  }

  const MEMBER_HEADERS = [
    "ID",
    "Email",
    "Mobile",
    "Role",
    "Created At",
    "Last Login At",
  ];

  const [confirmModalOpen, setConfirmModalOpen] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  async function onDelete() {
    setApiError("");
    setDeleteLoading(true);
    const result = await tenantService.deleteTenantUser(confirmModalOpen?.id);
    if (!result.success) {
      const fieldErrors = result.error?.errors;

      if (Object.keys(fieldErrors || {}).length > 0) {
        const message = Object.entries(fieldErrors)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");

        setApiError(message);
      } else {
        setApiError(result.error?.message || "Failed to delete tenant user");
      }

      setDeleteLoading(false);
      return;
    }
    setDeleteLoading(false);
    setConfirmModalOpen(null);
  }

  const loadMembers = useCallback(async () => {
    try {
      setMembersLoading(true);
      setError(null);

      const response = await tenantService.getMembers(id);

      setMembers(response.data ?? []);
    } catch (error) {
      console.error("Failed to load tenants:", error);
      setError(error);
    } finally {
      setMembersLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers, needRefresh]);

  return (
    <div className="overflow-y-scroll mb-24">
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

      <div className="bg-surface">
        {isMembersLoading ? (
          <TableSkeleton />
        ) : error ? (
          <div className="bg-surface rounded-xl flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-text-secondary">
            <LuUsers size={28} className="text-primary-text mb-1" />
            <p className="text-text-primary font-semibold">
              Failed to load members
            </p>

            <span className="text-[13px]">Please try again later.</span>
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
              member.id || "—",
              member.email || "—",
              member.mobile || "—",
              member.role,
              formatDate(member.created_at),
              formatDate(member.last_login_at),
            ])}
            actions={() => (
              <TableActions
                actions={[
                  {
                    type: "delete",
                    label: "Delete",
                    onClick: () => {
                      setConfirmModalOpen({ id: "sdfsdf" });
                    },
                  },
                ]}
              />
            )}
          />
        )}
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
        <span>Add Team Member</span>
      </Button>
      {isModalOpen && (
        <TeamMemberFormModal
          onClose={() => setModalOpen(false)}
          id={id}
          setNeedRefresh={setNeedRefresh}
        />
      )}

      {confirmModalOpen?.id && (
        <Modal
          title="Delete Member"
          onClose={() => setConfirmModalOpen(false)}
          width={300}
        >
          <div className="w-full flex flex-col gap-4">
            <ErrorMessage message={apiError} />
            <p>Are you sure you want to delete ?</p>
            <div className="w-full flex gap-1 items-center justify-end">
              <Button
                variant="primary"
                onClick={onDelete}
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
