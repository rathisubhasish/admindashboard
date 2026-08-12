export default function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border">
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-4 py-3 text-left">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-4">
                  <div
                    className={`h-4 animate-pulse rounded bg-gray-200 ${
                      colIndex === 0 ? "w-32" : colIndex === 1 ? "w-40" : "w-24"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
