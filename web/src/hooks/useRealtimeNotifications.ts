import { useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gtieccjexcvgrqhbwosd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aWVjY2pleGN2Z3JxaGJ3b3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDU4NzAsImV4cCI6MjA5MDMyMTg3MH0.K5Uhdhn9CDr-FKoFVbGVkN9-KX4ZmDlinyAxSzjello';

const supabase = createClient(supabaseUrl, supabaseKey);

interface Notification {
  id: number;
  user_id: number;
  title: string;
  body: string;
  type?: string;
  is_read: boolean;
  created_at: string;
}

export function useRealtimeNotifications(
  userId: number | null,
  onNewNotification?: (notification: Notification) => void
) {
  const handleNewNotification = useCallback((payload: any) => {
    if (payload.new && onNewNotification) {
      onNewNotification(payload.new as Notification);
      
      // Show browser notification if permission granted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(payload.new.title, {
          body: payload.new.body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
        });
      }
    }
  }, [onNewNotification]);

  useEffect(() => {
    if (!userId) return;

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Subscribe to notifications table changes
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        handleNewNotification
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, handleNewNotification]);

  return { supabase };
}
