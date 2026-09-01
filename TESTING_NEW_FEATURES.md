# Testing the New Campaign Creation Features

## Prerequisites
1. You need to have the application running
2. You need at least one brand account and one creator account

## Test Scenario 1: Brand Creates a Campaign

### Steps:
1. **Sign up or log in as a brand:**
   - Go to `/signup`
   - Select "Brand" as user type
   - Fill in company name and other details
   - Or log in to an existing brand account at `/login`

2. **Access the dashboard:**
   - After login, you'll be redirected to `/dashboard`
   - You should see a prominent orange card with "✨ Create Campaign"

3. **Create a new campaign:**
   - Click on "Create Campaign"
   - You'll be taken to `/campaigns/create`
   - Fill out the form:
     - **Title:** e.g., "Summer Product Launch 2024"
     - **Short Description:** e.g., "Looking for tech reviewers to showcase our new gadget"
     - **Detailed Campaign Brief:** 
       ```
       We're launching a revolutionary new smart home device and need tech creators to:
       
       - Create an unboxing and first impressions video (5-10 mins)
       - Highlight 3 key features: voice control, energy efficiency, smart integration
       - Use natural, authentic tone (not overly promotional)
       - Include hashtags: #SmartHome #TechReview #Innovation
       - Post within 2 weeks of receiving the product
       
       DO:
       ✓ Show the product in real-world use
       ✓ Be honest about pros and cons
       ✓ Mention our website in the description
       
       DON'T:
       ✗ Use competitor products in the same video
       ✗ Make unverified claims
       ```
     - **Budget:** e.g., 5000
     - **Deadline:** Select a future date
     - **Content Format:** Select "video"
     - **Objective:** e.g., "Product Launch Awareness"
   
4. **Submit the campaign:**
   - Click "Create Campaign"
   - You should be redirected to `/campaigns`
   - Your new campaign should appear in the list

## Test Scenario 2: Creator Views Campaign Details

### Steps:
1. **Sign up or log in as a creator:**
   - Go to `/signup`
   - Select "Creator" as user type
   - Fill in niche and platform details
   - Or log in to an existing creator account

2. **Browse campaigns:**
   - Go to `/campaigns`
   - You should see all active campaigns

3. **View campaign details:**
   - Find the campaign you just created
   - You'll see the short description in the card
   - Click "View Full Brief →" to expand the detailed description
   - The full campaign brief should be displayed with all instructions

4. **Understand the requirements:**
   - Read the detailed brief
   - All the formatting and line breaks should be preserved
   - You should clearly understand what the brand expects

## Test Scenario 3: Verify Dashboard Changes

### For Brands:
- Dashboard should have 3 cards:
  1. **Create Campaign** (orange, prominent)
  2. **Browse Campaigns** (sage green)
  3. **Find Creators** (lavender)

### For Creators:
- Dashboard should still have 2 cards:
  1. **Browse Campaigns** (sage green)
  2. **My Applications** (lavender, coming soon)

## Expected Behaviors

### Security:
- Only logged-in brands can access `/campaigns/create`
- POST to `/api/campaigns` should fail if:
  - User is not logged in
  - User is a creator (not a brand)

### Data Validation:
- All required fields must be filled
- Budget must be a positive number
- Deadline must be a valid date
- Form should show error messages for validation failures

### UI/UX:
- All pages should maintain the existing design system
- Colors, fonts, and spacing should be consistent
- Mobile responsiveness should work
- No layout shifts or broken styles

## Testing Checklist

- [ ] Brand can access "Create Campaign" from dashboard
- [ ] Campaign creation form loads correctly
- [ ] All form fields work properly
- [ ] Required field validation works
- [ ] Campaign is created successfully
- [ ] Brand is redirected to campaigns page after creation
- [ ] New campaign appears in the campaigns list
- [ ] Short description shows in the card
- [ ] "View Full Brief" link appears when detailed description exists
- [ ] Detailed description expands/collapses correctly
- [ ] Text formatting is preserved in detailed description
- [ ] Creators can see the full brief
- [ ] Dashboard shows correct cards for brands
- [ ] Dashboard shows correct cards for creators
- [ ] Non-logged-in users can't create campaigns
- [ ] Creators can't access campaign creation

## Database Verification

You can verify the schema changes in PostgreSQL:

```sql
-- Check the campaigns table structure
\d campaigns

-- You should see:
-- - detailed_description column (text, nullable)
-- - brand_id column (text, nullable)

-- View created campaigns
SELECT id, title, brand_name, detailed_description 
FROM campaigns 
ORDER BY created_at DESC 
LIMIT 5;
```

## Notes

- The detailed description field is **optional** - brands can create campaigns without it
- Existing campaigns in the database will have NULL for the new fields
- The UI gracefully handles campaigns without detailed descriptions (no "View Full Brief" link shown)
- All changes are backward compatible
