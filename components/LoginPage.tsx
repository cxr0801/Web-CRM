import React, { useState } from 'react';
import { Mail, Lock, Activity, ArrowRight, Github, AlertCircle, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isRegistering) {
        // Simple registration simulation (Backend api for register not yet implemented in this demo)
        // In a real app, you would POST to /api/register
        setError('目前演示版本僅支援後端種子帳號登入，請使用 doctor@clinic.com 登入');
        setLoading(false);
        return;
      } else {
        // Login Logic via API
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
           const user = await response.json();
           onLogin(user);
        } else {
           const errData = await response.json();
           setError(errData.error || '登入失敗');
        }
      }
    } catch (err) {
      console.error(err);
      setError('系統發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = () => {
    // For demo purposes
    onLogin({
      email: 'social@example.com',
      name: 'Social User',
      role: 'doctor',
      createdAt: new Date()
    });
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f172a] p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 z-0"></div>
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-900/50">
                    <Activity size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">AI 智慧診所 CRM</h1>
                <p className="text-slate-400 text-sm">專業醫療管理系統</p>
            </div>
        </div>

        {/* Body */}
        <div className="p-8 pt-6">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg mb-6">
                <button 
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isRegistering ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => { setIsRegistering(false); setError(''); setSuccess(''); }}
                >
                    會員登入
                </button>
                <button 
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isRegistering ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => { setIsRegistering(true); setError(''); setSuccess(''); }}
                >
                    註冊帳號
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle size={16} />
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {isRegistering && (
                    <div className="space-y-1 animate-fade-in">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">姓名</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                required={isRegistering}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="請輸入您的姓名"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={isRegistering ? "example@clinic.com" : "doctor@clinic.com"}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">密碼</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={isRegistering ? "設定您的密碼" : "password123"}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {!isRegistering && (
                    <div className="flex justify-end">
                        <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">忘記密碼？</a>
                    </div>
                )}

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 rounded-lg font-bold text-sm shadow-md shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? '處理中...' : (isRegistering ? '建立新帳號' : '登入系統')}
                    <ArrowRight size={16} />
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400 font-medium">或使用社交帳號{isRegistering ? '註冊' : '登入'}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button 
                    onClick={handleSocialLogin}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors group"
                >
                    <GoogleIcon />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">Google</span>
                </button>
                <button 
                    onClick={handleSocialLogin}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors group"
                >
                    <Github size={20} className="text-slate-700" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">GitHub</span>
                </button>
            </div>
            
            <p className="mt-6 text-center text-xs text-slate-400">
                登入即代表您同意本診所的 <a href="#" className="text-slate-600 hover:underline">服務條款</a> 與 <a href="#" className="text-slate-600 hover:underline">隱私權政策</a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;