import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavItem from "../../components/Buttons/Navitems";
import { LoginButton, RegisterButton } from "../../components/Buttons/AuthButtons";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 70) {
        // Scrolling down: hide navbar
        setShow(false);
      } else if (currentScroll < lastScroll) {
        // Scrolling up: show navbar
        setShow(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 select-none">
        <span className="text-2xl font-bold tracking-tight text-black font-sans">
          ESSENTIA<span className="ml-1">🍂</span>
        </span>
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-10 items-center">
          <NavItem to="/pintura" variant="underline">Pintura</NavItem>
          <NavItem to="/fotografia" variant="underline">Fotografia</NavItem>
          <NavItem to="/escultura" variant="underline">Escultura</NavItem>
          <NavItem to="/dibujo" variant="underline">Dibujo</NavItem>
          <NavItem to="/artistas" variant="underline">Artistas</NavItem>
          
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-x-2">
        <Link to="/Login">
          <LoginButton>Log In</LoginButton>
        </Link>
        <Link to="/Register">
          <RegisterButton>Sign Up</RegisterButton>
        </Link>
      </div>

      {/* Hamburger (mobile only) */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Abrir menú"
      >
        <svg
          className={`w-7 h-7 text-black transition-transform ${
            open ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8h16M4 16h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden fixed inset-0 top-0 left-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-64 bg-white h-full shadow-lg flex flex-col gap-8 px-6 py-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              to="/"
              className="text-xl font-bold text-black mb-2"
              onClick={() => setOpen(false)}
            >
              ESSENTIA 🍂
            </Link>
            <nav className="flex flex-col gap-4">
              <Link
                to="/categorias"
                className="font-semibold text-black uppercase tracking-wide hover:text-amber-600 transition py-2"
                onClick={() => setOpen(false)}
              >
                Categorías
              </Link>
              <Link
                to="/obras"
                className="font-semibold text-black uppercase tracking-wide hover:text-amber-600 transition py-2"
                onClick={() => setOpen(false)}
              >
                Obras
              </Link>
              <Link
                to="/artistas"
                className="font-semibold text-black uppercase tracking-wide hover:text-amber-600 transition py-2"
                onClick={() => setOpen(false)}
              >
                Artistas
              </Link>
              <Link
                to="/login"
                className="font-semibold text-black uppercase tracking-wide hover:text-pink-600 transition py-2"
                onClick={() => setOpen(false)}
              >
                Iniciar sesión
              </Link>
              <button className="bg-black text-white font-bold uppercase tracking-wide py-2 rounded transition hover:bg-gray-800 mt-2">
                Empezar
              </button>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}