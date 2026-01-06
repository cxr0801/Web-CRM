# AI Smart Clinic CRM

一個全方位的診所管理系統，提供病患記錄追蹤、門診預約管理及營運數據統計功能。

## 功能特色

- **診所儀表板** - 即時掌握耳鼻喉科與家醫科門診動態
- **病歷資料管理** - 查詢與管理所有病患的詳細診療記錄
- **多視圖模式** - 支援網格視圖與列表視圖切換
- **分類篩選** - 按科別快速篩選病患資料（耳鼻喉科、家醫科、小兒科等）
- **即時統計** - 顯示今日掛號人數、候診人數等關鍵指標
- **藥品庫存** - 藥品庫存管理模組（開發中）

## 技術架構

- **框架**: React 19.2.3
- **語言**: TypeScript 5.8.2
- **建置工具**: Vite 6.2.0
- **UI 圖示**: Lucide React
- **圖表**: Recharts 3.6.0

## 安裝與執行

### 環境需求

- Node.js (建議 16.x 或更高版本)
- npm 或 yarn

### 安裝步驟

1. 安裝相依套件：
```bash
npm install
```

2. 設定環境變數（如需要）：
```bash
cp .env.local.example .env.local
```

3. 啟動開發伺服器：
```bash
npm run dev
```

4. 在瀏覽器開啟 `http://localhost:5173`

## 可用指令

- `npm run dev` - 啟動開發伺服器
- `npm run build` - 建置正式版本
- `npm run preview` - 預覽正式版本

## 專案結構

```
CRM/
├── components/           # React 元件
│   ├── Sidebar.tsx      # 側邊欄導航
│   ├── StatsCard.tsx    # 統計卡片
│   ├── ProjectCard.tsx  # 病患卡片
│   ├── MedicalRecordsView.tsx  # 病歷檢視
│   └── RecordDetailView.tsx    # 病歷詳細資訊
├── App.tsx              # 主應用程式
├── constants.ts         # 常數定義
├── types.ts            # TypeScript 類型定義
├── index.tsx           # 應用程式入口
├── index.html          # HTML 模板
├── vite.config.ts      # Vite 設定檔
├── tsconfig.json       # TypeScript 設定檔
└── package.json        # 專案相依資訊
```

## 主要頁面

1. **診所儀表板** (`/`) - 顯示所有病患資料與即時統計
2. **病歷資料管理** (`/records`) - 病歷查詢與管理介面
3. **藥品庫存** (`/inventory`) - 庫存管理功能（開發中）

## 開發說明

- 專案使用 TypeScript 進行類型檢查
- 採用 React Hooks 進行狀態管理
- 使用 Tailwind CSS 進行樣式設計（透過 className）
- 支援響應式設計，適配桌面與行動裝置

## 授權

Private

## 版本

0.0.0
