import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Beaker, Info, History, Home as HomeIcon } from 'lucide-react';
import { clsx } from 'clsx';

const ExperimentPage = lazy(() => import('@/pages/Experiment/index.jsx'));

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-primary font-medium animate-pulse">加载物理实验室中...</p >
    </div>
);

const Navigation = () => {
    const location = useLocation();
    const navItems = [
        { path: '/', icon: Beaker, label: '实验演示' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <Beaker className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          马德堡半球实验模拟器
        </span>
            </div>

            <div className="flex items-center gap-6">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-medium",
                            location.pathname === item.path
                                ? "bg-primary text-white shadow-md"
                                : "text-muted-foreground hover:bg-secondary hover:text-primary"
                        )}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

const App = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans antialiased">
            <Navigation />
            <main className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<ExperimentPage />} />
                    </Routes>
                </Suspense>
            </main>

            <footer className="py-8 border-t border-border text-center text-muted-foreground text-sm">
                <p>© 2026 初中物理数字化实验室 · 探索大气压的奥秘</p >
            </footer>
        </div>
    );
};

export default App;