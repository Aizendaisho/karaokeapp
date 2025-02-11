// app/services/SongService.ts

interface Song {
    id: number;
    title: string;
    artist: string;
    album: string;
    preview_url?: string;
  }
  
  // Datos falsos (mock)
  const fakeSongs = [
    { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera" },
    { id: 2, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV" },
    { id: 3, title: "Hotel California", artist: "Eagles", album: "Hotel California" },
    { id: 4, title: "Imagine", artist: "John Lennon", album: "Imagine" },
    { id: 5, title: "Hey Jude", artist: "The Beatles", album: "The Beatles" },
    { id: 6, title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind" },
    { id: 7, title: "Sweet Child O' Mine", artist: "Guns N' Roses", album: "Appetite for Destruction" },
    { id: 8, title: "Like a Rolling Stone", artist: "Bob Dylan", album: "Highway 61 Revisited" },
    { id: 9, title: "I Want to Hold Your Hand", artist: "The Beatles", album: "Meet The Beatles!" },
    { id: 10, title: "Purple Haze", artist: "Jimi Hendrix", album: "Are You Experienced" },
    { id: 11, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller" },
    { id: 12, title: "Let It Be", artist: "The Beatles", album: "Let It Be" },
    { id: 13, title: "Wonderwall", artist: "Oasis", album: "(What's the Story) Morning Glory?" },
    { id: 14, title: "Hallelujah", artist: "Leonard Cohen", album: "Various Positions" },
    { id: 15, title: "Shape of You", artist: "Ed Sheeran", album: "÷" },
    { id: 16, title: "Rolling in the Deep", artist: "Adele", album: "21" },
    { id: 17, title: "Despacito", artist: "Luis Fonsi", album: "Vida" },
    { id: 18, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
    { id: 19, title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", album: "Uptown Special" },
    { id: 20, title: "Bad Guy", artist: "Billie Eilish", album: "When We All Fall Asleep, Where Do We Go?" },
  ];
  
  export const searchSongs = async (query: string): Promise<Song[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = fakeSongs.filter(
          (song) =>
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results.slice(0, 5)); // Limitar a 5 resultados
      }, 500); // Simula un retraso de 500ms
    });
  };