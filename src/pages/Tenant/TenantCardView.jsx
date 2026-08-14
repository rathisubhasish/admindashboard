import TenantCard from "../../components/TenantCard/TenantCard.jsx";
import { useNavigate } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";

export default function TenantCardView({ filteredTenants }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredTenants.map((tenant, index) => (
        <TenantCard
          key={tenant.id}
          onClick={() => navigate(`/tenants/${filteredTenants[index].id}`)}
        >
          <div className="w-full flex flex-col flex-grow">
            <div className="w-full flex justify-start items-center px-4 py-4 gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-light text-[13px] font-semibold text-primary-text">
                {tenant?.name?.charAt(0).toUpperCase()}
                {tenant?.logoUrl && (
                  <img
                    src={tenant.logoUrl}
                    alt={tenant?.name}
                    // Presigned URLs expire — fall back to the initial behind it.
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="w-full flex flex-col justify-center items-start">
                <p className="flex-1 truncate text-lg max-w-[80%]">
                  {tenant?.name}
                </p>
                <p className="text-sm max-w-[80%] truncate flex-1">
                  {tenant?.email}
                </p>
              </div>
            </div>
            <hr className="border border-primary-light" />
            <div className="w-full flex flex-col gap-1 px-4 py-4">
              <p className="text-sm">
                <span className="text-primary font-bold">Legal Name - </span>{" "}
                {tenant?.legalName}
              </p>
              <p className="text-sm">
                <span className="text-primary font-bold">City - </span>{" "}
                {tenant?.city}
              </p>
              <p className="text-sm">
                <span className="text-primary font-bold">Mobile - </span>{" "}
                {tenant?.mobile}
              </p>
            </div>
            <hr className="border border-primary-light" />
            <div className="w-full flex justify-end items-center px-4 py-2">
              <p className="text-text-secondary text-sm uppercase">
                {tenant?.verified ? (
                  <div className="w-full flex gap-1 items-center justify-end text-xs">
                    <MdOutlineVerified size={16} />
                    Verified
                  </div>
                ) : (
                  <div className="w-full flex gap-1 items-center justify-end text-xs">
                    <MdOutlinePending size={16} />
                    Pending
                  </div>
                )}
              </p>
            </div>
          </div>
        </TenantCard>
      ))}
    </div>
  );
}
