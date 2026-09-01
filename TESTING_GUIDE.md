# Testing Guide - CreatorBridge Authentication

## Quick Start Testing

### Test 1: Create a Brand Account

1. **Navigate to Signup**
   - Go to: `http://localhost:3000/signup`
   - Or click "Get started" button anywhere on the site

2. **Select User Type**
   - Click "I'm a Brand" button

3. **Fill the Form**
   - Company Name: `Test Company`
   - Full Name: `John Brand`
   - Email: `brand@test.com`
   - Password: `password123`

4. **Submit**
   - Click "Create Account →"
   - You should be automatically redirected to `/dashboard`

5. **Verify Dashboard**
   - See "Welcome, John Brand!" heading
   - See "🏢 Brand" badge
   - See company name: "Test Company"
   - See quick actions for brands

---

### Test 2: Create a Creator Account

1. **Logout First**
   - Click "Sign Out" on dashboard
   - Or go to `/login` in a new incognito window

2. **Navigate to Signup**
   - Go to: `http://localhost:3000/signup`

3. **Select User Type**
   - Click "I'm a Creator" button

4. **Fill the Form**
   - Full Name: `Jane Creator`
   - Email: `creator@test.com`
   - Password: `password123`
   - Niche: `Tech` (dropdown)
   - Platform: `YouTube` (dropdown)

5. **Submit**
   - Click "Create Account →"
   - You should be automatically redirected to `/dashboard`

6. **Verify Dashboard**
   - See "Welcome, Jane Creator!" heading
   - See "✨ Creator" badge
   - See niche: "Tech"
   - See platform: "YouTube"
   - See quick actions for creators

---

### Test 3: Login with Existing Account

1. **Logout or Open New Window**
   - Logout if logged in
   - Or use incognito window

2. **Navigate to Login**
   - Go to: `http://localhost:3000/login`

3. **Enter Credentials**
   - Email: `brand@test.com`
   - Password: `password123`

4. **Submit**
   - Click "Sign In →"
   - You should be redirected to `/dashboard`

5. **Verify**
   - Dashboard shows correct user info
   - Can navigate to other pages
   - Stay logged in across pages

---

### Test 4: Test Form Validation

#### Email Validation
1. Go to `/signup`
2. Enter invalid email: `notanemail`
3. Try to submit
4. Should see HTML5 validation error

#### Password Length
1. Go to `/signup`
2. Enter password: `12345` (5 characters)
3. Try to submit
4. Should see "Password must be at least 6 characters" error

#### Duplicate Email
1. Try to signup with `brand@test.com` again
2. Should see "Email already registered" error

#### Wrong Password
1. Go to `/login`
2. Email: `brand@test.com`
3. Password: `wrongpassword`
4. Should see "Invalid email or password" error

---

### Test 5: Protected Route

1. **Without Login**
   - Make sure you're logged out
   - Navigate directly to `/dashboard`
   - Should be redirected to `/login`

2. **After Login**
   - Login with valid credentials
   - Navigate to `/dashboard`
   - Should see your dashboard

---

### Test 6: Session Persistence

1. **Login**
   - Login with any account

2. **Navigate Around**
   - Go to `/campaigns`
   - Go to `/creators`
   - Go to `/`
   - Go back to `/dashboard`

3. **Verify**
   - Should stay logged in
   - Dashboard should still show your info

4. **Close and Reopen Browser** (within 30 days)
   - Close browser completely
   - Reopen and go to `/dashboard`
   - Should still be logged in

---

### Test 7: Logout

1. **Login**
   - Login with any account

2. **Navigate to Dashboard**
   - Go to `/dashboard`

3. **Click Sign Out**
   - Click "Sign Out" button
   - Should be redirected to home page

4. **Try to Access Dashboard**
   - Navigate to `/dashboard`
   - Should be redirected to `/login`

---

### Test 8: Dark Mode with Auth

