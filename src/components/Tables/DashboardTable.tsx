import React from "react";

type Column = {
  key: string;
  label: string;
};

type DashboardTableProps = {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  onBack?: () => void; // ← Añade el prop aquí
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  onBack, // ← Recibe el prop aquí
}) => (
  <div className="relative">
    {/* Botón volver en la esquina superior derecha */}
    {onBack && (
      <button
        type="button"
        className="absolute top-0 right-0 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition z-20"
        onClick={onBack}
      >
        Volver Al dashboard
      </button>
    )}
    <div className="mt-16 overflow-x-auto rounded-2xl shadow-lg bg-white border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200 rounded-2xl overflow-hidden">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase bg-gray-50"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete || onView) && (
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase bg-gray-50" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className="transition-colors duration-200 rounded-lg"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                background: i % 2 === 0 ? "#FCF2E8" : "#F9F2F0",
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 text-sm text-gray-900 break-words align-top"
                >
                  {row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete || onView) && (
                <td className="px-6 py-4 flex gap-2 align-top">
                  {onView && (
                    <button
                      className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                      onClick={() => onView(row)}
                    >
                      <span className="mr-1">👁️</span> Ver
                    </button>
                  )}
                  {onEdit && (
                    <button
                      className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg hover:opacity-80 transition"
                      style={{
                        background: "#E67819",
                        color: "#fff",
                        fontFamily: "'Quicksand', sans-serif",
                        border: "none",
                      }}
                      onClick={() => onEdit(row)}
                    >
                      <span className="mr-1">✏️</span> Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg hover:opacity-80 transition"
                      style={{
                        background: "#CC0000",
                        color: "#fff",
                        fontFamily: "'Quicksand', sans-serif",
                        border: "none",
                      }}
                      onClick={() => onDelete(row)}
                    >
                      <span className="mr-1">🗑️</span> Eliminar
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          No hay registros para mostrar.
        </div>
      )}
    </div>
  </div>
);

export default DashboardTable;