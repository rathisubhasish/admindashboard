import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LuEllipsisVertical, LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

const defaultIcons = {
  view: LuEye,
  edit: LuPencil,
  delete: LuTrash2,
};

const defaultActionClasses = {
  view: "text-gray-700 hover:bg-gray-100",
  edit: "text-blue-600 hover:bg-blue-50",
  delete: "text-red-600 hover:bg-red-50",
};

export default function TableActions({
  actions = [],
  buttonClassName = "",
  menuClassName = "",
  actionClassName = "",
  triggerIcon: TriggerIcon = LuEllipsisVertical,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const updateMenuPosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + 4,
      left: rect.right - 150,
    });
  };

  const handleToggle = () => {
    if (disabled) return;

    if (!open) {
      updateMenuPosition();
    }

    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      const target = event.target;

      const clickedButton = containerRef.current?.contains(target);

      const clickedMenu = menuRef.current?.contains(target);

      if (!clickedButton && !clickedMenu) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      updateMenuPosition();
    };

    const handleResize = () => {
      updateMenuPosition();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  const handleAction = (action) => {
    if (action.disabled) return;

    // Close first
    setOpen(false);

    // Then execute callback
    if (typeof action.onClick === "function") {
      action.onClick(action);
    }
  };

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          className={`
            fixed
            z-[99999]
            min-w-[150px]
            overflow-hidden
            rounded-lg
            border
            border-border
            bg-surface
            py-1
            shadow-xl
            ${menuClassName}
          `}
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
          }}
        >
          {actions.map((action) => {
            const Icon =
              action.icon || defaultIcons[action.type] || LuEllipsisVertical;

            const defaultClasses =
              action.className ||
              defaultActionClasses[action.type] ||
              "text-gray-700 hover:bg-gray-100";

            return (
              <button
                key={action.key || action.type || action.label}
                type="button"
                disabled={action.disabled}
                onClick={() => handleAction(action)}
                className={`
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  gap-3
                  px-3
                  py-2
                  text-left
                  text-sm
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  ${defaultClasses}
                  ${actionClassName}
                `}
              >
                <Icon size={16} />

                <span>{action.label}</span>
              </button>
            );
          })}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div ref={containerRef} className="relative inline-flex">
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          className={`
            inline-flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            text-gray-500
            transition
            hover:bg-gray-100
            hover:text-gray-700
            focus:outline-none
            disabled:cursor-not-allowed
            disabled:opacity-50
            ${buttonClassName}
          `}
          aria-label="Actions"
          aria-expanded={open}
        >
          <TriggerIcon size={18} />
        </button>
      </div>

      {menu}
    </>
  );
}
