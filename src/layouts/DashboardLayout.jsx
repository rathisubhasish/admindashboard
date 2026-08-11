import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { LuBox } from "react-icons/lu";
import { useAuth } from "../context/AuthContext.jsx";
import { AiOutlineMenu } from "react-icons/ai";

export default function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { email } = useAuth();

  const ICON_BUTTON =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary bg-surface cursor-pointer transition-colors duration-150 ease-in-out hover:bg-primary-light hover:text-primary-text";

  return (
    <div className="flex min-h-svh bg-white overflow-x-hidden">
      <Sidebar setIsMobileOpen={setIsMobileOpen} isMobileOpen={isMobileOpen} />
      <main className="w-full flex flex-col relative relative min-w-0 max-w-full">
        <div className="w-full flex justify-between items-center px-6 py-4 bg-white fixed top-0 lg:hidden z-30">
          <div className="flex min-w-0 items-center gap-2">
            <LuBox size={34} className="text-primary" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">
                Admin
              </p>
              {email && (
                <p className="max-w-[170px] truncate text-xs text-text-secondary">
                  {email}
                </p>
              )}
            </div>
          </div>{" "}
          <div className="flex justify-end items-center">
            <button
              type="button"
              className={ICON_BUTTON}
              onClick={() => setIsMobileOpen(true)}
              aria-label="Logout"
            >
              <AiOutlineMenu size={16} />{" "}
            </button>
          </div>
        </div>
        <div className="flex-1 py-8 px-6 min-w-0 mt-[6vh] sm:mt-0 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
