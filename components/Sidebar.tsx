import React from 'react';
import { LayoutGrid, FolderOpen, Lightbulb, Settings, Activity, LogOut, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { PageView } from '../types';

interface SidebarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutGrid': return <LayoutGrid size={20} />;
      case 'FolderOpen': return <FolderOpen size={20} />;
      case 'Lightbulb': return <Lightbulb size={20} />;
      default: return <LayoutGrid size={20} />;
    }
  };

  return (
    <aside className="w-64 bg-slate-900 h-screen flex flex-col fixed left-0 top-0 text-slate-400 z-50 shadow-xl font-sans">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 text-white mb-4 cursor-pointer hover:bg-slate-800/50 transition-colors" onClick={() => onNavigate('dashboard')}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 border border-white/10">
           <Activity size={22} strokeWidth={2.5} className="text-white" />
        </div>
        <div>
            <h1 className="font-bold text-lg tracking-tight leading-tight text-white">智慧診所 CRM</h1>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">醫療管理系統</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 mb-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 pl-2">主選單</p>
      </div>
      
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as PageView)}
              className={`w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                  : 'hover:bg-slate-800 hover:text-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                  {getIcon(item.icon)}
                </span>
                {item.name}
              </div>
              {isActive && <ChevronRight size={16} className="text-blue-200" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 mx-3 mb-4 mt-auto rounded-2xl bg-slate-800/50 border border-slate-700/50">
        <div className="mb-4">
            <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-300">今日看診進度</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/30">進行中</span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-white">42</span>
                <span className="text-xs text-slate-400">/ 80 位預約</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '52%' }}></div>
            </div>
        </div>
        
        <div className="pt-3 border-t border-slate-700/50 space-y-1">
            <button className="flex items-center gap-3 px-2 py-2 text-sm text-slate-400 hover:text-white transition-colors w-full rounded-lg hover:bg-slate-700">
                <Settings size={16} />
                系統設定
            </button>
            <button 
                onClick={onLogout}
                className="flex items-center gap-3 px-2 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors w-full rounded-lg"
            >
                <LogOut size={16} />
                登出系統
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;