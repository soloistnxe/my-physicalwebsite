import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useExperimentStore from '@/stores/experimentStore.js';
import { Wind, Gauge } from 'lucide-react';

const ExperimentCanvas = () => {
    const {
        vacuumLevel,
        isPumping,
        isPulling,
        isSeparated,
        horsesCount,
        setIsSeparated,
        calculateRequiredForce
    } = useExperimentStore();

    const [pullProgress, setPullProgress] = useState(0);

    // 模拟抽气动画中的小粒子
    const particles = Array.from({ length: 20 });

    useEffect(() => {
        if (isPulling && !isSeparated) {
            const requiredForce = calculateRequiredForce();
            // 假设每匹马提供 3000N 的拉力 (现实中一匹马约 500-1000N，但为了演示效果调整)
            const currentForce = horsesCount * 4000;

            let timer;
            if (currentForce > requiredForce) {
                timer = setTimeout(() => {
                    setIsSeparated(true);
                    setPullProgress(1);
                }, 1500);
            } else {
                // 抖动效果，拉不开
                setPullProgress(0.1);
                timer = setTimeout(() => setPullProgress(0), 1000);
            }
            return () => clearTimeout(timer);
        } else if (!isPulling) {
            setPullProgress(0);
        }
    }, [isPulling, horsesCount, calculateRequiredForce, setIsSeparated, isSeparated]);

    return (
        <div className="w-full h-[500px] bg-slate-50 relative flex items-center justify-center overflow-hidden">
            {/* 背景装饰：实验室墙面感 */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* 压力表 */}
            <div className="absolute top-16 right-8 bg-white p-4 rounded-xl shadow-md border border-border flex flex-col items-center">
                <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#eee" strokeWidth="8" />
                        <circle
                            cx="50" cy="50" r="45" fill="none" stroke="var(--color-primary)"
                            strokeWidth="8" strokeDasharray={`${vacuumLevel * 2.82} 282`}
                            className="transition-all duration-500"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Vacuum</span>
                        <span className="text-sm font-bold">{vacuumLevel}%</span>
                    </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-primary">
                    <Gauge size={14} />
                    <span className="text-[10px] font-bold">压力计</span>
                </div>
            </div>

            {/* 实验主体 */}
            <div className="relative flex items-center justify-center w-full max-w-2xl">

                {/* 左侧拉力 (马或绳子) */}
                <motion.div
                    animate={{ x: isSeparated ? -150 : (isPulling ? -10 : 0) }}
                    className="flex flex-col items-end gap-2 pr-4"
                >
                    {Array.from({ length: Math.ceil(horsesCount / 2) }).map((_, i) => (
                        <motion.div
                            key={`left-${i}`}
                            animate={isPulling && !isSeparated ? { x: [0, -5, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 0.2 }}
                            className="w-16 h-8 bg-amber-700 rounded-l-full relative flex items-center justify-center text-[10px] text-white font-bold"
                        >
                            🐎
                        </motion.div>
                    ))}
                    <div className="h-1 w-24 bg-gray-400 rounded-full"></div>
                </motion.div>

                {/* 左半球 */}
                <motion.div
                    animate={{ x: isSeparated ? -80 : (isPulling ? -5 : 0) }}
                    className="relative z-10"
                >
                    <div className="w-32 h-32 rounded-l-full bg-gradient-to-r from-gray-400 to-gray-300 border-2 border-gray-500 shadow-inner flex items-center justify-center">
                        <div className="w-4 h-8 bg-gray-600 rounded-sm -ml-36"></div> {/* 把手 */}
                    </div>
                </motion.div>

                {/* 中间空气粒子 (抽气效果) */}
                <AnimatePresence>
                    {!isSeparated && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {particles.map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0.5, scale: 1 }}
                                    animate={isPumping ? {
                                        opacity: [0.5, 0],
                                        scale: [1, 0.2],
                                        x: (Math.random() - 0.5) * 100,
                                        y: (Math.random() - 0.5) * 100
                                    } : { opacity: 1 - vacuumLevel / 100 }}
                                    transition={isPumping ? { duration: 1, repeat: Infinity, delay: Math.random() } : {}}
                                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                                    style={{
                                        left: `${50 + (Math.random() - 0.5) * 10}%`,
                                        top: `${50 + (Math.random() - 0.5) * 10}%`
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>
                {/* 右半球 */}
                <motion.div
                    animate={{ x: isSeparated ? 80 : (isPulling ? 5 : 0) }}
                    className="relative z-10"
                >
                    <div className="w-32 h-32 rounded-r-full bg-gradient-to-l from-gray-400 to-gray-300 border-2 border-gray-500 shadow-inner flex items-center justify-center">
                        <div className="w-4 h-8 bg-gray-600 rounded-sm -mr-36"></div> {/* 把手 */}
                    </div>
                </motion.div>

                {/* 右侧拉力 */}
                <motion.div
                    animate={{ x: isSeparated ? 150 : (isPulling ? 10 : 0) }}
                    className="flex flex-col items-start gap-2 pl-4"
                >
                    {Array.from({ length: Math.ceil(horsesCount / 2) }).map((_, i) => (
                        <motion.div
                            key={`right-${i}`}
                            animate={isPulling && !isSeparated ? { x: [0, 5, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 0.2 }}
                            className="w-16 h-8 bg-amber-700 rounded-r-full relative flex items-center justify-center text-[10px] text-white font-bold"
                        >
                            🐎
                        </motion.div>
                    ))}
                    <div className="h-1 w-24 bg-gray-400 rounded-full"></div>
                </motion.div>

            </div>

            {/* 提示文案 */}
            <div className="absolute bottom-12 text-center w-full">
                <AnimatePresence mode="wait">
                    {isSeparated ? (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-green-600 font-bold text-xl"
                        >
                            🎉 成功拉开！大气压力被克服。
                        </motion.p>
                    ) : isPulling ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-orange-600 font-bold animate-pulse"
                        >
                            用力拉拽中... (当前拉力约 {horsesCount * 4000} N)
                        </motion.p>
                    ) : (
                        <p className="text-gray-500 font-medium">准备就绪，请调整参数并开始实验</p >
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ExperimentCanvas;