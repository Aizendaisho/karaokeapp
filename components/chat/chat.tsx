import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { User } from '@supabase/supabase-js';

interface ChatProps {
  user: User | null;
}

export default function Chat({ user }: ChatProps) {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        async function fetchMessages() {
            const { data } = await supabase
                .from('messages')
                .select('*, users(username, avatar_url)')
                .order('created_at', { ascending: true });
            setMessages(data || []);
        }
        fetchMessages();

        const subscription = supabase
            .channel('realtime chat')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload: any) => {
                setMessages((prev) => [...prev, payload.new]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const sendMessage = async () => {
        if (!newMessage.trim() || !user) return;

        await supabase.from('messages').insert([
            { content: newMessage, user_id: user.id }
        ]);
        setNewMessage('');
    };

    return (
        <Card className="max-w-md mx-auto p-4 shadow-lg">
            <CardContent className="h-64 overflow-y-auto mb-4 border p-2">
                {messages.map((msg) => (
                    <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className={`p-2 rounded-md ${msg.user_id === user?.id ? 'bg-blue-200' : 'bg-gray-200'}`}
                    >
                        <div className="flex items-center gap-2">
                            <img src={msg.users?.avatar_url || '/default-avatar.png'} alt="avatar" className="w-6 h-6 rounded-full" />
                            <span className="font-semibold text-sm">{msg.users?.username || 'Usuario'}</span>
                        </div>
                        <p className="text-sm">{msg.content}</p>
                    </motion.div>
                ))}
            </CardContent>
            <div className="flex">
                <Input
                    type="text"
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <Button className="ml-2" onClick={sendMessage}>Enviar</Button>
            </div>
        </Card>
    );
}
