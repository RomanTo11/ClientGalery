import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTable from "../../components/Tables/DashboardTable";
import { API_BASE_URL } from "../../api/config";

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "fechaCreacion", label: "Fecha de Creación" },
  { key: "obras", label: "Número Obras" },
];

const Categorias: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(resData => {
        // console.log("RESPUESTA BACKEND:", resData);
        // Intenta usar varias claves posibles
        const categoriasArr = resData.categorias || resData.categories || resData;
        //console.log("CATEGORIAS ARRAY:", categoriasArr);

        // Validación: Si no es array, pon array vacío
        const categorias = Array.isArray(categoriasArr) ? categoriasArr : [];
        const parsedCats = categorias.map((cat: any) => ({
          ...cat,
          obras: Array.isArray(cat.obras) ? cat.obras.length : (cat.obrasCount || 0)
        }));
        setData(parsedCats);
      })
      .catch((err) => {
        console.error("Error obteniendo categorías:", err);
        setData([]);
      });
  }, []);

  const handleEdit = (row: any) => {
    navigate(`/categorias/editar/${row.id}`);
  };
  const handleDelete = async (row: any) => {
    if (window.confirm(`¿Seguro que quieres eliminar la categoría "${row.nombre}"?`)) {
      await fetch(`${API_BASE_URL}/categories/${row.id}`, { method: "DELETE" });
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
      <h2 className="text-4xl font-bold mb-6 text-center">Categorías</h2>
      <DashboardTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Categorias;