# AI Smart Clinic CRM

一個全方位的智慧診所管理系統，整合登入認證、病患記錄管理、門診預約及營運數據統計功能。

## 功能特色

- **使用者認證系統** - 安全的登入/登出機制
- **診所儀表板** - 即時掌握門診動態
- **病歷資料管理** - 查詢與管理病患詳細記錄
- **多視圖模式** - 網格/列表視圖切換
- **分類篩選** - 按科別快速篩選資料
- **即時統計** - 顯示關鍵指標

## 技術架構

- **前端**: React 18.2 + TypeScript + Vite + Tailwind CSS
- **後端**: Express 4.18 + Prisma ORM
- **資料庫**: PostgreSQL
- **圖表**: Recharts
- **圖示**: Lucide React

## 部署到 Zeabur

### 方法 1：使用 Zeabur Dashboard（推薦）

1. **連接 GitHub**
   - 前往 [Zeabur Dashboard](https://zeabur.com)
   - 點擊 "New Project"
   - 選擇從 GitHub 導入
   - 選擇 `cxr0801/Web-CRM` 倉庫

2. **添加 PostgreSQL 資料庫**
   - 在專案中點擊 "Add Service"
   - 選擇 "PostgreSQL"
   - Zeabur 會自動提供資料庫

3. **部署後端服務**
   - 添加新服務，選擇你的 GitHub 倉庫
   - 服務名稱: `backend`
   - 設置環境變數：
     ```
     DATABASE_URL=<Zeabur 自動提供的 PostgreSQL URL>
     PORT=3000
     ```
   - Build Command: `npx prisma generate`
   - Start Command: `npm run start`

4. **部署前端服務**
   - 添加新服務，選擇相同的 GitHub 倉庫
   - 服務名稱: `frontend`
   - Build Command: `npm run build`
   - Start Command: `npm run preview`
   - 設置環境變數：
     ```
     PORT=5173
     ```

5. **初始化資料庫**
   - 在後端服務的終端執行：
     ```bash
     npx prisma db push
     npx prisma db seed
     ```

6. **設置域名**
   - 在服務設置中綁定自定義域名或使用 Zeabur 提供的域名

### 方法 2：使用 Zeabur CLI

```bash
# 安裝 Zeabur CLI
npm install -g @zeabur/cli

# 登入
zeabur login

# 部署
zeabur deploy
```

## 本地開發

### 環境需求

- Node.js 16+
- PostgreSQL

### 安裝步驟

1. 安裝依賴
```bash
npm install
```

2. 設置環境變數（`.env.local`）
```env
DATABASE_URL="postgresql://user:password@localhost:5432/clinic_crm"
```

3. 初始化資料庫
```bash
npm run db:push
npx prisma db seed
```

4. 啟動開發服務器

```bash
# 終端 1: 啟動後端 (port 3000)
npm run start

# 終端 2: 啟動前端 (port 5173)
npm run dev
```

5. 開啟瀏覽器
```
http://localhost:5173
```

### 測試帳號

- Email: `doctor@clinic.com`
- Password: `password123`

## API 端點

- `POST /api/login` - 使用者登入
- `GET /api/patients` - 取得所有病患
- `GET /api/appointments` - 取得所有預約
- `POST /api/appointments` - 新增預約

## 專案結構

```
CRM/
├── components/          # React 元件
├── prisma/             # Prisma schema & seed
├── App.tsx             # 主應用程式
├── server.ts           # Express API 伺服器
├── db.ts               # IndexedDB 本地資料庫
├── types.ts            # TypeScript 類型
└── zeabur.json         # Zeabur 部署配置
```

## 環境變數

### 開發環境
```env
DATABASE_URL=postgresql://localhost:5432/clinic_crm
```

### 生產環境（Zeabur）
```env
DATABASE_URL=<Zeabur PostgreSQL URL>
PORT=<動態分配>
```

## 授權

Private

---

**GitHub**: https://github.com/cxr0801/Web-CRM
