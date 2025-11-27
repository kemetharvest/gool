import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import type { News } from '@/types/index';

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadNews = async () => {
      try {
        const data = await apiService.getNewsItem(id);
        setNewsItem(data);
      } catch (error) {
        console.error('Failed to load news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">جاري التحميل...</p>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">لم يتم العثور على الخبر</p>
          <button onClick={() => navigate('/news')} className="text-red-500 hover:text-red-600">
            العودة للأخبار
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate('/news')} className="text-slate-600 dark:text-slate-400 mb-6">
          ← العودة للأخبار
        </button>

        <article>
          {/* Image */}
          <div className="rounded-lg overflow-hidden mb-6 h-96">
            <img
              src={newsItem.image}
              alt={newsItem.titleAr}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                {newsItem.category}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {new Date(newsItem.publishedAt).toLocaleDateString('ar-EG')}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {newsItem.titleAr}
            </h1>
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
              <span>✍️ {newsItem.author}</span>
              {newsItem.source && <span>📰 {newsItem.source}</span>}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none dark:prose-invert">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {newsItem.contentAr}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
