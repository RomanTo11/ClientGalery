import { API_BASE_URL } from "./config";

// Función para iniciar sesión
export async function registerUser(user: { fullName: string; email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
}

// Creación de una nueva categoría
export async function createCategoria(categoria: { 
  nombre: string; 
  descripcion: string; 
  imagenUrl: string; // Corrige a imagenUrl (no imagenURL) si tu backend lo espera así
  fechaCreacion: string; 
}) {
  const response = await fetch(`${API_BASE_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  return response.json();
}

// Creación de un nuevo artista
export async function createArtista(artista: {
  nombre: string;
  biografia?: string;
  pais?: string;
  fechaNacimiento?: string;
  imagenUrl: string; 
  descripcion?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/artistas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artista),
  });
  return response.json();
}

// creacion de una nueva obra de arte
export async function createObraArte(obra: {
  titulo: string;
  descripcion: string;
  precio: number;
  tecnica: string;
  dimensiones: string;
  fechaCreacion: string;
  categoriaId: number;
  artistaId: number;
  imagenUrl: string; 
}) {
  const response = await fetch(`${API_BASE_URL}/obras`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obra),
  });

  // Solo intentamos parsear JSON si hay body
  let data;
  const text = await response.text();

  if (text) {
    data = JSON.parse(text);
  } else {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
  }

  return data;
}