import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CATEGORIES } from '../constants';

const StatsCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Progress */}
      <div className="col-span-1 border-r border-slate-100 pr-4">
        <h3 className="text-slate-500 text-sm font-medium mb-6">今日看診狀況</h3>
        <div className="mb-2">
            <span className="text-5xl font-bold text-slate-800">42</span>
            <span className="text-slate-400 ml-2 text-sm font-medium">/ 80 位預約</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-2">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '52%' }}></div>
        </div>
        <p className="text-slate-400 text-xs">看診進度 52%</p>
      </div>

      {/* Right: Chart */}
      <div className="col-span-2">
        <h3 className="text-slate-500 text-sm font-medium mb-4 text-center">今日科別掛號分佈</h3>
        <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORIES} barSize={40}>
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }} 
                        dy={10}
                    />
                    <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 4, 4]}>
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