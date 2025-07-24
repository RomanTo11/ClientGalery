import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/public/Home';

// Auth
import Login from './pages/public/login';
import Register from './pages/public/register'; 

// Navbar items
import Navbar from './pages/public/NavBar';
import Pintura from './pages/public/Pintura';
import Fotografia from './pages/public/Fotografia';
import Dibujo from './pages/public/Dibujo';
import Escultura from './pages/public/Escultura';

// Admin dashboard
import AdminDashboard from './pages/admin/adminDashboard';
import CreateObraForm from './pages/admin/CreateObraForm';
import CreateArtistaForm from './pages/admin/CreateArtistaForm';
import CreateCategoriaForm from './pages/admin/CreateCategoriaForm';
import CreateEventoForm from './pages/admin/CreateEvento';

import ArtistasAdmin from './pages/admin/ArtistasAdmin';
import ObrasAdmin from './pages/admin/AobrasAdmin';
import CategoriasAdmin from './pages/admin/CategoriasAdmin';
import UsuariosApp from './pages/admin/UsuariosApp';
import EventosListView from './pages/admin/adminEventos';

// Edit routes
import EditarCategoria from './pages/admin/UpdateCategoria';
import EditarArtista from './pages/admin/UpdateArtistas';
import EditarObra from './pages/admin/UpdateObras';
import EditEventoForm from './pages/admin/UpdateEventos';

// Public pages
import Categorias from './pages/Categorias';
import Artistas from './pages/public/Artistas';
import Obras from './pages/public/Obras';

// Helper: obtener el usuario actual desde localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem("user");
    try {
        return userStr ? JSON.parse(userStr) : null;
    } catch {
        return null;
    }
}

import type { ReactNode } from 'react';
import EditarEventos from './pages/admin/UpdateEventos';

function AdminRoute({ children }: { children: ReactNode }) {
    const user = getCurrentUser();
    if (user && user.rol === "admin") {
        return children;
    }
    return <Navigate to="/" />;
}

export default function AppRoutes() {
    const location = useLocation();

    const hideNavbar =
        location.pathname.startsWith("/admin") ||
        location.pathname.startsWith("/create-") ||
        location.pathname.includes("/editar");

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas de admin */}
                {/* Elimina o reemplaza esta sección con rutas protegidas si es necesario */}

                {/* Admin Routes protegidas */}
                {[
                    { path: "/admin-dashboard", element: <AdminDashboard /> },
                    { path: "/create-obra-form", element: <CreateObraForm /> },
                    { path: "/create-artista-form", element: <CreateArtistaForm /> },
                    { path: "/create-categoria-form", element: <CreateCategoriaForm /> },
                    { path: "/create-evento-form", element: <CreateEventoForm /> },
                    { path: "/admin-obras", element: <ObrasAdmin /> },
                    { path: "/admin-artistas", element: <ArtistasAdmin /> },
                    { path: "/admin-categorias", element: <CategoriasAdmin /> },
                    { path: "/admin-usuarios", element: <UsuariosApp /> },
                    { path: "/admin-eventos", element: <EventosListView /> },


                    { path: "/obras/editar/:id", element: <EditarObra /> },
                    { path: "/artistas/editar/:id", element: <EditarArtista /> },
                    { path: "/categorias/editar/:id", element: <EditarCategoria /> },
                    { path: "/eventos/editar/:id", element: <EditarEventos/> }
                ].map(({ path, element }) => (
                    <Route key={path} path={path} element={<AdminRoute>{element}</AdminRoute>} />
                ))}
                
                {/* Public Routes */}
                <Route path="/obras" element={<Obras />} />
                <Route path="/categorias" element={<Categorias />} />

                {/* Navbar gallery items */}
                <Route path="/pintura" element={<Pintura />} />
                <Route path="/fotografia" element={<Fotografia />} />
                <Route path="/dibujo" element={<Dibujo />} />
                <Route path="/escultura" element={<Escultura />} />
                <Route path="/artistas" element={<Artistas />} />
            </Routes>
        </>
    );
}