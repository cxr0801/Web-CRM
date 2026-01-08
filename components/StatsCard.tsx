import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, YAxis, CartesianGrid } from 'recharts';
import { CATEGORIES } from '../constants';
import { TrendingUp, Users, Clock } from 'lucide-react';

const StatsCard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left: Progress Card */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-slate-500 text-sm font-medium mb-1">今日掛號狀況</h3>
                    <p className="text-xs text-slate-400">實時更新</p>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Users size={20} />
                </div>
            </div>
            
            <div>
                <div className="flex items-end gap-2 mb-3">
                    <span className="text-5xl font-bold text-slate-800 tracking-tight">42</span>
                    <span className="text-slate-400 mb-2 text-sm font-medium">/ 80</span>
                </div>
                
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" style={{ width: '52%' }}></div>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">看診進度 52%</span>
                    <span className="text-emerald-500 flex items-center gap-1 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                        <TrendingUp size={12} />
                        +12% 較昨日
                    </span>
                </div>
            </div>
        </div>

        {/* Center: Quick Stats */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg shadow-indigo-200 text-white flex flex-col justify-between relative overflow-hidden">
             {/* Decorative circles */}
             <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
             <div className="absolute bottom-[-10px] left-[-10px] w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 opacity-90">
                    <Clock size={18} />
                    <span className="text-sm font-medium">平均看診時間</span>
                </div>
                <div className="text-4xl font-bold mb-1">12 <span className="text-lg font-normal opacity-80">分鐘/人</span></div>
                <p className="text-indigo-100 text-xs">效率優於上週 5%</p>
             </div>

             <div className="relative z-10 mt-4 flex gap-2">
                 <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                     <div className="text-lg font-bold">2.5</div>
                     <div className="text-[10px] opacity-80">平均等候 (分)</div>
                 </div>
                 <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                     <div className="text-lg font-bold">98%</div>
                     <div className="text-[10px] opacity-80">滿意度</div>
                 </div>
             </div>
        </div>

        {/* Right: Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col">
            <h3 className="text-slate-500 text-sm font-medium mb-4">今日科別掛號分佈</h3>
            <div className="flex-1 min-h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CATEGORIES} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 11 }} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                        />
                        <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={24}>
                            {CATEGORIES.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default StatsCard;