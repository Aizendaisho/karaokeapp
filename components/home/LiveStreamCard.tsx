import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function LiveStreamCard() {
  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="relative overflow-hidden"
    >
      <Card className="border-2 border-red-500">
        <div className="aspect-video bg-muted relative">
          <div className="absolute top-2 left-2 bg-red-500 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <span className="animate-pulse">●</span> EN VIVO
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold">Transmisión de @AnaCanta</h3>
          <p className="text-muted-foreground">Interpretando: "Someone Like You"</p>
          <div className="mt-4 flex justify-between items-center">
            <span>🎤 1.2k espectadores</span>
            <Button variant="destructive">Unirse</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}