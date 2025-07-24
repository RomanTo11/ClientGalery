import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";

export default function EditarArtista() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Trae los datos actuales del artista
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/artistas/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.artista) {
          setForm({
            nombre: data.artista.nombre || "",
            biografia: data.artista.biografia || "",
            pais: data.artista.pais || "",
            fechaNacimiento: data.artista.fechaNacimiento
              ? data.artista.fechaNacimiento.slice(0, 10)
              : "",
            imagenUrl: data.artista.imagenUrl || "",
            descripcion: data.artista.descripcion || "",
          });
        } else {
          setMsg("No se encontró el artista.");
        }
      })
      .catch(() => setMsg("Error al cargar el artista."))
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
      const response = await fetch(`${API_BASE_URL}/artistas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMsg("¡Artista actualizado exitosamente!");
      } else {
        setMsg(data.message || "Error al actualizar el artista.");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 relative">
      <button
        type="button"
        className="absolute top-6 left-8 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition z-20"
        onClick={handleBack}
      >
        Volver al dashboard
      </button>
      <form
        className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 flex flex-col gap-6 border border-gray-200 mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Editar Artista</h2>
        {/* Grid de 2 columnas para los campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre">Nombre del artista</label>
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
            <label htmlFor="pais">País de origen</label>
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
          <div>
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              id="fechaNacimiento"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={form.fechaNacimiento}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="imagenUrl">URL de la imagen (Cloudinary)</label>
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
        </div>
        <div>
          <label htmlFor="biografia">Biografía</label>
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
        <div>
          <label htmlFor="descripcion">Descripción adicional</label>
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
        <div className="flex gap-4 mt-2 justify-center">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
        {msg && <div className="text-center text-sm mt-1 text-indigo-700">{msg}</div>}
      </form>
    </div>
  );
}