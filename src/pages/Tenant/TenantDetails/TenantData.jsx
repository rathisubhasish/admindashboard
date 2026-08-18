import { useOutletContext } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import Button from "../../../common/Button/Button.jsx";
import { useState } from "react";
import TenantFormModal from "../../../components/TenantFormModal.jsx";
import { LuPlus } from "react-icons/lu";

export default function TenantData() {
  const { tenant } = useOutletContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(null);

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

  return (
    <>
      {/* Details */}
      <div className="bg-surface">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="w-full flex flex-col">
            <h2>Basic Information</h2>
            <p className="text-text-secondary text-[13px]">
              Basic information of the tenant
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
                        whitespace-nowrap
                        max-sm:left-4 max-sm:right-4
                      "
            onClick={() => setIsEditModalOpen(tenant)}
          >
            <AiFillEdit size={16} />
            Edit Tenant
          </Button>
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
          onClick={() => setIsEditModalOpen(tenant)}
        >
          <AiFillEdit size={18} strokeWidth={2.5} />
          <span>Edit Tenant</span>
        </Button>

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
        {isEditModalOpen && (
          <TenantFormModal
            onClose={() => setIsEditModalOpen(null)}
            tenantData={tenant}
            type="edit"
          />
        )}
      </div>
    </>
  );
}
