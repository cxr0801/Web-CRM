import React from 'react';
import { LayoutGrid, FolderOpen, Lightbulb, Settings, Activity, LogOut } from 'lucide-react';
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
    <aside className="w-64 bg-[#0f172a] h-screen flex flex-col fixed left-0 top-0 text-slate-400 z-50">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 text-white mb-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
           <Activity size={20} strokeWidth={2.5} />
        </div>
        <div>
            <h1 className="font-bold text-base leading-tight">AI 智慧診所CRM</h1>
            <p className="text-xs text-slate-500 font-medium">醫療管理系統</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as PageView)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              currentPage === item.id
                ? 'bg-blue-600/10 text-blue-500 border-l-4 border-blue-500'
                : 'hover:bg-slate-800 hover:text-slate-200 border-l-4 border-transparent'
            }`}
          >
            {getIcon(item.icon)}
            {item.name}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 bg-[#0f172a] border-t border-slate-800">
        <div className="mb-6">
            <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium">今日看診進度</span>
                <span className="bg-blue-900 text-blue-300 px-1.5 py-0.5 rounded text-[10px]">ING</span>
            </div>
            <div className="flex justify-between items-end mb-1">
                <span className="text-xl font-bold text-white">42 <span className="text-sm text-slate-500 font-normal">/ 80 位</span></span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-1.5 rounded-full" style={{ width: '52%' }}></div>
            </div>
        </div>
        
        <div className="space-y-1">
            <button className="flex items-center gap-3 px-2 py-2 text-sm hover:text-white transition-colors w-full rounded hover:bg-slate-800/50">
                <Settings size={18} />
                系統設定
            </button>
            <button 
                onClick={onLogout}
                className="flex items-center gap-3 px-2 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full rounded"
            >
                <LogOut size={18} />
                登出系統
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;