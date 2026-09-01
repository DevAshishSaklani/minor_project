# Testing Guide - All New Fixes

## 🎯 Quick Test Checklist

Use this guide to verify all three fixes are working correctly.

---

## Test 1: Login Redirect ✅

### Steps:
1. Open the app in a browser
2. Click "Sign In" in navigation or go to `/login`
3. Enter your credentials:
   - Email: (your test account)
   - Password: (your password)
4. Click "Sign In →"

### Expected Result:
✅ After clicking "Sign In", you should be taken directly to `/dashboard`
✅ The dashboard should load with your account information
✅ You should NOT see the login page reload
✅ You should NOT need to click anything else

### What Was Fixed:
- Changed from `router.push()` + `router.refresh()` to `window.location.href`
- Ensures proper full-page navigation after login

---

## Test 2: Creator Campaign Applications ✅

### Prerequisites:
- You need a creator account
- There should be at least one active campaign

### Steps:

#### Part A: View Campaign Requirements
1. Login as a **creator**
2. Go to `/campaigns`
3. Look at a campaign card

**Expected Result:**
✅ Each campaign shows a card with:
- Title and description
- Budget and deadline
- "View Full Brief →" link (if detailed description exists)
- **Requirements section** (if criteria set) showing:
  - 👥 Minimum followers
  - 📂 Required niche
  - 📱 Required platform
- **"Apply Now →" button** at the bottom

#### Part B: Submit Application
1. Click **"Apply Now →"** on any campaign
2. A modal should pop up

**Expected Result:**
✅ Modal appears with:
- Campaign title at top
- "Your Proposal *" textarea
- Helpful placeholder text
- Cancel and Submit buttons

3. Write a proposal (e.g., "I'm a tech YouTuber with 50k subscribers...")
4. Click **"Submit Application"**

**Expected Result:**
✅ "Submitting..." appears on button
✅ Success message shows: "✓ Application submitted successfully!"
✅ Modal closes after 2 seconds
✅ Button changes to **"✓ Applied"** badge

#### Part C: Verify Application Persists
1. Refresh the page (`/campaigns`)
2. Look at the same campaign

**Expected Result:**
✅ The button still shows **"✓ Applied"** (not "Apply Now")
✅ You cannot apply again to the same campaign

#### Part D: Test Eligibility Validation
1. Login as a brand
2. Create a campaign with specific requirements:
   - Required Platform: YouTube
   - Required Niche: Tech
3. Logout and login as a creator with DIFFERENT platform/niche
   - e.g., Platform: Instagram, Niche: Fitness
4. Try to apply to that campaign

**Expected Result:**
✅ You should see an error message:
- "This campaign requires creators on youtube"
- OR "This campaign requires creators in the tech niche"
✅ Application should NOT be submitted

---

## Test 3: Brand Eligibility Criteria ✅

### Prerequisites:
- You need a brand account

### Steps:

#### Part A: Create Campaign with Criteria
1. Login as a **brand**
2. Go to dashboard
3. Click **"✨ Create Campaign"**
4. Fill out the basic fields:
   - Title: "Test Campaign"
   - Description: "Testing eligibility"
   - Budget: 1000
   - Deadline: (future date)
   - Content Format: Video
   - Objective: "Testing"

5. Scroll to **"Eligibility Criteria (Optional)"** section

**Expected Result:**
✅ You should see three fields:
- Minimum Followers (number input)
- Required Platform (dropdown)
- Required Niche (dropdown)

6. Fill them out:
   - Minimum Followers: **10000**
   - Required Platform: **Instagram**
   - Required Niche: **Fitness**

7. Click **"Create Campaign"**

**Expected Result:**
✅ Campaign created successfully
✅ Redirected to `/campaigns`
✅ Your new campaign appears in the list

#### Part B: View Requirements on Campaign Card
1. Find your newly created campaign on `/campaigns`
2. Look at the card

**Expected Result:**
✅ You should see a "Requirements:" section with:
- 👥 10,000+ followers
- 📂 fitness
- 📱 instagram

#### Part C: Test Campaign Without Criteria
1. Create another campaign but leave eligibility fields empty
2. Submit

**Expected Result:**
✅ Campaign created successfully
✅ No "Requirements:" section shown on card
✅ Any creator can apply (no restrictions)

---

## Test 4: Application Status Badges ✅

### Prerequisites:
- Applied to at least one campaign

### Steps:
1. Login as a creator who has applied to campaigns
2. Go to `/campaigns`
3. Look at campaigns you've applied to

**Expected Result:**
✅ Campaigns you HAVE applied to show: **"✓ Applied"** badge (sage green)
✅ Campaigns you HAVE NOT applied to show: **"Apply Now →"** button (orange)

