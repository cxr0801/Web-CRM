import { useState, useEffect } from 'react';
import { Search, LayoutGrid, List, Filter, ArrowDownUp } from 'lucide-react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import ProjectCard from './components/ProjectCard';
import MedicalRecordsView from './components/MedicalRecordsView';
import RecordDetailView from './components/RecordDetailView';
import LoginPage from './components/LoginPage';
// Remove direct import of PROJECTS to force API usage
// import { PROJECTS } from './constants';
import { ViewMode, PageView, Project, User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Data state
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchAppointments();
      // Optional: Polling for collaboration (refresh every 30 seconds)
      const interval = setInterval(fetchAppointments, 30000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  const categories = ['全部', '耳鼻喉科', '家醫科', '小兒科', '慢性病', '疫苗注射'];

  // Handler for login
  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  // Handler for logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
    setSelectedProject(null);
  };

  const filteredProjects = activeCategory === '全部' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('recordDetail');
  };

  // If not authenticated, show Login Page
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'records':
        return (
          <>
            <header className="flex justify-between items-start mb-6 animate-fade-in">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">病歷資料管理</h2>
                    <p className="text-slate-500 text-sm">查詢與管理所有病患的詳細診療記錄。</p>
                </div>
            </header>
            <MedicalRecordsView />
          </>
        );
      case 'recordDetail':
        return (
          <RecordDetailView 
            project={selectedProject} 
            onBack={() => {
              setCurrentPage('dashboard');
              setSelectedProject(null);
              // Refresh data when returning in case status changed
              fetchAppointments();
            }} 
          />
        );
      case 'inventory':
        return <div className="text-slate-500 p-8">藥品庫存模組開發中...</div>;
      case 'dashboard':
      default:
        return (
          <div className="animate-fade-in">
            {/* Dashboard Header */}
            <header className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">診所儀表板</h2>
                    <p className="text-slate-500 text-sm">
                        歡迎回來，{currentUser.name} ({currentUser.role === 'admin' ? '管理員' : currentUser.role === 'doctor' ? '醫師' : '工作人員'})。
                    </p>
                </div>
                <div className="flex gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-full border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        今日掛號 {projects.length} 人
                    </span>
                    <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-slate-200">
                        <Filter size={12} />
                        顯示 {filteredProjects.length} 筆資料
                    </span>
                </div>
            </header>

            {/* Dashboard Stats */}
            <StatsCard />

            {/* Toolbar & Filter */}
            <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm mb-4">
                <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-4 p-2">
                    {/* Search */}
                    <div className="relative w-full xl:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="搜尋病患姓名、身分證號..." 
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none placeholder-slate-400"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 px-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    activeCategory === cat 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
                        <button className="flex items-center gap-1 text-slate-500 text-sm font-medium hover:bg-slate-50 px-2 py-1.5 rounded transition-colors">
                            <ArrowDownUp size={16} />
                            時間序
                        </button>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Grid */}
            {isLoading ? (
               <div className="text-center py-20 text-slate-500">載入中...</div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {filteredProjects.map(project => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onViewDetails={handleViewDetails}
                      />
                  ))}
                  {filteredProjects.length === 0 && (
                     <div className="col-span-full text-center py-10 text-slate-400">目前沒有資料</div>
                  )}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage === 'recordDetail' ? 'dashboard' : currentPage} 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;