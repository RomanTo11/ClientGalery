import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Categoria {
  id: number;
  nombre: string;
}

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const res = await fetch("http://localhost:3002/categories");
      const data = await res.json();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4 font-bold">Categorías</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categorias.map((cat) => (
          <li key={cat.id} className="border p-4 rounded shadow text-center">
            <Link to={`/categoria/${cat.id}`} className="text-lg font-semibold hover:underline">
              {cat.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