### Badge Colors:
- **Pending**: Sage green with "✓ Applied"
- **Accepted**: Lavender with "✓ Accepted"
- **Rejected**: Gray with "✗ Not Selected"

---

## Test 5: Complete User Journey ✅

### Full Creator Flow:
1. ✅ Sign up as creator
2. ✅ Login (redirected to dashboard)
3. ✅ Browse campaigns
4. ✅ View campaign requirements
5. ✅ Read detailed brief
6. ✅ Check if eligible
7. ✅ Write proposal
8. ✅ Submit application
9. ✅ See confirmation
10. ✅ View application status

### Full Brand Flow:
1. ✅ Sign up as brand
2. ✅ Login (redirected to dashboard)
3. ✅ Click "Create Campaign"
4. ✅ Fill campaign details
5. ✅ Set eligibility criteria
6. ✅ Submit campaign
7. ✅ See campaign in listings
8. ✅ Requirements visible to creators

---

## Common Issues & Solutions

### Issue: Login loops back to login page
**Solution:** This is now FIXED. Should redirect to dashboard.
**If still happening:** Clear browser cookies and try again.

### Issue: "Apply Now" doesn't do anything
**Solution:** Check browser console for errors. Make sure you're logged in as a creator.

### Issue: Application submitted but button doesn't change
**Solution:** Refresh the page. The status should persist from database.

### Issue: Can't set eligibility criteria
**Solution:** Make sure you're on the campaign creation page as a brand.

### Issue: Error when applying
**Check:**
- Are you logged in as a creator (not brand)?
- Does the campaign still have an active status?
- Is the deadline still in the future?
- Do you meet the eligibility requirements?

---

## API Testing (Optional)

### Test Application API Directly

```bash
# Check if you've applied (while logged in)
curl http://localhost:3000/api/campaigns/CAMPAIGN_ID/apply

# Submit application (while logged in as creator)
curl -X POST http://localhost:3000/api/campaigns/CAMPAIGN_ID/apply \
  -H "Content-Type: application/json" \
  -d '{"proposal": "I would be great for this campaign because..."}'
```

---

## Database Verification

### Check Applications in Database

```sql
-- View all applications
SELECT 
  ca.id,
  ca.status,
  ca.applied_at,
  c.title as campaign_title,
  u.full_name as creator_name
FROM campaign_applications ca
JOIN campaigns c ON ca.campaign_id = c.id
JOIN users u ON ca.user_id = u.id
ORDER BY ca.applied_at DESC;

-- Check eligibility criteria on campaigns
SELECT 
  title,
  min_followers,
  required_platform,
  required_niche
FROM campaigns
WHERE min_followers > 0 
   OR required_platform IS NOT NULL 
   OR required_niche IS NOT NULL;
```

---

## Screenshot Checklist

Take screenshots to verify:

1. ✅ Dashboard after login (not login page)
2. ✅ Campaign card with requirements section
3. ✅ Application modal opened
4. ✅ Success message after application
5. ✅ "Applied" badge on campaign card
6. ✅ Campaign creation form with eligibility section
7. ✅ Campaign card showing all requirements

---

## Performance Checks

### Page Load Times:
- ✅ Login should redirect in < 1 second
- ✅ Application modal should open instantly
- ✅ Application submission should complete in < 2 seconds
- ✅ Campaign creation should complete in < 2 seconds

### Responsiveness:
- ✅ Modal should be scrollable on mobile
- ✅ Form fields should stack on small screens
- ✅ Buttons should be easily tappable (44px min)
- ✅ Text should be readable without zooming

---

## Success Criteria

All fixes are working if:

1. **Login Redirect:**
   - ✅ Clicking "Sign In" takes you directly to dashboard
   - ✅ No page reload loops
   - ✅ Session persists across pages

2. **Campaign Applications:**
   - ✅ "Apply Now" button visible on campaigns
   - ✅ Modal opens with proposal form
   - ✅ Application submits successfully
   - ✅ Status changes to "Applied"
   - ✅ Cannot apply twice to same campaign
   - ✅ Eligibility validation works

3. **Eligibility Criteria:**
   - ✅ Brands can set requirements
   - ✅ Requirements show on campaign cards
   - ✅ Creators see clear requirements
   - ✅ System validates eligibility
   - ✅ Error messages are helpful

---

## Report Issues

If something doesn't work:

1. **Check browser console** for errors
2. **Check network tab** for failed requests
3. **Verify you're logged in** with correct account type
4. **Clear cookies** and try again
5. **Check database** for data
6. **Review server logs** for API errors

All three fixes have been implemented and tested. The application should now:
- ✅ Properly redirect after login
- ✅ Allow creators to apply with proposals
- ✅ Let brands set eligibility criteria
