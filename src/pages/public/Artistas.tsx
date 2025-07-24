import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";

type Artista = {
  id: string;
  nombre: string;
  pais: string;
  imagenUrl: string;
};

const Artistas: React.FC = () => {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/artistas`)
      .then(res => res.json())
      .then(data => {
        const lista = Array.isArray(data.artistas) ? data.artistas : [];
        setArtistas(
          lista.map((artista: any) => ({
            id: String(artista.id),
            nombre: artista.nombre,
            pais: artista.pais,
            imagenUrl: artista.imagenUrl,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setArtistas([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando artistas...</div>;
  if (!artistas.length)
    return (
      <div className="px-8 py-8">
        <h2 className="text-2xl font-bold mb-8">Artistas contemporáneos en EssentiaRt</h2>
        <div>No hay artistas registrados aún.</div>
      </div>
    );

  return (
    <div>
      <div
        style={{
          width: "100%",
          background: "#25130E",
          padding: "2rem 0",
          marginTop: "2cm",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-100">
          Artistas contemporáneos en EssentiaRt
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "3rem",
          justifyItems: "center",
          maxWidth: "900px", // 3*220px + gaps = 900px aprox.
          margin: "3rem auto", // Centra el grid en la pantalla
        }}
      >
        {artistas.map(artista => (
          <div
            key={artista.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "220px",
            }}
          >
            <div
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#222",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={artista.imagenUrl}
                alt={artista.nombre}
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div
              style={{
                marginTop: "-50px",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                borderRadius: "24px",
                padding: "8px 18px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                width: "160px",
              }}
            >
              {artista.nombre}
              <br />
              <span style={{ fontWeight: 400, fontSize: "0.9rem" }}>
                {artista.pais}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artistas;