'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    name: "Ana Martínez",
    role: "Cantante amateur",
    text: "¡La mejor app para practicar! He mejorado mi afinación un 200%",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Carlos Gómez",
    role: "Profesor de música",
    text: "Mis alumnos la adoran. La interfaz es increíblemente intuitiva",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Luisa Fernández",
    role: "Streamer",
    text: "Mis viewers flipan con las batallas de karaoke en directo",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
          Lo que dicen nuestros usuarios
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-purple-900">{testimonial.name}</p>
                    <p className="text-sm text-purple-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-purple-700 italic">"{testimonial.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}