import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Obra {
  id: number;
  titulo: string;
  imagenUrl: string;
}

export default function ObrasPorCategoria() {
  const { id } = useParams();
  const [obras, setObras] = useState<Obra[]>([]);

  useEffect(() => {
    const fetchObras = async () => {
      const res = await fetch(`http://localhost:3002/categorias/${id}/obras`);
      const data = await res.json();
      setObras(data.obras);
    };
    fetchObras();
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4 font-bold">Obras de la Categoría</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {obras.map((obra) => (
          <div key={obra.id} className="border p-4 rounded shadow">
            <img src={obra.imagenUrl} alt={obra.titulo} className="w-full h-48 object-cover mb-2"/>
            <h2 className="text-xl font-semibold">{obra.titulo}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
