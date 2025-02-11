// components/SongTester.tsx

import { useState } from "react";

interface Song {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  preview_url?: string;
}

interface SongTesterProps {
  searchFunction: (query: string) => Promise<Song[]>;
  apiName: string;
}

const SongTester = ({ searchFunction, apiName }: SongTesterProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const songs = await searchFunction(query);
      setResults(songs);
    } catch (error) {
      console.error(`Error al buscar canciones con ${apiName}:`, error);
      alert(`Error al buscar canciones con ${apiName}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{apiName}</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Buscar en ${apiName}...`}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>

      <div className="mt-4">
        {results.length > 0 ? (
          <ul>
            {results.map((song) => (
              <li key={song.id} className="p-2 bg-gray-100 rounded mb-2">
                <strong>{song.title}</strong> - {song.artist}
                {song.preview_url && (
                  <audio controls src={song.preview_url} className="w-full mt-2" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay resultados.</p>
        )}
      </div>
    </div>
  );
};

export default SongTester;