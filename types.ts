export interface Project {
  id: string;
  day: number;
  category: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  link: string;
  physician: string; // 新增看診醫師欄位
}

export interface CategoryData {
  name: string;
  count: number;
  color: string;
}

export interface PatientRecord {
  id: string; // 病人編號
  name: string; // 姓名
  gender: '男' | '女'; // 性別
  dob: string; // 出生年月日
  age: number; // 年齡
  idNumber: string; // 身份證字號
  phone: string; // 聯絡電話
  email: string; // 電子郵箱
  address: string; // 住址
  emergencyContact: string; // 緊急聯絡人
  emergencyPhone: string; // 緊急聯絡電話
  firstVisitDate: string; // 初診日期
  lastVisitDate: string; // 最後就診日
  mainSymptoms: string; // 主要病症
  duration: string; // 持續時間
  pastHistory: string; // 過往病史
  familyHistory: string; // 家族病史
  allergies: string; // 過敏史
  currentMeds: string; // 現用藥物
  height: number; // 身高 (cm)
  weight: number; // 體重 (kg)
  bmi: number; // BMI
  bp: string; // 收縮壓/舒張壓
  hr: number; // 心率 (bpm)
  sugar: string; // 血糖 (mg/dL)
  cholesterol: string; // 膽固醇 (mg/dL)
  smoking: string; // 吸煙狀態
  drinking: string; // 飲酒狀態
  exercise: string; // 運動頻率
  sleepQuality: string; // 睡眠質量
  stressLevel: string; // 工作壓力
  notes: string; // 備註
}

export type ViewMode = 'grid' | 'list';
export type PageView = 'dashboard' | 'records' | 'inventory' | 'recordDetail';

export type UserRole = 'admin' | 'doctor' | 'staff';

export interface User {
  id?: number;
  email: string;
  password?: string; // In real app, store hash only
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}
