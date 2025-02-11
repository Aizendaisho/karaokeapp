import { Card } from '@/components/ui/card'

const trendingSongs = [
  { title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", attempts: "5.2K" },
  { title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", attempts: "3.8K" }
]

export default function TrendingSongCard() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">🔥 Canciones Trendings</h3>
      <div className="space-y-4">
        {trendingSongs.map((song, index) => (
          <div key={index} className="flex items-center justify-between hover:bg-muted/50 p-2 rounded">
            <div>
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-muted-foreground">{song.artist} • {song.genre}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{song.attempts} intentos</span>
              <button className="text-purple-600 hover:text-purple-700">🎤</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}