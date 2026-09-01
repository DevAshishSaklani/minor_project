# Login Troubleshooting Guide

## ✅ Server Status: WORKING

The application is now running and the login system is functional.

---

## 🔑 Test Accounts

I've created two test accounts for you:

### Creator Account
- **Email:** `testcreator@test.com`
- **Password:** `password123`
- **Type:** Creator
- **Niche:** Tech
- **Platform:** YouTube

### Brand Account
- **Email:** `testbrand@test.com`
- **Password:** `password123`
- **Type:** Brand
- **Company:** Test Company Inc

### Your Existing Account
- **Email:** `devasaklani4@gmail.com`
- **Password:** (your original password)
- **Type:** Brand

---

## 🧪 How to Test Login

### Option 1: Use the UI (Recommended)

1. **Open the application** in your browser
   - URL: https://3000-iwr9keblrc997bwkk9zrc.e2b.app

2. **Click "Sign In"** in the navigation or go to `/login`

3. **Enter credentials:**
   - Email: `testcreator@test.com`
   - Password: `password123`

4. **Click "Sign In →"**

5. **Expected Result:**
   - ✅ You should be redirected to `/dashboard`
   - ✅ You should see "Welcome, Test Creator!"
   - ✅ Account type should show "✨ Creator"

### Option 2: Test with Brand Account

1. Go to `/login`
2. Enter:
   - Email: `testbrand@test.com`
   - Password: `password123`
3. Click "Sign In →"
4. **Expected Result:**
   - ✅ Redirected to `/dashboard`
   - ✅ See "Welcome, Test Brand!"
   - ✅ See "✨ Create Campaign" button
   - ✅ Account type shows "🏢 Brand"

---

## 🚨 Common Issues & Solutions

### Issue 1: "Page keeps reloading"
**Cause:** Browser cache or old session cookies

**Solution:**
1. Clear browser cookies for the site
2. Open in incognito/private mode
3. Try again

**How to clear cookies:**
- Chrome: F12 → Application → Cookies → Clear
- Firefox: F12 → Storage → Cookies → Clear
- Safari: Develop → Show Web Inspector → Storage → Cookies

### Issue 2: "Invalid email or password" error
**Possible causes:**

**A. Using wrong credentials**
- Make sure you're using one of the test accounts listed above
- Check for typos in email/password
- Email is case-sensitive

**B. Password not set during signup**
- If you created account via UI, make sure you set a password
- Try creating a new account

**C. Account doesn't exist**
- Use one of the test accounts provided above
- Or create a new account via `/signup`

### Issue 3: Login works but doesn't redirect
**This was fixed!** The issue was:
- Old code: `router.push('/dashboard')` + `router.refresh()`
- New code: `window.location.href = '/dashboard'`

**If still happening:**
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check browser console for errors (F12)

### Issue 4: "Network error" or "Failed to fetch"
**Cause:** Server not running or network issue

**Solution:**
1. Check if server is running: `curl http://localhost:3000/api/health`
2. Should return: `{"ok":true}`
3. If not, restart the server

### Issue 5: Stuck on login page after clicking "Sign In"
**Cause:** JavaScript error or session cookie issue

**Solution:**
1. Open browser console (F12)
2. Look for errors (red text)
3. Check Network tab for failed requests
4. Try in incognito mode

---

## 🔍 Debugging Steps

### Step 1: Check Server
```bash
curl http://localhost:3000/api/health
# Should return: {"ok":true}
```

### Step 2: Test Login API Directly
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testcreator@test.com",
    "password": "password123"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "testcreator@test.com",
    "fullName": "Test Creator",
    "userType": "creator"
  }
}
```

### Step 3: Check Browser Console
1. Open browser (F12)
2. Go to Console tab
3. Look for errors
4. Common errors:
   - CORS errors → Server configuration issue
   - Network errors → Server not running
   - JavaScript errors → Code issue

### Step 4: Check Network Tab
1. F12 → Network tab
2. Try to login
3. Look for `/api/auth/login` request
4. Check:
   - Status code (should be 200)
   - Response body (should have success: true)
   - Cookies (should set session_id)

---

## 📋 Quick Checklist

Before reporting login issues, verify:

- [ ] Server is running (health check returns ok)
- [ ] Using correct credentials (try test accounts)
- [ ] Browser cookies are enabled
- [ ] Not using incognito mode blocking cookies
- [ ] No browser extensions blocking requests
- [ ] Correct URL (not localhost if deployed)
- [ ] No JavaScript errors in console
- [ ] Network requests are successful

---

## 🎯 Working Login Flow

Here's what SHOULD happen:

```
1. User goes to /login
   ↓
