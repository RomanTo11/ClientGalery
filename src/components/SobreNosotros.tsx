import React from "react";

export default function SobreNosotros() {
  return (
    <section className="w-full max-w-3xl mx-auto py-16 px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>
        Sobre Nosotros
      </h2>
      <p className="text-lg text-gray-600 mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
        En Essentia nos apasiona el arte y su poder para transformar ambientes y emociones.
        Somos un equipo dedicado a conectar artistas y amantes del arte, curando obras únicas que inspiran y embellecen cualquier espacio.
      </p>
      <p className="text-md text-gray-500" style={{ fontFamily: "'Quicksand', sans-serif" }}>
        Nuestra misión es facilitar el acceso a obras de calidad, promover el talento artístico y construir una comunidad creativa y diversa.
        Descubre, conecta y vive el arte con nosotros.
      </p>
    </section>
  );
}