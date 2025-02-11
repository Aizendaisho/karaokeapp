import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { ChatWidget } from '@/components/ChatWidget'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KaraokeFun',
  description: 'La mejor app de karaoke en línea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        
      <Toaster position="top-center" richColors />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <ChatWidget />
        
      </body>
    </html>
  )
}