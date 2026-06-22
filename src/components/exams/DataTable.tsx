interface DataTableProps {
    headers: string[];
    rows: (string | number)[][];
}

const DataTable = ({ headers, rows }: DataTableProps) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
            <table className="w-full text-sm">
                {headers && (
                    <thead>
                        <tr className="bg-gray-50">
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="text-left font-semibold text-gray-700 px-4 py-3 border-b border-gray-200 whitespace-nowrap"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-gray-100 last:border-0 even:bg-gray-50/50">
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={`px-4 py-3 align-top ${cellIndex === 0
                                        ? 'font-medium text-gray-800 whitespace-nowrap'
                                        : 'text-gray-600'
                                        }`}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
