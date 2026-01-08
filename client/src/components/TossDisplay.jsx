import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Toss Display Component - Shows which team won the toss and their decision
 * Used for cricket matches and other sports with toss/coin flip
 */
const TossDisplay = ({ 
    match, 
    onSetToss, 
    isAdmin = false,
    compact = false 
}) => {
    const toss = match?.toss;
    const teamA = match?.teamA;
    const teamB = match?.teamB;

    // Decision options based on sport
    const getDecisionOptions = (sport) => {
        switch (sport) {
            case 'CRICKET':
                return [
                    { value: 'BAT', label: 'Bat First', icon: '🏏' },
                    { value: 'BOWL', label: 'Bowl First', icon: '⚾' }
                ];
            case 'FOOTBALL':
            case 'HOCKEY':
                return [
                    { value: 'KICK_OFF', label: 'Kick Off', icon: '⚽' },
                    { value: 'CHOOSE_SIDE', label: 'Choose Side', icon: '🔀' }
                ];
            case 'BASKETBALL':
                return [
                    { value: 'FIRST_POSSESSION', label: 'First Possession', icon: '🏀' },
                    { value: 'CHOOSE_SIDE', label: 'Choose Side', icon: '🔀' }
                ];
            case 'VOLLEYBALL':
            case 'BADMINTON':
                return [
                    { value: 'SERVE', label: 'Serve First', icon: '🏐' },
                    { value: 'CHOOSE_SIDE', label: 'Choose Side', icon: '🔀' }
                ];
            default:
                return [
                    { value: 'FIRST', label: 'Go First', icon: '1️⃣' },
                    { value: 'CHOOSE_SIDE', label: 'Choose Side', icon: '🔀' }
                ];
        }
    };

    const decisionOptions = getDecisionOptions(match?.sport);

    const handleSetToss = (winnerId, decision) => {
        onSetToss?.({
            winner: winnerId,
            decision,
            timestamp: new Date().toISOString()
        });
    };

    // Compact display for headers/summaries
    if (compact && toss?.winner) {
        // Convert IDs to strings for comparison
        const tossWinnerId = toss.winner?._id?.toString() || toss.winner?.toString();
        const teamAId = teamA?._id?.toString();
        const teamBId = teamB?._id?.toString();
        const winnerTeam = tossWinnerId === teamAId ? teamA : teamB;
        const decisionLabel = decisionOptions.find(d => d.value === toss.decision)?.label || toss.decision;
        
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"
            >
                <span>🪙</span>
                <span>{winnerTeam?.shortCode || 'Team'} won the toss</span>
                <span>•</span>
                <span>{decisionLabel}</span>
            </motion.div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-400 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">🪙</span>
                    Toss Information
                </h3>
                {toss?.winner && (
                    <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full shadow-md">
                        ✓ Completed
                    </span>
                )}
            </div>

            <AnimatePresence mode="wait">
                {toss?.winner ? (
                    // Toss Result Display
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center"
                    >
                        {/* Winner Display */}
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 mb-4 border-2 border-green-500">
                            <div className="text-green-700 text-sm font-bold mb-2">🏆 TOSS WINNER</div>
                            <div className="flex items-center justify-center gap-3">
                                {(() => {
                                    const tossWinnerId = toss.winner?._id?.toString() || toss.winner?.toString();
                                    const teamAId = teamA?._id?.toString();
                                    const teamBId = teamB?._id?.toString();
                                    const winnerTeam = tossWinnerId === teamAId ? teamA : teamB;
                                    
                                    return (
                                        <>
                                            {winnerTeam?.logo && (
                                                <img 
                                                    src={winnerTeam.logo}
                                                    alt="Winner"
                                                    className="w-12 h-12 object-contain rounded-lg bg-white/10 p-1"
                                                />
                                            )}
                                            <div>
                                                <div className="text-3xl font-black text-gray-900">
                                                    {winnerTeam?.shortCode || 'Team'}
                                                </div>
                                                <div className="text-gray-700 text-sm font-semibold">
                                                    {winnerTeam?.name}
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* Decision Display */}
                        <div className="bg-blue-100 rounded-lg p-4 border-2 border-blue-500">
                            <div className="text-blue-700 text-sm font-bold mb-2">DECISION</div>
                            <div className="text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
                                <span>
                                    {decisionOptions.find(d => d.value === toss.decision)?.icon || '🎯'}
                                </span>
                                <span>
                                    {decisionOptions.find(d => d.value === toss.decision)?.label || toss.decision}
                                </span>
                            </div>
                        </div>

                        {/* Admin Reset Button */}
                        {isAdmin && onSetToss && (
                            <button
                                onClick={() => onSetToss(null)}
                                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-colors shadow-md"
                            >
                                🔄 Reset Toss
                            </button>
                        )}
                    </motion.div>
                ) : isAdmin && onSetToss ? (
                    // Admin Toss Selection
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div className="text-center text-gray-900 font-bold text-lg mb-4">
                            👇 Select toss winner and their decision
                        </div>

                        {/* Team Selection */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {[
                                { team: teamA, id: teamA?._id, key: 'teamA' },
                                { team: teamB, id: teamB?._id, key: 'teamB' }
                            ].map(({ team, id, key }) => (
                                <div key={key} className="space-y-2">
                                    <div 
                                        className="bg-white rounded-xl p-4 text-center border-2 border-gray-300
                                                   shadow-md"
                                    >
                                        {team?.logo && (
                                            <img 
                                                src={team.logo}
                                                alt={team.shortCode}
                                                className="w-16 h-16 object-contain mx-auto mb-2 rounded-lg bg-gray-100 p-2"
                                            />
                                        )}
                                        <div className="text-gray-900 font-black text-lg">{team?.shortCode}</div>
                                        <div className="text-gray-700 text-sm font-semibold">{team?.name}</div>
                                    </div>
                                    
                                    {/* Decision buttons */}
                                    <div className="space-y-2">
                                        {decisionOptions.map(option => (
                                            <motion.button
                                                key={`${key}-${option.value}`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleSetToss(id, option.value)}
                                                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white 
                                                           py-3 px-3 rounded-lg text-sm font-bold shadow-lg
                                                           flex items-center justify-center gap-2 transition-all"
                                            >
                                                <span>{option.icon}</span>
                                                <span>{option.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    // No toss yet (public view)
                    <motion.div
                        key="pending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-6"
                    >
                        <div className="text-gray-700">
                            <span className="text-5xl mb-3 block">🪙</span>
                            <p className="text-lg font-bold">Toss not yet conducted</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TossDisplay;
