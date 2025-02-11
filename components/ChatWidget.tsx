// components/ChatWidget.tsx
'use client'

import { useEffect, useState, useRef, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, ChevronDown, Minimize2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useUser } from '@/lib/useUser'

export function ChatWidget() {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [friends, setFriends] = useState<any[]>([])
  const [minimizedChats, setMinimizedChats] = useState<string[]>([])
  const chatRef = useRef<HTMLDivElement>(null)

  // Obtener amigos
  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) return
      
      const { data, error } = await supabase
        .from('friendships')
        .select('friends:friend_id(*)')
        .eq('user_id', user.id)
        .eq('status', 'accepted')

      if (!error && data) {
        setFriends(data.map(f => f.friends))
      }
    }

    fetchFriends()
  }, [user])

  // Suscripción a mensajes en tiempo real
  useEffect(() => {
    if (!selectedFriend || !user) return

    const channel = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `and(receiver_id.eq.${user.id},sender_id.eq.${selectedFriend}),or(sender_id.eq.${user.id},receiver_id.eq.${selectedFriend})`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedFriend, user])

  // Cargar historial de mensajes
  useEffect(() => {
    if (!selectedFriend || !user) return

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedFriend}),and(sender_id.eq.${selectedFriend},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true })

      if (!error) setMessages(data || [])
    }

    loadMessages()
  }, [selectedFriend, user])

  const handleSendMessage = async () => {
    if (!selectedFriend || !messageInput.trim() || !user) return

    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        receiver_id: selectedFriend,
        content: messageInput
      })

    if (!error) {
      setMessageInput('')
    }
  }

  const handleMinimizeChat = (friendId: string) => {
    setMinimizedChats(prev => [...prev, friendId])
    setSelectedFriend(null)
  }

  const handleRestoreChat = (friendId: string) => {
    setMinimizedChats(prev => prev.filter(id => id !== friendId))
    setSelectedFriend(friendId)
  }

  const handleSelectFriend = (friendId: string) => {
    if (minimizedChats.includes(friendId)) {
      handleRestoreChat(friendId)
    } else {
      setSelectedFriend(friendId)
    }
  }

  const handleToggleChat = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
      setIsOpen(false)
      setSelectedFriend(null)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-64 mb-16"
          >
            <Card className="shadow-xl bg-white">
              <div className="p-4 bg-muted flex items-center justify-between">
                <h3 className="font-medium">Amigos</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="h-64 overflow-y-auto p-2">
                {friends.map(friend => (
                  <button
                    key={`friend-${friend.id}`}
                    onClick={() => handleSelectFriend(friend.id)}
                    className="w-full p-3 hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={friend.avatar_url} />
                      <AvatarFallback>{friend.email?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">{friend.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {friend.last_sign_in_at ? 'En línea' : 'Desconectado'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedFriend && !minimizedChats.includes(selectedFriend) && (
          <motion.div
            key={`chat-${selectedFriend}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-80 mb-16"
          >
            <Card className="shadow-xl bg-white">
              <div className="p-4 bg-muted flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={friends.find(f => f.id === selectedFriend)?.avatar_url} />
                    <AvatarFallback>
                      {friends.find(f => f.id === selectedFriend)?.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {friends.find(f => f.id === selectedFriend)?.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMinimizeChat(selectedFriend)}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFriend(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="h-64 p-4 overflow-y-auto flex flex-col gap-4">
                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.sender_id === user?.id ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg ${
                        message.sender_id === user?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setMessageInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  onKeyDown={(e: { key: string }) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 flex gap-2">
        <Button
          onClick={handleToggleChat}
          className="rounded-full h-12 w-12"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        {minimizedChats.map(friendId => (
          <Button
            key={`minimized-${friendId}`}
            onClick={() => handleRestoreChat(friendId)}
            className="rounded-full h-12 w-12"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={friends.find(f => f.id === friendId)?.avatar_url} />
              <AvatarFallback>
                {friends.find(f => f.id === friendId)?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        ))}
      </div>
    </div>
  )
}