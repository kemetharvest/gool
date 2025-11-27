import type { Match, Team, League, News, Event, Lineup } from '@/types/index.js';

// Mock data service - simulates real API calls
class MockDataService {
  private matches: Map<string, Match> = new Map();
  private teams: Map<string, Team> = new Map();
  private leagues: Map<string, League> = new Map();
  private news: Map<string, News> = new Map();
  private events: Map<string, Event[]> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize teams with real logos
    const teams: Team[] = [
      {
        id: 'team1',
        name: 'Al-Ahly',
        nameAr: 'الأهلي',
        logo: '🔴',
        country: 'Egypt',
        founded: 1925,
      },
      {
        id: 'team2',
        name: 'Zamalek',
        nameAr: 'الزمالك',
        logo: '⚪',
        country: 'Egypt',
        founded: 1911,
      },
      {
        id: 'team3',
        name: 'Barcelona',
        nameAr: 'برشلونة',
        logo: '🔵',
        country: 'Spain',
        founded: 1899,
      },
      {
        id: 'team4',
        name: 'Real Madrid',
        nameAr: 'ريال مدريد',
        logo: '⚪',
        country: 'Spain',
        founded: 1902,
      },
      {
        id: 'team5',
        name: 'Liverpool',
        nameAr: 'ليفربول',
        logo: '🔴',
        country: 'England',
        founded: 1892,
      },
      {
        id: 'team6',
        name: 'Manchester United',
        nameAr: 'مانشستر يونايتد',
        logo: '🔴',
        country: 'England',
        founded: 1878,
      },
      {
        id: 'team7',
        name: 'Ismaili',
        nameAr: 'الإسماعيلي',
        logo: '🟢',
        country: 'Egypt',
        founded: 1924,
      },
      {
        id: 'team8',
        name: 'PAOK',
        nameAr: 'باوك',
        logo: '⬛',
        country: 'Greece',
        founded: 1926,
      },
    ];

    teams.forEach((team) => this.teams.set(team.id, team));

    // Initialize leagues with real logos
    const leagues: League[] = [
      {
        id: 'league1',
        name: 'Egyptian Premier League',
        nameAr: 'الدوري المصري الممتاز',
        country: 'Egypt',
        logo: '🇪🇬',
        season: 2025,
        type: 'domestic',
      },
      {
        id: 'league2',
        name: 'La Liga',
        nameAr: 'الدوري الإسباني',
        country: 'Spain',
        logo: '🇪🇸',
        season: 2025,
        type: 'domestic',
      },
      {
        id: 'league3',
        name: 'Premier League',
        nameAr: 'الدوري الإنجليزي',
        country: 'England',
        logo: '🇬🇧',
        season: 2025,
        type: 'domestic',
      },
      {
        id: 'league4',
        name: 'UEFA Champions League',
        nameAr: 'دوري أبطال أوروبا',
        country: 'Europe',
        logo: '🏆',
        season: 2025,
        type: 'international',
      },
      {
        id: 'league5',
        name: 'Serie A',
        nameAr: 'الدوري الإيطالي',
        country: 'Italy',
        logo: '🇮🇹',
        season: 2025,
        type: 'domestic',
      },
    ];

    leagues.forEach((league) => this.leagues.set(league.id, league));

