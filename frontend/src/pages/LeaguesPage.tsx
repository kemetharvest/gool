import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '@/services/apiService';
import { MatchCard } from '@/components/MatchCard';
import type { League, Match } from '@/types/index';

export function LeaguesPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock matches data
  const mockMatches: Match[] = [
    {
      id: 'match1',
      homeTeam: { id: 'team1', name: 'Al Ahly', nameAr: 'الأهلي', logo: '🔴', country: 'Egypt' },
      awayTeam: { id: 'team2', name: 'Zamalek', nameAr: 'الزمالك', logo: '⚪', country: 'Egypt' },
      league: { id: 'league1', name: 'Egyptian Premier League', nameAr: 'الدوري المصري', logo: 'https://flagcdn.com/w160/eg.png' },
      date: new Date(2025, 10, 27, 20, 0),
      status: 'upcoming',
      homeScore: null,
      awayScore: null,
    },
    {
      id: 'match2',
      homeTeam: { id: 'team3', name: 'Barcelona', nameAr: 'برشلونة', logo: '🔵', country: 'Spain' },
      awayTeam: { id: 'team4', name: 'Real Madrid', nameAr: 'ريال مدريد', logo: '⚪', country: 'Spain' },
      league: { id: 'league2', name: 'La Liga', nameAr: 'الدوري الإسباني', logo: 'https://flagcdn.com/w160/es.png' },
      date: new Date(2025, 10, 27, 19, 30),
      status: 'upcoming',
      homeScore: null,
      awayScore: null,
    },
    {
      id: 'match3',
      homeTeam: { id: 'team5', name: 'Manchester United', nameAr: 'مانشستر يونايتد', logo: '🔴', country: 'England' },
      awayTeam: { id: 'team6', name: 'Liverpool', nameAr: 'ليفربول', logo: '❤️', country: 'England' },
      league: { id: 'league3', name: 'Premier League', nameAr: 'الدوري الإنجليزي', logo: 'https://flagcdn.com/w160/gb.png' },
      date: new Date(2025, 10, 27, 15, 0),
      status: 'live',
      homeScore: 2,
      awayScore: 1,
    },
    {
      id: 'match4',
      homeTeam: { id: 'team7', name: 'Bayern Munich', nameAr: 'بايرن ميونخ', logo: '🔴', country: 'Germany' },
      awayTeam: { id: 'team8', name: 'PSG', nameAr: 'باريس سان جيرمان', logo: '🔵', country: 'France' },
      league: { id: 'league4', name: 'Champions League', nameAr: 'دوري الأبطال', logo: 'https://flagcdn.com/w160/eu.png' },
      date: new Date(2025, 10, 27, 21, 0),
      status: 'upcoming',
      homeScore: null,
      awayScore: null,
    },
  ];

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        const data = await apiService.getLeagues();
        setLeagues(data);
      } catch (error) {
        console.error('Failed to load leagues:', error);
        const defaultLeagues: League[] = [
          {
            id: 'league1',
            name: 'Egyptian Premier League',
            nameAr: 'الدوري المصري الممتاز',
            country: 'Egypt',
            logo: 'https://flagcdn.com/w160/eg.png',
            season: 2025,
            type: 'domestic',
          },
          {
            id: 'league2',
            name: 'La Liga',
            nameAr: 'الدوري الإسباني',
            country: 'Spain',
            logo: 'https://flagcdn.com/w160/es.png',
            season: 2025,
            type: 'domestic',
          },
          {
            id: 'league3',
            name: 'Premier League',
            nameAr: 'الدوري الإنجليزي',
            country: 'England',
            logo: 'https://flagcdn.com/w160/gb.png',
            season: 2025,
            type: 'domestic',
          },
          {
            id: 'league4',
            name: 'UEFA Champions League',
            nameAr: 'دوري أبطال أوروبا',
            country: 'Europe',
            logo: 'https://flagcdn.com/w160/eu.png',
            season: 2025,
            type: 'international',
          },
          {
            id: 'league5',
            name: 'Serie A',
            nameAr: 'الدوري الإيطالي',
            country: 'Italy',
            logo: 'https://flagcdn.com/w160/it.png',
            season: 2025,
            type: 'domestic',
          },
        ];
        setLeagues(defaultLeagues);
      } finally {
        setLoading(false);
      }
    };

    loadLeagues();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-3">
            الدوريات الرائدة عالميًا
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            اكتشف أفضل الدوريات الكروية حول العالم
          </p>
        </motion.div>

        {/* Leagues Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
            ))
          ) : (
            leagues.map((league) => (
              <motion.div
                key={league.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full">
                  {/* League Image Background */}
                  <div className="relative h-40 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-pattern" />
                    </div>

                    {/* League Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        src={league.logo}
                        alt={league.nameAr}
                        className="h-24 w-24 object-cover drop-shadow-lg rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '🏆';
                          e.currentTarget.className = 'h-24 w-24 text-5xl flex items-center justify-center drop-shadow-lg';
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {league.nameAr}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                      {league.name}
                    </p>

                    {/* League Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">الدولة</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {league.country}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">الموسم</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {league.season}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">النوع</span>
                        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-semibold">
                          {league.type === 'domestic' ? 'محلي' : 'دولي'}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      عرض الدوري
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Empty State */}
        {!loading && leagues.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-slate-600 dark:text-slate-400">
              لا توجد دوريات متاحة حاليًا
            </p>
          </motion.div>
        )}

        {/* Matches Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
            المباريات القادمة
          </h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {mockMatches.map((match) => (
              <motion.div key={match.id} variants={itemVariants}>
                <MatchCard match={match} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-pattern {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
