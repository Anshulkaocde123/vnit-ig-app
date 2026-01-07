import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, RotateCcw, ServerCog } from 'lucide-react';

const BadmintonAdminControls = ({ match, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const { currentSet, scoreA, scoreB, currentServer, maxSets = 3 } = match;

    const handlePointUpdate = async (team, increment) => {
        if (!currentSet) {
            // Start first set
            await handleUpdate({
                action: 'startSet',
                setNumber: 1
            });
            // Then add the point
            setTimeout(() => {
                handleUpdate({
                    action: 'updateSetPoints',
                    team,
                    points: increment
                });
            }, 100);
            return;
        }

        await handleUpdate({
            action: 'updateSetPoints',
            team,
            points: increment
        });
    };

    const handleUpdate = async (payload) => {
        setLoading(true);
        try {
            await onUpdate(payload);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleServer = () => {
        handleUpdate({
            action: 'toggleServer'
        });
    };

    const handleWinSet = async (team) => {
        if (!currentSet) return;
        
        await handleUpdate({
            action: 'endSet',
            winner: team,
            finalPointsA: currentSet.pointsA || 0,
            finalPointsB: currentSet.pointsB || 0
        });
    };

    const handleNewSet = () => {
        const nextSetNumber = (scoreA + scoreB + 1);
        handleUpdate({
            action: 'startSet',
            setNumber: nextSetNumber
        });
    };

    const setsToWin = Math.ceil(maxSets / 2);
    const canStartNewSet = !currentSet && match.status === 'LIVE' && (scoreA < setsToWin && scoreB < setsToWin);

    return (
        <div className="space-y-4">
            {/* Current Set Info */}
            {currentSet && (
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="flex justify-between items-center mb-2 sm:mb-3 gap-2 flex-wrap">
                        <span className="text-sm font-semibold sm:text-sm font-bold text-purple-400">
                            Current Set: {(scoreA + scoreB + 1)} of {maxSets}
                        </span>
                        <button
                            onClick={handleToggleServer}
                            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg transition-all text-sm font-semibold sm:text-sm"
                        >
                            <ServerCog className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="font-bold">
                                Server: {currentServer || 'A'}
                            </span>
                        </button>
                    </div>
                    <div className="flex gap-3 sm:gap-4 justify-center items-center text-white">
                        <div className="text-2xl sm:text-3xl font-black">{currentSet.pointsA || 0}</div>
                        <div className="text-lg sm:text-xl text-gray-500">-</div>
                        <div className="text-2xl sm:text-3xl font-black">{currentSet.pointsB || 0}</div>
                    </div>
                </div>
            )}

            {/* Point Controls */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Team A Controls */}
                <div className="space-y-2 sm:space-y-3">
                    <div className="text-center">
                        <div className="text-sm font-semibold sm:text-sm font-bold text-purple-400 mb-1 sm:mb-2">
                            {match.teamA?.shortCode || 'Team A'}
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-white">
                            {scoreA || 0}
                        </div>
                        <div className="text-sm font-semibold text-gray-500">Sets Won</div>
                    </div>

                    <div className="space-y-2">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePointUpdate('A', 1)}
                            disabled={loading || !currentSet}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 
                                     text-white py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 
                                     disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-sm sm:text-base
                                     active:scale-95 touch-manipulation"
                        >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            Point
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePointUpdate('A', -1)}
                            disabled={loading || !currentSet || (currentSet.pointsA || 0) === 0}
                            className="w-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white py-2 sm:py-3 rounded-xl font-bold 
                                     flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed 
                                     transition-all border border-white/10 text-sm sm:text-base touch-manipulation"
                        >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            Undo
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleWinSet('A')}
                            disabled={loading || !currentSet || (currentSet.pointsA || 0) < 21}
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 
                                     text-white py-2 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-1 sm:gap-2 
                                     disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-sm sm:text-base
                                     active:scale-95 touch-manipulation"
                        >
                            🏆 Win Set
                        </motion.button>
                    </div>
                </div>

                {/* Team B Controls */}
                <div className="space-y-2 sm:space-y-3">
                    <div className="text-center">
                        <div className="text-sm font-semibold sm:text-sm font-bold text-pink-400 mb-1 sm:mb-2">
                            {match.teamB?.shortCode || 'Team B'}
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-white">
                            {scoreB || 0}
                        </div>
                        <div className="text-sm font-semibold text-gray-500">Sets Won</div>
                    </div>

                    <div className="space-y-2">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePointUpdate('B', 1)}
                            disabled={loading || !currentSet}
                            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 
                                     text-white py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 
                                     disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-sm sm:text-base
                                     active:scale-95 touch-manipulation"
                        >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            Point
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePointUpdate('B', -1)}
                            disabled={loading || !currentSet || (currentSet.pointsB || 0) === 0}
                            className="w-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white py-2 sm:py-3 rounded-xl font-bold 
                                     flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed 
                                     transition-all border border-white/10 text-sm sm:text-base touch-manipulation"
                        >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            Undo
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleWinSet('B')}
                            disabled={loading || !currentSet || (currentSet.pointsB || 0) < 21}
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 
                                     text-white py-2 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-1 sm:gap-2 
                                     disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-sm sm:text-base
                                     active:scale-95 touch-manipulation"
                        >
                            🏆 Win Set
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* New Set Button */}
            {canStartNewSet && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNewSet}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 
                             text-white py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 
                             disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-sm sm:text-base
                             active:scale-95 touch-manipulation"
                >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                    Start Set {(scoreA + scoreB + 1)}
                </motion.button>
            )}

            {/* Match Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-sm font-semibold sm:text-sm">
                    <div>
                        <div className="text-gray-800 text-xs">Sets to Win</div>
                        <div className="text-white font-bold text-sm sm:text-base">{setsToWin}</div>
                    </div>
                    <div>
                        <div className="text-gray-800 text-xs">Format</div>
                        <div className="text-white font-bold text-sm sm:text-base">Best of {maxSets}</div>
                    </div>
                    <div>
                        <div className="text-gray-800 text-xs">Server</div>
                        <div className="text-white font-bold flex items-center justify-center gap-1 text-sm sm:text-base">
                            {currentServer === 'A' ? (
                                <span className="text-purple-400">{match.teamA?.shortCode}</span>
                            ) : (
                                <span className="text-pink-400">{match.teamB?.shortCode}</span>
                            )}
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadmintonAdminControls;
