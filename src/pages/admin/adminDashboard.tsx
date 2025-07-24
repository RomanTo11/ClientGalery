import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Puedes reemplazar este nombre por el del usuario logueado si lo tienes.
const ADMIN_NAME = "Admin";

const cards = [
  
    
  {
    to: "/admin-obras",
    title: "Obras",
    desc: "Administra, edita y elimina obras.",
    color: "from-green-400 to-green-600",
    icon: (
      <span className="text-4xl"></span>
    ),
  },
  {
    to: "/admin-artistas",
    title: "Artistas",
    desc: "Gestiona los perfiles de artistas.",
    color: "from-green-400 to-green-600",
    icon: (
      <span className="text-4xl"></span>
    ),
  },
  {
    to: "/admin-categorias",
    title: "Categorías",
    desc: "Organiza y administra categorías.",
    color: "from-green-400 to-green-600",
    icon: (
      <span className="text-4xl"></span>
    ),
  },
  {
    to: "/create-obra-form",
    title: "Registrar Obra",
    desc: "Agrega una nueva obra al catálogo.",
    color: "from-indigo-400 to-indigo-600",
    icon: (
      <span className="text-4xl"></span>
    ),
  },
  {
    to: "/create-artista-form",
    title: "Registrar Artista",
    desc: "Crea un nuevo perfil de artista.",
    color: "from-indigo-400 to-indigo-600",
    icon: (
      <span className="text-4xl"></span>
    ),
  },
  {
    to: "/create-categoria-form",
    title: "Registrar Categorías",
    desc: "Agrega una nueva categoría de obras.",
    color: "from-indigo-400 to-indigo-600", 
    icon: (
      <span className="text-4xl"> </span>
    ),
    
  },
  {
    to: "/create-evento-form",
    title: "Registrar Nuevos eventos o exposiciones",
    desc: "Agrega un nuevo evento.",
    color: "from-amber-400 to-amber-600",
    icon: (
      <span className="text-4xl"></span>
    ),
  },

  {
    to: "/admin-eventos",
    title: "Eventos Creados",
    desc: "Agrega un nuevo evento.",
    color: "from-amber-400 to-amber-600",
    icon: (
      <span className="text-4xl"></span>
    ),
  },

  {
    to: "/admin-usuarios",
    title: "Usuarios de la app",
    desc: "Mira nuestros usuarios de la aplicacion.",
    color: "from-amber-400 to-amber-600",
    icon: (
      <span className="text-4xl"></span>
    ),
  },
];

const sidebarItems = [
  { icon: <svg className="w-6 h-6" fill="none" stroke="#280B0D" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>, to: "/admin-dashboard" },
  { icon: <span className="text-2xl">🖼️</span>, to: "/admin-obras" },
  { icon: <span className="text-2xl">👤</span>, to: "/admin-artistas" },
  { icon: <span className="text-2xl">🏷️</span>, to: "/admin-categorias" },
  { icon: <span className="text-2xl">➕</span>, to: "/create-obra-form" },
  { icon: <span className="text-2xl">🚪</span>, to: "/", isLogout: true },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 bg-white border-r border-gray-100 flex flex-col items-center py-6 gap-6 fixed left-0 top-0 h-full z-10">
        <div className="mb-10">
          {/* Logo */}
          <span className="block text-3xl font-extrabold text-emerald-700">E</span>
        </div>
        <nav className="flex flex-col gap-6 flex-1 items-center">
          {sidebarItems.map((item, idx) =>
            item.isLogout ? (
              <button
                key={idx}
                onClick={handleLogout}
                className="hover:bg-gray-100 rounded-lg p-2 transition"
                title="Salir"
              >
                {item.icon}
              </button>
            ) : (
              <Link
                to={item.to}
                key={idx}
                className="hover:bg-gray-100 rounded-lg p-2 transition"
              >
                {item.icon}
              </Link>
            )
          )}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-20 px-8 py-8 relative">
        {/* Botón Logout en esquina superior derecha */}
        <button
          onClick={handleLogout}
          className="absolute right-8 top-8 flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold shadow transition z-20"
          title="Cerrar sesión"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
          <span>Logout</span>
        </button>
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">¡Buen día, {ADMIN_NAME}!</h1>
          <p className="text-lg text-gray-500">Panel de administración</p>
        </header>

        {/* Dashboard Cards */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, idx) => (
              <Link to={card.to} key={idx}
                className="group relative bg-white hover:shadow-2xl shadow-lg rounded-2xl p-6 flex flex-col justify-between min-h-[180px] transition border border-gray-100"
              >
                {/* Icon & BG pattern */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`rounded-xl bg-gradient-to-br ${card.color} p-3 text-white shadow`}>
                    {card.icon}
                  </div>
                  <span className="text-gray-200 group-hover:text-gray-400 transition text-3xl absolute right-6 top-6">
                    →
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{card.title}</h2>
                  <p className="text-gray-500 text-sm">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}