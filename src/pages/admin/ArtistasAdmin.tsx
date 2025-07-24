import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTable from "../../components/Tables/DashboardTable";
import { API_BASE_URL } from "../../api/config";

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "pais", label: "País" },
  { key: "biografia", label: "Biografía" },
  { key: "fechaNacimiento", label: "Fecha de Nacimiento" },
  { key: "descripcion", label: "Descripción" },
  // agrega más campos si los tienes
];

const ArtistasAdmin: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/artistas`)
      .then(res => res.json())
      .then(resData => setData(resData.artistas || []));
  }, []);

  // Editar: navega a la vista de edición
  const handleEdit = (row: any) => {
    navigate(`/artistas/editar/${row.id}`);
  };

  // Eliminar: realiza la petición DELETE y actualiza la tabla
  const handleDelete = async (row: any) => {
    if (window.confirm(`¿Seguro que quieres eliminar al artista "${row.nombre}"?`)) {
      await fetch(`${API_BASE_URL}/artistas/${row.id}`, { method: "DELETE" });
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
      <h2 className="text-4xl font-bold mb-6 text-center">Artistas</h2>
      <DashboardTable 
        columns={columns} 
        data={data} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default ArtistasAdmin;