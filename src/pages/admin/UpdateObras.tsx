import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";

export default function EditarObra() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    imagenUrl: "",
    tecnica: "",
    dimensiones: "",
    fechaCreacion: "",
    categoriaId: "",
    artistaId: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Nuevos estados para listas de categorías y artistas
  const [categorias, setCategorias] = useState<{id: number, nombre: string}[]>([]);
  const [artistas, setArtistas] = useState<{id: number, nombre: string}[]>([]);

  // Cargar obra actual
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/obras/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.obra) {
          setForm({
            titulo: data.obra.titulo || "",
            descripcion: data.obra.descripcion || "",
            precio: String(data.obra.precio || ""),
            imagenUrl: data.obra.imagenUrl || "",
            tecnica: data.obra.tecnica || "",
            dimensiones: data.obra.dimensiones || "",
            fechaCreacion: data.obra.fechaCreacion ? data.obra.fechaCreacion.slice(0, 10) : "",
            categoriaId: String(data.obra.categoriaId || ""),
            artistaId: String(data.obra.artistaId || ""),
          });
        } else {
          setMsg("No se encontró la obra.");
        }
      })
      .catch(() => setMsg("Error al cargar la obra."))
      .finally(() => setLoading(false));
  }, [id]);

  // Cargar categorías y artistas para los selects
  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        // Manejo flexible para distintos formatos de respuesta
        const arr = data.categorias || data.categories || data;
        setCategorias(Array.isArray(arr)
          ? arr.map((c: any) => ({ id: c.id, nombre: c.nombre }))
          : []);
      });
    fetch(`${API_BASE_URL}/artistas`)
      .then(res => res.json())
      .then(data => {
        const arr = data.artistas || data.artists || data;
        setArtistas(Array.isArray(arr)
          ? arr.map((a: any) => ({ id: a.id, nombre: a.nombre }))
          : []);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/obras/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          precio: Number(form.precio),
          categoriaId: Number(form.categoriaId),
          artistaId: Number(form.artistaId),
        }),
      });
      const result = await response.json();
      if (result?.message) setMsg(result.message);
      else setMsg("¡Obra actualizada exitosamente!");
    } catch {
      setMsg("Error al actualizar la obra.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate(-1);

  if (loading) return <div className="p-6 text-center">Cargando...</div>;
  if (msg && !form.titulo) return <div className="p-6 text-center">{msg}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 relative">
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
        <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-2">
          Editar Obra
        </h2>
        {/* Grid de 2 columnas para los campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="titulo">Título</label>
            <input type="text" name="titulo" id="titulo" value={form.titulo} onChange={handleChange} required className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label htmlFor="precio">Precio</label>
            <input type="number" name="precio" id="precio" value={form.precio} onChange={handleChange} min={0} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label htmlFor="fechaCreacion">Fecha de creación</label>
            <input type="date" name="fechaCreacion" id="fechaCreacion" value={form.fechaCreacion} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label htmlFor="imagenUrl">URL de la imagen</label>
            <input type="url" name="imagenUrl" id="imagenUrl" value={form.imagenUrl} onChange={handleChange} required className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label htmlFor="tecnica">Técnica</label>
            <input type="text" name="tecnica" id="tecnica" value={form.tecnica} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label htmlFor="dimensiones">Dimensiones</label>
            <input type="text" name="dimensiones" id="dimensiones" value={form.dimensiones} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label htmlFor="categoriaId">Categoría</label>
            <select name="categoriaId" id="categoriaId" value={form.categoriaId} onChange={handleChange} required className="w-full border rounded-lg p-2">
              <option value="">Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="artistaId">Artista</label>
            <select name="artistaId" id="artistaId" value={form.artistaId} onChange={handleChange} required className="w-full border rounded-lg p-2">
              <option value="">Selecciona un artista</option>
              {artistas.map(art => (
                <option key={art.id} value={art.id}>{art.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea name="descripcion" id="descripcion" value={form.descripcion} onChange={handleChange} rows={2} className="w-full border rounded-lg p-2" />
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          <button type="submit" className="flex-1 bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
        {msg && (
          <div className="text-center text-sm mt-1 text-pink-700">{msg}</div>
        )}
      </form>
    </div>
  );
}