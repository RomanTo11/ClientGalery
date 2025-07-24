import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../api/config";

type Evento = {
  _id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagenUrl: string;
  ubicacion: string;
  expositores: string[];
};

export default function EventosDestacados() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/eventos`)
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error("Error cargando eventos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Cargando eventos...</div>;
  if (!eventos.length) return null;

  return (
    <section className="w-full py-10 bg-gradient-to-br from-blue-100 to-green-100 mb-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Próximos Eventos</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-8 px-4 min-w-fit">
          {eventos.map((evento) => (
            <div
              key={evento._id}
              className="min-w-[350px] max-w-xs bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 border border-gray-200"
            >
              <img
                src={evento.imagenUrl}
                alt={evento.titulo}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="font-semibold text-lg text-gray-700">{evento.titulo}</div>
              <div className="text-gray-600 text-sm">{evento.descripcion}</div>
              <div className="text-sm text-gray-500"><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleString("es-ES")}</div>
              <div className="text-sm text-gray-500"><strong>Ubicación:</strong> {evento.ubicacion}</div>
              <div className="text-xs text-gray-400">
                <strong>Expositores:</strong> {evento.expositores.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}