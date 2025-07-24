import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTable from "../../components/Tables/DashboardTable";
import { API_BASE_URL } from "../../api/config";

const columns = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" }
  // Agrega más columnas si tu API lo tiene
];

const UsuariosApp: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then(res => res.json())
      .then(resData => {
        // Utiliza la propiedad correcta: 'users'
        const usuarios = resData.users || [];
        setData(
          usuarios.map((user: any) => ({
            id: user.id,
            email: user.email
            // Si luego tu API tiene más campos, los agregas aquí
          }))
        );
      });
  }, []);

  const handleEdit = (row: any) => {
    navigate(`/usuarios/editar/${row.id}`);
  };

  const handleDelete = async (row: any) => {
    if (window.confirm(`¿Seguro que quieres eliminar el usuario con email "${row.email}"?`)) {
      await fetch(`${API_BASE_URL}/users/${row.id}`, { method: "DELETE" });
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
      <h2 className="text-4xl font-bold mb-6 text-center">Usuarios registrados</h2>
      <DashboardTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UsuariosApp;