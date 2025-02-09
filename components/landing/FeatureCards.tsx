'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

const features = [
  {
    title: "🎤 Puntuación en Tiempo Real",
    description: "Obtén feedback inmediato de tu precisión vocal"
  },
  {
    title: "🎶 Miles de Canciones",
    description: "Desde clásicos hasta los últimos éxitos"
  },
  {
    title: "🏆 Compite con Amigos",
    description: "Tablas de clasificación y desafíos semanales"
  }
]

export function FeatureCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full border-orange-100 bg-purple-50 hover:bg-purple-100 transition-colors">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-purple-700">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}