# ⚡ Quick Start Guide

## 🚀 Application is Ready!

**URL:** https://3000-iwr9keblrc997bwkk9zrc.e2b.app

---

## 🔑 Test Accounts (Ready to Use)

### Creator Account
```
Email:    testcreator@test.com
Password: password123
```
**Use this to:**
- Browse campaigns
- Apply to campaigns
- Submit proposals
- Track application status

### Brand Account
```
Email:    testbrand@test.com
Password: password123
```
**Use this to:**
- Create campaigns
- Set eligibility criteria
- View campaign listings
- Manage brand profile

---

## 📝 Quick Actions

### As a Creator:
1. **Login** → Use creator account above
2. **Browse Campaigns** → Click "Browse Campaigns" on dashboard
3. **Apply** → Click "Apply Now" on any campaign
4. **Write Proposal** → Explain why you're a good fit
5. **Submit** → See "✓ Applied" badge

### As a Brand:
1. **Login** → Use brand account above
2. **Create Campaign** → Click orange "✨ Create Campaign" button
3. **Fill Details** → Add title, description, budget, etc.
4. **Set Requirements** → Choose minimum followers, platform, niche
5. **Publish** → Campaign goes live!

---

## 🎯 Testing Checklist

### ✅ Test Login
1. Go to `/login`
2. Enter: `testcreator@test.com` / `password123`
3. Click "Sign In"
4. Should redirect to `/dashboard`

### ✅ Test Campaign Creation
1. Login as brand: `testbrand@test.com` / `password123`
2. Click "Create Campaign"
3. Fill form with test data
4. Submit
5. Should see campaign on `/campaigns`

### ✅ Test Application
1. Login as creator: `testcreator@test.com` / `password123`
2. Go to `/campaigns`
3. Click "Apply Now"
4. Write proposal
5. Submit
6. Should see "✓ Applied" badge

---

## 🐛 Troubleshooting

### Login not working?
1. **Clear browser cookies** (F12 → Application → Cookies)
2. **Try incognito mode**
3. **Use exact credentials** from above
4. **Check console for errors** (F12 → Console)

### Can't create campaign?
- Make sure you're logged in as **brand** (not creator)
- Check all required fields are filled
- Try refreshing the page

### Can't apply to campaign?
- Make sure you're logged in as **creator** (not brand)
- Check if you meet eligibility requirements
- Make sure you haven't already applied

---

## 📱 Features Available

### ✅ Working Features:
- ✅ Login/Signup (both brands and creators)
- ✅ Dashboard (role-specific)
- ✅ Campaign creation (brands only)
- ✅ Campaign browsing (everyone)
- ✅ Campaign applications (creators only)
- ✅ Eligibility criteria (3 types)
- ✅ Application status tracking
- ✅ Duplicate prevention
- ✅ Detailed campaign briefs

### 🔮 Coming Soon:
- Brand dashboard to view applications
- Accept/reject applications
- Messaging system
- Payment integration
- Analytics dashboard

---

## 🎨 Page Overview

### Public Pages:
- **/** - Homepage with features
- **/login** - Login page
- **/signup** - Registration page

### Authenticated Pages:
- **/dashboard** - Role-based dashboard
- **/campaigns** - Browse all campaigns
- **/campaigns/create** - Create campaign (brands only)
- **/creators** - Browse creators

### API Endpoints:
- `POST /api/auth/login` - Login
- `POST /api/auth/signup` - Register
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns/[id]/apply` - Apply to campaign
- `GET /api/campaigns/[id]/apply` - Check application status

---

## 💡 Pro Tips

### For Best Results:
1. **Use different browsers** or incognito for testing different roles
2. **Clear cookies** between account switches
3. **Check requirements** before applying to campaigns
4. **Write detailed proposals** when applying
5. **Set realistic criteria** when creating campaigns

### Sample Campaign Data:
```
Title: Tech Product Review Campaign
Description: Looking for tech YouTubers to review our new gadget
Detailed Brief:
  - Create 10-minute video
  - Show unboxing and features
  - Post within 2 weeks
  - Use #TechReview hashtag
  
Budget: $5000
Deadline: 2025-01-31
Format: Video
Objective: Product Launch

Eligibility:
  Min Followers: 10000
  Platform: YouTube
  Niche: Tech
```

### Sample Proposal:
```
I'm a tech YouTuber with 15,000 subscribers focused on product reviews.
My channel specializes in consumer electronics and my audience is 65% 
tech enthusiasts aged 25-45.

I've previously reviewed similar products and my videos average 5K views
with 8% engagement rate. I can deliver a professional unboxing and review
within 10 days.

Portfolio: youtube.com/mychannel
Previous work: [Link to similar review]
```

---

## 🎓 Account Types

### Creator
- Can browse campaigns
- Can apply with proposals
- Can see application status
- Dashboard shows "Browse Campaigns"

### Brand
- Can create campaigns
- Can set eligibility criteria
- Can view all campaigns
- Dashboard shows "✨ Create Campaign"

---

## 📊 Database Info

### Tables:
- `users` - All user accounts (3 users)
- `sessions` - Active login sessions
- `campaigns` - All campaigns
- `campaign_applications` - Creator applications

### Relationships:
- Campaigns → Created by brands (brandId)
- Applications → Link creators to campaigns
- Sessions → Track logged-in users

---

## 🔒 Security Notes

- ✅ Passwords are hashed with bcrypt
- ✅ Sessions expire after 30 days
- ✅ Role-based access control
- ✅ SQL injection prevention (Drizzle ORM)
- ✅ Input validation on all endpoints
- ✅ CSRF protection (Next.js built-in)

---

## 📞 Need Help?

### Check These Files:
- `LOGIN_TROUBLESHOOTING.md` - Login issues
- `TESTING_ALL_FIXES.md` - Feature testing
- `FINAL_FIX_SUMMARY.md` - What was fixed
- `QUICK_VISUAL_GUIDE.md` - Visual walkthrough

### Common Issues:
**Q: Can't login**
A: See LOGIN_TROUBLESHOOTING.md

**Q: How to create campaign?**
A: Login as brand → Dashboard → "Create Campaign"

**Q: How to apply?**
A: Login as creator → Campaigns → "Apply Now"

**Q: Application not showing?**
A: Check if you meet eligibility requirements

---

## ✅ Everything Works!

The application is fully functional with:
- ✅ Working login/signup
- ✅ Campaign creation
- ✅ Creator applications
- ✅ Eligibility criteria
- ✅ Status tracking

**Ready to test!** 🚀

---

**Application URL:** https://3000-iwr9keblrc997bwkk9zrc.e2b.app

**Test Accounts:**
- Creator: `testcreator@test.com` / `password123`
- Brand: `testbrand@test.com` / `password123`

**Status:** ✅ **READY TO USE**
