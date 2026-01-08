import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, FileSpreadsheet, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { PatientRecord } from '../types';

const MedicalRecordsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/patients');
        if (response.ok) {
          const data = await response.json();
          // Map DB data to Frontend Type
          // Note: DB returns `recordId` which corresponds to the frontend `id`
          const formattedData = data.map((item: any) => ({
            ...item,
            id: item.recordId, // Map recordId to id
          }));
          setRecords(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch patients", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredRecords = records.filter(record => 
    record.name.includes(searchTerm) || 
    record.id.includes(searchTerm) ||
    record.phone.includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="搜尋姓名、病歷號、電話..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 focus:outline-none placeholder-slate-400 transition-all"
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-medium transition-colors shadow-sm">
              <Filter size={18} />
              篩選
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-medium transition-colors shadow-sm">
              <FileSpreadsheet size={18} className="text-green-600" />
              匯出
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:translate-y-[-1px]">
              <Plus size={18} />
              新增病歷
            </button>
          </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-40 text-slate-500">
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">載入資料中...</span>
              </div>
            </div>
          ) : (
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50/80 backdrop-blur text-slate-500 font-medium whitespace-nowrap sticky top-0 z-10">
                <tr>
                  <th className="px-5 py-4 sticky left-0 bg-slate-50 border-b border-slate-200 font-semibold z-20 w-[120px]">姓名</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">病人編號</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">性別</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">年齡</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">身份證字號</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">聯絡電話</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">後就診日</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold min-w-[180px]">主要病症</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">過敏史</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold min-w-[150px]">現用藥物</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">血壓</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">備註</th>
                  <th className="px-5 py-4 border-b border-slate-200 font-semibold">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.length > 0 ? filteredRecords.map((record, index) => (
                  <tr key={record.id} className="hover:bg-blue-50/30 transition-colors whitespace-nowrap group">
                    <td className="px-5 py-4 font-semibold text-slate-800 sticky left-0 bg-white group-hover:bg-blue-50/30 border-r border-slate-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                      {record.name}
                    </td>
                    <td className="px-5 py-4 text-slate-500 font-mono text-xs tracking-wide bg-slate-50/50 rounded-sm px-2 w-fit">{record.id}</td>
                    <td className="px-5 py-4 text-slate-600">{record.gender}</td>
                    <td className="px-5 py-4 text-slate-600">{record.age}</td>
                    <td className="px-5 py-4 text-slate-600 font-mono text-xs">{record.idNumber}</td>
                    <td className="px-5 py-4 text-slate-600">{record.phone}</td>
                    <td className="px-5 py-4 text-blue-600 font-medium bg-blue-50/30 rounded px-2 w-fit">{record.lastVisitDate}</td>
                    <td className="px-5 py-4 text-slate-700 truncate max-w-[200px]" title={record.mainSymptoms}>{record.mainSymptoms}</td>
                    <td className="px-5 py-4">
                      {record.allergies !== '無' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          {record.allergies}
                        </span>
                      ) : (
                        <span className="text-slate-400">無</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-600 truncate max-w-[150px]" title={record.currentMeds}>{record.currentMeds}</td>
                    <td className={`px-5 py-4 font-mono ${parseInt(record.bp.split('/')[0]) > 130 ? 'text-red-500 font-medium' : 'text-slate-600'}`}>
                      {record.bp}
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs truncate max-w-[200px]" title={record.notes}>{record.notes}</td>
                    <td className="px-5 py-4">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={13} className="px-4 py-12 text-center text-slate-400 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                          <Search size={24} className="text-slate-300" />
                      </div>
                      <p>沒有找到符合的病歷資料</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Footer / Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
           <div className="flex items-center gap-2">
              <span>顯示第 1 至 {filteredRecords.length} 筆，共 {filteredRecords.length} 筆</span>
           </div>
           <div className="flex gap-2">
             <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 hover:bg-white hover:text-slate-800 disabled:opacity-50 transition-colors" disabled>
                 <ChevronLeft size={16} />
             </button>
             <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-200">1</button>
             <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 hover:bg-white hover:text-slate-800 transition-colors">2</button>
             <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 hover:bg-white hover:text-slate-800 transition-colors">3</button>
             <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 hover:bg-white hover:text-slate-800 transition-colors">
                 <ChevronRight size={16} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsView;