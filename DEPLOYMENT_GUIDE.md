# 🚀 Free Deployment Guide

## Overview
Deploy your Portfolio CMS for FREE using:
- **Frontend**: Netlify (Free tier)
- **Backend**: Render (Free tier)
- **Database**: MongoDB Atlas (Free tier - already set up)

---

## Step 1: Deploy Backend to Render (FREE)

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo or use "Deploy from directory"
4. Configure:
   - **Name**: `portfolio-cms-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=yiur url
   JWT_SECRET=your-secret-key-here
   ADMIN_PASSWORD= password
   ```

6. Click **"Create Web Service"**
7. Wait for deployment (takes 2-3 minutes)
8. Note your backend URL: `https://portfolio-cms-backend.onrender.com`

---

## Step 2: Update Frontend API URL

Once backend is deployed, update `frontend/src/config/api.ts`:
```typescript
export const API_URL = 'https://portfolio-cms-backend.onrender.com/api';
```

---

## Step 3: Deploy Frontend to Netlify (FREE)

### Option A: Drag & Drop (Easiest)
1. Build locally first:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `frontend/dist` folder
4. Your site is live! 🎉

### Option B: GitHub Integration
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repo
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variable:
   - `PUBLIC_API_URL`: `https://portfolio-cms-backend.onrender.com/api`
7. Click **"Deploy site"**

---

## Step 4: Update CORS in Backend

After frontend is deployed, update `backend/server.js`:

```javascript
// Replace app.use(cors()) with:
app.use(cors({
  origin: ['https://your-netlify-site.netlify.app', 'http://localhost:4321'],
  credentials: true
}));
```

Redeploy backend on Render.

---

## 📋 Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Netlify
- [ ] Environment variables set
- [ ] MongoDB Atlas accessible from Render IP
- [ ] CORS updated with frontend URL
- [ ] Test API endpoints
- [ ] Test admin panel

---

## 🔧 Troubleshooting

### Backend won't connect to MongoDB
- Go to MongoDB Atlas → Network Access
- Add IP: `0.0.0.0/0` (allow all) or Render's specific IP

### Frontend can't reach backend
- Check `PUBLIC_API_URL` is set correctly
- Verify CORS allows frontend domain
- Check browser console for errors

### Admin panel not working
- Verify `ADMIN_PASSWORD` env var is set
- Check backend logs on Render dashboard

---

## 🌐 Your Live URLs

After deployment:
- **Frontend**: `https://your-site.netlify.app`
- **Backend**: `https://portfolio-cms-backend.onrender.com`
- **API**: `https://portfolio-cms-backend.onrender.com/api`

---

## 💰 Free Tier Limits

**Netlify**:
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

**Render**:
- 512 MB RAM
- Spins down after 15 min inactivity (takes 30s to wake up)
- 750 hours/month runtime

**MongoDB Atlas**:
- 512 MB storage
- Shared RAM
- Forever free

---

Need help? Check the logs in Render/Netlify dashboards!
