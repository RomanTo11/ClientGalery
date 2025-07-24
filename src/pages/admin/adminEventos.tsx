import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTable from "../../components/Tables/DashboardTable";
import { API_BASE_URL } from "../../api/config";

const columns = [
  { key: "ubicacion", label: "Ubicación" },
  { key: "fecha", label: "Fecha" },
  { key: "descripcion", label: "Descripción" },
  {
    key: "imagenUrl",
    label: "Imagen",
  },
  {
    key: "expositores",
    label: "Expositores",
  },
];
export default function EventosListView({ onBack }: { onBack?: () => void }) {
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setLoading(true);
    fetch(`${API_BASE_URL}/eventos`)
      .then((res) => res.json())
      .then((data) => {
        // Formatea expositores como string si es array y fecha en formato legible
        const eventosFormateados = data.map((ev: any) => ({
          ...ev,
          expositores: Array.isArray(ev.expositores)
            ? ev.expositores.join(", ")
            : ev.expositores,
          fecha: ev.fecha
            ? new Date(ev.fecha).toLocaleString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          imagenUrl: ev.imagenUrl ? (
            <img
              src={ev.imagenUrl}
              alt="evento"
              style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 8 }}
            />
          ) : (
            ""
          ),
        }));
        setEventos(eventosFormateados);
      })
      .catch(() => setEventos([]))
      .finally(() => setLoading(false));
  }, []);

  // Acciones opcionales (puedes conectar con rutas o modales)
  const handleEdit = (row: any) => {
    navigate(`/eventos/editar/${row._id}`);
    // Redirige o abre modal de edición
  };
  // Eliminar evento
  

  const handleDelete = (row: any) => {
    if (window.confirm("¿Seguro que deseas eliminar este evento?")) {
      fetch(`${API_BASE_URL}/eventos/${row._id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            setEventos(eventos.filter((ev) => ev._id !== row._id));
          } else {
            alert("Error al eliminar el evento.");
          }
        });
    }
  };

  // Volver al dashboard
  const handleBack = () => {
    navigate("/admin-dashboard");
  };


  return (
    <div className="px-2 py-8 max-w-5xl mx-auto">
        <button
        type="button"
        className="absolute top-6 left-8 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition z-20"
        onClick={handleBack}
      >
        Volver al dashboard
      </button>


      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Eventos agregados</h2>
      <DashboardTable
        columns={columns}
        data={eventos}
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onBack={onBack}
      />
      {loading && (
        <div className="text-center py-4 text-gray-500 text-sm">
          Cargando eventos...
        </div>
      )}
    </div>
  );
}