1. **Toggle Dark Mode**
   - Click moon/sun icon in navigation

2. **Signup in Dark Mode**
   - Go to `/signup`
   - Verify form is readable
   - Create account
   - Verify dashboard is readable

3. **Login in Dark Mode**
   - Logout
   - Go to `/login`
   - Verify form is readable
   - Login
   - Verify dashboard is readable

---

### Test 9: Mobile Responsiveness

1. **Open Developer Tools**
   - Press F12
   - Toggle device toolbar (mobile view)

2. **Test Signup on Mobile**
   - Navigate to `/signup`
   - Verify form is usable
   - User type buttons stack vertically
   - Form fields are touch-friendly
   - Submit button is accessible

3. **Test Login on Mobile**
   - Navigate to `/login`
   - Verify form is usable
   - Test with on-screen keyboard

4. **Test Dashboard on Mobile**
   - Login and view dashboard
   - Verify layout is readable
   - Quick action cards stack vertically
   - Logout button is accessible

---

### Test 10: Error Handling

#### Network Error Simulation
1. Open DevTools → Network tab
2. Select "Offline"
3. Try to signup/login
4. Should see "An error occurred" message

#### Server Error Simulation
1. Stop the server
2. Try to signup/login
3. Should see appropriate error message

---

## Expected Behavior Summary

### ✅ Signup
- Form validation works
- Passwords are hashed
- Session is created automatically
- User is redirected to dashboard
- Duplicate emails are rejected

### ✅ Login
- Credentials are validated
- Session is created
- User is redirected to dashboard
- Wrong credentials show error

### ✅ Dashboard
- Shows correct user info
- Shows user type badge
- Shows type-specific fields
- Shows appropriate quick actions
- Logout button works

### ✅ Session Management
- Sessions persist across page loads
- Sessions persist across browser restarts (30 days)
- Sessions are deleted on logout
- Expired sessions redirect to login

### ✅ Protected Routes
- Dashboard requires authentication
- Unauthenticated users are redirected to login
- After login, users can access dashboard

---

## Test Accounts

You can create these test accounts:

### Brand Account
```
Email: brand@test.com
Password: password123
Company: Test Company
Type: Brand
```

### Creator Account
```
Email: creator@test.com
Password: password123
Niche: Tech
Platform: YouTube
Type: Creator
```

### Additional Test Users
Create accounts with different:
- User types (Brand vs Creator)
- Niches (Tech, Fitness, Food, Travel, Fashion)
- Platforms (YouTube, Instagram, TikTok, Twitter, LinkedIn)

---

## Database Verification

Check if users are being created:

```bash
# Connect to database
psql postgresql://postgres:postgres@127.0.0.1:5432/app_db

# View all users
SELECT id, email, full_name, user_type, verified, created_at FROM users;

# View all sessions
SELECT id, user_id, expires_at, created_at FROM sessions;

# Exit
\q
```

---

## Debugging Tips

### Check Browser Console
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

### Check Server Logs
- Look for error messages in terminal
- Check for database connection errors
- Verify API endpoint responses

### Clear Browser Data
If having issues:
1. Open DevTools
2. Application → Storage
3. Clear site data
4. Refresh and try again

### Check Cookies
1. DevTools → Application → Cookies
2. Look for `session_id` cookie
3. Verify it exists after login
4. Verify it's deleted after logout

---

## Success Criteria

All tests should:
- ✅ Complete without errors
- ✅ Show appropriate messages
- ✅ Redirect correctly
- ✅ Persist data correctly
- ✅ Handle errors gracefully
- ✅ Work in dark mode
- ✅ Work on mobile
- ✅ Maintain security

---

## Need Help?

Check these files:
- `AUTH_IMPLEMENTATION.md` - Full authentication documentation
- `UPDATES.md` - Recent changes
- Server logs - Error messages
- Browser console - JavaScript errors

---

**Happy Testing! 🎉**

Your authentication system is fully functional and ready to use!
