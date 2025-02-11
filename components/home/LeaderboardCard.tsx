import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const leaders = [
  { name: "Carlos M.", score: "9,850", position: 1 },
  { name: "Ana Torres", score: "9,720", position: 2 }
]

export default function LeaderboardCard() {
  return (
    <Card className="p-6 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-900/20">
      <h3 className="text-lg font-semibold mb-4">🏆 Ranking Global</h3>
      <div className="space-y-4">
        {leaders.map((leader, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="font-bold w-8">#{leader.position}</span>
            <Avatar>
              <AvatarImage src={`/avatars/leader-${index + 1}.jpg`} />
              <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{leader.name}</p>
              <p className="text-sm text-muted-foreground">{leader.score} puntos</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}