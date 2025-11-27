import { create } from 'zustand';
import type { Match, League, Team, News } from '@/types/index';

interface DataStore {
  matches: {
    today: Match[];
    yesterday: Match[];
    tomorrow: Match[];
  };
  leagues: League[];
  teams: Team[];
  news: News[];
  selectedMatch: Match | null;

  setMatchesForDay: (day: 'today' | 'yesterday' | 'tomorrow', matches: Match[]) => void;
  updateMatch: (match: Match) => void;
  setLeagues: (leagues: League[]) => void;
  setTeams: (teams: Team[]) => void;
  setNews: (news: News[]) => void;
  setSelectedMatch: (match: Match | null) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  matches: {
    today: [],
    yesterday: [],
    tomorrow: [],
  },
  leagues: [],
  teams: [],
  news: [],
  selectedMatch: null,

  setMatchesForDay: (day, matches) =>
    set((state) => ({
      matches: {
        ...state.matches,
        [day]: matches,
      },
    })),

  updateMatch: (updatedMatch) =>
    set((state) => {
      const updateInDay = (matches: Match[]) =>
        matches.map((m) => (m.id === updatedMatch.id ? updatedMatch : m));

      return {
        matches: {
          today: updateInDay(state.matches.today),
          yesterday: updateInDay(state.matches.yesterday),
          tomorrow: updateInDay(state.matches.tomorrow),
        },
        selectedMatch:
          state.selectedMatch?.id === updatedMatch.id ? updatedMatch : state.selectedMatch,
      };
    }),

  setLeagues: (leagues) => set({ leagues }),
  setTeams: (teams) => set({ teams }),
  setNews: (news) => set({ news }),
  setSelectedMatch: (match) => set({ selectedMatch: match }),
}));
