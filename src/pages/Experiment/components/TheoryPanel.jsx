import React from 'react';
import { Info, BookOpen, Calculator } from 'lucide-react';
import useExperimentStore from '@/stores/experimentStore.js';

const TheoryPanel = () => {
    const { vacuumLevel, hemisphereRadius, requiredForce } = useExperimentStore();

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-border p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
                <Info className="text-primary" />
                <h3 className="text-lg font-bold">实验原理与物理计算</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-800 font-bold">
                        <BookOpen size={18} className="text-blue-500" />
                        马德堡半球实验背景
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        1654年，马德堡市长奥托·冯·格里克在马德堡市进行了著名的实验。他将两个直径约37厘米的铜质半球合在一起，抽掉其中的空气，然后用两支马队（每队8匹马）向相反方向拉，结果未能拉开。
                    </p >
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <p className="text-xs text-blue-700 font-medium">
                            💡 核心结论：大气压强是非常巨大的，且在各个方向上都存在。
                        </p >
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-800 font-bold">
                        <Calculator size={18} className="text-purple-500" />
                        实时物理计算
                    </div>
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-sm font-mono">
                        <div className="flex justify-between">
                            <span className="text-gray-500">外部气压 (P₀):</span>
                            <span className="text-gray-800">101,325 Pa</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">内部气压 (Pᵢ):</span>
                            <span className="text-gray-800">{Math.round(101325 * (1 - vacuumLevel / 100))} Pa</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">受力面积 (A):</span>
                            <span className="text-gray-800">{(Math.PI * Math.pow(hemisphereRadius, 2)).toFixed(4)} m²</span>
                        </div>
                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="flex justify-between text-primary font-bold">
                            <span>所需拉力 (F):</span>
                            <span>{Math.round(requiredForce)} N</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 italic">
                        * 公式：F = (P₀ - Pᵢ) × πr²
                    </p >
                </div>
            </div>
        </div>
    );
};

export default TheoryPanel;