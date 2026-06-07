## Teknologjitë
- React Hooks
- React Router
- Axios API calls
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication

## Start lokal

1. Instalo paketat:
npm run install-all
2. Krijo `.env` në folderin `backend` 

PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bankcare_react
JWT_SECRET=ndrysho_kete_sekret

3. Sigurohu që MongoDB është ndezur.

4. Starto frontend + backend:
npm run dev


Frontend: http://localhost:5173
Backend API: http://localhost:5000/api/health

## Login
Së pari bëj Register në frontend. User-i ruhet në MongoDB te databaza `bankcare_react`, koleksioni `users`.
