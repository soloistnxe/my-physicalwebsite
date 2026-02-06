import React, { useState } from 'react';
import useExperimentStore from '@/stores/experimentStore.js';
import { Play, RotateCcw, Wind, Users, Maximize2, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ControlPanel = () => {
    const {
        vacuumLevel, setVacuumLevel,
        horsesCount, setHorsesCount,
        hemisphereRadius, setHemisphereRadius,
        isPumping, setIsPumping,
        isPulling, setIsPulling,
        isSeparated, setIsSeparated,
        saveCurrentExperiment
    } = useExperimentStore();

    const handleStartPumping = () => {
        if (isSeparated) return;
        setIsPumping(true);
        let current = vacuumLevel;
        const interval = setInterval(() => {
            current += 5;
            if (current >= 100) {
                setVacuumLevel(100);
                setIsPumping(false);
                clearInterval(interval);
                toast.success("抽气完成，已接近真空状态");
            } else {
                setVacuumLevel(current);
            }
        }, 100);
    };

    const handlePull = () => {
        if (isPumping) return;
        setIsPulling(true);
        setTimeout(() => {
            setIsPulling(false);
        }, 2000);
    };

    const handleReset = () => {
        setVacuumLevel(0);
        setIsSeparated(false);
        setIsPumping(false);
        setIsPulling(false);
        toast.success("实验已重置");
    };

    const handleSave = async () => {
        try {
            await saveCurrentExperiment();
            toast.success("实验记录已保存");
        } catch (e) {
            toast.error("保存失败");
        }
    };

    return (
        <div className="bg-white p-6 rounded-[var(--radius)] shadow-lg border border-border space-y-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">实验控制台</h3>
                <button
                    onClick={handleReset}
                    className="p-2 text-foreground/40 hover:text-indigo-600 transition-colors rounded-full hover:bg-secondary"
                    title="重置实验"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            {/* 参数调节 */}
            <div className="space-y-6">
                {/* 真空度 */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <label className="text-foreground/70 font-medium flex items-center gap-2">
                            <Wind size={16} className="text-indigo-600" />
                            真空度 (%)
                        </label>
                        <span className="text-indigo-600 font-bold">{vacuumLevel}%</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            disabled={isPumping || isSeparated || vacuumLevel >= 100}
                            onClick={handleStartPumping}
                            className="px-3 py-1 bg-indigo-600/10 text-indigo-600 rounded-md text-xs font-bold hover:bg-indigo-600/20 disabled:opacity-50 transition-colors"
                        >
                            开始抽气
                        </button>
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-600 transition-all duration-300"
                                style={{ width: `${vacuumLevel}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* 马的数量 */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <label className="text-foreground/70 font-medium flex items-center gap-2">
                            <Users size={16} className="text-purple-600" />
                            拉力马匹数 (匹)
                        </label>
                        <span className="text-indigo-600 font-bold">{horsesCount}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {[2, 4, 8, 16].map(num => (
                            <button
                                key={num}
                                disabled={isSeparated}
                                onClick={() => setHorsesCount(num)}
                                className={`py-2 rounded-lg text-sm font-bold transition-all ${
                                    horsesCount === num
                                        ? 'bg-indigo-600 text-indigo-600-foreground shadow-md'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 半球半径 */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <label className="text-foreground/70 font-medium flex items-center gap-2">
                            <Maximize2 size={16} className="text-purple-600" />
                            半球半径 (m)
                        </label>
                        <span className="text-indigo-600 font-bold">{hemisphereRadius}m</span>
                    </div>
                    <div className="flex gap-2">
                        {[0.1, 0.15, 0.2, 0.3].map(r => (
                            <button
                                key={r}
                                disabled={isSeparated}
                                onClick={() => setHemisphereRadius(r)}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                                    hemisphereRadius === r
                                        ? 'bg-indigo-600 text-indigo-600-foreground'
                                        : 'bg-secondary text-secondary-foreground'
                                }`}
                            >
                                {r*100}cm
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 操作按钮 */}
            <div className="pt-4 space-y-3">
                <button
                    disabled={isPumping || isSeparated || vacuumLevel === 0}
                    onClick={handlePull}
                    className="w-full py-4 bg-indigo-600 text-indigo-600-foreground rounded-[var(--radius)] font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                >
                    <Play size={20} fill="currentColor" />
                    尝试拉开半球
                </button>

                {isSeparated && (
                    <button
                        onClick={handleSave}
                        className="w-full py-3 border-2 border-primary text-indigo-600 rounded-[var(--radius)] font-bold flex items-center justify-center gap-2 hover:bg-indigo-600/5 transition-all"
                    >
                        <Save size={18} />
                        记录本次实验
                    </button>
                )}
            </div>
        </div>
    );
};

export default ControlPanel;