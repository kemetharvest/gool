import React from 'react';
import { motion } from 'framer-motion';
import type { Event } from '@/types/index';

interface EventsTimelineProps {
  events: Event[];
  isLoading?: boolean;
}

export function EventsTimeline({ events, isLoading = false }: EventsTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => b.minute - a.minute);

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'goal':
        return '⚽';
      case 'card':
        return '🟨';
      case 'substitution':
        return '🔄';
      case 'start':
        return '▶️';
      case 'end':
        return '⏹️';
      default:
        return '•';
    }
  };

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'goal':
        return 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700';
      case 'card':
        return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700';
      case 'substitution':
        return 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700';
      default:
        return 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-slate-500">جاري التحميل...</div>;
  }

  if (events.length === 0) {
    return <div className="text-center py-8 text-slate-500">لا توجد أحداث حتى الآن</div>;
  }

  return (
    <div className="space-y-4">
      {sortedEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`border-r-4 border-red-500 pl-4 py-3 rounded ${getEventColor(event.type)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{getEventIcon(event.type)}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {event.player.nameAr}
                </span>
                {event.cardType && (
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    event.cardType === 'red'
                      ? 'bg-red-600 text-white'
                      : 'bg-yellow-400 text-black'
                  }`}>
                    {event.cardType === 'red' ? 'بطاقة حمراء' : 'بطاقة صفراء'}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">{event.descriptionAr}</p>
              {event.assistPlayer && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  تمريرة: {event.assistPlayer.name}
                </p>
              )}
            </div>
            <div className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-4">
              {event.minute}'
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
