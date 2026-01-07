import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) {
                setIsSidebarOpen(false);
            }
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navItems = [
        { name: '📊 Dashboard', path: '/admin/dashboard' },
        { name: '🏢 Departments', path: '/admin/departments' },
        { name: '📅 Schedule Match', path: '/admin/schedule' },
        { name: '📢 Live Console', path: '/admin/live' },
        { name: '⭐ Award Points', path: '/admin/points' },
        { name: '🏆 Leaderboard', path: '/admin/leaderboard' },
        { name: '🎯 Seasons', path: '/admin/seasons' },
        { name: '⚙️ Scoring Presets', path: '/admin/scoring-presets' },
        { name: '👥 Admin Users', path: '/admin/users' },
        { name: '🎓 Student Council', path: '/admin/student-council' },
        { name: '📖 About VNIT IG', path: '/admin/about' }
    ];

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('adminToken');
            navigate('/login');
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Mobile Menu Button */}
            {isMobile && (
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="fixed top-4 left-4 z-50 p-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg lg:hidden hover:bg-gray-50"
                >
                    {isSidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                </button>
            )}

            {/* Sidebar Overlay for Mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/30 z-30 lg:hidden"
                />
            )}

            {/* Sidebar */}
            {(isSidebarOpen || !isMobile) && (
                <aside
                    className={`${
                        isMobile ? 'fixed inset-y-0 left-0 w-64 z-40' : 'relative'
                    } ${
                        !isMobile && !isSidebarOpen ? 'w-0 hidden' : 'w-64'
                    } flex flex-col bg-white border-r-2 border-gray-200 shadow-xl`}
                >
                    <div className="p-4 sm:p-6 border-b-2 border-gray-200 flex items-center justify-between">
                        <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                            VNIT Sports Admin
                        </h1>
                        {!isMobile && (
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <nav className="p-3 sm:p-4 space-y-1 flex-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => isMobile && setIsSidebarOpen(false)}
                                    className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium border-2 ${
                                        isActive
                                            ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                                            : 'text-gray-700 border-transparent hover:bg-gray-100 hover:border-gray-200'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-3 sm:p-4 border-t-2 border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base text-red-600 border-2 border-red-300 hover:bg-red-50 shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </aside>
            )}

            {/* Desktop Toggle Button */}
            {!isMobile && !isSidebarOpen && (
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="fixed top-4 left-4 z-40 p-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:bg-gray-50"
                >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            )}

            <main className="flex-1 overflow-auto bg-gray-50">
                <div className={`p-4 sm:p-6 md:p-8 ${isMobile ? 'pt-16' : ''}`}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
