import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/pages/HomePage';
import { MatchDetailsPage } from '@/pages/MatchDetailsPage';
import { LeaguesPage } from '@/pages/LeaguesPage';
import { TeamsPage } from '@/pages/TeamsPage';
import { NewsPage } from '@/pages/NewsPage';
import { NewsDetailPage } from '@/pages/NewsDetailPage';
import { AdminPage } from '@/pages/AdminPage';
import { useThemeStore, applyTheme } from '@/context/themeStore';
import '@/index.css';

export default function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/matches/:id" element={<MatchDetailsPage />} />
            <Route path="/leagues" element={<LeaguesPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<div className="text-center py-20">الصفحة غير موجودة</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
