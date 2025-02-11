// app/components/SongSearch.tsx

"use client"; // Indica que este es un componente del lado del cliente

import { useState, useEffect } from "react";
import { searchSongs } from "@/app/services/SongService";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  preview_url?: string;
}

const SongSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Limpiar el timeout anterior si el usuario sigue escribiendo
    let debounceTimer: NodeJS.Timeout;

    if (query.trim()) {
      setLoading(true);
      debounceTimer = setTimeout(async () => {
        try {
          const songs = await searchSongs(query);
          setResults(songs.slice(0, 3)); // Limitar a 5 resultados
        } catch (error) {
          console.error("Error al buscar canciones:", error);
          alert("Error al buscar canciones");
        } finally {
          setLoading(false);
        }
      }, 1000); // Esperar 2 segundos después de que el usuario deje de escribir
    } else {
      setResults([]); // Limpiar resultados si no hay consulta
    }

    // Limpiar el timeout cuando el componente se desmonta o cambia la query
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Buscar Canciones</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por título o artista..."
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Contenedor de resultados con altura fija */}
      <div className="mt-4 h-[150px] overflow-hidden border-t pt-2">
        {loading && <p className="p-2 text-center">Buscando...</p>}
        {results.length > 0 ? (
          <ul className="space-y-2 overflow-hidden">
            {results.map((song) => (
              <li key={song.id} className="p-2 bg-gray-100 rounded">
                <strong>{song.title}</strong> - {song.artist}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="p-2 text-center">No hay resultados.</p>
        )}
      </div>
    </div>
  );
};

export default SongSearch;