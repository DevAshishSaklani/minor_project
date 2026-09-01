# Environment Setup Guide - CreatorBridge

## 📋 Environment Variables Setup

### Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Set required variables** (see below)

---

## 🔑 Required Environment Variables

### Database Configuration (REQUIRED)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_db
```

**Format Explanation:**
```
postgresql://[username]:[password]@[host]:[port]/[database_name]
```

**Local Development:**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_db
```

**Production (Example with Vercel Postgres):**
```env
DATABASE_URL=postgres://user:password@host.postgres.vercel.com:5432/verceldb?sslmode=require
```

**Production (Example with Railway):**
```env
DATABASE_URL=postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway
```

**Production (Example with Supabase):**
```env
DATABASE_URL=postgresql://postgres:password@db.projectref.supabase.co:5432/postgres
```

---

## 🌐 Optional Environment Variables

### Next.js Configuration

```env
# Base URL of your application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API URL (usually same as APP_URL)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Environment (development, production, test)
NODE_ENV=development
```

### Session Security (Recommended for Production)

```env
# Generate a random secret for session security
SESSION_SECRET=your-super-secret-key-at-least-32-characters-long
```

**Generate a secure secret:**
```bash
# Using openssl
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📧 Email Configuration (Future Feature)

For sending emails (password reset, verification, etc.):

```env
# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@creatorbridge.com

# SendGrid (Alternative)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxx
```

---

## 💳 Payment Integration (Future Feature)

### Stripe Configuration

```env
# Test mode (for development)
STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxx
STRIPE_PUBLIC_KEY=pk_test_51xxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx

# Live mode (for production)
# STRIPE_SECRET_KEY=sk_live_51xxxxxxxxxx
# STRIPE_PUBLIC_KEY=pk_live_51xxxxxxxxxx
# STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx
```

---

## ☁️ File Upload Configuration (Future Feature)

### AWS S3

```env
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=creatorbridge-uploads
```

### Cloudinary (Alternative)

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🔐 OAuth Providers (Future Feature)

### Google OAuth

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### GitHub OAuth

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

---

## 📊 Analytics (Future Feature)

```env
# Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Mixpanel
MIXPANEL_TOKEN=your-mixpanel-token

# PostHog
POSTHOG_API_KEY=your-posthog-key
```

---

## 🔒 What NOT to Put in .env

Never commit these to Git:
- ❌ Database passwords
- ❌ API keys
- ❌ Secret tokens
- ❌ OAuth credentials
- ❌ Any sensitive information

---

## 📝 .gitignore Explained

### What's Ignored

```
# Environment files (IMPORTANT!)
.env                          # Your actual secrets
.env.local                    # Local overrides
.env.development.local        # Local dev secrets
.env.production.local         # Local prod secrets

# What's NOT ignored
!.env.example                 # Template for others
```

### Why This Matters

- `.env` contains your secrets → NEVER commit
- `.env.example` is a template → Safe to commit
- Other developers copy `.env.example` to `.env` and add their own secrets

---

## 🚀 Deployment Environments

### Local Development

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_db
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Production (Vercel)

Set environment variables in Vercel dashboard:

1. Go to your project → Settings → Environment Variables
2. Add each variable:
   - `DATABASE_URL` → Your production database URL
   - `NODE_ENV` → `production`
   - etc.

### Production (Other Platforms)

#### Railway
```bash
railway variables set DATABASE_URL=postgresql://...
```

#### Heroku
```bash
heroku config:set DATABASE_URL=postgresql://...
```

#### Docker
```dockerfile
# In docker-compose.yml
environment:
  - DATABASE_URL=postgresql://...
  - NODE_ENV=production
```

---

## 🔍 Checking Your Environment

### Verify Environment Variables

Create a test file:
```javascript
// test-env.js
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✓ Set' : '✗ Missing');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
```

Run:
```bash
node test-env.js
```

### In Next.js

Server-side (API routes, Server Components):
```typescript
// Can access ALL environment variables
const dbUrl = process.env.DATABASE_URL;
```

Client-side (Browser):
```typescript
// Can only access NEXT_PUBLIC_* variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## 📚 Environment Variable Naming

### Convention

- Server-only: `DATABASE_URL`, `STRIPE_SECRET_KEY`
- Client-accessible: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`

### Rules

1. **Server secrets** → No prefix
2. **Client variables** → `NEXT_PUBLIC_` prefix
3. **Never** put secrets in `NEXT_PUBLIC_*` (they'll be exposed to browsers!)

---

## 🛠️ Common Issues & Solutions

### Issue: "DATABASE_URL is required"

**Solution:**
1. Check `.env` file exists in project root
2. Verify `DATABASE_URL` is set
3. Restart dev server after changing `.env`

### Issue: Environment variable not updating

**Solution:**
1. Restart the dev server
2. Clear `.next` folder: `rm -rf .next`
3. Rebuild: `npm run build`

### Issue: Variables work locally but not in production

**Solution:**
1. Check deployment platform's environment variables
2. Ensure all required variables are set
3. Don't rely on `.env` file in production (use platform settings)

---

## 📋 Checklist

Before deploying to production:

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists and is up-to-date
- [ ] All secrets are set in deployment platform
- [ ] `DATABASE_URL` points to production database
- [ ] `NODE_ENV=production` is set
- [ ] No hardcoded secrets in code
- [ ] `NEXT_PUBLIC_*` variables don't contain secrets
- [ ] Session secret is generated and secure
- [ ] All API keys are production keys (not test)

---

## 🔐 Security Best Practices

1. **Never commit `.env`** to Git
2. **Use strong secrets** (at least 32 characters)
3. **Rotate secrets regularly** in production
4. **Use different secrets** for dev/prod
5. **Don't share `.env`** file directly (use secure methods)
6. **Review `.gitignore`** before first commit
7. **Use environment-specific variables** (.env.local, .env.production)

---

## 📖 Quick Reference

### Current Setup (.env)

```env
# REQUIRED
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_db

# OPTIONAL (add if needed)
# NODE_ENV=development
# NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Files

- `.env` → Your secrets (NEVER commit)
- `.env.example` → Template (safe to commit)
- `.gitignore` → Prevents committing secrets

### Commands

```bash
# Copy example to create your .env
cp .env.example .env

# Check what's ignored
git status --ignored

# View environment in Node
node -e "console.log(process.env.DATABASE_URL)"
```

---

## 🎓 Learn More

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [12 Factor App - Config](https://12factor.net/config)
- [Environment Variable Security](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

**Your environment is now properly configured! 🎉**

Remember: Never commit `.env` to Git!
