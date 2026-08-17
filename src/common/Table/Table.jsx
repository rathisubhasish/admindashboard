export default function Table({
  headers = [],
  rows = [],
  actions,
  data = [],
  emptyMessage = "No data available",
}) {
  const columnCount = headers.length + (actions ? 1 : 0);

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-surface">
      <div className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden">
        <table className="w-max min-w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="whitespace-nowrap bg-surface px-[14px] py-[10px] text-left text-[13px] font-semibold text-primary"
                >
                  {header}
                </th>
              ))}

              {actions && (
                <th className="sticky right-0 z-20 w-[100px] min-w-[100px] whitespace-nowrap border-l border-border bg-surface px-[14px] py-[10px] text-left text-[13px] font-semibold text-primary">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columnCount}
                  className="px-[14px] py-[24px] text-center text-[13px] text-text-secondary"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-border last:border-b-0 hover:bg-bg"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="whitespace-nowrap px-[14px] py-[10px] text-[14px] text-text-primary"
                    >
                      {cell}
                    </td>
                  ))}

                  {actions && (
                    <td className="sticky right-0 z-20 w-[100px] min-w-[100px] whitespace-nowrap border-l border-border bg-surface px-[14px] py-[10px] text-right flex justify-center items-center">
                      {actions(data?.[rowIndex], rowIndex)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
