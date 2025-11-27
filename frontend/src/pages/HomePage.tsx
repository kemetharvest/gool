import React, { useEffect, useState } from 'react';
import { MatchCard } from '@/components/MatchCard';
import { Tabs } from '@/components/Tabs';
import { SkeletonCard } from '@/components/Skeleton';
import { BroadcastSection } from '@/components/BroadcastSection';
import { apiService } from '@/services/apiService';
import { useDataStore } from '@/context/dataStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Match } from '@/types/index';

export function HomePage() {
  const [activeDay, setActiveDay] = useState<'today' | 'yesterday' | 'tomorrow'>('today');
  const [loading, setLoading] = useState(true);
  const { matches, setMatchesForDay, updateMatch } = useDataStore();
  const { data: wsData } = useWebSocket('/ws/matches', true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      try {
        const data = await apiService.getMatches(activeDay);
        setMatchesForDay(activeDay, data);
      } catch (error) {
        console.error('Failed to load matches:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [activeDay, setMatchesForDay]);

  // Handle WebSocket updates
  useEffect(() => {
    if (wsData?.type === 'match_update' && wsData.data) {
      updateMatch({
        id: wsData.data.matchId,
        homeScore: wsData.data.homeScore,
        awayScore: wsData.data.awayScore,
        minute: wsData.data.minute,
      } as any);
    }
  }, [wsData, updateMatch]);

  const currentMatches = matches[activeDay];
  const tabs = [
    { label: '📅 أمس', value: 'yesterday' },
    { label: '🔴 اليوم', value: 'today' },
    { label: '⏰ غداً', value: 'tomorrow' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-dark-900 dark:to-dark-950"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 dark:from-dark-800 dark:via-dark-900 dark:to-dark-950 py-12 sm:py-16"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 10 }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 leading-tight">
              جدول المباريات
            </h1>
            <p className="text-xl text-blue-100 font-medium">
              شاهد أحدث مباريات كرة القدم بث مباشر وتحديثات فورية ⚽
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Matches Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-1 h-8 bg-gradient-to-b from-accent-red to-orange-500 rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                المباريات
              </h2>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs tabs={tabs} activeTab={activeDay} onTabChange={(day) => setActiveDay(day as any)}>
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <SkeletonCard />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : currentMatches.length === 0 ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-16 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-dark-800 dark:to-dark-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-dark-700"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-5xl mb-3"
                    >
                      ⚽
                    </motion.div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                      لا توجد مباريات في هذا اليوم
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                      يرجى اختيار يوم آخر أو مراجعة لاحقاً
                    </p>
                  </motion.div>
                ) : (
                  currentMatches.map((match, idx) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <MatchCard
                        match={match}
                        onClick={() => navigate(`/matches/${match.id}`)}
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>
            </Tabs>
          </motion.div>
        </motion.div>

        {/* Latest News Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="mt-16 pt-12 border-t border-slate-200 dark:border-dark-700"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-1 h-8 bg-gradient-to-b from-accent-red to-orange-500 rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                البث المباشر
              </h2>
            </div>
          </div>

          <BroadcastSection
            broadcasts={[
              {
                id: '1',
                channel: 'beIN Sports 1 HD',
                status: 'live',
                icon: '📺',
                matchTitle: 'الأهلي vs الزمالك',
              },
              {
                id: '2',
                channel: 'Sky Sports Premier',
                status: 'scheduled',
                time: 'في ساعة واحدة',
                matchTitle: 'ليفربول vs مانشستر يونايتد',
              },
              {
                id: '3',
                channel: 'beIN Sports 2 HD',
                status: 'scheduled',
                time: 'غداً الساعة 8 مساءً',
                matchTitle: 'برشلونة vs ريال مدريد',
              },
              {
                id: '4',
                channel: 'ESPN',
                status: 'finished',
                matchTitle: 'أمس: الإسماعيلي 3 - 1 الإتحاد',
              },
              {
                id: '5',
                channel: 'DAZN',
                status: 'recorded',
                matchTitle: 'إعادة: بايرن ميونخ vs بوروسيا دورتموند',
              },
              {
                id: '6',
                channel: 'beIN Sports 3 HD',
                status: 'scheduled',
                time: 'الأسبوع القادم',
                matchTitle: 'نهائي كأس الملك',
              },
            ]}
          />
        </motion.div>

        {/* Latest News Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mt-16 pt-12 border-t border-slate-200 dark:border-dark-700"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-1 h-8 bg-gradient-to-b from-accent-red to-orange-500 rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                آخر الأخبار
              </h2>
            </div>
            <motion.a
              href="/news"
              whileHover={{ x: 5 }}
              className="text-accent-red hover:text-orange-500 font-semibold flex items-center gap-2 transition-colors"
            >
              عرض الكل
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                ←
              </motion.span>
            </motion.a>
          </div>
          <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-dark-800 dark:to-dark-900 p-8 rounded-xl border border-slate-200 dark:border-dark-700 text-center">
            <motion.div
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-slate-600 dark:text-slate-400 font-medium"
            >
              🔄 جاري تحميل الأخبار...
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
