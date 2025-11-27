import React from 'react';
import { motion } from 'framer-motion';
import type { Match } from '@/types/index';

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  const isLive = match.status === 'inprogress';
  const isFinished = match.status === 'finished';
  const isScheduled = match.status === 'scheduled';

  const kickoffDate = new Date(match.kickoffTime);
  const timeStr = kickoffDate.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { 
      y: -12, 
      boxShadow: isLive 
        ? '0 30px 60px rgba(239, 68, 68, 0.35)' 
        : '0 30px 60px rgba(59, 130, 246, 0.25)',
      transition: { duration: 0.2 }
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      onClick={onClick}
      className={`relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 backdrop-blur-sm ${
        isLive
          ? 'bg-gradient-to-br from-slate-800 via-red-900/30 to-slate-900 border-2 border-accent-red/60 shadow-2xl'
          : isFinished
          ? 'bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50'
          : 'bg-gradient-to-br from-slate-700/80 to-slate-800/80 border border-slate-600/30 shadow-lg'
      }`}
    >
      {/* Live Animated Background */}
      {isLive && (
        <>
          <motion.div
            animate={{ opacity: [0.2, 0.05, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-gradient-to-r from-accent-red/20 via-transparent to-orange-500/20"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute -inset-1 bg-gradient-to-r from-accent-red to-orange-500 opacity-0 blur-xl"
          />
        </>
      )}

      <div className="relative p-5 sm:p-6">
        {/* League Info with Enhanced Styling */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-500/30 dark:border-slate-600/30">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.08 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 15 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-red-500/20 rounded-lg blur-md"></div>
              <div className="w-9 h-9 flex items-center justify-center relative z-10 drop-shadow-lg text-lg font-bold">
                {match.league.logo}
              </div>
            </motion.div>
            <span className="text-sm font-black text-white/90 uppercase tracking-wider">
              {match.league.nameAr}
            </span>
          </motion.div>
          <motion.span 
            className="text-xs text-slate-300/80 font-semibold bg-slate-900/50 px-3 py-1.5 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            {match.venue?.name}
          </motion.span>
        </div>

        {/* Match Body */}
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Home Team */}
          <motion.div
            className="flex-1 text-center group/team"
            whileHover={{ scale: 1.08 }}
          >
            <motion.div
              className="relative mb-3 flex justify-center"
              whileHover={{ scale: 1.15 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-slate-700/20 rounded-xl blur-lg"></div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative z-10 drop-shadow-xl text-4xl sm:text-5xl font-bold">
                {match.homeTeam.logo}
              </div>
            </motion.div>
            <div className="text-xs sm:text-sm font-black text-white/95 leading-tight line-clamp-2 group-hover/team:text-primary-300 transition-colors">
              {match.homeTeam.nameAr}
            </div>
          </motion.div>

          {/* Score & Status - Enhanced */}
          <motion.div
            className="flex-1 mx-2 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className={`text-3xl sm:text-4xl font-black mb-2 drop-shadow-lg ${
                isLive
                  ? 'text-accent-red/95 bg-gradient-to-r from-accent-red/10 to-orange-500/10 py-2 rounded-lg'
                  : isFinished
                  ? 'text-slate-200'
                  : 'text-white'
              }`}
              animate={isLive ? { scale: [1, 1.08, 1] } : {}}
              transition={isLive ? { repeat: Infinity, duration: 1.5 } : {}}
            >
              {match.homeScore} <span className="text-lg opacity-60">-</span> {match.awayScore}
            </motion.div>

            {/* Status Badge - Premium */}
            {isLive && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-red to-orange-500 text-white text-xs font-black rounded-full shadow-2xl border border-accent-red/50">
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-lg"
                  >
                    🔴
                  </motion.span>
                  مباشر
                </span>
              </motion.div>
            )}
            {isScheduled && (
              <motion.div 
                className="text-sm sm:text-base text-primary-300 font-black bg-primary-500/10 px-3 py-2 rounded-lg inline-block"
                whileHover={{ scale: 1.05 }}
              >
                ⏰ {timeStr}
              </motion.div>
            )}
            {isFinished && (
              <motion.span 
                className="inline-block px-4 py-2 bg-slate-600/50 text-slate-100 text-xs font-black rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                ✓ انتهت
              </motion.span>
            )}

            {isLive && match.minute > 0 && (
              <motion.div
                className="text-xs sm:text-sm text-accent-red font-black mt-2 bg-accent-red/10 px-2 py-1 rounded inline-block"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {match.minute}' ⌛
              </motion.div>
            )}
          </motion.div>

          {/* Away Team */}
          <motion.div
            className="flex-1 text-center group/team"
            whileHover={{ scale: 1.08 }}
          >
            <motion.div
              className="relative mb-3 flex justify-center"
              whileHover={{ scale: 1.15 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-slate-700/20 rounded-xl blur-lg"></div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative z-10 drop-shadow-xl text-4xl sm:text-5xl font-bold">
                {match.awayTeam.logo}
              </div>
            </motion.div>
            <div className="text-xs sm:text-sm font-black text-white/95 leading-tight line-clamp-2 group-hover/team:text-primary-300 transition-colors">
              {match.awayTeam.nameAr}
            </div>
          </motion.div>
        </div>

        {/* Channel Info - Enhanced */}
        {match.channel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-5 pt-4 border-t border-slate-500/30 text-xs sm:text-sm text-slate-200 text-center font-bold hover:text-accent-red transition-colors bg-slate-900/30 px-3 py-2 rounded-lg"
          >
            📺 {match.channel}
          </motion.div>
        )}

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary-500/0 to-accent-red-500/0 opacity-0 pointer-events-none group-hover:opacity-20 blur-lg transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
}
