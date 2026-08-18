import { cn } from "../../services/utility.js";

const VARIANTS = {
  primary: {
    container: "bg-primary",
    active: "bg-white text-text-primary",
    inactive: "text-white",
  },

  secondary: {
    container: "bg-surface border border-border",
    active: "bg-primary text-white",
    inactive: "text-text-secondary",
  },

  dark: {
    container: "bg-text-primary",
    active: "bg-white text-text-primary",
    inactive: "text-white",
  },
};

const SIZES = {
  sm: {
    container: "p-1",
    item: "px-3 py-1 text-xs",
  },

  md: {
    container: "p-1",
    item: "px-4 py-1.5 text-sm",
  },

  lg: {
    container: "p-1.5",
    item: "px-5 py-2 text-base",
  },
};

export default function Toggle({
  value,
  onChange,
  options = [
    { value: true, label: "Enable" },
    { value: false, label: "Disable" },
  ],
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}) {
  const variantStyles = VARIANTS[variant] ?? VARIANTS.primary;
  const sizeStyles = SIZES[size] ?? SIZES.md;

  const activeIndex = options.findIndex((option) => option.value === value);

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full",
        variantStyles.container,
        sizeStyles.container,
        disabled && "opacity-50",
        className,
      )}
    >
      {/* Sliding background */}
      <div
        className={cn(
          "absolute top-1 bottom-1 rounded-full",
          "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "bg-white shadow-sm",
        )}
        style={{
          width: `calc((100% - ${sizeStyles.container.includes("p-1.5") ? "12px" : "8px"}) / ${options.length})`,
          left: sizeStyles.container.includes("p-1.5") ? "6px" : "4px",
          transform: `translateX(calc(${activeIndex} * 100%))`,
        }}
      />

      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={String(option.value)}
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(option.value)}
            className={cn(
              "relative z-10 rounded-full border-0",
              "font-medium whitespace-nowrap",
              "transition-colors duration-200",
              "cursor-pointer",
              sizeStyles.item,
              isActive ? "text-text-primary" : variantStyles.inactive,
              disabled && "cursor-not-allowed",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
