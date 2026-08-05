export default function Input({ label, error, required, className = '', containerClassName = '', ...props }) {
  return (
    <label className={`flex flex-col gap-[6px] text-[13px] font-medium text-text-secondary ${containerClassName}`}>
      {label && (
        <span>
          {label} {required && '*'}
        </span>
      )}
      <input
        className={`border rounded-[8px] px-[12px] py-[9px] text-[14px] text-text-primary bg-bg outline-none transition-colors duration-150 ease-in-out focus:bg-surface ${
          error ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary-text'
        } ${className}`}
        required={required}
        {...props}
      />
      {error && <span className="text-[12px] text-red-500">{error}</span>}
    </label>
  )
}
