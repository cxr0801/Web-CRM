import React, { useState, useEffect } from 'react';
import { Search, Download, Plus, Filter, FileSpreadsheet } from 'lucide-react';
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
    <div className="flex flex-col h-full">
      {/* Header Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜尋姓名、病歷號、電話..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none placeholder-slate-400"
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors">
              <Filter size={18} />
              篩選
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 rounded-lg text-sm font-medium transition-colors">
              <FileSpreadsheet size={18} />
              匯出 Excel
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-200">
              <Plus size={18} />
              新增病歷
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-40 text-slate-500">
              載入中...
            </div>
          ) : (
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 font-medium whitespace-nowrap sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 sticky left-0 bg-slate-50 border-b border-slate-200 border-r shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] z-20">姓名</th>
                  <th className="px-4 py-3 border-b border-slate-200">病人編號</th>
                  <th className="px-4 py-3 border-b border-slate-200">性別</th>
                  <th className="px-4 py-3 border-b border-slate-200">出生年月日</th>
                  <th className="px-4 py-3 border-b border-slate-200">年齡</th>
                  <th className="px-4 py-3 border-b border-slate-200">身份證字號</th>
                  <th className="px-4 py-3 border-b border-slate-200">聯絡電話</th>
                  <th className="px-4 py-3 border-b border-slate-200">初診日期</th>
                  <th className="px-4 py-3 border-b border-slate-200">後就診日</th>
                  <th className="px-4 py-3 border-b border-slate-200 min-w-[200px]">主要病症</th>
                  <th className="px-4 py-3 border-b border-slate-200">過敏史</th>
                  <th className="px-4 py-3 border-b border-slate-200 min-w-[150px]">現用藥物</th>
                  <th className="px-4 py-3 border-b border-slate-200">BMI</th>
                  <th className="px-4 py-3 border-b border-slate-200">血壓</th>
                  <th className="px-4 py-3 border-b border-slate-200">血糖</th>
                  <th className="px-4 py-3 border-b border-slate-200">膽固醇</th>
                  <th className="px-4 py-3 border-b border-slate-200">吸煙</th>
                  <th className="px-4 py-3 border-b border-slate-200">飲酒</th>
                  <th className="px-4 py-3 border-b border-slate-200 min-w-[200px]">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
                    <td className="px-4 py-3 font-medium text-slate-900 sticky left-0 bg-white hover:bg-slate-50/80 border-r border-slate-100 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                      {record.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{record.id}</td>
                    <td className="px-4 py-3 text-slate-600">{record.gender}</td>
                    <td className="px-4 py-3 text-slate-600">{record.dob}</td>
                    <td className="px-4 py-3 text-slate-600">{record.age}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{record.idNumber}</td>
                    <td className="px-4 py-3 text-slate-600">{record.phone}</td>
                    <td className="px-4 py-3 text-slate-600">{record.firstVisitDate}</td>
                    <td className="px-4 py-3 text-blue-600 font-medium">{record.lastVisitDate}</td>
                    <td className="px-4 py-3 text-slate-700 truncate max-w-[200px]" title={record.mainSymptoms}>{record.mainSymptoms}</td>
                    <td className={`px-4 py-3 ${record.allergies !== '無' ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                      {record.allergies}
                    </td>
                    <td className="px-4 py-3 text-slate-600 truncate max-w-[150px]" title={record.currentMeds}>{record.currentMeds}</td>
                    <td className="px-4 py-3 text-slate-600">{record.bmi}</td>
                    <td className={`px-4 py-3 ${parseInt(record.bp.split('/')[0]) > 130 ? 'text-red-500 font-medium' : 'text-slate-600'}`}>
                      {record.bp}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{record.sugar}</td>
                    <td className={`px-4 py-3 ${parseInt(record.cholesterol) > 200 ? 'text-amber-500' : 'text-slate-600'}`}>
                      {record.cholesterol}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{record.smoking}</td>
                    <td className="px-4 py-3 text-slate-600">{record.drinking}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-[200px]" title={record.notes}>{record.notes}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={19} className="px-4 py-8 text-center text-slate-400">
                      沒有找到符合的病歷資料
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Footer / Pagination (Mock) */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
           <span>顯示 {filteredRecords.length} 筆資料</span>
           <div className="flex gap-1">
             <button className="px-2 py-1 rounded hover:bg-slate-200 disabled:opacity-50" disabled>上一頁</button>
             <button className="px-2 py-1 rounded bg-white border border-slate-200 font-medium text-blue-600 shadow-sm">1</button>
             <button className="px-2 py-1 rounded hover:bg-slate-200">2</button>
             <button className="px-2 py-1 rounded hover:bg-slate-200">下一頁</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsView;