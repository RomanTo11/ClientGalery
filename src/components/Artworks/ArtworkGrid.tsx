import React from "react";
import ArtworkCard from "./ArtworkCard";
import ArtworkInfo from "./ArtworkInfo";

type Artwork = {
  id: string;
  image: string;
  artist: string;
  title: string;
  dimensions: string;
  price: number;
  originalPrice?: number;
};

const ArtworkGrid: React.FC<{ artworks: Artwork[] }> = ({ artworks }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 320px)",
      gap: "22px",
      justifyContent: "left",
      maxWidth: "100vw",
      margin: "0 auto",
      background: "white",
      padding: "32px 0",
    }}
  >
    {artworks.map((artwork) => (
      <div key={artwork.id}>
        <ArtworkCard artwork={artwork} />
        <ArtworkInfo artwork={artwork} />
      </div>
    ))}
  </div>
);

export default ArtworkGrid;