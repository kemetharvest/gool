import React from 'react';
import { motion } from 'framer-motion';
import type { News } from '@/types/index';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  const publishDate = new Date(news.publishedAt).toLocaleDateString('ar-EG');

  return (
    <Link to={`/news/${news.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative h-40 overflow-hidden bg-slate-200 dark:bg-slate-700">
          <img
            src={news.image}
            alt={news.titleAr}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            {news.category}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="font-bold text-sm line-clamp-2 text-slate-900 dark:text-white mb-2">
            {news.titleAr}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 flex-1">
            {news.contentAr}
          </p>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400">{publishDate}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{news.author}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
