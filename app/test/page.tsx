import SongSearch from "@/components/SongSearch";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Prueba de Búsqueda de Canciones</h1>
      <SongSearch />
    </div>
  );
}