    // Initialize matches with more variety
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const matches: Match[] = [
      // Today's matches
      {
        id: 'match1',
        homeTeam: this.teams.get('team1')!,
        awayTeam: this.teams.get('team2')!,
        homeScore: 1,
        awayScore: 1,
        status: 'inprogress',
        kickoffTime: new Date(today.getTime() + 1.5 * 60 * 60 * 1000).toISOString(),
        minute: 67,
        league: {
          id: 'league1',
          name: 'Egyptian Premier League',
          nameAr: 'الدوري المصري الممتاز',
          logo: 'https://upload.wikimedia.org/wikipedia/en/1/15/Egyptian_Premier_League.png',
        },
        venue: { name: 'Cairo International Stadium', city: 'Cairo' },
        channel: 'beIN Sports 1',
      },
      {
        id: 'match2',
        homeTeam: this.teams.get('team3')!,
        awayTeam: this.teams.get('team4')!,
        homeScore: 2,
        awayScore: 1,
        status: 'inprogress',
        kickoffTime: new Date(today.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        minute: 45,
        league: {
          id: 'league2',
          name: 'La Liga',
          nameAr: 'الدوري الإسباني',
          logo: 'https://upload.wikimedia.org/wikipedia/en/0/0b/LaLiga_EA_Sports.svg',
        },
        venue: { name: 'Camp Nou', city: 'Barcelona' },
        channel: 'Sky Sports',
      },
      {
        id: 'match3',
        homeTeam: this.teams.get('team5')!,
        awayTeam: this.teams.get('team6')!,
        homeScore: 0,
        awayScore: 0,
        status: 'scheduled',
        kickoffTime: new Date(today.getTime() + 4 * 60 * 60 * 1000).toISOString(),
        minute: 0,
        league: {
          id: 'league3',
          name: 'Premier League',
          nameAr: 'الدوري الإنجليزي',
          logo: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Premier_League_Logo.svg',
        },
        venue: { name: 'Anfield', city: 'Liverpool' },
        channel: 'beIN Sports 2',
      },
      {
        id: 'match7',
        homeTeam: this.teams.get('team7')!,
        awayTeam: this.teams.get('team8')!,
        homeScore: 0,
        awayScore: 0,
        status: 'scheduled',
        kickoffTime: new Date(today.getTime() + 5 * 60 * 60 * 1000).toISOString(),
        minute: 0,
        league: {
          id: 'league1',
          name: 'Egyptian Premier League',
          nameAr: 'الدوري المصري الممتاز',
          logo: 'https://upload.wikimedia.org/wikipedia/en/1/15/Egyptian_Premier_League.png',
        },
        venue: { name: 'Ismailia Stadium', city: 'Ismailia' },
        channel: 'beIN Sports 3',
      },
      // Yesterday's matches
      {
        id: 'match4',
        homeTeam: this.teams.get('team1')!,
        awayTeam: this.teams.get('team7')!,
        homeScore: 3,
        awayScore: 1,
        status: 'finished',
        kickoffTime: new Date(yesterday.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        minute: 90,
        league: {
          id: 'league1',
          name: 'Egyptian Premier League',
          nameAr: 'الدوري المصري الممتاز',
          logo: 'https://upload.wikimedia.org/wikipedia/en/1/15/Egyptian_Premier_League.png',
        },
        venue: { name: 'Cairo International Stadium', city: 'Cairo' },
        channel: 'beIN Sports',
      },
      {
        id: 'match5',
        homeTeam: this.teams.get('team6')!,
        awayTeam: this.teams.get('team4')!,
        homeScore: 2,
        awayScore: 2,
        status: 'finished',
        kickoffTime: yesterday.toISOString(),
        minute: 90,
        league: {
          id: 'league4',
          name: 'UEFA Champions League',
          nameAr: 'دوري أبطال أوروبا',
          logo: 'https://upload.wikimedia.org/wikipedia/en/b/ba/UEFA_Champions_League_logo_2.svg',
        },
        venue: { name: 'Old Trafford', city: 'Manchester' },
        channel: 'Sky Sports',
      },
      // Tomorrow's matches
      {
        id: 'match6',
        homeTeam: this.teams.get('team2')!,
        awayTeam: this.teams.get('team3')!,
        homeScore: 0,
        awayScore: 0,
        status: 'scheduled',
        kickoffTime: tomorrow.toISOString(),
        minute: 0,
        league: {
          id: 'league1',
          name: 'Egyptian Premier League',
          nameAr: 'الدوري المصري الممتاز',
          logo: 'https://upload.wikimedia.org/wikipedia/en/1/15/Egyptian_Premier_League.png',
        },
        venue: { name: 'Cairo Stadium', city: 'Cairo' },
        channel: 'beIN Sports',
      },
    ];

    matches.forEach((match) => this.matches.set(match.id, match));

    // Initialize news
    const news: News[] = [
      {
        id: 'news1',
        title: 'Barcelona beats Real Madrid in epic El Clásico',
        titleAr: 'برشلونة يفوز على ريال مدريد في كلاسيكو مثير',
        content: 'In an exciting match, Barcelona managed to defeat Real Madrid with a score of 2-1... Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        contentAr: 'في مباراة مثيرة، تمكن برشلونة من هزيمة ريال مدريد برصيد 2-1... تفاصيل المباراة والإحصائيات الكاملة.',
        image: 'https://via.placeholder.com/400x200?text=Barcelona+vs+Madrid',
        author: 'Sports Reporter',
        publishedAt: new Date().toISOString(),
        category: 'Match Report',
        source: 'Sports News',
      },
      {
        id: 'news2',
        title: 'Egyptian Premier League intensifies',
        titleAr: 'الدوري المصري يشتد على مراحله الأخيرة',
        content: 'The Egyptian Premier League continues with exciting matches... The competition is getting tighter as we approach the final weeks of the season.',
        contentAr: 'يستمر الدوري المصري بمباريات مثيرة... المنافسة تشتد مع اقتراب نهاية الموسم.',
        image: 'https://via.placeholder.com/400x200?text=Egypt+Football',
        author: 'Football Analyst',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        category: 'League News',
        source: 'Sports News',
      },
      {
        id: 'news3',
        title: 'Liverpool wins against Manchester United',
        titleAr: 'ليفربول يتفوق على مانشستر يونايتد',
        content: 'In a thrilling encounter at Anfield, Liverpool secured victory over Manchester United...',
        contentAr: 'في مباراة مثيرة في أنفيلد، حقق ليفربول الفوز على مانشستر يونايتد...',
        image: 'https://via.placeholder.com/400x200?text=Liverpool+vs+Man+United',
        author: 'Sports Correspondent',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        category: 'Match Report',
        source: 'Sports News',
      },
    ];

    news.forEach((item) => this.news.set(item.id, item));
  }

  async getMatches(day: 'yesterday' | 'today' | 'tomorrow'): Promise<Match[]> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let targetDate: Date;
    if (day === 'yesterday') {
      targetDate = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    } else if (day === 'tomorrow') {
      targetDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    } else {
      targetDate = today;
    }

    const filtered = Array.from(this.matches.values()).filter((match) => {
      const matchDate = new Date(match.kickoffTime);
      return (
        matchDate.getDate() === targetDate.getDate() &&
        matchDate.getMonth() === targetDate.getMonth() &&
        matchDate.getFullYear() === targetDate.getFullYear()
      );
    });

    return filtered;
  }

