'use client'

import { motion } from 'framer-motion'
import { useUser } from '@/lib/useUser';
import { Button } from '@/components/ui/button'
import SocialActivityCard from '@/components/home/SocialActivityCard'
import LiveStreamCard from '@/components/home/LiveStreamCard'
import ChallengeCard from '@/components/home/ChallengeCard'
import TrendingSongCard from '@/components/home/TrendingSongCard'
import LeaderboardCard from '@/components/home/LeaderboardCard'
import Chat from '@/components/chat/chat'
import { Navbar } from '@/components/layout/Navbar';

export default function DashboardPage() {
    const { user, loading } = useUser();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto p-4 pb-24"
    >
      {/* Grid Principal */}
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda - Actividad Social */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Tu Feed</h2>
          <SocialActivityCard />
          <LiveStreamCard />
          <ChallengeCard />
        </motion.div>

        {/* Columna Derecha - Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          <TrendingSongCard />
          <LeaderboardCard />
          <Chat user={user} />
        </motion.div>
      </div>

      {/* Botón Flotante */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button className="rounded-full p-6 h-14 shadow-xl bg-purple-600 hover:bg-purple-700 text-lg">
          🎤 Cantar ahora
        </Button>
      </motion.div>
    </motion.div>
  )
}