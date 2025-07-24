import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";
import ArtworkGrid from "../../components/Artworks/ArtworkGrid";

type Artwork = {
  id: string;
  image: string;
  artist: string;
  title: string;
  dimensions: string;
  price: number;
  originalPrice?: number;
};

export default function Obras() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      const res = await fetch(`${API_BASE_URL}/obras`);
      const data = await res.json();
      // Ajusta el mapeo según tu estructura de datos en la API
      setArtworks(
        data.obras.map((obra: any) => ({
          id: obra.id.toString(),
          image: obra.imagenUrl,
          artist: obra.artista,
          title: obra.titulo,
          dimensions: obra.dimensiones ?? "",
          price: Number(obra.precio),
          originalPrice: obra.precioOriginal ? Number(obra.precioOriginal) : undefined,
        }))
      );
    };
    fetchArtworks();
  }, []);

  return (
    <div className="px-6 py-8" style={{ paddingTop: "100px" }}>
      <h2 className="text-5xl font-semibold mb-8 text-[#772227]">Obras originales</h2>
      
      <ArtworkGrid artworks={artworks} />
    </div>
  );
}