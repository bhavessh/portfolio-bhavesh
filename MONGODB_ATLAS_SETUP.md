# MongoDB Atlas Setup Guide

## Step 1: Create Account
1. Go to https://www.mongodb.com/atlas
2. Sign up for free (Google login recommended)
3. Choose "Shared Cluster" (FREE forever)

## Step 2: Create Cluster
1. Click "Build a Cluster"
2. Select "AWS" as cloud provider
3. Choose region closest to you (e.g., Mumbai for India)
4. Click "Create Cluster" (takes 1-3 minutes)

## Step 3: Database Access
1. Click "Database Access" in left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username: `admin`
5. Set password: `YourStrongPassword123` (save this!)
6. Click "Add User"

## Step 4: Network Access
1. Click "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Click "Database" in left menu
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js" and version 4.1 or later
5. Copy the connection string

## Step 6: Update .env File

Replace the placeholder in your connection string:

```
Before:
mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

After (example):
mongodb+srv://admin:YourStrongPassword123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

Paste this into `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key
NODE_ENV=production
```

## Step 7: Test Connection

```bash
cd C:\Users\HP\CascadeProjects\portfolio-cms\backend
npm start
```

You should see: "Connected to MongoDB"

## Step 8: Seed Database

```bash
cd C:\Users\HP\CascadeProjects\portfolio-cms\backend
npm run seed
```

## Troubleshooting

**Connection timeout?**
- Check if IP is whitelisted in Network Access
- Verify username/password in connection string
- Ensure cluster is "Active" (green dot)

**Authentication failed?**
- Check if password has special characters that need URL encoding
- Create a new user with simpler password

**Still not working?**
- Check MongoDB Atlas dashboard for alerts
- Verify you're using the correct cluster name
