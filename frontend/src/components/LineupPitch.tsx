import React from 'react';
import { motion } from 'framer-motion';
import type { Player } from '@/types/index';

interface LineupPitchProps {
  homeFormation: string;
  awayFormation: string;
  homePlayers: Player[];
  awayPlayers: Player[];
}

export function LineupPitch({
  homeFormation,
  awayFormation,
  homePlayers,
  awayPlayers,
}: LineupPitchProps) {
  const pitchHeight = 500;
  const pitchWidth = 400;

  const getPositionCoordinates = (position: string, isHome: boolean) => {
    const formations: Record<string, Record<string, [number, number]>> = {
      'DEF|MID|FWD': {
        DEF: [20, 50],
        MID: [50, 50],
        FWD: [80, 50],
      },
    };

    const x = isHome ? formations['DEF|MID|FWD'][position]?.[0] || 50 : 100 - (formations['DEF|MID|FWD'][position]?.[0] || 50);
    const y = formations['DEF|MID|FWD'][position]?.[1] || 50;
    return { x, y };
  };

  const PlayerShirt = ({ player, isHome }: { player: Player; isHome: boolean }) => {
    const { x, y } = getPositionCoordinates(player.position, isHome);

    return (
      <motion.div
        key={player.id}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: Math.random() * 0.5 }}
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        className="flex flex-col items-center"
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs ${
            isHome ? 'bg-blue-600' : 'bg-red-600'
          } border-2 border-white shadow-lg`}
        >
          {player.number}
        </div>
        <div className="text-xs font-bold mt-1 text-slate-900 dark:text-white whitespace-nowrap">
          {player.name}
        </div>
        {player.rating && (
          <div className="text-xs text-yellow-500 font-bold">{player.rating.toFixed(1)}</div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <h3 className="font-bold text-slate-900 dark:text-white">الفريق الأول</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{homeFormation}</p>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-slate-900 dark:text-white">الفريق الثاني</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{awayFormation}</p>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-green-500 to-green-600 rounded-lg shadow-lg p-4">
        {/* Pitch lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
          <rect x="20" y="0" width="60" height="100" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="1" fill="white" />
        </svg>

        <div
          className="relative mx-auto"
          style={{ height: pitchHeight, width: pitchWidth, maxWidth: '100%' }}
        >
          {/* Home Players */}
          {homePlayers.map((player) => (
            <PlayerShirt key={player.id} player={player} isHome={true} />
          ))}

          {/* Away Players */}
          {awayPlayers.map((player) => (
            <PlayerShirt key={player.id} player={player} isHome={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
