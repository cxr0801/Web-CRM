# AI Smart Clinic CRM

一個全方位的智慧診所管理系統，整合登入認證、病患記錄管理、門診預約及營運數據統計功能。

## 功能特色

### 核心功能
- **使用者認證系統** - 安全的登入/登出機制，支援多角色管理（管理員、醫師、工作人員）
- **診所儀表板** - 即時掌握耳鼻喉科與家醫科門診動態
- **病歷資料管理** - 查詢與管理所有病患的詳細診療記錄
- **多視圖模式** - 支援網格視圖與列表視圖切換
- **分類篩選** - 按科別快速篩選病患資料（耳鼻喉科、家醫科、小兒科等）
- **即時統計** - 顯示今日掛號人數、候診人數等關鍵指標
- **協同作業** - 多使用者同步更新，自動刷新資料（每 30 秒）

### 進階功能
- **RESTful API** - 完整的後端 API 支援
- **資料庫持久化** - 使用 Prisma ORM + PostgreSQL
- **本地儲存** - IndexedDB 作為本地資料快取
- **響應式設計** - 適配桌面與行動裝置

## 技術架構

### 前端
- **框架**: React 18.2.0
- **語言**: TypeScript 5.2.2
- **建置工具**: Vite 5.0.0
- **樣式**: Tailwind CSS 3.3.5
- **UI 圖示**: Lucide React 0.292.0
- **圖表**: Recharts 2.10.3
- **本地資料庫**: Dexie 3.2.4 (IndexedDB wrapper)

### 後端
- **伺服器**: Express 4.18.2
- **ORM**: Prisma 5.10.2
- **資料庫**: PostgreSQL
- **跨域處理**: CORS 2.8.5
- **環境變數**: dotenv 16.4.5

## 安裝與執行

### 環境需求

- Node.js 16.x 或更高版本
- PostgreSQL（或其他 Prisma 支援的資料庫）
- npm 或 yarn

### 安裝步驟

1. **安裝相依套件**
```bash
npm install
```

2. **設定環境變數**
建立 `.env.local` 檔案並設定：
```env
DATABASE_URL="postgresql://user:password@localhost:5432/clinic_crm"
GEMINI_API_KEY=your_gemini_api_key_here
```

3. **初始化資料庫**
```bash
# 推送資料庫 schema
npm run db:push

# 執行種子資料（可選）
npx prisma db seed
```

4. **啟動開發環境**

分別在兩個終端機視窗執行：

```bash
# 終端機 1：啟動後端 API 伺服器 (port 3000)
npm run start

# 終端機 2：啟動前端開發伺服器 (port 5173)
npm run dev
```

5. **開啟瀏覽器**
前往 `http://localhost:5173`

### 測試帳號

預設測試帳號（需先執行 seed）：
- Email: `doctor@clinic.com`
- Password: `password123`

## 可用指令

```bash
npm run dev          # 啟動前端開發伺服器
npm run build        # 建置正式版本（含 TypeScript 編譯 & Prisma 生成）
npm run start        # 啟動後端 Express 伺服器
npm run db:push      # 推送 Prisma schema 到資料庫
npm run db:studio    # 開啟 Prisma Studio（資料庫視覺化工具）
```

## 專案結構

```
CRM/
├── components/              # React 元件
│   ├── Sidebar.tsx         # 側邊欄導航（含登出功能）
│   ├── LoginPage.tsx       # 登入/註冊頁面
│   ├── StatsCard.tsx       # 統計卡片
│   ├── ProjectCard.tsx     # 病患卡片
│   ├── MedicalRecordsView.tsx   # 病歷檢視
│   └── RecordDetailView.tsx     # 病歷詳細資訊
├── prisma/                 # Prisma ORM 設定
│   ├── schema.prisma       # 資料庫 schema
│   └── seed.ts             # 種子資料
├── App.tsx                 # 主應用程式（含認證邏輯）
├── server.ts               # Express API 伺服器
├── db.ts                   # IndexedDB 本地資料庫
├── constants.ts            # 常數定義
├── types.ts                # TypeScript 類型定義
├── index.tsx               # 應用程式入口
├── index.html              # HTML 模板
├── vite.config.ts          # Vite 設定（含 API proxy）
├── tailwind.config.js      # Tailwind CSS 設定
└── package.json            # 專案相依資訊
```

## API 端點

### 認證
- `POST /api/login` - 使用者登入
  ```json
  // Request
  { "email": "doctor@clinic.com", "password": "password123" }

  // Response
  { "id": "1", "email": "doctor@clinic.com", "name": "李華醫師", "role": "doctor" }
  ```

### 病患管理
- `GET /api/patients` - 取得所有病患
- `GET /api/patients/:id` - 取得單一病患詳細資訊
- `POST /api/patients` - 新增病患
- `PUT /api/patients/:id` - 更新病患資訊
- `DELETE /api/patients/:id` - 刪除病患

### 預約管理
- `GET /api/appointments` - 取得所有預約
- `POST /api/appointments` - 新增預約
- `PUT /api/appointments/:id` - 更新預約

## 使用說明

### 1. 登入系統
- 使用測試帳號登入或註冊新帳號
- 系統會根據角色顯示不同權限功能

### 2. 查看儀表板
- 登入後自動顯示診所儀表板
- 即時統計今日掛號人數與候診狀態
- 可按科別篩選病患資料

### 3. 管理病歷
- 點選「病歷資料管理」查看詳細記錄
- 支援搜尋病患姓名、身分證號
- 可切換網格/列表視圖模式

### 4. 查看病患詳情
- 點選病患卡片查看詳細資訊
- 包含就診記錄、用藥歷史、檢查報告等

## 開發說明

### 資料同步機制
- 前端使用 IndexedDB 作為本地快取
- 透過 API 與後端 PostgreSQL 同步
- 每 30 秒自動刷新預約資料

### 代理設定
開發環境中，Vite 會將 `/api` 請求代理到 `http://localhost:3000`：
```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

### 資料庫 Schema
使用 Prisma 管理資料庫結構，修改 `prisma/schema.prisma` 後執行：
```bash
npm run db:push
```

## 部署建議

### 前端部署（Vercel / Netlify）
```bash
npm run build
# 部署 dist/ 資料夾
```

### 後端部署（Heroku / Railway / Render）
- 設定環境變數 `DATABASE_URL`
- 執行 `npm run start`
- 確保執行 Prisma migrations

### 環境變數
生產環境需設定：
- `DATABASE_URL` - PostgreSQL 連線字串
- `PORT` - API 伺服器埠號（預設 3000）
- `GEMINI_API_KEY` - Gemini API 金鑰（如需要）

## 安全性注意事項

- ⚠️ `.env.local` 已加入 `.gitignore`，請勿提交敏感資訊
- ⚠️ 生產環境請使用安全的密碼雜湊（如 bcrypt）
- ⚠️ 建議實作 JWT token 進行 API 認證
- ⚠️ 啟用 HTTPS 保護資料傳輸

## 授權

Private

## 版本

0.1.0

---

**專案作者**: cxr0801
**GitHub**: https://github.com/cxr0801/Web-CRM
