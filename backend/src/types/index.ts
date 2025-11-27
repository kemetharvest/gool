export interface Team {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  country?: string;
  founded?: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: 'scheduled' | 'inprogress' | 'finished' | 'postponed';
  kickoffTime: string;
  minute: number;
  league: {
    id: string;
    name: string;
    nameAr: string;
    logo: string;
  };
  venue?: {
    name: string;
    city: string;
  };
  channel?: string;
  referee?: string;
  weather?: {
    condition: string;
    temperature: number;
  };
}

export interface Event {
  id: string;
  matchId: string;
  type: 'goal' | 'card' | 'substitution' | 'start' | 'end';
  minute: number;
  player: {
    id: string;
    name: string;
    nameAr: string;
    number: number;
    team: 'home' | 'away';
  };
  assistPlayer?: {
    id: string;
    name: string;
  };
  cardType?: 'yellow' | 'red';
  replacedPlayer?: {
    id: string;
    name: string;
  };
  description: string;
  descriptionAr: string;
}

export interface Player {
  id: string;
  name: string;
  nameAr: string;
  number: number;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  photo?: string;
  rating?: number;
  isOnPitch: boolean;
}

export interface Lineup {
  matchId: string;
  homeTeam: {
    formation: string;
    players: Player[];
  };
  awayTeam: {
    formation: string;
    players: Player[];
  };
}

export interface League {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  logo: string;
  season: number;
  type: 'domestic' | 'international' | 'cup';
}

export interface LeagueTable {
  leagueId: string;
  standings: Standing[];
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface News {
  id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  source?: string;
}

export interface MatchStatistics {
  matchId: string;
  homeTeam: TeamStatistics;
  awayTeam: TeamStatistics;
}

export interface TeamStatistics {
  teamId: string;
  possession: number; // percentage
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number; // percentage
  fouls: number;
  offsides: number;
  corners: number;
  yellowCards: number;
  redCards: number;
  saves: number;
  tackles: number;
}

export interface WebSocketMessage {
  type: 'match_update' | 'event' | 'lineup_update' | 'subscribe' | 'unsubscribe';
  data: any;
  timestamp: number;
}