  async getMatch(id: string): Promise<Match | null> {
    return this.matches.get(id) || null;
  }

  async getLeagues(): Promise<League[]> {
    return Array.from(this.leagues.values());
  }

  async getLeague(id: string): Promise<League | null> {
    return this.leagues.get(id) || null;
  }

  async getTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeam(id: string): Promise<Team | null> {
    return this.teams.get(id) || null;
  }

  async getNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getNewsItem(id: string): Promise<News | null> {
    return this.news.get(id) || null;
  }

  async getMatchEvents(matchId: string): Promise<Event[]> {
    return this.events.get(matchId) || [];
  }

  getMatchStatistics(matchId: string) {
    const match = this.matches.get(matchId);
    if (!match) return null;

    // Generate realistic statistics based on match status
    const stats = {
      matchId,
      homeTeam: {
        teamId: match.homeTeam.id,
        possession: Math.random() * 30 + 40, // 40-70%
        shots: Math.floor(Math.random() * 8) + 5, // 5-12
        shotsOnTarget: Math.floor(Math.random() * 4) + 2, // 2-5
        passes: Math.floor(Math.random() * 150) + 300, // 300-450
        passAccuracy: Math.random() * 20 + 75, // 75-95%
        fouls: Math.floor(Math.random() * 8) + 4, // 4-12
        offsides: Math.floor(Math.random() * 3), // 0-2
        corners: Math.floor(Math.random() * 4) + 2, // 2-5
        yellowCards: Math.floor(Math.random() * 2), // 0-1
        redCards: 0,
        saves: match.homeTeam ? Math.floor(Math.random() * 3) + 1 : 0, // 1-3
        tackles: Math.floor(Math.random() * 6) + 8, // 8-14
      },
      awayTeam: {
        teamId: match.awayTeam.id,
        possession: Math.random() * 30 + 40, // 40-70%
        shots: Math.floor(Math.random() * 8) + 5, // 5-12
        shotsOnTarget: Math.floor(Math.random() * 4) + 2, // 2-5
        passes: Math.floor(Math.random() * 150) + 300, // 300-450
        passAccuracy: Math.random() * 20 + 75, // 75-95%
        fouls: Math.floor(Math.random() * 8) + 4, // 4-12
        offsides: Math.floor(Math.random() * 3), // 0-2
        corners: Math.floor(Math.random() * 4) + 2, // 2-5
        yellowCards: Math.floor(Math.random() * 2), // 0-1
        redCards: 0,
        saves: match.awayTeam ? Math.floor(Math.random() * 3) + 1 : 0, // 1-3
        tackles: Math.floor(Math.random() * 6) + 8, // 8-14
      },
    };

    // Balance possession to 100%
    const totalPossession = stats.homeTeam.possession + stats.awayTeam.possession;
    stats.homeTeam.possession = (stats.homeTeam.possession / totalPossession) * 100;
    stats.awayTeam.possession = 100 - stats.homeTeam.possession;

    return stats;
  }

  // Helper to simulate live updates
  simulateMatchUpdate(matchId: string, newScore: { home: number; away: number; minute: number }) {
    const match = this.matches.get(matchId);
    if (match) {
      match.homeScore = newScore.home;
      match.awayScore = newScore.away;
      match.minute = newScore.minute;
    }
  }

  simulateEvent(matchId: string, event: Event) {
    if (!this.events.has(matchId)) {
      this.events.set(matchId, []);
    }
    this.events.get(matchId)!.push(event);
  }
}

export const mockDataService = new MockDataService();
