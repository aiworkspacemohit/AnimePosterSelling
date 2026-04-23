# 🚀 Render Deployment Setup Guide

## ⚠️ CRITICAL: Environment Variables

Your app is deployed but **REQUIRES environment variables to work**. Without these, you'll get 500 errors.

### Step 1: Add Environment Variables to Render

1. Go to **Render Dashboard** → Your Service
2. Click **Environment** (left sidebar)
3. Add these variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/anime_store?retryWrites=true&w=majority
NODE_ENV=production
FRONTEND_URL=https://animepostersellingmarket-b.onrender.com
PORT=5000
```

### Step 2: Get Your MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Log in or create an account
3. Create a cluster (Free tier is fine)
4. Click **Connect** → **Drivers**
5. Copy the connection string
6. Replace `<password>` and `<username>` with your credentials
7. Paste into `MONGO_URI` on Render

### Step 3: Seed the Database

Once environment variables are set:

1. Go to Render Dashboard
2. Click on your Web Service
3. Go to **Shell** tab
4. Run:
```bash
npm run seed --prefix backend
```

This will populate the database with sample anime posters.

## ✅ Testing

After setting env vars and seeding:

- Homepage featured products should load
- Products page should display all items
- No more 500 errors!

## 🐛 Debugging

Check logs in Render Dashboard → Logs tab to see detailed errors.

Common issues:
- ❌ `MONGO_URI not set` → Add to Environment variables
- ❌ `Failed to connect to MongoDB` → Check connection string
- ❌ `No products found` → Run seed command
