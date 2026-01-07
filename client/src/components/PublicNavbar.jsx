import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PublicNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { label: 'Live', path: '/', icon: '🔴' },
        { label: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
        { label: 'About', path: '/about', icon: '📖' },
        { label: 'Council', path: '/student-council', icon: '🎓' },
        { label: 'Admin', path: '/login', icon: '🔐' }
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white border-b-2 border-gray-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div 
                        onClick={() => navigate('/')}
                        className="cursor-pointer flex items-center gap-3"
                    >
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-xl shadow-md">
                            🏟️
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">
                                VNIT <span className="text-indigo-600">Games</span>
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 ${
                                    isActive(item.path)
                                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                                        : 'text-gray-700 border-transparent hover:bg-gray-100 hover:border-gray-200'
                                }`}
                            >
                                <span className="mr-1.5">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-10 h-10 bg-gray-100 border-2 border-gray-600 rounded-lg flex items-center justify-center text-xl shadow-sm"
                        >
                            {isOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => { navigate(item.path); setIsOpen(false); }}
                                className={`w-full px-4 py-3 rounded-lg text-left font-medium border-2 ${
                                    isActive(item.path)
                                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                                        : 'text-gray-700 border-transparent hover:bg-gray-100 hover:border-gray-200'
                                }`}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default PublicNavbar;
