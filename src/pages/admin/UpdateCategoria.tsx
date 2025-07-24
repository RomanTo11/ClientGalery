import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";

export default function EditarCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: "",
    fechaCreacion: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Trae los datos actuales de la categoría
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        // DEBUG: imprime la respuesta real
        //console.log("Respuesta backend:", data);

        // Si responde { categoria: {...} }
        if (data.categoria) {
          setForm({
            nombre: data.categoria.nombre || "",
            descripcion: data.categoria.descripcion || "",
            imagenUrl: data.categoria.imagenUrl || "",
            fechaCreacion: data.categoria.fechaCreacion
              ? data.categoria.fechaCreacion.slice(0, 10)
              : "",
          });
        }
        // Si responde { id, nombre, ... }
        else if (data && data.id) {
          setForm({
            nombre: data.nombre || "",
            descripcion: data.descripcion || "",
            imagenUrl: data.imagenUrl || "",
            fechaCreacion: data.fechaCreacion
              ? data.fechaCreacion.slice(0, 10)
              : "",
          });
        }
        // Si no responde nada útil
        else {
          setMsg("No se encontró la categoría.");
        }
      })
      .catch(() => setMsg("Error al cargar la categoría."))
      .finally(() => setLoading(false));
  }, [id]);

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
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMsg("¡Categoría actualizada exitosamente!");
      } else {
        setMsg(data.message || "Error al actualizar la categoría.");
      }
    } catch {
      setMsg("Error de conexión con el servidor.");
    }
    setLoading(false);
  };

  const handleBack = () => navigate(-1);

  if (loading) return <div className="p-6 text-center">Cargando...</div>;
  if (msg && !form.nombre) return <div className="p-6 text-center">{msg}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 relative">
      <button
        type="button"
        className="absolute top-6 left-8 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition z-20"
        onClick={handleBack}
      >
        Volver al dashboard
      </button>
      <form
        className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 flex flex-col gap-6 border border-gray-200 mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Editar Categoría</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre">Nombre de la categoría</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Ej: Naturaleza"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none transition"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="fechaCreacion">Fecha de creación</label>
            <input
              type="date"
              name="fechaCreacion"
              id="fechaCreacion"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none transition"
              value={form.fechaCreacion}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="imagenUrl">URL de la imagen (Cloudinary)</label>
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
        </div>
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            name="descripcion"
            id="descripcion"
            placeholder="Describe la categoría"
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-green-400 outline-none transition"
            rows={3}
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
        {msg && <div className="text-center text-sm mt-1 text-green-700">{msg}</div>}
      </form>
    </div>
  );
}