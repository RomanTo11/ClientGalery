import React, { useState } from "react";
import { API_BASE_URL } from "../../api/config";

export default function CreateEventoForm({ onBack }: { onBack?: () => void }) {
  const [form, setForm] = useState({
    ubicacion: "",
    fecha: "",
    descripcion: "",
    imagenUrl: "",
    expositores: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Maneja cambios en todos los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Limpiar formulario
  const handleReset = () => {
    setForm({
      ubicacion: "",
      fecha: "",
      descripcion: "",
      imagenUrl: "",
      expositores: "",
    });
    setMsg("");
  };

  // Volver atrás
  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    // Validación simple
    if (!form.imagenUrl) {
      setMsg("Debes ingresar la URL de la imagen de Cloudinary.");
      setLoading(false);
      return;
    }
    if (!form.ubicacion || !form.fecha) {
      setMsg("Ubicación y fecha son obligatorias.");
      setLoading(false);
      return;
    }

    // expositores (string separado por comas → array)
    const expositoresArray = form.expositores
      .split(",")
      .map((exp) => exp.trim())
      .filter((exp) => exp.length > 0);

    try {
      const response = await fetch(`${API_BASE_URL}/eventos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ubicacion: form.ubicacion,
          fecha: form.fecha,
          descripcion: form.descripcion,
          imagenUrl: form.imagenUrl,
          expositores: expositoresArray,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMsg("¡Evento creado exitosamente!");
        setForm({
          ubicacion: "",
          fecha: "",
          descripcion: "",
          imagenUrl: "",
          expositores: "",
        });
      } else {
        setMsg(data.message || "Error al crear el evento.");
      }
    } catch (err) {
      setMsg("Error de conexión con el servidor.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 relative">
      {/* Botón volver, esquina superior izquierda */}
      <button
        type="button"
        className="absolute top-6 left-8 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition z-20"
        onClick={handleBack}
      >
        Volver al dashboard
      </button>
      <form
        className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 flex flex-col gap-6 border border-gray-200 relative"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Crear Evento</h2>
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="ubicacion">Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            id="ubicacion"
            placeholder="Ej: Centro Cultural X"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none transition"
            value={form.ubicacion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="fecha">Fecha y hora</label>
          <input
            type="datetime-local"
            name="fecha"
            id="fecha"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none transition"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="descripcion">Descripción</label>
          <textarea
            name="descripcion"
            id="descripcion"
            placeholder="Describe el evento"
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-green-400 outline-none transition"
            rows={3}
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="imagenUrl">URL de la imagen (Cloudinary)</label>
          <input
            type="text"
            name="imagenUrl"
            id="imagenUrl"
            placeholder="Pega aquí la URL de la imagen"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none transition"
            value={form.imagenUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="expositores">Expositores (separados por coma)</label>
          <input
            type="text"
            name="expositores"
            id="expositores"
            placeholder="Ej: Juan Pérez, María Gómez"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none transition"
            value={form.expositores}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Evento"}
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
        {msg && <div className="text-center text-sm mt-1 text-green-700">{msg}</div>}
      </form>
    </div>
  );
}