# Google Tag Manager Setup Guide for Link Tracking

## What's Already Implemented

Your site now pushes custom events to GTM's `dataLayer` whenever a link is clicked. Each event includes:
- `event`: 'link_click'
- `link_category`: Category name (e.g., "Web Development Related", "Featured")
- `link_title`: Link title (e.g., "LinkedIn", "Leave a greeting")
- `link_url`: Destination URL
- `link_type`: 'external' or 'internal'

## Setup in Google Tag Manager (5 minutes)

### Step 1: Create Data Layer Variables

1. Go to **Variables** → **New**
2. Create these 4 variables:

**Variable 1: Link Category**
- Name: `DL - Link Category`
- Type: Data Layer Variable
- Data Layer Variable Name: `link_category`

**Variable 2: Link Title**
- Name: `DL - Link Title`
- Type: Data Layer Variable
- Data Layer Variable Name: `link_title`

**Variable 3: Link URL**
- Name: `DL - Link URL`
- Type: Data Layer Variable
- Data Layer Variable Name: `link_url`

**Variable 4: Link Type**
- Name: `DL - Link Type`
- Type: Data Layer Variable
- Data Layer Variable Name: `link_type`

### Step 2: Create a Trigger

1. Go to **Triggers** → **New**
2. Name: `Custom Event - Link Click`
3. Trigger Type: **Custom Event**
4. Event name: `link_click`
5. This trigger fires on: **All Custom Events**
6. Save

### Step 3: Create a Tag

1. Go to **Tags** → **New**
2. Name: `GA4 - Link Click Tracking`
3. Tag Type: **Google Analytics: GA4 Event**
4. Configuration Tag: [Select your GA4 Configuration tag]
5. Event Name: `link_click`
6. Event Parameters:
   - Parameter Name: `link_category` → Value: `{{DL - Link Category}}`
   - Parameter Name: `link_title` → Value: `{{DL - Link Title}}`
   - Parameter Name: `link_url` → Value: `{{DL - Link URL}}`
   - Parameter Name: `link_type` → Value: `{{DL - Link Type}}`
7. Triggering: Select `Custom Event - Link Click`
8. Save

### Step 4: Test & Publish

1. Click **Preview** in GTM
2. Visit your site and click some links
3. Check the GTM debug panel - you should see `link_click` events firing
4. If working correctly, click **Submit** → **Publish**

## View Data in Google Analytics 4

After 24-48 hours, go to:
1. **Reports** → **Engagement** → **Events**
2. You'll see `link_click` event
3. Click on it to see:
   - Which categories get most clicks
   - Which specific links are popular
   - External vs internal link performance

## Quick Alternative: Enable Enhanced Measurement

If you just want to track external clicks automatically:

1. Go to **GA4 Admin** → **Data Streams** → Your website
2. Click **Enhanced measurement**
3. Toggle ON **"Outbound clicks"**
4. Save

This automatically tracks external links without any GTM configuration!

## What You Can Track Now

✅ Which link categories are most popular
✅ Individual link performance
✅ External vs internal link behavior
✅ Conversion funnels (which links lead to greetings page)
✅ User journey mapping

## Example GA4 Reports You Can Create

- "Most Clicked Links" (by link_title)
- "Category Performance" (by link_category)
- "External Link Engagement" (filter link_type = external)
- "Greeting Page Referrals" (links that lead to /greetings/)
