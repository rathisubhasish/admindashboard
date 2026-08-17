import {useOutletContext} from "react-router-dom";

export default function TenantData() {
    const { tenant } = useOutletContext();
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
      return <>
          {/* Details */}
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
     </>;
}
