import React from 'react';
import { Project } from '../types';
import { ArrowLeft, Save, Edit, Plus, Calendar, User, FileText, Activity } from 'lucide-react';

interface RecordDetailViewProps {
  project: Project | null;
  onBack: () => void;
}

const RecordDetailView: React.FC<RecordDetailViewProps> = ({ project, onBack }) => {
  if (!project) return null;

  // Extract name from title
  const patientName = project.title.split(' - ')[0] || project.title;
  const diagnosis = project.title.split(' - ')[1] || '一般內科問題';
  
  // Hardcoded date as requested
  const dateStr = "2025/12/28";
  
  // Generated content in SOAP format
  const generatedContent = `[S] 主觀描述 (Subjective):
- 病患主訴${project.description.split('。')[0] || '身體不適'}。
- 症狀已持續約 3 天，且有加劇趨勢。
- 自述近期工作壓力大，睡眠品質不佳。
- 無藥物過敏史 (NKDA)。

[O] 客觀檢查 (Objective):
- 生命徵象: T: 37.2°C, P: 78 bpm, BP: 124/82 mmHg, RR: 18/min。
- 頭頸部: ${project.category === '耳鼻喉科' ? '咽喉黏膜充血，扁桃腺II度腫大，無化膿' : '結膜無蒼白，鞏膜無黃疸，頸部淋巴結無腫大'}。
- 胸部: 雙側呼吸音清晰，心律規則無雜音。
- 腹部: 軟，無壓痛，腸音正常。

[A] 評估診斷 (Assessment):
- ${diagnosis}
- ${project.category === '小兒科' ? '疑似病毒性感染' : '建議進一步觀察'}

[P] 治療計畫 (Plan):
1. 開立症狀緩解藥物 (3天份)：
   - Acetaminophen 500mg QID PRN
   - ${project.category === '耳鼻喉科' ? 'Antihistamine BID' : 'Gastrointestinal agent TID'}
2. 衛教：
   - 多休息，補充足夠水分 (2000cc/day)。
   - 若出現高燒 (>38.5°C) 或症狀惡化請立即回診。
3. 預約 3 天後回診追蹤。`;

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto animate-fade-in">
      {/* Top Navigation & Header */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
        >
          <div className="p-1.5 rounded-full bg-white border border-slate-200 group-hover:border-slate-300 transition-colors shadow-sm">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium">返回儀表板</span>
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex items-center gap-5">
             <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                <User size={32} />
             </div>
             <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">
                  {patientName}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                        <FileText size={14} className="text-blue-500" />
                        <span className="font-medium text-slate-600">病歷號: {project.id}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                        <Activity size={14} className="text-emerald-500" />
                        <span className="font-medium text-slate-600">{project.category}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                        <User size={14} className="text-amber-500" />
                        <span className="font-medium text-slate-600">{project.physician}</span>
                    </span>
                </div>
             </div>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm shadow-blue-200 transition-all hover:shadow-md active:scale-95">
            <Plus size={18} />
            新增看診紀錄
          </button>
        </div>
      </div>

      {/* Record Editor Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
        {/* Card Header */}
        <div className="border-b border-slate-100 p-5 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               {dateStr} 診治紀錄
               <span className="text-xs font-normal text-slate-400 border border-slate-200 px-2 py-0.5 rounded-md bg-white">
                 門診
               </span>
             </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
             <Calendar size={16} />
             <span>最後編輯: {dateStr} 14:30</span>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-0 relative group">
          <textarea 
            className="w-full h-full min-h-[450px] resize-none border-0 focus:ring-0 text-slate-700 text-base leading-7 placeholder-slate-300 p-6 font-mono bg-white selection:bg-blue-100 outline-none"
            placeholder="請輸入診斷內容 (SOAP)..."
            defaultValue={generatedContent}
          ></textarea>
          
          {/* Subtle scroll shadow hint */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-50/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Card Footer */}
        <div className="p-4 flex justify-end gap-3 border-t border-slate-100 bg-slate-50/30">
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-800 font-medium transition-all shadow-sm">
            <Edit size={16} />
            修改
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm shadow-blue-200 transition-all hover:shadow-md active:scale-95">
            <Save size={16} />
            儲存紀錄
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordDetailView;