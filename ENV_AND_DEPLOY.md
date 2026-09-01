# Quick Guide: Environment & Deployment

## 🔑 What You Need to Know

### Your `.env` File (Already Set Up)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_db
```

**This is all you need for local development!** ✅

---

## 📁 What's in Your Project Now

### Environment Files
1. **`.env`** - Your actual secrets (DO NOT COMMIT)
2. **`.env.example`** - Template for others (safe to commit)
3. **`.gitignore`** - Prevents committing secrets

### Documentation
1. **`ENV_SETUP_GUIDE.md`** - Complete environment setup
2. **`DEPLOYMENT_CHECKLIST.md`** - Deployment steps
3. **`ENV_AND_DEPLOY.md`** - This quick guide

---

## 🚫 What NOT to Commit to Git

The `.gitignore` file prevents these from being committed:

```
❌ .env                    # Your secrets
❌ .env.local             # Local secrets
❌ node_modules/          # Dependencies
❌ .next/                 # Build files
❌ *.log                  # Log files
```

**Safe to commit:**
```
✅ .env.example           # Template
✅ .gitignore            # Git ignore rules
✅ src/                  # Your code
✅ public/               # Images
✅ package.json          # Dependencies list
```

---

## 🎯 Quick Setup for New Developers

If someone clones your repository:

1. **Clone the repo**
   ```bash
   git clone your-repo-url
   cd creatorbridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   # Then edit .env and add DATABASE_URL
   ```

4. **Setup database**
   ```bash
   npm run db:push
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

---

## 🚀 Deploy to Production (Easiest Way)

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Made for Next.js
- Free tier available
- Automatic deployments from GitHub
- Built-in database option

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo
   git push -u origin main
   ```

2. **Deploy with Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Vercel will detect Next.js automatically

3. **Add Database**
   - In Vercel Dashboard → Storage → Create Database
   - Select PostgreSQL
   - Copy connection string

4. **Set Environment Variables**
   - In Vercel → Project → Settings → Environment Variables
   - Add: `DATABASE_URL` with your Postgres connection string
   - Deploy!

5. **Apply Database Schema**
   ```bash
   # Connect to production database and run:
   npm run db:push
   ```

**Done!** Your app is live at `your-project.vercel.app`

---

### Option 2: Railway (Alternative)

**Why Railway?**
- Easy full-stack deployment
- PostgreSQL included
- Simple pricing

**Steps:**

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login & Deploy**
   ```bash
   railway login
   railway init
   railway add  # Select PostgreSQL
   railway up
   ```

3. **Apply Schema**
   ```bash
   railway run npm run db:push
   ```

**Done!** Railway provides a URL for your app.

---

## 🔐 Security Checklist

Before deploying:

- [ ] `.env` is in `.gitignore` ✅ (Already done)
- [ ] No secrets in code ✅ (Using environment variables)
- [ ] Production database is separate from local
- [ ] All environment variables set in deployment platform
- [ ] HTTPS enabled (automatic on Vercel/Railway)

---

## 📊 Current Environment Variables

### Local Development (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_db
```

### Production (Set in Platform)
```env
DATABASE_URL=postgresql://user:pass@production-host:5432/db
NODE_ENV=production
```

---

## 🆘 Common Issues

### "DATABASE_URL is required"

**Local:**
- Check `.env` file exists in project root
- Verify `DATABASE_URL` is set
- Restart dev server

**Production:**
- Check environment variables in platform dashboard
- Ensure `DATABASE_URL` is set

### "Failed to connect to database"

**Check:**
1. Database is running
2. Connection string is correct
3. Firewall allows connection
4. For production: SSL mode may be required

**Fix for production:**
```env
DATABASE_URL=postgresql://...?sslmode=require
```

### Changes not showing up

**Local:**
```bash
# Restart dev server
# Ctrl+C then npm run dev
```

**Production:**
```bash
# Redeploy or wait for auto-deployment
```

---

## 📚 What Each File Does

### `.env`
Your actual environment variables (secrets).
**Never commit this!**

### `.env.example`
Template showing what variables are needed.
**Safe to commit.** Others copy this to create their own `.env`.

### `.gitignore`
Tells Git what NOT to commit.
Prevents `.env` from being added to repository.

---

## ✅ Verification Checklist

### Before First Commit
- [ ] `.gitignore` exists ✅
- [ ] `.env` is in `.gitignore` ✅
- [ ] `.env.example` exists ✅
- [ ] Run `git status` - `.env` should NOT appear

### Before Deploying
- [ ] App works locally (`npm run dev`)
- [ ] Production database set up
- [ ] Environment variables configured in platform
- [ ] Run `npm run build` successfully

---

## 🎓 Quick Commands Reference

```bash
# Local Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run typecheck       # Check types

# Database
npm run db:push         # Apply schema changes
npm run db:clear        # Clear all data
npm run db:seed         # Seed sample data

# Git
git status              # Check what will be committed
git add .               # Stage changes
git commit -m "message" # Commit changes
git push                # Push to remote

# Deployment
vercel                  # Deploy to Vercel
railway up              # Deploy to Railway
```

---

## 🎯 What You Should Do Now

### For Local Development
**You're already set up!** Just run:
```bash
npm run dev
```

### To Share with Team
1. Push to GitHub
2. Team members clone repository
3. They copy `.env.example` to `.env`
4. They add their database URL
5. They run `npm install` and `npm run dev`

### To Deploy
1. Choose platform (Vercel recommended)
2. Follow steps in "Deploy to Production" above
3. Set environment variables in platform
4. Deploy!

---

## 📖 Full Documentation

For detailed information, see:

- **`ENV_SETUP_GUIDE.md`** - Complete environment variable guide
- **`DEPLOYMENT_CHECKLIST.md`** - Step-by-step deployment
- **`FINAL_CHANGES.md`** - All features implemented
- **`AUTH_IMPLEMENTATION.md`** - Authentication details

---

## 🎉 Summary

**Current Status:**
- ✅ Environment files set up
- ✅ Git ignore configured
- ✅ Ready for local development
- ✅ Ready to deploy

**To Deploy:**
1. Push to GitHub
2. Connect to Vercel/Railway
3. Add database
4. Set environment variables
5. Deploy!

**That's it!** Your CreatorBridge app is ready to go live! 🚀

---

**Need help?** Check the detailed guides or platform documentation.
