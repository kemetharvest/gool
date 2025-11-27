import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import { Tabs } from '@/components/Tabs';
import { EventsTimeline } from '@/components/EventsTimeline';
import { LineupPitch } from '@/components/LineupPitch';
import { MatchStatistics } from '@/components/MatchStatistics';
import { useWebSocket } from '@/hooks/useWebSocket';
import type { Match, Event, Lineup, MatchStatistics as MatchStatsType } from '@/types/index';

export function MatchDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [lineup, setLineup] = useState<Lineup | null>(null);
  const [stats, setStats] = useState<MatchStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [wsConnected, setWsConnected] = useState(false);

  const { data: wsData, isConnected } = useWebSocket(id ? `/ws/matches/${id}` : '', !!id);

  useEffect(() => {
    if (!id) return;

    const loadMatchDetails = async () => {
      try {
        setLoading(true);
        const [matchData, eventsData, statsData] = await Promise.all([
          apiService.getMatch(id),
          apiService.getMatchEvents(id),
          apiService.getMatchStatistics(id),
        ]);
        setMatch(matchData);
        setEvents(eventsData);
        setStats(statsData);

        // Create mock lineup
        setLineup({
          matchId: id,
          homeTeam: {
            formation: '4-2-3-1',
            players: [
              {
                id: 'p1',
                name: 'Mohamed',
                nameAr: 'محمد',
                number: 1,
                position: 'GK',
                isOnPitch: true,
              },
              {
                id: 'p2',
                name: 'Ahmed',
                nameAr: 'أحمد',
                number: 2,
                position: 'DEF',
                isOnPitch: true,
              },
            ],
          },
          awayTeam: {
            formation: '4-3-3',
            players: [
              {
                id: 'p3',
                name: 'Ali',
                nameAr: 'علي',
                number: 1,
                position: 'GK',
                isOnPitch: true,
              },
              {
                id: 'p4',
                name: 'Hassan',
                nameAr: 'حسن',
                number: 3,
                position: 'DEF',
                isOnPitch: true,
              },
            ],
          },
        });
      } catch (error) {
        console.error('Failed to load match details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatchDetails();
  }, [id]);

  useEffect(() => {
    setWsConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (wsData?.type === 'match_update' && match) {
      setMatch((prev) =>
        prev
          ? {
              ...prev,
              homeScore: wsData.data.homeScore,
              awayScore: wsData.data.awayScore,
              minute: wsData.data.minute,
            }
          : null
      );
    } else if (wsData?.type === 'match_event') {
      setEvents((prev) => [wsData.event, ...prev]);
    }
  }, [wsData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">لم يتم العثور على المباراة</p>
          <button onClick={() => navigate('/')} className="text-red-500 hover:text-red-600">
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { label: 'المحتوى + البث', value: 'content' },
    { label: 'الإحصائيات', value: 'statistics' },
    { label: 'التشكيلة', value: 'lineup' },
    { label: 'أحداث المباراة', value: 'events' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(data:image/svg+xml)' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button onClick={() => navigate('/')} className="mb-4 text-slate-300 hover:text-white">
            ← العودة
          </button>

          <div className="flex items-center justify-center gap-4 my-6">
            {/* Home Team */}
            <div className="text-center flex-1">
              <img src={match.homeTeam.logo} alt={match.homeTeam.nameAr} className="w-20 h-20 mx-auto mb-2" />
              <h2 className="text-2xl font-bold">{match.homeTeam.nameAr}</h2>
            </div>

            {/* VS & Score */}
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {match.homeScore} - {match.awayScore}
              </div>
              <div className="text-sm text-slate-300">
                {match.status === 'inprogress' ? `${match.minute}'` : match.status === 'finished' ? 'انتهت' : 'مجدول'}
              </div>
            </div>

            {/* Away Team */}
            <div className="text-center flex-1">
              <img src={match.awayTeam.logo} alt={match.awayTeam.nameAr} className="w-20 h-20 mx-auto mb-2" />
              <h2 className="text-2xl font-bold">{match.awayTeam.nameAr}</h2>
            </div>
          </div>

          {wsConnected && (
            <div className="text-center text-green-400 text-sm">🟢 متصل - بث مباشر</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  معلومات المباراة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">البطولة</p>
                    <p className="font-bold text-slate-900 dark:text-white">{match.league.nameAr}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">الملعب</p>
                    <p className="font-bold text-slate-900 dark:text-white">{match.venue?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">القناة</p>
                    <p className="font-bold text-slate-900 dark:text-white">{match.channel || 'غير محدد'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">التاريخ والوقت</p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {new Date(match.kickoffTime).toLocaleString('ar-EG')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  البث المباشر
                </h3>
                <div className="aspect-video bg-slate-300 dark:bg-slate-700 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📺</div>
                    <p className="text-slate-600 dark:text-slate-400">مشغل البث المباشر</p>
                    <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-bold">
                      مشاهدة البث
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'statistics' && stats && (
            <MatchStatistics stats={stats} />
          )}

          {activeTab === 'lineup' && lineup && (
            <LineupPitch
              homeFormation={lineup.homeTeam.formation}
              awayFormation={lineup.awayTeam.formation}
              homePlayers={lineup.homeTeam.players}
              awayPlayers={lineup.awayTeam.players}
            />
          )}

          {activeTab === 'events' && (
            <EventsTimeline events={events} isLoading={false} />
          )}
        </Tabs>
      </div>
    </div>
  );
}
