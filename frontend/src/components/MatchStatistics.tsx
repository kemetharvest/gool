import { motion } from 'framer-motion';
import type { MatchStatistics as MatchStatsType } from '@/types/index';

interface Props {
  stats: MatchStatsType;
}

const StatItem = ({
  label,
  homeValue,
  awayValue,
  unit = '',
}: {
  label: string;
  homeValue: number | string;
  awayValue: number | string;
  unit?: string;
}) => {
  const homeNum = typeof homeValue === 'number' ? homeValue : parseFloat(homeValue);
  const awayNum = typeof awayValue === 'number' ? awayValue : parseFloat(awayValue);
  const total = homeNum + awayNum;
  const homePercent = total > 0 ? (homeNum / total) * 100 : 50;
  const awayPercent = total > 0 ? (awayNum / total) * 100 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {homeValue}
          {unit}
        </span>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-500">{label}</span>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {awayValue}
          {unit}
        </span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${homePercent}%` }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-primary-500 dark:bg-primary-400"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${awayPercent}%` }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-accent-red-500 dark:bg-accent-red-400 dark:ml-auto"
        />
      </div>
    </motion.div>
  );
};

export function MatchStatistics({ stats }: Props) {
  const home = stats.homeTeam;
  const away = stats.awayTeam;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-card dark:shadow-none border border-slate-200 dark:border-slate-700"
    >
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">الإحصائيات</h3>

      <div className="space-y-1">
        <StatItem label="الكرة" homeValue={home.possession.toFixed(1)} awayValue={away.possession.toFixed(1)} unit="%" />
        <StatItem label="التسديدات" homeValue={home.shots} awayValue={away.shots} />
        <StatItem label="التسديدات على المرمى" homeValue={home.shotsOnTarget} awayValue={away.shotsOnTarget} />
        <StatItem label="التمريرات" homeValue={home.passes} awayValue={away.passes} />
        <StatItem label="دقة التمرير" homeValue={home.passAccuracy.toFixed(1)} awayValue={away.passAccuracy.toFixed(1)} unit="%" />
        <StatItem label="الأخطاء" homeValue={home.fouls} awayValue={away.fouls} />
        <StatItem label="التسللات" homeValue={home.offsides} awayValue={away.offsides} />
        <StatItem label="الركنيات" homeValue={home.corners} awayValue={away.corners} />
        <StatItem label="البطاقات الصفراء" homeValue={home.yellowCards} awayValue={away.yellowCards} />
        <StatItem label="البطاقات الحمراء" homeValue={home.redCards} awayValue={away.redCards} />
        <StatItem label="التصديات" homeValue={home.saves} awayValue={away.saves} />
        <StatItem label="الانتزاعات" homeValue={home.tackles} awayValue={away.tackles} />
      </div>
    </motion.div>
  );
}
