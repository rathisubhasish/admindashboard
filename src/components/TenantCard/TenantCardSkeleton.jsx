import TenantCard from "../../components/TenantCard/TenantCard.jsx";
export default function TenantCardSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {" "}
      {Array.from({ length: count }).map((_, index) => (
        <TenantCard key={index}>
          {" "}
          <div className="w-full flex flex-col flex-grow animate-pulse">
            {" "}
            {/* Header */}{" "}
            <div className="w-full flex justify-start items-center px-4 py-4 gap-4">
              {" "}
              {/* Logo */}{" "}
              <div className="h-12 w-12 shrink-0 rounded-full bg-primary-light" />{" "}
              {/* Name + Email */}{" "}
              <div className="w-full flex flex-col justify-center items-start gap-2">
                {" "}
                <div className="h-5 w-[65%] rounded bg-primary-light" />{" "}
                <div className="h-3.5 w-[80%] rounded bg-primary-light" />{" "}
              </div>{" "}
            </div>{" "}
            {/* Divider */} <hr className="border border-primary-light" />{" "}
            {/* Details */}{" "}
            <div className="w-full flex flex-col gap-3 px-4 py-4">
              {" "}
              {/* Legal Name */}{" "}
              <div className="flex items-center gap-2">
                {" "}
                <div className="h-3.5 w-20 rounded bg-primary-light" />{" "}
                <div className="h-3.5 w-[45%] rounded bg-primary-light" />{" "}
              </div>{" "}
              {/* City */}{" "}
              <div className="flex items-center gap-2">
                {" "}
                <div className="h-3.5 w-12 rounded bg-primary-light" />{" "}
                <div className="h-3.5 w-[35%] rounded bg-primary-light" />{" "}
              </div>{" "}
              {/* Mobile */}{" "}
              <div className="flex items-center gap-2">
                {" "}
                <div className="h-3.5 w-16 rounded bg-primary-light" />{" "}
                <div className="h-3.5 w-[40%] rounded bg-primary-light" />{" "}
              </div>{" "}
            </div>{" "}
            {/* Divider */} <hr className="border border-primary-light" />{" "}
            {/* Footer */}{" "}
            <div className="w-full flex justify-end items-center px-4 py-2">
              {" "}
              <div className="h-3.5 w-16 rounded bg-primary-light" />{" "}
            </div>{" "}
          </div>{" "}
        </TenantCard>
      ))}{" "}
    </div>
  );
}
