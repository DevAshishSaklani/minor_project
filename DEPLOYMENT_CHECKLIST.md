# Deployment Checklist - CreatorBridge

## 📋 Before You Deploy

### 1. Environment Setup ✅

- [x] `.env.example` exists (template for others)
- [x] `.gitignore` is configured
- [ ] Your `.env` has `DATABASE_URL` set
- [ ] You've tested locally with `npm run dev`

---

## 🔒 Security Checklist

### Environment Variables
- [ ] `.env` is listed in `.gitignore`
- [ ] No secrets hardcoded in source code
- [ ] Production database URL is different from local
- [ ] Session secret is generated (at least 32 characters)
- [ ] All API keys are production keys (not test keys)

### Code Security
- [ ] Passwords are hashed with bcrypt
- [ ] Sessions use HTTP-only cookies
- [ ] No sensitive data in client-side code
- [ ] CORS configured properly
- [ ] Rate limiting implemented (future)

---

## 📦 Pre-Deployment Steps

### 1. Clean Build Test

```bash
# Clear cache
rm -rf .next

# Clean install
rm -rf node_modules package-lock.json
npm install

# Run type check
npm run typecheck

# Build for production
npm run build

# Test production build locally
npm start
```

### 2. Database Setup

```bash
# Push schema to production database
npm run db:push

# (Optional) Clear test data
npm run db:clear
```

### 3. Code Quality

```bash
# Type checking
npm exec tsc -- --noEmit

# Build verification
npm run build

# Check for console.logs (remove them)
grep -r "console.log" src/ --exclude-dir=node_modules
```

---

## 🚀 Platform-Specific Setup

### Vercel Deployment

#### 1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2. Login
```bash
vercel login
```

#### 3. Set Environment Variables
```bash
vercel env add DATABASE_URL production
# Paste your production DATABASE_URL
```

Or via Vercel Dashboard:
1. Go to Project → Settings → Environment Variables
2. Add:
   - `DATABASE_URL` → Your Postgres URL
   - `NODE_ENV` → `production`

#### 4. Deploy
```bash
vercel --prod
```

---

### Railway Deployment

#### 1. Install Railway CLI
```bash
npm i -g @railway/cli
```

#### 2. Login
```bash
railway login
```

#### 3. Create Project
```bash
railway init
```

#### 4. Add Database
```bash
railway add
# Select PostgreSQL
```

#### 5. Set Environment Variables
```bash
# Railway automatically sets DATABASE_URL for Postgres
# Add any additional variables:
railway variables set NODE_ENV=production
```

#### 6. Deploy
```bash
railway up
```

---

### Heroku Deployment

#### 1. Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Other: https://devcenter.heroku.com/articles/heroku-cli
```

#### 2. Login
```bash
heroku login
```

#### 3. Create App
```bash
heroku create your-app-name
```

#### 4. Add PostgreSQL
```bash
heroku addons:create heroku-postgresql:mini
```

#### 5. Set Environment Variables
```bash
heroku config:set NODE_ENV=production
# DATABASE_URL is automatically set by Heroku Postgres
```

#### 6. Deploy
```bash
git push heroku main
```

---

## 🗄️ Database Providers

### Vercel Postgres

1. Go to Vercel Dashboard → Storage
2. Create → Postgres
3. Copy connection string
4. Add to environment variables

**Pricing**: Free tier available

---

### Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy connection string
4. Add to environment variables

**Format:**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
```

**Pricing**: Free tier with 500MB

---

### Railway

1. Create PostgreSQL service
2. Copy `DATABASE_URL` from variables
3. Use in your application

**Pricing**: $5/month starter

---

### Neon

1. Create project at [neon.tech](https://neon.tech)
2. Copy connection string
3. Add to environment variables

**Pricing**: Free tier available

---

## 🌐 Domain Setup (Optional)

### Vercel
1. Go to Project → Settings → Domains
2. Add your domain
3. Configure DNS (Vercel provides instructions)

### Custom Domain
1. Buy domain (Namecheap, GoDaddy, etc.)
2. Point DNS to your hosting provider
3. Configure SSL (usually automatic)

---

## ✅ Post-Deployment Checklist

### Verify Deployment

- [ ] App loads at production URL
- [ ] Database connection works
- [ ] Can create new account
- [ ] Can login
- [ ] Can access dashboard
- [ ] Images load correctly
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Pages load fast

### Monitor

- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics (Google Analytics)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Monitor database usage
- [ ] Check logs regularly

---

## 📊 Performance Optimization

### Images
- [x] Images are optimized (JPG format)
- [x] Reasonable file sizes (<200KB each)
- [ ] Consider using CDN for images
- [ ] Implement lazy loading for below-fold images

### Database
- [ ] Add indexes for frequently queried columns
- [ ] Connection pooling configured
- [ ] Query optimization

### Caching
- [ ] Static assets cached
- [ ] API responses cached where appropriate
- [ ] Database query caching

---

## 🐛 Troubleshooting

### Build Fails

**Issue**: TypeScript errors
```bash
# Solution: Fix type errors locally first
npm exec tsc -- --noEmit
```

**Issue**: Missing dependencies
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Fails

**Issue**: "DATABASE_URL is required"
```bash
# Solution: Ensure DATABASE_URL is set in platform
# Vercel: Project → Settings → Environment Variables
# Railway: railway variables
# Heroku: heroku config
```

**Issue**: SSL/TLS errors
```bash
# Solution: Add ?sslmode=require to connection string
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

### App Crashes

**Issue**: Check logs
```bash
# Vercel
vercel logs

# Railway
railway logs

# Heroku
heroku logs --tail
```

---

## 🔄 Continuous Deployment

### GitHub Integration

Most platforms support automatic deployment from GitHub:

1. Connect GitHub repository
2. Select branch (usually `main`)
3. Configure build settings
4. Every push triggers deployment

**Vercel**: Automatic
**Railway**: Automatic
**Heroku**: Connect GitHub in dashboard

---

## 📝 Environment Variables Needed

### Required
```
DATABASE_URL=postgresql://...
```

### Recommended
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Optional (Future)
```
SESSION_SECRET=...
SMTP_HOST=...
SMTP_USER=...
SMTP_PASSWORD=...
STRIPE_SECRET_KEY=...
```

---

## 🎯 Final Checks

Before going live:

- [ ] All environment variables set
- [ ] Database migrated/seeded
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured (if using)
- [ ] Analytics installed
- [ ] Error tracking enabled
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Team members have access
- [ ] Monitoring alerts configured

---

## 📚 Resources

### Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Heroku Docs](https://devcenter.heroku.com)

### Tools
- [Vercel](https://vercel.com) - Recommended for Next.js
- [Railway](https://railway.app) - Easy full-stack deployment
- [Supabase](https://supabase.com) - PostgreSQL hosting
- [Neon](https://neon.tech) - Serverless Postgres

---

## 🎉 You're Ready!

Follow this checklist and your CreatorBridge application will be deployed securely and efficiently!

**Recommended**: Start with Vercel + Vercel Postgres for easiest deployment.

---

**Need help?** Check the platform-specific documentation or logs for detailed error messages.
