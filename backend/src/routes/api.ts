import express, { Request, Response } from 'express';
import { mockDataService } from '@/services/mockDataService.js';

const router = express.Router();

// Matches endpoints
router.get('/matches', async (req: Request, res: Response) => {
  try {
    const day = (req.query.day as string) || 'today';
    if (!['yesterday', 'today', 'tomorrow'].includes(day)) {
      return res.status(400).json({ error: 'Invalid day parameter' });
    }
    const matches = await mockDataService.getMatches(day as 'yesterday' | 'today' | 'tomorrow');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

router.get('/matches/:id', async (req: Request, res: Response) => {
  try {
    const match = await mockDataService.getMatch(req.params.id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match' });
  }
});

router.get('/matches/:id/events', async (req: Request, res: Response) => {
  try {
    const events = await mockDataService.getMatchEvents(req.params.id);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match events' });
  }
});

router.get('/matches/:id/statistics', async (req: Request, res: Response) => {
  try {
    const stats = mockDataService.getMatchStatistics(req.params.id);
    if (!stats) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match statistics' });
  }
});

// Leagues endpoints
router.get('/leagues', async (req: Request, res: Response) => {
  try {
    const leagues = await mockDataService.getLeagues();
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leagues' });
  }
});

router.get('/leagues/:id', async (req: Request, res: Response) => {
  try {
    const league = await mockDataService.getLeague(req.params.id);
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    res.json(league);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch league' });
  }
});

router.post('/leagues', async (req: Request, res: Response) => {
  try {
    const { name, nameAr, country, logo, season, type } = req.body;
    if (!name || !nameAr || !country || !logo) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newLeague = {
      id: `league_${Date.now()}`,
      name,
      nameAr,
      country,
      logo,
      season: season || new Date().getFullYear(),
      type: type || 'domestic',
    };
    res.status(201).json(newLeague);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create league' });
  }
});

router.put('/matches/:id', async (req: Request, res: Response) => {
  try {
    const { homeScore, awayScore, status, minute } = req.body;
    const match = await mockDataService.getMatch(req.params.id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    const updatedMatch = {
      ...match,
      homeScore: homeScore ?? match.homeScore,
      awayScore: awayScore ?? match.awayScore,
      status: status ?? match.status,
      minute: minute ?? match.minute,
    };
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update match' });
  }
});

// Teams endpoints
router.get('/teams', async (req: Request, res: Response) => {
  try {
    const teams = await mockDataService.getTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

router.get('/teams/:id', async (req: Request, res: Response) => {
  try {
    const team = await mockDataService.getTeam(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// News endpoints
router.get('/news', async (req: Request, res: Response) => {
  try {
    const news = await mockDataService.getNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

router.get('/news/:id', async (req: Request, res: Response) => {
  try {
    const newsItem = await mockDataService.getNewsItem(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
});

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
