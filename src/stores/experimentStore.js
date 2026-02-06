import { create } from 'zustand'

// 使用 localStorage 模拟后端存储
const experimentAPI = {
    getLogs: () => {
        const logs = JSON.parse(localStorage.getItem('experiment_logs') || '[]');
        return { success: true, data: logs };
    },
    saveLog: (data) => {
        const logs = JSON.parse(localStorage.getItem('experiment_logs') || '[]');
        const newLog = {
            f_id: Date.now(),
            f_create_time: new Date().toISOString(),
            f_parameters: data.parameters,
            f_result: data.result
        };
        logs.unshift(newLog);
        // 只保留最近 10 条记录
        localStorage.setItem('experiment_logs', JSON.stringify(logs.slice(0, 10)));
        return { success: true };
    },
}

const useExperimentStore = create((set, get) => ({
    logs: [],
    loading: false,

    // 实验实时状态
    vacuumLevel: 0, // 0-100%
    horsesCount: 2, // 马的数量 (2, 4, 8, 16)
    hemisphereRadius: 0.15, // 米 (15cm)
    isPumping: false,
    isPulling: false,
    isSeparated: false,
    pullForce: 0, // 当前拉力 (N)
    requiredForce: 0, // 理论所需拉力 (N)

    setVacuumLevel: (val) => set({ vacuumLevel: val }),
    setHorsesCount: (val) => set({ horsesCount: val }),
    setHemisphereRadius: (val) => set({ hemisphereRadius: val }),
    setIsPumping: (val) => set({ isPumping: val }),
    setIsPulling: (val) => set({ isPulling: val }),
    setIsSeparated: (val) => set({ isSeparated: val }),

    calculateRequiredForce: () => {
        const { vacuumLevel, hemisphereRadius } = get();
        const P0 = 101325; // 标准大气压 Pa
        const P_inside = P0 * (1 - vacuumLevel / 100);
        const deltaP = P0 - P_inside;
        const area = Math.PI * Math.pow(hemisphereRadius, 2);
        const force = deltaP * area;
        set({ requiredForce: force });
        return force;
    },

    fetchLogs: async () => {
        set({ loading: true });
        try {
            const res = experimentAPI.getLogs();
            if (res.success) set({ logs: res.data });
        } finally {
            set({ loading: false });
        }
    },

    saveCurrentExperiment: async () => {
        const { vacuumLevel, horsesCount, hemisphereRadius, isSeparated } = get();
        experimentAPI.saveLog({
            parameters: { vacuumLevel, horsesCount, hemisphereRadius },
            result: isSeparated ? '成功拉开' : '未能拉开'
        });
        get().fetchLogs();
    }
}));

export default useExperimentStore;