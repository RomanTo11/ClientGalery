import React from "react";

type Artwork = {
  id: string;
  artist: string;
  title: string;
  dimensions: string;
  price: number;
  originalPrice?: number;
};

const ArtworkInfo: React.FC<{ artwork: Artwork }> = ({ artwork }) => (
  <div
    style={{
      width: "320px",
      padding: "8px 4px 0 4px",
      background: "transparent",
      textAlign: "left",
      margin: "0 auto",
    }}
  >
    <p style={{ fontSize: "15px", color: "#444", fontWeight: 500, marginBottom: 4 }}>{artwork.artist}</p>
    <p style={{ fontSize: "16px", fontWeight: 600, color: "#24245c", marginBottom: 2, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} title={artwork.title}>
      {artwork.title}
    </p>
    <p style={{ fontSize: "13px", color: "#888", marginBottom: 4 }}>{artwork.dimensions}</p>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {artwork.originalPrice ? (
        <>
          <span style={{ fontSize: "13px", textDecoration: "line-through", color: "#bbb" }}>
            ${artwork.originalPrice.toLocaleString()}
          </span>
          <span style={{ fontSize: "17px", fontWeight: 700, color: "#24245c" }}>
            ${artwork.price.toLocaleString()}
          </span>
          <span style={{ fontSize: "12px", color: "#c00", fontWeight: 700 }}>
            -{Math.round(100 * (1 - artwork.price / artwork.originalPrice))}%
          </span>
        </>
      ) : (
        <span style={{ fontSize: "17px", fontWeight: 700, color: "#24245c" }}>
          ${artwork.price.toLocaleString()}
        </span>
      )}
    </div>
  </div>
);

export default ArtworkInfo;