2. Enters email & password
   ↓
3. Clicks "Sign In →"
   ↓
4. JavaScript calls POST /api/auth/login
   ↓
5. API validates credentials
   ↓
6. API creates session in database
   ↓
7. API sets session_id cookie
   ↓
8. API returns success response
   ↓
9. JavaScript executes: window.location.href = '/dashboard'
   ↓
10. Browser navigates to /dashboard
    ↓
11. Dashboard page loads
    ↓
12. Server reads session_id cookie
    ↓
13. Server fetches user from session
    ↓
14. Dashboard shows user info
    ↓
✅ SUCCESS!
```

---

## 🔧 Reset Everything (Nuclear Option)

If nothing works, try this:

### Reset Database Sessions
```sql
psql postgresql://postgres:postgres@127.0.0.1:5432/app_db -c "DELETE FROM sessions;"
```

### Clear All Browser Data
1. F12 → Application/Storage
2. Clear all cookies
3. Clear local storage
4. Clear session storage
5. Hard reload (Ctrl+Shift+R)

### Create Fresh Account
1. Go to `/signup`
2. Create completely new account
3. Use unique email (e.g., `test+1@test.com`)
4. Try logging in with new account

---

## 📞 Still Not Working?

If login still doesn't work after trying everything above:

### Provide This Information:
1. **What happens?**
   - Do you see an error message?
   - Does page reload?
   - Does nothing happen?

2. **Browser Console Errors**
   - F12 → Console tab
   - Copy any red error messages

3. **Network Request Details**
   - F12 → Network tab
   - Find `/api/auth/login` request
   - What's the status code?
   - What's the response?

4. **Which account?**
   - Test account or your own?
   - What email are you using?

5. **Browser & OS**
   - Chrome/Firefox/Safari?
   - Version?
   - Windows/Mac/Linux?

---

## ✅ Verified Working

I've tested these and they work:

✅ **API Endpoint:** `POST /api/auth/login` returns success
✅ **Test Creator Account:** Can authenticate successfully
✅ **Test Brand Account:** Can authenticate successfully  
✅ **Server:** Running and responding
✅ **Database:** Has users and can validate credentials
✅ **Redirect Logic:** Fixed and using `window.location.href`
✅ **Signup:** Also fixed with same redirect logic

---

## 🎓 For Developers

### Check Server Logs
```bash
# Server should show:
# - POST /api/auth/login
# - Status: 200
# - No errors
```

### Check Database
```sql
-- Check if user exists
SELECT email, user_type FROM users WHERE email = 'testcreator@test.com';

-- Check sessions
SELECT * FROM sessions WHERE user_id = (
  SELECT id FROM users WHERE email = 'testcreator@test.com'
);
```

### Test with cURL (Detailed)
```bash
# Login and capture cookies
curl -v -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testcreator@test.com","password":"password123"}' \
  -c cookies.txt

# Use session to access protected route
curl -b cookies.txt http://localhost:3000/api/auth/me
```

---

## 🎉 Summary

The login system is **WORKING**. If you're having issues:

1. ✅ Try the test accounts provided
2. ✅ Clear browser cookies and cache
3. ✅ Check browser console for errors
4. ✅ Make sure server is running
5. ✅ Try in incognito mode

**Test Accounts Ready:**
- Creator: `testcreator@test.com` / `password123`
- Brand: `testbrand@test.com` / `password123`

**Application URL:** https://3000-iwr9keblrc997bwkk9zrc.e2b.app

**Status:** ✅ Ready to use!
