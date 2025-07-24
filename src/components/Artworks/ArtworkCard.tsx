import React from "react";

type Artwork = {
  id: string;
  image: string;
  artist: string;
  title: string;
  dimensions: string;
  price: number;
  originalPrice?: number;
};

const ArtworkCard: React.FC<{ artwork: Artwork }> = ({ artwork }) => (
  <div
    style={{
      width: "320px",
      height: "300px",
      boxSizing: "border-box",
      border: "1px solid #e6e6e6",
      borderRadius: "0px",
      background: "#FCF2E8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      margin: 0,
      padding: 0,
    }}
  >
    <button
      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
      aria-label="Agregar a favoritos"
      tabIndex={0}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      ♥
    </button>
    <img
      src={artwork.image}
      alt={artwork.title}
      style={{
        objectFit: "contain",
        maxHeight: "90%",
        maxWidth: "90%",
        width: "auto",
        height: "auto",
        borderRadius: 0,
      }}
    />
  </div>
);

export default ArtworkCard;