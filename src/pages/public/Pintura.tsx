import React, { useEffect, useState } from "react";
import ArtworkGrid from "../../components/Artworks/ArtworkGrid";
import { API_BASE_URL } from "../../api/config";

// Define el tipo Artwork que espera el grid
type Artwork = {
  id: string;
  image: string;
  artist: string;
  title: string;
  dimensions: string;
  price: number;
};

// El id de "Pintura" según tu base de datos
const PINTURA_CATEGORIA_ID = 132;

const Pintura: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/obras?categoriaId=${PINTURA_CATEGORIA_ID}`)
      .then((res) => res.json())
      .then((data) => {
        // Si tu API responde { obras: [...] }:
        const obras = Array.isArray(data.obras) ? data.obras : [];
        // mapear los campos para el grid
        setArtworks(
          obras.map((obra: any) => ({
            id: String(obra.id),
            image: obra.imagenUrl,
            artist: obra.artista?.nombre ?? obra.artista ?? "",
            title: obra.titulo,
            dimensions: obra.dimensiones ?? "",
            price: obra.precio ?? 0,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setArtworks([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando obras...</div>;
  if (!artworks.length)
    return (
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-8">Pintura</h2>
        <div>No hay obras de pintura cargadas aún. ¡Vuelve pronto!</div>
      </div>
    );

  return (
    <div className="px-6 py-8" style={{ paddingTop: "100px" }}>
      <h2 className="text-5xl font-semibold mb-8 text-[#990000]">Pinturas del alma</h2>
      <ArtworkGrid artworks={artworks} />
    </div>
  );
};

export default Pintura;