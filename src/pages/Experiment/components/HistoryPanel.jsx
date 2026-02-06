import React from 'react';
import useExperimentStore from '@/stores/experimentStore.js';
import { History, CheckCircle2, XCircle, Clock } from 'lucide-react';
import dayjs from 'dayjs';

const HistoryPanel = () => {
    const { logs, loading } = useExperimentStore();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
            <div className="flex items-center gap-2 mb-6">
                <History className="text-primary" size={20} />
                <h3 className="text-lg font-bold text-gray-800">实验记录</h3>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm italic">
                        暂无实验记录
                    </div>
                ) : (
                    logs.map((log) => (
                        <div
                            key={log.f_id}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Clock size={10} />
                    {dayjs(log.f_create_time).format('MM-DD HH:mm')}
                </span>
                                {log.f_result === '成功拉开' ? (
                                    <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={10} /> 成功
                  </span>
                                ) : (
                                    <span className="text-[10px] font-bold text-red-600 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-full">
                    <XCircle size={10} /> 失败
                  </span>
                                )}
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-[10px]">
                                <div className="flex flex-col">
                                    <span className="text-gray-400">真空度</span>
                                    <span className="font-bold text-gray-700">{log.f_parameters.vacuumLevel}%</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400">马匹</span>
                                    <span className="font-bold text-gray-700">{log.f_parameters.horsesCount}匹</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400">半径</span>
                                    <span className="font-bold text-gray-700">{log.f_parameters.hemisphereRadius}m</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />
        </div>
    );
};

export default HistoryPanel;