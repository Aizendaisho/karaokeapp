import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export default function ChallengeCard() {
  return (
    <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">🎧 Reto Semanal</h3>
          <p className="text-muted-foreground">Canta una balada de los 80s</p>
        </div>
        <span className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full text-sm">3 días restantes</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>Participantes</span>
            <span>345/500</span>
          </div>
          <Progress value={69} className="h-2" />
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1">Unirse al reto</Button>
          <Button variant="outline">Ver detalles</Button>
        </div>
      </div>
    </Card>
  )
}