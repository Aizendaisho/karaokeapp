'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function HeroBanner() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-purple-900 mb-6"
        >
          ¡Canta como nunca antes!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-purple-700 mb-8"
        >
          La app de karaoke que transforma tu voz en diversión
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-xl px-8 py-6 rounded-full shadow-lg"
          >
            ¡Empieza gratis!
          </Button>
        </motion.div>
      </div>
    </section>
  )
}