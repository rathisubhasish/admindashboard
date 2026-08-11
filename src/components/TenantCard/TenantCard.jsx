export default function TenantCard({ children, onClick }) {
  return (
    <div
      className="w-full  bg-white rounded-lg shadow min-h-[100px] overflow-hidden flex flex-col border-2 border-primary-200 cursor-pointer hover:border-2 hover:border-primary-300 ease-in-out duration-300"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
