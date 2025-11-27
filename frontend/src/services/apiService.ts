import axios from 'axios';
import type { Match, League, Team, News, Event, MatchStatistics } from '@/types/index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiService = {
  // Matches
  getMatches: async (day: 'yesterday' | 'today' | 'tomorrow') => {
    const response = await api.get<Match[]>('/matches', { params: { day } });
    return response.data;
  },

  getMatch: async (id: string) => {
    const response = await api.get<Match>(`/matches/${id}`);
    return response.data;
  },

  updateMatch: async (id: string, updates: Partial<Match>) => {
    const response = await api.put<Match>(`/matches/${id}`, updates);
    return response.data;
  },

  getMatchEvents: async (matchId: string) => {
    const response = await api.get<Event[]>(`/matches/${matchId}/events`);
    return response.data;
  },

  getMatchStatistics: async (matchId: string) => {
    const response = await api.get<MatchStatistics>(`/matches/${matchId}/statistics`);
    return response.data;
  },

  // Leagues
  getLeagues: async () => {
    const response = await api.get<League[]>('/leagues');
    return response.data;
  },

  getLeague: async (id: string) => {
    const response = await api.get<League>(`/leagues/${id}`);
    return response.data;
  },

  addLeague: async (league: Omit<League, 'id'>) => {
    const response = await api.post<League>('/leagues', league);
    return response.data;
  },

  // Teams
  getTeams: async () => {
    const response = await api.get<Team[]>('/teams');
    return response.data;
  },

  getTeam: async (id: string) => {
    const response = await api.get<Team>(`/teams/${id}`);
    return response.data;
  },

  // News
  getNews: async () => {
    const response = await api.get<News[]>('/news');
    return response.data;
  },

  getNewsItem: async (id: string) => {
    const response = await api.get<News>(`/news/${id}`);
    return response.data;
  },

  // Health
  getHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
