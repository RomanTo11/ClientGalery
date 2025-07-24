import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/Buttons/ExploreButtons";
import Footer from "../../components/Footer";
import SobreNosotros from "../../components/SobreNosotros";

export default function Home() {
  return (
    <main className="w-full">
      {/* Hero ocupa toda la pantalla con color personalizado */}
      <section
        className="w-full flex flex-col items-center justify-center px-4"
        style={{
          minHeight: "100vh",
          background: "#F7ECE9", // Cambia este valor por el color que quieras
        }}
      >
        <h1
          className="text-4xl md:text-6xl font-bold text-amber-950 mb-6"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Essentia
        </h1>
        <p
          className="text-lg md:text-2xl text-gray-600 mb-8 text-center"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Descubre arte que transforma espacios.
        </p>
        <Link to="/obras">
          <CustomButton>
            Explorar obras
          </CustomButton>
        </Link>
      
      </section>
      <SobreNosotros />

      <Footer />
    </main>
  );
}