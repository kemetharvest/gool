import React from 'react';
import { motion } from 'framer-motion';

interface Broadcast {
  id: string;
  channel: string;
  status: 'live' | 'scheduled' | 'finished' | 'recorded';
  time?: string;
  matchTitle?: string;
  icon?: string;
}

interface Props {
  broadcasts: Broadcast[];
}

const statusConfig = {
  live: {
    label: 'مباشر',
    color: 'bg-red-500',
    textColor: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    icon: '🔴',
  },
  scheduled: {
    label: 'مجدول',
    color: 'bg-blue-500',
    textColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    icon: '🔵',
  },
  finished: {
    label: 'انتهى',
    color: 'bg-slate-500',
    textColor: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-50 dark:bg-slate-700',
    icon: '⚪',
  },
  recorded: {
    label: 'مسجل',
    color: 'bg-purple-500',
    textColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    icon: '🟣',
  },
};

export function BroadcastSection({ broadcasts }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-card dark:shadow-none border border-slate-200 dark:border-slate-700 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 p-4 flex items-center gap-2">
        <span className="text-2xl">📺</span>
        <h3 className="text-white font-bold text-lg">البث المباشر</h3>
      </div>

      {/* Content */}
      <div className="p-4">
        {broadcasts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-600 dark:text-slate-400">لا توجد بثوث متاحة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {broadcasts.map((broadcast, index) => {
              const config = statusConfig[broadcast.status];

              return (
                <motion.div
                  key={broadcast.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`${config.bgColor} rounded-lg p-3 border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-all`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-lg">{broadcast.icon || config.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {broadcast.channel}
                        </h4>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${config.textColor} ${config.bgColor}`}
                    >
                      {config.label}
                    </span>
                  </div>

                  {broadcast.status === 'live' && (
                    <div className="mb-2 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                        على الهواء مباشرة
                      </span>
                    </div>
                  )}

                  {broadcast.matchTitle && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate mb-2">
                      {broadcast.matchTitle}
                    </p>
                  )}

                  {broadcast.time && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">⏰ {broadcast.time}</p>
                  )}

                  <button className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white py-2 rounded text-xs font-semibold transition-colors">
                    {broadcast.status === 'live'
                      ? 'شاهد الآن'
                      : broadcast.status === 'recorded'
                        ? 'شاهد المسجل'
                        : broadcast.status === 'scheduled'
                          ? 'تذكري'
                          : 'إعادة عرض'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
