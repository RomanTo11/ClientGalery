import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTable from "../../components/Tables/DashboardTable";
import { API_BASE_URL } from "../../api/config";

const columns = [
  { key: "id", label: "ID" },
  { key: "titulo", label: "Título" },
  { key: "artista", label: "Artista" },
  { key: "categoria", label: "Categoría" },
  { key: "precio", label: "Precio" },
  { key: "tecnica", label: "Técnica" },
  { key: "dimensiones", label: "Dimensiones" },
];

const Obras: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/obras`)
      .then(res => res.json())
      .then(resData => {
        setData(resData.obras || []);
      });
  }, []);

  // Editar: navega a la vista de edición
  const handleEdit = (row: any) => {
    navigate(`/obras/editar/${row.id}`);
  };

  // Eliminar: realiza la petición DELETE y actualiza la tabla
  const handleDelete = async (row: any) => {
    if (window.confirm(`¿Seguro que quieres eliminar la obra "${row.titulo}"?`)) {
      await fetch(`${API_BASE_URL}/obras/${row.id}`, { method: "DELETE" });
      setData(data.filter(item => item.id !== row.id));
    }
  };

  // Volver al dashboard
  const handleBack = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="px-6 py-8 min-h-screen bg-gray-50 relative" style={{ paddingTop: "70px" }}>
      {/* Botón en la esquina superior izquierda */}
      <button
        type="button"
        className="absolute top-6 left-8 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition z-20"
        onClick={handleBack}
      >
        Volver al dashboard
      </button>
      <h2 className="text-4xl font-bold mb-6 text-center">Obras</h2>
      <DashboardTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Obras;