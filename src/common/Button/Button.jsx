export default function Button({
  children,
  variant = "primary",
  shape = "default",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) {
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden px-[18px] py-[10px] text-[14px] font-semibold transition-all duration-250 ease-in-out";

  const shapeClasses = {
    default: "rounded-lg",
    pill: "rounded-full",
  };

  const variantClasses = {
    primary: "bg-primary text-white shadow-sm hover:bg-primary-hover",

    secondary:
      "border border-border bg-transparent text-text-primary hover:bg-primary",
  };

  const disabledClasses =
    loading || disabled
      ? "cursor-not-allowed opacity-70 text-white"
      : "cursor-pointer";

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        ${baseClasses}
        ${shapeClasses[shape]}
        ${variantClasses[variant]}
        ${disabledClasses}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <span
            className="
              absolute
              inset-y-0
              -left-full
              w-[300%]
              animate-button-loading
              bg-[linear-gradient(90deg,#C52228_0%,#DC3036_20%,#ED3B41_35%,#F47C83_50%,#ED3B41_65%,#DC3036_80%,#C52228_100%)]
              bg-[length:33.33%_100%]
            "
          />

          <span className="absolute inset-0 bg-black/10" />
        </span>
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
