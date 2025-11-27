import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '@/services/apiService';
import { Tabs } from '@/components/Tabs';
import type { League, Match } from '@/types/index';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('matches');
  const [leagues, setLeagues] = useState<League[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<'yesterday' | 'today' | 'tomorrow'>('today');

  useEffect(() => {
    loadData();
  }, [selectedDay]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [leaguesData, matchesData] = await Promise.all([
        apiService.getLeagues(),
        apiService.getMatches(selectedDay),
      ]);
      setLeagues(leaguesData);
      setMatches(matchesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMatch = (matchId: string, updates: Partial<Match>) => {
    setMatches(
      matches.map((m) =>
        m.id === matchId ? { ...m, ...updates } : m
      )
    );
  };

  const handleAddLeague = (league: League) => {
    setLeagues([...leagues, league]);
  };

  const handleSaveLeague = async (leagueData: Omit<League, 'id'>) => {
    try {
      const newLeague = await apiService.addLeague(leagueData);
      handleAddLeague(newLeague);
    } catch (error) {
      console.error('Failed to save league:', error);
    }
  };

  const tabs = [
    { label: '⚽ المباريات', value: 'matches' },
    { label: '🏆 الدوريات', value: 'leagues' },
    { label: '⚙️ الإعدادات', value: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-dark-900 dark:to-dark-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-8 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">🎮 لوحة تحكم يلا جول</h1>
          <p className="text-blue-100">إدارة المباريات والدوريات والنتائج</p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {/* Matches Tab */}
          {activeTab === 'matches' && (
            <MatchesTab
              matches={matches}
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
              onUpdateMatch={handleUpdateMatch}
              loading={loading}
            />
          )}

          {/* Leagues Tab */}
          {activeTab === 'leagues' && (
            <LeaguesTab
              leagues={leagues}
              onAddLeague={handleSaveLeague}
              loading={loading}
            />
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <SettingsTab />
          )}
        </Tabs>
      </div>
    </div>
  );
}

function MatchesTab({
  matches,
  selectedDay,
  onDayChange,
  onUpdateMatch,
  loading,
}: {
  matches: Match[];
  selectedDay: 'yesterday' | 'today' | 'tomorrow';
  onDayChange: (day: 'yesterday' | 'today' | 'tomorrow') => void;
  onUpdateMatch: (matchId: string, updates: Partial<Match>) => void;
  loading: boolean;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Match>>({});

  const days = [
    { label: '📅 أمس', value: 'yesterday' as const },
    { label: '🔴 اليوم', value: 'today' as const },
    { label: '⏰ غداً', value: 'tomorrow' as const },
  ];

  const handleEdit = (match: Match) => {
    setEditingId(match.id);
    setEditData(match);
  };

  const handleSave = (matchId: string) => {
    onUpdateMatch(matchId, editData);
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Day Selector */}
      <div className="flex gap-3 flex-wrap">
        {days.map((day) => (
          <motion.button
            key={day.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDayChange(day.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedDay === day.value
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
            }`}
          >
            {day.label}
          </motion.button>
        ))}
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500 mx-auto"></div>
            <p className="text-slate-300 mt-4">جاري التحميل...</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-slate-700 rounded-lg p-8 text-center">
            <p className="text-slate-300 text-lg">لا توجد مباريات لهذا اليوم</p>
          </div>
        ) : (
          matches.map((match, idx) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-700 hover:bg-slate-600 rounded-lg p-6 transition-colors"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                {/* Home Team */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={match.homeTeam.logo} alt={match.homeTeam.nameAr} className="w-10 h-10" />
                  <div className="min-w-0">
                    <p className="text-white font-bold truncate">{match.homeTeam.nameAr}</p>
                    <p className="text-slate-400 text-sm">{match.homeTeam.name}</p>
                  </div>
                </div>

                {/* Score */}
                {editingId === match.id ? (
                  <div className="flex gap-2 items-center bg-slate-800 px-4 py-2 rounded-lg">
                    <input
                      type="number"
                      value={editData.homeScore || 0}
                      onChange={(e) =>
                        setEditData({ ...editData, homeScore: parseInt(e.target.value) })
                      }
                      className="w-12 bg-slate-700 text-white rounded px-2 py-1 text-center"
                      min="0"
                    />
                    <span className="text-white font-bold">-</span>
                    <input
                      type="number"
                      value={editData.awayScore || 0}
                      onChange={(e) =>
                        setEditData({ ...editData, awayScore: parseInt(e.target.value) })
                      }
                      className="w-12 bg-slate-700 text-white rounded px-2 py-1 text-center"
                      min="0"
                    />
                  </div>
                ) : (
                  <div className="bg-slate-800 px-6 py-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-white">
                      {match.homeScore} - {match.awayScore}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {match.status === 'inprogress' ? `${match.minute}'` : match.status}
                    </div>
                  </div>
                )}

                {/* Away Team */}
                <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                  <div className="min-w-0">
                    <p className="text-white font-bold truncate">{match.awayTeam.nameAr}</p>
                    <p className="text-slate-400 text-sm">{match.awayTeam.name}</p>
                  </div>
                  <img src={match.awayTeam.logo} alt={match.awayTeam.nameAr} className="w-10 h-10" />
                </div>

                {/* Action Buttons */}
                {editingId === match.id ? (
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleSave(match.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                      ✅ حفظ
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setEditingId(null)}
                      className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                      ❌ إلغاء
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleEdit(match)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    ✏️ تعديل
                  </motion.button>
                )}
              </div>

              {/* Match Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-slate-800 p-3 rounded">
                  <p className="text-slate-400">البطولة</p>
                  <p className="text-white font-semibold">{match.league.nameAr}</p>
                </div>
                <div className="bg-slate-800 p-3 rounded">
                  <p className="text-slate-400">الملعب</p>
                  <p className="text-white font-semibold">{match.venue?.name || 'غير محدد'}</p>
                </div>
                <div className="bg-slate-800 p-3 rounded">
                  <p className="text-slate-400">القناة</p>
                  <p className="text-white font-semibold">{match.channel || 'غير محدد'}</p>
                </div>
                <div className="bg-slate-800 p-3 rounded">
                  <p className="text-slate-400">الحالة</p>
                  <p className="text-white font-semibold capitalize">{match.status}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function LeaguesTab({
  leagues,
  onAddLeague,
  loading,
}: {
  leagues: League[];
  onAddLeague: (league: Omit<League, 'id'>) => void;
  loading: boolean;
}) {
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    country: '',
    logo: '',
    season: new Date().getFullYear(),
    type: 'domestic' as const,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onAddLeague(formData);
      setFormData({
        name: '',
        nameAr: '',
        country: '',
        logo: '',
        season: new Date().getFullYear(),
        type: 'domestic',
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Add League Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-700 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">➕ إضافة دوري جديد</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="اسم الدوري (إنجليزي)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-primary-500 outline-none"
            required
          />
          <input
            type="text"
            placeholder="اسم الدوري (عربي)"
            value={formData.nameAr}
            onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-primary-500 outline-none"
            required
          />
          <input
            type="text"
            placeholder="الدولة"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-primary-500 outline-none"
            required
          />
          <input
            type="url"
            placeholder="رابط الأيقونة (يفضل من Wikimedia)"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-primary-500 outline-none"
            required
          />
          <input
            type="number"
            placeholder="الموسم"
            value={formData.season}
            onChange={(e) => setFormData({ ...formData, season: parseInt(e.target.value) })}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-primary-500 outline-none"
            required
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-primary-500 outline-none"
          >
            <option value="domestic">محلي</option>
            <option value="international">دولي</option>
            <option value="cup">كأس</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={submitting}
            className="md:col-span-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-600 text-white px-6 py-2 rounded-lg font-bold transition-colors"
          >
            {submitting ? '⏳ جاري الإضافة...' : '➕ إضافة الدوري'}
          </motion.button>
        </form>
      </motion.div>

      {/* Leagues List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">📋 الدوريات المتاحة ({leagues.length})</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leagues.map((league, idx) => (
              <motion.div
                key={league.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <img src={league.logo} alt={league.nameAr} className="w-12 h-12 rounded" />
                  <span className="text-primary-400 text-xs font-bold bg-slate-800 px-2 py-1 rounded">
                    {league.type === 'domestic' ? '🏠' : league.type === 'international' ? '🌍' : '🏆'}
                  </span>
                </div>
                <h4 className="text-white font-bold mb-2">{league.nameAr}</h4>
                <p className="text-slate-400 text-sm mb-3">{league.name}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">🌍 {league.country}</span>
                  <span className="text-primary-400">📅 {league.season}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SettingsTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">⚙️ API و الربط الخارجي</h3>
        <div className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-lg">
            <p className="text-white font-semibold mb-2">🔗 Endpoints المتاحة:</p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>📊 <code className="bg-slate-900 px-2 py-1 rounded">GET /api/matches</code> - جميع المباريات</li>
              <li>📊 <code className="bg-slate-900 px-2 py-1 rounded">GET /api/matches/:id/statistics</code> - إحصائيات المباراة</li>
              <li>🏆 <code className="bg-slate-900 px-2 py-1 rounded">GET /api/leagues</code> - جميع الدوريات</li>
              <li>👥 <code className="bg-slate-900 px-2 py-1 rounded">GET /api/teams</code> - جميع الفرق</li>
              <li>📰 <code className="bg-slate-900 px-2 py-1 rounded">GET /api/news</code> - الأخبار</li>
            </ul>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg">
            <p className="text-white font-semibold mb-2">📡 WebSocket:</p>
            <p className="text-slate-300 text-sm mb-2">
              اتصل على <code className="bg-slate-900 px-2 py-1 rounded">ws://localhost:5000/ws/matches</code> للبث المباشر
            </p>
            <p className="text-slate-400 text-xs">يرسل تحديثات فورية لجميع المباريات والأحداث</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">📊 إحصائيات النظام</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-lg text-center">
            <p className="text-primary-400 text-2xl font-bold">7</p>
            <p className="text-slate-400 text-sm mt-2">عدد المباريات</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg text-center">
            <p className="text-accent-red-400 text-2xl font-bold">5</p>
            <p className="text-slate-400 text-sm mt-2">عدد الدوريات</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg text-center">
            <p className="text-accent-orange-400 text-2xl font-bold">8</p>
            <p className="text-slate-400 text-sm mt-2">عدد الفرق</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
