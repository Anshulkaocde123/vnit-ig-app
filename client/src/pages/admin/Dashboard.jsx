import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import socket from '../../socket';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Activity, Trophy, Calendar, Users, Zap, ArrowRight, Sparkles } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        live: 0,
        completed: 0,
        upcoming: 0,
        departments: 0
    });
    const [recentMatches, setRecentMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [matchRes, deptRes, pointRes] = await Promise.all([
                    api.get('/matches'),
                    api.get('/departments'),
                    api.get('/leaderboard')
                ]);
                const matches = matchRes.data.data || [];
                const departments = deptRes.data.data || [];
                const leaderboard = pointRes.data.data || [];

                setStats({
                    total: matches.length,
                    live: matches.filter(m => m.status === 'LIVE').length,
                    completed: matches.filter(m => m.status === 'COMPLETED').length,
                    upcoming: matches.filter(m => m.status === 'SCHEDULED').length,
                    departments: departments.length
                });
                
                // Get 5 most recent or most impactful matches
                const recentMatches = matches
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);
                setRecentMatches(recentMatches);
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Real-time updates
        socket.on('matchUpdate', () => fetchData());
        socket.on('matchCreated', () => fetchData());
        socket.on('matchDeleted', () => fetchData());

        return () => {
            socket.off('matchUpdate');
            socket.off('matchCreated');
            socket.off('matchDeleted');
        };
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'LIVE':
                return (
                    <span 
                        }
                        }
                        className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/40 flex items-center gap-1.5"
                    >
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        LIVE
                    </span>
                );
            case 'COMPLETED':
                return <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/40">✓ COMPLETED</span>;
            case 'SCHEDULED':
                return <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/40">📅 UPCOMING</span>;
            default:
                return <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs font-bold rounded-full">{status}</span>;
        }
    };

    const cards = [
        {
            title: 'Total Matches',
            value: stats.total,
            icon: <Trophy className="w-7 h-7" />,
            gradient: 'from-indigo-600 to-indigo-700',
            glow: 'hover:shadow-indigo-500/30',
            action: '/admin/live',
            subtext: 'All matches'
        },
        {
            title: 'Live Now',
            value: stats.live,
            icon: <Activity className="w-7 h-7" />,
            gradient: 'from-red-500 to-rose-600',
            glow: 'hover:shadow-red-500/30',
            action: '/admin/live',
            subtext: 'In progress',
            pulse: true
        },
        {
            title: 'Completed',
            value: stats.completed,
            icon: <TrendingUp className="w-7 h-7" />,
            gradient: 'from-emerald-500 to-green-600',
            glow: 'hover:shadow-emerald-500/30',
            action: '/admin/live',
            subtext: 'Finished'
        },
        {
            title: 'Upcoming',
            value: stats.upcoming,
            icon: <Calendar className="w-7 h-7" />,
            gradient: 'from-purple-500 to-violet-600',
            glow: 'hover:shadow-purple-500/30',
            action: '/admin/schedule',
            subtext: 'Scheduled'
        },
        {
            title: 'Departments',
            value: stats.departments,
            icon: <Users className="w-7 h-7" />,
            gradient: 'from-blue-500 to-cyan-600',
            glow: 'hover:shadow-blue-500/30',
            action: '/admin/departments',
            subtext: 'Participating'
        }
    ];

    const quickActions = [
        { icon: '📅', title: 'Schedule', subtitle: 'Create Match', path: '/admin/schedule', gradient: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400' },
        { icon: '🎮', title: 'Live Scoring', subtitle: 'Update Scores', path: '/admin/live', gradient: 'from-red-500/20 to-red-600/10', border: 'border-red-500/30', text: 'text-red-400' },
        { icon: '🎖️', title: 'Award Points', subtitle: 'Manual Awards', path: '/admin/points', gradient: 'from-yellow-500/20 to-amber-600/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
        { icon: '🏢', title: 'Departments', subtitle: 'Manage Teams', path: '/admin/departments', gradient: 'from-purple-500/20 to-violet-600/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#0a0a0f]">
                <div 
                    }
                    }
                    className="text-center"
                >
                    <div 
                        }
                        }
                        className="w-16 h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 mx-auto mb-4"
                    />
                    <p className="text-gray-500 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
            {/* Animated background gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 p-6 md:p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div 
                    }
                    }
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-8 h-8 text-indigo-500" />
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Dashboard
                        </h1>
                    </div>
                    <p className="text-gray-500 font-medium ml-11">Manage matches, scores, and events</p>
                </div>

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-10">
                    {cards.map((card, idx) => (
                        <button
                            key={idx}
                            }
                            }
                            }
                            }
                            }
                            onClick={() => navigate(card.action)}
                            className={`relative bg-gradient-to-br ${card.gradient} rounded-3xl p-6 text-left overflow-hidden group transition-all duration-300 hover:shadow-2xl ${card.glow}`}
                        >
                            {/* Background shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            
                            {card.pulse && (
                                <div
                                    }
                                    }
                                    className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-3xl"
                                />
                            )}

                            <div className="relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
                                        {card.icon}
                                    </div>
                                </div>
                                <div 
                                    key={card.value}
                                    }
                                    }
                                    className="text-4xl md:text-5xl font-black text-white mb-1"
                                >
                                    {card.value}
                                </div>
                                <div className="text-xs font-bold text-white/80 uppercase tracking-wider">
                                    {card.title}
                                </div>
                                <div className="text-[10px] text-white/50 font-medium mt-0.5">{card.subtext}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Quick Actions */}
                <div 
                    }
                    }
                    }
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                >
                    {quickActions.map((action, idx) => (
                        <button
                            key={idx}
                            }
                            }
                            onClick={() => navigate(action.path)}
                            className={`p-6 bg-gradient-to-br ${action.gradient} backdrop-blur-xl rounded-2xl border ${action.border} hover:border-opacity-60 transition-all duration-300 group`}
                        >
                            <div 
                                }
                                className="text-4xl mb-3"
                            >
                                {action.icon}
                            </div>
                            <div className={`text-sm font-bold ${action.text} uppercase tracking-wider`}>{action.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{action.subtitle}</div>
                        </button>
                    ))}
                </div>

                {/* Recent Matches */}
                <div 
                    }
                    }
                    }
                    className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden"
                >
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/20 rounded-xl">
                                <Zap className="w-5 h-5 text-yellow-400" />
                            </div>
                            Recent Matches
                        </h2>
                        <button 
                            onClick={() => navigate('/admin/live')}
                            className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 group"
                        >
                            View all
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    
                        {recentMatches.length === 0 ? (
                            <div 
                                }
                                }
                                className="p-12 text-center"
                            >
                                <div className="text-5xl mb-4">🏟️</div>
                                <p className="text-gray-500">No matches yet. Create your first match!</p>
                                <button
                                    }
                                    }
                                    onClick={() => navigate('/admin/schedule')}
                                    className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                                >
                                    Create Match
                                </button>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {recentMatches.map((match, idx) => (
                                    <div
                                        key={match._id || idx}
                                        }
                                        }
                                        }
                                        onClick={() => navigate(`/admin/live`)}
                                        className="p-5 cursor-pointer hover:bg-white/5 transition-all group"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                        {match.sport?.replace('_', ' ')}
                                                    </span>
                                                    {getStatusBadge(match.status)}
                                                </div>
                                                <div className="flex items-center gap-3 text-white">
                                                    <span className="font-bold">{match.teamA?.shortCode || 'TBD'}</span>
                                                    <span className="text-gray-600 text-sm">vs</span>
                                                    <span className="font-bold">{match.teamB?.shortCode || 'TBD'}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div 
                                                    key={`${match.scoreA}-${match.scoreB}`}
                                                    }
                                                    }
                                                    className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                                                >
                                                    {typeof match.scoreA === 'object' ? (match.scoreA?.runs || 0) : (match.scoreA || 0)} - {typeof match.scoreB === 'object' ? (match.scoreB?.runs || 0) : (match.scoreB || 0)}
                                                </div>
                                                <div className="text-xs text-gray-600 font-medium mt-1">
                                                    {match.venue || 'TBD'}
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
