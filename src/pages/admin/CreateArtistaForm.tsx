import React, { useState } from "react";
import { API_BASE_URL } from "../../api/config";

export default function CreateArtistaForm({ onBack }: { onBack?: () => void }) {
  const [form, setForm] = useState({
    nombre: "",
    biografia: "",
    pais: "",
    fechaNacimiento: "",
    imagenUrl: "",
    descripcion: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    if (!form.nombre || !form.imagenUrl) {
      setMsg("Por favor, completa al menos el nombre y la URL de la imagen.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/artistas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMsg("¡Artista creado exitosamente!");
        setForm({
          nombre: "",
          biografia: "",
          pais: "",
          fechaNacimiento: "",
          imagenUrl: "",
          descripcion: "",
        });
      } else {
        setMsg(data.message || "Error al crear el artista.");
      }
    } catch (err) {
      setMsg("Error de conexión con el servidor.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setForm({
      nombre: "",
      biografia: "",
      pais: "",
      fechaNacimiento: "",
      imagenUrl: "",
      descripcion: "",
    });
    setMsg("");
  };

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 relative">
      {/* Botón volver, esquina superior izquierda */}
      <button
        type="button"
        className="absolute top-6 left-8 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition z-20"
        onClick={handleBack}
      >
        Volver Al dashboard
      </button>
      <form
        className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 flex flex-col gap-6 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Registrar Nuevo Artista</h2>
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="nombre">Nombre del artista</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Ej: Frida Kahlo"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="biografia">Biografía</label>
          <textarea
            name="biografia"
            id="biografia"
            placeholder="Breve biografía del artista"
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-indigo-400 outline-none transition"
            rows={3}
            value={form.biografia}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="pais">País de origen</label>
            <input
              type="text"
              name="pais"
              id="pais"
              placeholder="Ej: México"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={form.pais}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              id="fechaNacimiento"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={form.fechaNacimiento}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="imagenUrl">URL de la imagen (Cloudinary)</label>
          <input
            type="url"
            name="imagenUrl"
            id="imagenUrl"
            placeholder="Pega aquí la URL de la imagen"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            value={form.imagenUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="descripcion">Descripción adicional</label>
          <textarea
            name="descripcion"
            id="descripcion"
            placeholder="Detalles adicionales sobre el artista"
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-indigo-400 outline-none transition"
            rows={2}
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Artista"}
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            onClick={handleReset}
            disabled={loading}
          >
            Limpiar
          </button>
        </div>
        {msg && <div className="text-center text-sm mt-1 text-indigo-700">{msg}</div>}
      </form>
    </div>
  );
}