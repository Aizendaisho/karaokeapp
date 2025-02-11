import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'

const activities = [
  {
    user: "María Gómez",
    action: "retó a Juan Pérez a un duelo de 'Bohemian Rhapsody'",
    time: "Hace 15 min"
  },
  {
    user: "Carlos Ruiz",
    action: "alcanzó el puesto #3 en el ranking semanal",
    time: "Hace 2 horas"
  }
]

export default function SocialActivityCard() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <Avatar>
              <AvatarImage src={`/avatars/${index + 1}.jpg`} />
              <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{activity.user}</p>
              <p className="text-muted-foreground">{activity.action}</p>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}