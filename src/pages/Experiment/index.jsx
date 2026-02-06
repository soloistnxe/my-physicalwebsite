import React, { useEffect } from 'react';
import useExperimentStore from '@/stores/experimentStore.js';
import ExperimentCanvas from './components/ExperimentCanvas.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import TheoryPanel from './components/TheoryPanel.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import { motion } from 'framer-motion';

const ExperimentPage = () => {
    const { fetchLogs } = useExperimentStore();

    useEffect(() => {
        document.title = "马德堡半球实验 - 物理演示";
        fetchLogs();
    }, [fetchLogs]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 左侧：实验主场景 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-8 space-y-6"
            >
                <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden relative min-h-[500px]">
                    <div className="absolute top-4 left-4 z-10">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                            实时实验演示区
                        </h2>
                    </div>
                    <ExperimentCanvas />
                </div>

                <TheoryPanel />
            </motion.div>

            {/* 右侧：控制与历史 */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 space-y-6"
            >
                <ControlPanel />
                <HistoryPanel />
            </motion.div>
        </div>
    );
};

export default ExperimentPage;