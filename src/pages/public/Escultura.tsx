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

// El id de "Escultura" según tu base de datos
const ESCULTURA_CATEGORIA_ID = 134; // ¡Cámbialo si tu base de datos usa otro!

const Escultura: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/obras?categoriaId=${ESCULTURA_CATEGORIA_ID}`)
      .then((res) => res.json())
      .then((data) => {
        const obras = Array.isArray(data.obras) ? data.obras : [];
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
        <h2 className="text-2xl font-bold mb-8">Escultura</h2>
        <div>No hay obras de escultura cargadas aún. ¡Vuelve pronto!</div>
      </div>
    );

  return (
    <div className="px-6 py-8" style={{ paddingTop: "100px" }}>
      <h2 className="text-5xl font-semibold mb-8 text-[#990000]">Esculturas originales</h2>
      <ArtworkGrid artworks={artworks} />
    </div>
  );
};

export default Escultura;