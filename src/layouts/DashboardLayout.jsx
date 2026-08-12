import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { LuBox } from "react-icons/lu";
import { useAuth } from "../context/AuthContext.jsx";
import { AiOutlineMenu } from "react-icons/ai";

export default function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();

  const ICON_BUTTON =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary bg-surface cursor-pointer transition-colors duration-150 ease-in-out hover:bg-primary-light hover:text-primary-text";

  return (
    <div className="flex h-svh overflow-hidden bg-white">
      <Sidebar setIsMobileOpen={setIsMobileOpen} isMobileOpen={isMobileOpen} />

      <main className="relative flex min-w-0 flex-1 flex-col">
        {/* Mobile Header */}
        <div className="fixed left-0 right-0 top-0 z-30 flex w-full items-center justify-between bg-white px-6 py-4 lg:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <LuBox size={34} className="text-primary" />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">
                {user?.firstName}
              </p>

              {user?.email && (
                <p className="max-w-[170px] truncate text-xs text-text-secondary">
                  {user.email}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            className={ICON_BUTTON}
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
          >
            <AiOutlineMenu size={16} />
          </button>
        </div>

        {/* Page Content */}
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-8 max-lg:mt-[64px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
