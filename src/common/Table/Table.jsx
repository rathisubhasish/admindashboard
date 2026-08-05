export default function Table({ headers = [], rows = [], actions, emptyMessage = 'No data available' }) {
  const columnCount = headers.length + (actions ? 1 : 0)

  return (
    <div className="w-full overflow-x-auto border border-border rounded-[10px]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-primary-light">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-[14px] py-[10px] text-[12px] font-semibold text-text-secondary uppercase tracking-wide"
              >
                {header}
              </th>
            ))}
            {actions && <th className="px-[14px] py-[10px]" />}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columnCount} className="px-[14px] py-[24px] text-center text-[13px] text-text-secondary">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-border last:border-b-0 hover:bg-primary-light">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-[14px] py-[10px] text-[14px] text-text-primary">
                    {cell}
                  </td>
                ))}
                {actions && <td className="px-[14px] py-[10px] text-right">{actions(row, rowIndex)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
