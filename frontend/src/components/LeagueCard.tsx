import React from 'react';
import { motion } from 'framer-motion';
import type { League } from '@/types/index';

interface LeagueCardProps {
  league: League;
  onClick?: () => void;
  isSelected?: boolean;
}

export function LeagueCard({ league, onClick, isSelected = false }: LeagueCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        group bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 
        rounded-xl shadow-lg hover:shadow-2xl p-6 text-center cursor-pointer transition-all h-full 
        flex flex-col justify-center border-2 backdrop-blur-sm
        ${isSelected
          ? 'ring-2 ring-primary-400 border-primary-500 bg-gradient-to-br from-primary-900/40 to-slate-800'
          : 'border-slate-600 hover:border-primary-500'
        }
      `}
    >
      {/* League Icon */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 8 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="relative mb-4"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={league.logo}
          alt={league.nameAr}
          className="w-20 h-20 mx-auto relative z-10 drop-shadow-lg object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.src = '🏆';
            e.currentTarget.className = 'w-20 h-20 mx-auto relative z-10 drop-shadow-lg text-5xl flex items-center justify-center';
          }}
        />
      </motion.div>

      {/* League Name */}
      <motion.h3 
        className="font-black text-lg text-white mb-2 group-hover:text-primary-300 transition-colors"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        {league.nameAr}
      </motion.h3>
      
      {/* League English Name */}
      <p className="text-sm text-slate-300 mb-4 font-semibold group-hover:text-slate-200 transition-colors">
        {league.name}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-600 dark:border-slate-700">
        <motion.div 
          className="bg-slate-900/50 rounded-lg p-3 group-hover:bg-slate-800/70 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs text-slate-400 mb-1">🌍 الدولة</p>
          <p className="font-bold text-white text-sm">{league.country}</p>
        </motion.div>
        <motion.div 
          className="bg-slate-900/50 rounded-lg p-3 group-hover:bg-slate-800/70 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs text-slate-400 mb-1">📅 الموسم</p>
          <p className="font-bold text-white text-sm">{league.season}</p>
        </motion.div>
      </div>

      {/* Type Badge */}
      <motion.div 
        className="mt-4"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <span className={`
          inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold
          ${league.type === 'domestic' 
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-blue-100' 
            : league.type === 'international'
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-purple-100'
            : 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100'
          }
        `}>
          {league.type === 'domestic' ? '🏠 محلي' : league.type === 'international' ? '🌍 دولي' : '🏆 كأس'}
        </span>
      </motion.div>

      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 bg-primary-500 rounded-full p-2 shadow-lg"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
