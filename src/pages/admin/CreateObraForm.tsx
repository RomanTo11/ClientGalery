import React, { useEffect, useState } from "react";
import { createObraArte } from "../../api/api";
import { API_BASE_URL } from "../../api/config";

export default function PageCrearObra() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [artistas, setArtistas] = useState<Artista[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resCategorias = await fetch(`${API_BASE_URL}/categories`);
      const dataCategorias = await resCategorias.json();
      setCategorias(Array.isArray(dataCategorias.categories) ? dataCategorias.categories : []);
    
      const resArtistas = await fetch(`${API_BASE_URL}/artistas`);
      const dataArtistas = await resArtistas.json();
      setArtistas(Array.isArray(dataArtistas.artistas) ? dataArtistas.artistas : []);
    };
    fetchData();
  }, []);

  return (
    <CreateObraForm
      categorias={categorias}
      artistas={artistas}
    />
  );
}

type Categoria = { id: number; nombre: string };
type Artista = { id: number; nombre: string };

interface CreateObraFormProps {
  categorias?: Categoria[];
  artistas?: Artista[];
  onBack?: () => void;
}

function CreateObraForm({
  categorias = [],
  artistas = [],
  onBack,
}: CreateObraFormProps) {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    imagenUrl: "",
    tecnica: "",
    dimensiones: "",
    fechaCreacion: new Date().toISOString().slice(0, 10),
    CategoriaId: "",
    ArtistaId: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      titulo: "",
      descripcion: "",
      precio: "",
      imagenUrl: "",
      tecnica: "",
      dimensiones: "",
      fechaCreacion: new Date().toISOString().slice(0, 10),
      CategoriaId: "",
      ArtistaId: "",
    });
    setMsg("");
  };

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    if (
      !form.titulo ||
      !form.imagenUrl ||
      !form.CategoriaId ||
      !form.ArtistaId
    ) {
      setMsg("Por favor, completa todos los campos obligatorios.");
      setLoading(false);
      return;
    }

    try {
      const response = await createObraArte({
        titulo: form.titulo,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        tecnica: form.tecnica,
        dimensiones: form.dimensiones,
        fechaCreacion: new Date().toISOString().slice(0, 10),
        categoriaId: Number(form.CategoriaId),
        artistaId: Number(form.ArtistaId),
        imagenUrl: form.imagenUrl,
      });

      if (response?.message) {
        setMsg(response.message);
      } else {
        setMsg("¡Obra creada exitosamente!");
      }

      handleReset();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setMsg(`Error: ${error.message}`);
      } else {
        setMsg("Error desconocido al crear la obra.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 relative">
      {/* Botón volver en la esquina superior izquierda */}
      <button
        type="button"
        className="absolute top-6 left-8 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition z-20"
        onClick={handleBack}
      >
        Volver al dashboard
      </button>
      <form
        className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 flex flex-col gap-8 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-2">
          Registrar Nueva Obra
        </h2>
        {/* Grid de 2 columnas para los campos principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="titulo">
              Título
            </label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              placeholder="Título de la obra"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none transition"
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="precio">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              id="precio"
              placeholder="Precio"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none transition"
              value={form.precio}
              onChange={handleChange}
              min={0}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="fechaCreacion">
              Fecha de creación
            </label>
            <input
              type="date"
              name="fechaCreacion"
              id="fechaCreacion"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none transition"
              value={form.fechaCreacion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="imagenUrl">
              URL de la imagen (Cloudinary)
            </label>
            <input
              type="url"
              name="imagenUrl"
              id="imagenUrl"
              placeholder="Pega aquí la URL de la imagen"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none transition"
              value={form.imagenUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="tecnica">
              Técnica
            </label>
            <input
              type="text"
              name="tecnica"
              id="tecnica"
              placeholder="Ej: óleo sobre lienzo"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none transition"
              value={form.tecnica}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="dimensiones">
              Dimensiones
            </label>
            <input
              type="text"
              name="dimensiones"
              id="dimensiones"
              placeholder="Ej: 20x30cm"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none transition"
              value={form.dimensiones}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="CategoriaId">
              Categoría
            </label>
            <select
              name="CategoriaId"
              id="CategoriaId"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none transition"
              value={form.CategoriaId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categorias.length
                ? categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))
                : [
                    <option disabled>No hay categorías</option>
                  ]}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="ArtistaId">
              Artista
            </label>
            <select
              name="ArtistaId"
              id="ArtistaId"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none transition"
              value={form.ArtistaId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona un artista
              </option>
              {artistas.length > 0 ? (
                artistas.map((art) => (
                  <option key={art.id} value={art.id}>
                    {art.nombre}
                  </option>
                ))
              ) : (
                <option disabled>No hay artistas</option>
              )}
            </select>
          </div>
        </div>
        {/* Descripción ocupa todo el ancho abajo */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            name="descripcion"
            id="descripcion"
            placeholder="Describe la obra"
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-pink-400 outline-none transition"
            rows={3}
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className="flex-1 bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Obra"}
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
        {msg && (
          <div className="text-center text-sm mt-1 text-pink-700">{msg}</div>
        )}
      </form>
    </div>
  );
}