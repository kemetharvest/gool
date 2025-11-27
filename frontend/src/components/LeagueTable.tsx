import React from 'react';
import { motion } from 'framer-motion';
import type { Team, Standing } from '@/types/index';
import { Link } from 'react-router-dom';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link to={`/teams/${team.id}`}>
      <motion.div
        whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(59, 130, 246, 0.3)' }}
        whileTap={{ scale: 0.98 }}
        className="group bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-lg hover:shadow-2xl p-7 text-center cursor-pointer transition-all h-full flex flex-col justify-center border border-slate-600 hover:border-primary-500 backdrop-blur-sm overflow-hidden relative"
      >
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-red-500/0 group-hover:from-primary-500/10 group-hover:to-accent-red-500/10 transition-all duration-300 pointer-events-none"></div>

        {/* Logo Container with Glow */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative mb-5 flex justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <img 
            src={team.logo} 
            alt={team.nameAr} 
            className="w-24 h-24 object-contain relative z-10 drop-shadow-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/96?text=' + team.nameAr.substring(0, 3);
            }}
          />
        </motion.div>

        {/* Team Name - Arabic */}
        <motion.h3 
          className="font-black text-xl text-white mb-2 group-hover:text-primary-300 transition-colors relative z-10"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {team.nameAr}
        </motion.h3>

        {/* Team Name - English */}
        <motion.p 
          className="text-sm font-bold text-slate-300 mb-4 group-hover:text-slate-200 transition-colors relative z-10"
          whileHover={{ scale: 1.05 }}
        >
          {team.name}
        </motion.p>

        {/* Info Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-3 mt-5 pt-4 border-t border-slate-600 dark:border-slate-700 relative z-10"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {team.country && (
            <motion.div 
              className="bg-slate-900/50 rounded-lg p-3 group-hover:bg-slate-800/70 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs text-slate-400 mb-1">🌍 الدولة</p>
              <p className="font-bold text-white text-sm">{team.country}</p>
            </motion.div>
          )}
          {team.founded && (
            <motion.div 
              className="bg-slate-900/50 rounded-lg p-3 group-hover:bg-slate-800/70 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs text-slate-400 mb-1">📅 تأسس</p>
              <p className="font-bold text-white text-sm">{team.founded}</p>
            </motion.div>
          )}
        </motion.div>

        {/* View Details Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="mt-5 pt-4 border-t border-slate-600 relative z-10"
        >
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-bold rounded-lg hover:from-primary-500 hover:to-primary-600 transition-all shadow-lg group-hover:shadow-primary-500/50">
            عرض التفاصيل
            <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}

interface LeagueTableProps {
  standings: Standing[];
  leagueName: string;
  leagueLogo?: string;
  isSticky?: boolean;
}

// Reliable league icon sources
const leagueIconMap: { [key: string]: string } = {
  'egyptian': 'https://flagcdn.com/w320/eg.png',
  'spanish': 'https://flagcdn.com/w320/es.png',
  'english': 'https://flagcdn.com/w320/gb.png',
  'champions': 'https://upload.wikimedia.org/wikipedia/en/b/ba/UEFA_Champions_League_logo_2.svg',
  'italian': 'https://flagcdn.com/w320/it.png',
  'french': 'https://flagcdn.com/w320/fr.png',
  'german': 'https://flagcdn.com/w320/de.png',
};

export function LeagueTable({
  standings,
  leagueName,
  leagueLogo,
  isSticky = false,
}: LeagueTableProps) {
  const containerClass = isSticky
    ? 'sticky top-20 z-20 max-h-[calc(100vh-80px)]'
    : '';

  // Determine league icon based on league name
  const getLeagueIcon = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('egypt') || nameLower.includes('مصر')) return leagueIconMap.egyptian;
    if (nameLower.includes('spain') || nameLower.includes('إسبانيا')) return leagueIconMap.spanish;
    if (nameLower.includes('england') || nameLower.includes('إنجليزي')) return leagueIconMap.english;
    if (nameLower.includes('champion') || nameLower.includes('أوروبا')) return leagueIconMap.champions;
    if (nameLower.includes('italy') || nameLower.includes('إيطالي')) return leagueIconMap.italian;
    if (nameLower.includes('france') || nameLower.includes('فرنسا')) return leagueIconMap.french;
    if (nameLower.includes('germany') || nameLower.includes('ألمانيا')) return leagueIconMap.german;
    return leagueIconMap.egyptian;
  };

  const leagueIcon = getLeagueIcon(leagueName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${containerClass} bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden`}
    >
      {/* Header - Modern Design */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-700 p-6 flex items-center gap-4 border-b border-blue-500/30">
        <div className="flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.1, rotate: 5 }}
            src={leagueIcon}
            alt={leagueName}
            className="h-12 w-12 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.currentTarget.src = '🏆';
              e.currentTarget.className = 'h-12 w-12 text-4xl flex items-center justify-center rounded-lg shadow-lg';
            }}
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-white font-bold text-xl tracking-tight">{leagueName}</h3>
          <p className="text-blue-100 text-sm font-semibold">جدول الترتيب والإحصائيات</p>
        </div>
      </div>

      {/* Table Container */}
      <div className={isSticky ? 'overflow-y-auto max-h-[calc(100vh-140px)]' : 'overflow-x-auto'}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-300 dark:border-slate-600 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800">
              <th className="px-4 py-4 text-center font-bold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-wider">
                الترتيب
              </th>
              <th className="px-4 py-4 text-right font-bold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-wider">
                الفريق
              </th>
              <th className="px-3 py-4 text-center font-bold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-wider">
                لعب
              </th>
              <th className="px-3 py-4 text-center font-bold text-green-600 dark:text-green-400 text-xs uppercase tracking-wider">
                فوز
              </th>
              <th className="px-3 py-4 text-center font-bold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                تعادل
              </th>
              <th className="px-3 py-4 text-center font-bold text-red-600 dark:text-red-400 text-xs uppercase tracking-wider">
                خسارة
              </th>
              <th className="px-3 py-4 text-center font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">
                الفرق
              </th>
              <th className="px-4 py-4 text-center font-bold text-amber-600 dark:text-amber-400 text-xs uppercase tracking-wider">
                النقاط
              </th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing, index) => {
              const isTopPosition = index < 3;
              const isBottomPosition = index >= standings.length - 3;

              return (
                <motion.tr
                  key={standing.team.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}
                  className={`
                    border-b border-slate-200 dark:border-slate-700 transition-all duration-200 group
                    ${isTopPosition ? 'bg-green-50/50 dark:bg-green-900/10 hover:bg-green-100/30 dark:hover:bg-green-900/20' : ''}
                    ${isBottomPosition ? 'bg-red-50/50 dark:bg-red-900/10 hover:bg-red-100/30 dark:hover:bg-red-900/20' : ''}
                    ${!isTopPosition && !isBottomPosition ? 'bg-white dark:bg-slate-800/50 hover:bg-blue-50/30 dark:hover:bg-slate-700/30' : ''}
                  `}
                >
                  {/* Position */}
                  <td className="px-4 py-4 text-center">
                    <motion.div
                      className={`
                        font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center font-black shadow-md
                        ${isTopPosition ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white' : ''}
                        ${isBottomPosition ? 'bg-gradient-to-br from-red-500 to-red-600 text-white' : ''}
                        ${!isTopPosition && !isBottomPosition ? 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200' : ''}
                      `}
                    >
                      {standing.position}
                    </motion.div>
                  </td>

                  {/* Team */}
                  <td className="px-4 py-4">
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full shadow-md flex items-center justify-center text-lg font-bold bg-slate-100 dark:bg-slate-700">
                        {standing.team.logo}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-slate-900 dark:text-white truncate text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {standing.team.nameAr}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs truncate">
                          {standing.team.name}
                        </p>
                      </div>
                    </motion.div>
                  </td>

                  {/* Matches Played */}
                  <td className="px-3 py-4 text-center font-semibold text-slate-700 dark:text-slate-200">
                    {standing.played}
                  </td>

                  {/* Wins */}
                  <td className="px-3 py-4 text-center font-bold text-green-600 dark:text-green-400 text-base">
                    {standing.won}
                  </td>

                  {/* Draws */}
                  <td className="px-3 py-4 text-center font-semibold text-slate-600 dark:text-slate-300">
                    {standing.drawn}
                  </td>

                  {/* Losses */}
                  <td className="px-3 py-4 text-center font-bold text-red-600 dark:text-red-400 text-base">
                    {standing.lost}
                  </td>

                  {/* Goal Difference */}
                  <td className="px-3 py-4 text-center">
                    <span className={`
                      inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold
                      ${standing.goalDifference > 0 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : standing.goalDifference < 0 ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}
                    `}>
                      {standing.goalDifference > 0 ? '+' : ''}
                      {standing.goalDifference}
                    </span>
                  </td>

                  {/* Points */}
                  <td className="px-4 py-4 text-center">
                    <motion.div
                      className="font-bold text-lg bg-gradient-to-br from-amber-400 to-amber-500 text-white px-4 py-2 rounded-lg shadow-md inline-block"
                      whileHover={{ scale: 1.1 }}
                    >
                      {standing.points}
                    </motion.div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 py-4 border-t-2 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 text-xs text-slate-600 dark:text-slate-300"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-semibold">🟢 مراكز أوروبية</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="font-semibold">🔴 مراكز هبوط</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">⭐ ن = النقاط</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
