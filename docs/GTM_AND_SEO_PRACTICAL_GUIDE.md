# 🚀 GTM & SEO - Practical Implementation Guide

**This guide provides ready-to-use code snippets and configurations**

---

## Table of Contents
1. [Google Tag Manager - Ready-to-Use Configurations](#google-tag-manager---ready-to-use-configurations)
2. [GA4 Event Tracking Code](#ga4-event-tracking-code)
3. [SEO Meta Tags - Complete Templates](#seo-meta-tags---complete-templates)
4. [Structured Data Implementations](#structured-data-implementations)
5. [Analytics Reporting Setup](#analytics-reporting-setup)
6. [Testing Checklist](#testing-checklist)

---

# Google Tag Manager - Ready-to-Use Configurations

## Configuration 1: GTM Container Variables

### Variable Set 1: Page Variables
Copy these exact configurations into GTM **Variables** section:

| Name | Type | Data Layer Variable Name | Version |
|------|------|--------------------------|---------|
| DL - Page Title | Data Layer Variable | pageTitle | Version 2 |
| DL - Page Path | Data Layer Variable | pagePath | Version 2 |
| DL - Page URL | Data Layer Variable | pageUrl | Version 2 |
| DL - Event Category | Data Layer Variable | eventCategory | Version 2 |
| DL - Event Label | Data Layer Variable | eventLabel | Version 2 |
| DL - Event Value | Data Layer Variable | eventValue | Version 2 |

### Variable Set 2: User Variables
| Name | Type | Data Layer Variable Name |
|------|------|--------------------------|
| DL - User ID | Data Layer Variable | userId |
| DL - User Country | Data Layer Variable | userCountry |
| DL - User Device | Data Layer Variable | userDevice |

### Variable Set 3: Form Variables
| Name | Type | Data Layer Variable Name |
|------|------|--------------------------|
| DL - Form Name | Data Layer Variable | formName |
| DL - Form Field | Data Layer Variable | formField |
| DL - Form Status | Data Layer Variable | formStatus |

---

## Configuration 2: GTM Triggers

### Trigger Configuration A: Page Views
```
Name: Trigger - All Page Views
Type: Page View
Fire on: All Page Views
```

### Trigger Configuration B: Custom Events
```
Name: Trigger - Greeting Submit
Type: Custom Event
Event name: greeting_submit
Fire on: All Custom Events
```

```
Name: Trigger - Link Click
Type: Custom Event
Event name: link_click
Fire on: All Custom Events
```

```
Name: Trigger - Scroll Depth
Type: Custom Event
Event name: scroll_depth
Fire on: All Custom Events
```

```
Name: Trigger - Form Interaction
Type: Custom Event
Event name: form_interaction
Fire on: All Custom Events
```

---

## Configuration 3: GTM Tags for GA4

### Tag 1: GA4 - Page View
```
Name: GA4 - Page View
Type: Google Analytics: GA4 Event
Configuration Tag: [Your GA4 Configuration]
Event Name: page_view
Parameters: (Leave empty - GA4 auto-tracks)
Triggering: Trigger - All Page Views
```

### Tag 2: GA4 - Greeting Form Submission
```
Name: GA4 - Greeting Form Submission
Type: Google Analytics: GA4 Event
Configuration Tag: [Your GA4 Configuration]
Event Name: greeting_form_submit
Parameters:
  Parameter Name: form_name
  Value: {{DL - Form Name}}
  
  Parameter Name: user_country  
  Value: {{DL - User Country}}
  
  Parameter Name: event_category
  Value: "conversion"

Triggering: Trigger - Greeting Submit
```

### Tag 3: GA4 - Link Click
```
Name: GA4 - Link Click Tracking
Type: Google Analytics: GA4 Event
Configuration Tag: [Your GA4 Configuration]
Event Name: link_click
Parameters:
  Parameter Name: link_category
  Value: {{DL - Event Category}}
  
  Parameter Name: link_title
  Value: {{DL - Event Label}}
  
  Parameter Name: link_type
  Value: "external"

Triggering: Trigger - Link Click
```

---

# GA4 Event Tracking Code

## Code Snippet 1: Initialize GTM DataLayer

Add this code in `<head>` before GTM script:

```javascript
// Initialize dataLayer
window.dataLayer = window.dataLayer || [];

// Push page view on load
window.addEventListener('load', function() {
    window.dataLayer.push({
        event: 'page_view',
        pageTitle: document.title,
        pagePath: window.location.pathname,
        pageUrl: window.location.href
    });
});
```

---

## Code Snippet 2: Track Greeting Form Submission

Add this to your `greetings.js`:

```javascript
/**
 * Track greeting submission to both GTM and GA4
 * @param {Object} greetingData - The greeting form data
 */
function trackGreetingSubmission(greetingData) {
    // Log for debugging
    console.log('Tracking greeting submission:', greetingData);
    
    // Push to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'greeting_submit',
        formName: 'greeting_wall',
        feeling: greetingData.feeling || 'unknown',
        message: greetingData.message || '',
        userCountry: greetingData.country || 'unknown',
        eventCategory: 'conversion',
        timestamp: new Date().toISOString(),
        userId: getOrCreateUserId()
    });
    
    // Optional: Also send directly to GA4 if desired
    if (typeof gtag !== 'undefined') {
        gtag('event', 'greeting_submit', {
            'form_name': 'greeting_wall',
            'user_country': greetingData.country,
            'feeling': greetingData.feeling
        });
    }
}

/**
 * Generate or retrieve user ID from localStorage
 * @returns {string} Unique user identifier
 */
function getOrCreateUserId() {
    const key = 'gtm_user_id';
    let userId = localStorage.getItem(key);
    
    if (!userId) {
        // Generate: user_[8-char-random-string]
        userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem(key, userId);
    }
    
    return userId;
}

// Call this after successful form submission
// Example usage:
document.getElementById('submit-greeting-btn').addEventListener('click', async function() {
    const greetingData = {
        feeling: selectedFeeling,
        message: selectedMessage,
        country: selectedCountry
    };
    
    try {
        const response = await submitGreetingForm(greetingData);
        
        if (response.success) {
            // Track success
            trackGreetingSubmission(greetingData);
            
            // Show success effects
            triggerConfetti();
            showSuccessMessage('Greeting submitted!');
        }
    } catch (error) {
        console.error('Submission error:', error);
    }
});
```

---

## Code Snippet 3: Track Scroll Depth

Add to your site's main JavaScript file:

```javascript
/**
 * Tracks scroll depth at 25%, 50%, 75%, and 100%
 * Ensures events fire only once per visit
 */
(function() {
    const scrollTrackingData = {
        tracked: {},
        inProgress: false,
        debounceTimer: null
    };
    
    function trackScrollDepth(percentage) {
        if (scrollTrackingData.tracked[percentage]) return;
        
        scrollTrackingData.tracked[percentage] = true;
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'scroll_depth',
            scrollDepth: percentage + '%',
            scrollPercent: percentage,
            eventCategory: 'engagement',
            timestamp: new Date().toISOString()
        });
        
        console.log('Tracked scroll depth: ' + percentage + '%');
    }
    
    window.addEventListener('scroll', function() {
        // Debounce to avoid excessive calculations
        clearTimeout(scrollTrackingData.debounceTimer);
        scrollTrackingData.debounceTimer = setTimeout(function() {
            if (scrollTrackingData.inProgress) return;
            
            scrollTrackingData.inProgress = true;
            
            try {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.scrollY || window.pageYOffset;
                
                // Calculate percentage of page scrolled
                const scrolled = (scrollTop + windowHeight) / documentHeight;
                const percentage = Math.round(scrolled * 100);
                
                // Track at milestone percentages
                [25, 50, 75, 100].forEach(milestone => {
                    if (percentage >= milestone) {
                        trackScrollDepth(milestone);
                    }
                });
                
            } finally {
                scrollTrackingData.inProgress = false;
            }
        }, 100);
    }, false);
})();
```

---

## Code Snippet 4: Track Outbound Link Clicks

Add to your site's main JavaScript:

```javascript
/**
 * Automatically tracks all external link clicks
 * Detects links that go to different domains
 */
(function() {
    // List of your own domains (don't track as external)
    const ownDomains = ['emiliodom.github.io', 'www.emiliodom.github.io'];
    
    function isExternalLink(href) {
        try {
            const linkUrl = new URL(href);
            const currentUrl = new URL(window.location.href);
            
            return linkUrl.hostname !== currentUrl.hostname;
        } catch (e) {
            return true; // Treat as external if URL parsing fails
        }
    }
    
    document.addEventListener('click', function(event) {
        const link = event.target.closest('a');
        
        if (!link || !link.href) return;
        
        const href = link.href;
        
        // Only track external links
        if (!isExternalLink(href)) return;
        
        // Get link details
        const linkTitle = link.textContent || link.getAttribute('title') || 'Untitled';
        const linkCategory = link.getAttribute('data-category') || 'External Link';
        
        // Push to GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'link_click',
            link_title: linkTitle.substring(0, 50), // Limit length
            link_url: href,
            link_category: linkCategory,
            link_type: 'external',
            eventCategory: 'outbound',
            timestamp: new Date().toISOString()
        });
        
        console.log('Tracked external link click:', linkTitle, href);
    }, true); // Use capture phase for guaranteed capture
})();
```

---

## Code Snippet 5: Track Form Interactions

Add to your greetings form:

```javascript
/**
 * Track individual form field interactions
 */
function setupFormTracking() {
    const formInputs = document.querySelectorAll('select, input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'form_interaction',
                formName: 'greeting_wall',
                formField: this.id || this.name || 'unknown',
                formStatus: 'field_completed',
                eventCategory: 'engagement'
            });
        });
        
        // Track focus (field engagement)
        input.addEventListener('focus', function() {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'form_interaction',
                formName: 'greeting_wall',
                formField: this.id || this.name || 'unknown',
                formStatus: 'field_focused',
                eventCategory: 'engagement'
            });
        });
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', setupFormTracking);
```

---

# SEO Meta Tags - Complete Templates

## Template 1: Homepage Meta Tags

```html
<!-- Full homepage head section -->
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
    
    <!-- Primary Meta Tags -->
    <title>Emilio Dominguez - Software Engineer & Web Developer from Guatemala | Portfolio</title>
    <meta name="title" content="Emilio Dominguez - Software Engineer & Web Developer from Guatemala | Portfolio">
    <meta name="description" content="Emilio Dominguez is a Software Engineer, IT & English Teacher, and Web Enthusiast from Guatemala. Explore portfolio, projects, and connect on LinkedIn or GitHub.">
    <meta name="keywords" content="Emilio Dominguez, software engineer, web developer, Guatemala, full-stack developer, JavaScript, portfolio, programmer">
    <meta name="author" content="Emilio Dominguez">
    <meta name="language" content="English">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="revisit-after" content="7 days">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://emiliodom.github.io/">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://emiliodom.github.io/">
    <meta property="og:title" content="Emilio Dominguez - Software Engineer & Web Developer">
    <meta property="og:description" content="Full-stack developer from Guatemala. Explore projects, education, and connect.">
    <meta property="og:image" content="https://i.ibb.co/Kj6SGyGm/IMG-20250207-085923948-HDR-AE.jpg">
    <meta property="og:site_name" content="Emilio Dominguez">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://emiliodom.github.io/">
    <meta name="twitter:title" content="Emilio Dominguez - Software Engineer">
    <meta name="twitter:description" content="Full-stack web developer from Guatemala. Check out my portfolio and projects.">
    <meta name="twitter:image" content="https://i.ibb.co/Kj6SGyGm/IMG-20250207-085923948-HDR-AE.jpg">
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#3b6fa6">
    <meta name="msapplication-TileColor" content="#3b6fa6">
    
    <!-- Favicon -->
    <link id="dynamic-favicon" rel="icon" href="/assets/img/avatar-fallback.svg">
    <link rel="shortcut icon" href="/assets/img/avatar-fallback.svg" type="image/svg+xml">
    
    <!-- Sitemap and Robots -->
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
    
    <!-- Preload Critical Resources -->
    <link rel="preload" href="/assets/css/theme.css" as="style">
</head>
```

---

## Template 2: Greetings Page Meta Tags

```html
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Primary Meta Tags -->
    <title>Leave a Greeting - Interactive Wall | Emilio Dominguez</title>
    <meta name="title" content="Leave a Greeting - Interactive Wall | Emilio Dominguez">
    <meta name="description" content="Join 1000+ visitors and leave a heartfelt greeting on Emilio's interactive wall. Choose your mood, share a message, and sign your country. One per person.">
    <meta name="keywords" content="greeting wall, interactive wall, Emilio Dominguez, leave a message, send greetings">
    <meta name="author" content="Emilio Dominguez">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://emiliodom.github.io/greetings/">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://emiliodom.github.io/greetings/">
    <meta property="og:title" content="Leave a Greeting - Interactive Wall">
    <meta property="og:description" content="Be part of our global community. Leave a greeting and see what others have shared.">
    <meta property="og:image" content="https://emiliodom.github.io/assets/img/greeting-og.png">
    <meta property="og:site_name" content="Emilio Dominguez">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://emiliodom.github.io/greetings/">
    <meta name="twitter:title" content="Leave a Greeting Wall">
    <meta name="twitter:description" content="Join people from 50+ countries and leave interactive greetings.">
    <meta name="twitter:image" content="https://emiliodom.github.io/assets/img/greeting-og.png">
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#3b6fa6">
</head>
```

---

# Structured Data Implementations

## Implementation 1: Person Schema (Add to Homepage)

```html
<!-- Add inside <head> tag -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "Emilio Dominguez",
  "url": "https://emiliodom.github.io",
  "image": "https://i.ibb.co/Kj6SGyGm/IMG-20250207-085923948-HDR-AE.jpg",
  "description": "Software Engineer, IT & English Teacher from Guatemala",
  "jobTitle": "Software Engineer",
  "sameAs": [
    "https://www.linkedin.com/in/your-profile/",
    "https://github.com/emiliodom",
    "https://www.strava.com/athletes/your-profile"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "knowsAbout": [
    "Web Development",
    "JavaScript",
    "Full-stack Development",
    "Teaching",
    "Software Engineering"
  ],
  "birthPlace": {
    "@type": "Place",
    "name": "Retalhuleu, Guatemala"
  }
}
</script>
```

---

## Implementation 2: Organization Schema (Add to Homepage)

```html
<!-- Add inside <head> tag -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Organization",
  "name": "Emilio Dominguez Portfolio",
  "url": "https://emiliodom.github.io",
  "logo": "https://emiliodom.github.io/assets/img/avatar-fallback.svg",
  "description": "Personal portfolio of Emilio Dominguez, a Software Engineer from Guatemala",
  "sameAs": [
    "https://www.linkedin.com/in/your-profile/",
    "https://github.com/emiliodom"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+502 561 42468",
    "contactType": "Personal Contact"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GT",
    "addressRegion": "Retalhuleu",
    "areaServed": "Worldwide"
  }
}
</script>
```

---

## Implementation 3: Website Schema (Add to Homepage)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "Emilio Dominguez Portfolio",
  "url": "https://emiliodom.github.io",
  "description": "Personal portfolio website of Emilio Dominguez",
  "author": {
    "@type": "Person",
    "name": "Emilio Dominguez"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://emiliodom.github.io/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## Implementation 4: Breadcrumb Schema (Add to Greetings Page)

```html
<!-- Add to greetings page <head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://emiliodom.github.io/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Greetings",
      "item": "https://emiliodom.github.io/greetings/"
    }
  ]
}
</script>
```

---

# Analytics Reporting Setup

## Report Template 1: Weekly Performance Report

```
WEEKLY ANALYTICS REPORT
Week of: [DATE RANGE]
Report Generated: [DATE]

═══════════════════════════════════════
📊 TRAFFIC OVERVIEW
═══════════════════════════════════════
Total Users:                    [NUMBER]
New Users:                      [NUMBER] ([%] of total)
Sessions:                       [NUMBER]
Avg Session Duration:           [TIME]
Bounce Rate:                    [%]

Top Pages:
1. [Page Name]      - [Views] views
2. [Page Name]      - [Views] views
3. [Page Name]      - [Views] views

═══════════════════════════════════════
🎯 CONVERSIONS & EVENTS
═══════════════════════════════════════
Greeting Submissions:           [NUMBER]
Link Clicks (External):         [NUMBER]
Link Clicks (Internal):         [NUMBER]
Form Interactions:              [NUMBER]
Scroll Depth (50%+):            [NUMBER]

═══════════════════════════════════════
🌍 TRAFFIC SOURCES
═══════════════════════════════════════
Direct:                         [USERS] users
Google Search:                  [USERS] users
Referral:                       [USERS] users
Social:                         [USERS] users

═══════════════════════════════════════
📱 DEVICE BREAKDOWN
═══════════════════════════════════════
Mobile:                         [%]
Desktop:                        [%]
Tablet:                         [%]

═══════════════════════════════════════
⚡ PERFORMANCE METRICS
═══════════════════════════════════════
Core Web Vitals Score:          [SCORE]/100
Mobile Performance:             [SCORE]/100
Average Page Load:              [TIME]s

INSIGHTS & NOTES
═════════════════════════════════════════
[Your analysis and observations]

ACTION ITEMS FOR NEXT WEEK
═════════════════════════════════════════
[ ] [Action item 1]
[ ] [Action item 2]
[ ] [Action item 3]
```

---

## Report Template 2: Monthly SEO Report

```
MONTHLY SEO REPORT
Month of: [MONTH/YEAR]

═════════════════════════════════════════════
📈 GOOGLE SEARCH CONSOLE METRICS
═════════════════════════════════════════════
Total Clicks:                   [NUMBER]
Total Impressions:              [NUMBER]
Average CTR:                    [%]
Average Position:               [NUMBER]

Top Queries:
1. [Query]           - [Clicks] clicks, [Impressions] impressions
2. [Query]           - [Clicks] clicks, [Impressions] impressions
3. [Query]           - [Clicks] clicks, [Impressions] impressions

Pages with Most Clicks:
1. [Page URL]        - [Clicks] clicks
2. [Page URL]        - [Clicks] clicks
3. [Page URL]        - [Clicks] clicks

═════════════════════════════════════════════
🔍 INDEXATION STATUS
═════════════════════════════════════════════
Total Indexed Pages:            [NUMBER]
Valid Pages:                    [NUMBER]
Pages with Issues:              [NUMBER]
Sitemap Status:                 ✅ Valid
robots.txt Status:              ✅ Valid

═════════════════════════════════════════════
⚡ CORE WEB VITALS (PageSpeed)
═════════════════════════════════════════════
LCP (Loading):                  [TIME]s     [STATUS]
FID (Interactivity):            [TIME]ms    [STATUS]
CLS (Stability):                [NUMBER]    [STATUS]

Overall: [SCORE]/100
Mobile:  [SCORE]/100

═════════════════════════════════════════════
📊 BACKLINKS & AUTHORITY
═════════════════════════════════════════════
New Backlinks:                  [NUMBER]
Total Backlinks:                [NUMBER]
Domain Authority (estimated):   [NUMBER]

═════════════════════════════════════════════
📝 ACTIONS COMPLETED THIS MONTH
═════════════════════════════════════════════
[ ] Updated meta titles/descriptions
[ ] Added new structured data
[ ] Improved page speed
[ ] Fixed crawl errors
[ ] Created new content
[ ] Built backlinks

═════════════════════════════════════════════
🎯 TARGET KEYWORDS (TRACKING)
═════════════════════════════════════════════
Keyword             | Rank | Clicks | Status
────────────────────────────────────────────
Emilio Dominguez    | [#]  | [X]    | [↑/↓]
software engineer   | [#]  | [X]    | [↑/↓]
web developer       | [#]  | [X]    | [↑/↓]
```

---

# Testing Checklist

## Pre-Deployment Testing

### GTM Testing Checklist
- [ ] GTM code exists in `<head>` of all pages (check source)
- [ ] Preview mode available (Top right button)
- [ ] Verify data layer structure:
  ```javascript
  // Open console and check:
  console.log(window.dataLayer)
  ```
- [ ] All expected variables visible
- [ ] At least 5 sample events captured
- [ ] Event names match trigger names exactly

### Event Testing Checklist
```javascript
// Open DevTools Console and test:

// 1. Test page view event
dataLayer = window.dataLayer || [];
dataLayer.push({event: 'page_view'});
// Should see in GTM Preview

// 2. Test link click
dataLayer.push({
  event: 'link_click',
  link_category: 'Test',
  link_title: 'Test Link'
});

// 3. Test form submission
dataLayer.push({
  event: 'greeting_submit',
  formName: 'greeting_wall',
  userCountry: 'US'
});

// 4. Test scroll depth
dataLayer.push({event: 'scroll_depth', scrollDepth: '50%'});
```

### GA4 Data Flow Testing
1. [ ] GA4 container ID available
2. [ ] Connection between GTM and GA4 established
3. [ ] Real-time report shows active users after 30 seconds
4. [ ] Events appear in real-time report (1-5 minutes)
5. [ ] Event parameters visible in event details
6. [ ] Conversions configured and appearing in GA4

### SEO Testing Checklist
- [ ] Page titles are 50-60 characters (check with tool)
- [ ] Meta descriptions are 150-160 characters
- [ ] No duplicate titles across site
- [ ] No duplicate descriptions across site
- [ ] All pages have H1 tags
- [ ] Heading hierarchy is logical (H1→H2→H3)
- [ ] Canonical tags present on all pages
- [ ] robots.txt is accessible: https://emiliodom.github.io/robots.txt
- [ ] sitemap.xml is accessible: https://emiliodom.github.io/sitemap.xml
- [ ] All pages indexed in Search Console
- [ ] No crawl errors in Search Console

### Performance Testing Checklist
- [ ] Run PageSpeed Insights: https://pagespeed.web.dev
  - [ ] Mobile score ≥ 80
  - [ ] Desktop score ≥ 90
- [ ] Google Lighthouse in DevTools
  - [ ] SEO score ≥ 90
  - [ ] Performance score ≥ 80
  - [ ] Accessibility score ≥ 90

### Structured Data Testing Checklist
- [ ] Schema.org validator: https://schema.org/validator
- [ ] No errors reported
- [ ] Person schema validates
- [ ] Organization schema validates
- [ ] Website schema validates
- [ ] Breadcrumb schema validates (greetings page)

### Mobile Testing Checklist
- [ ] Test on actual mobile device
- [ ] All links clickable (not cramped)
- [ ] Text readable (not too small)
- [ ] Forms usable on mobile
- [ ] Images responsive
- [ ] No horizontal scrolling

### Form Testing Checklist
- [ ] Submit button enabled after all fields filled
- [ ] Form validation works
- [ ] CAPTCHA appears and validates
- [ ] Tracking event fires on submit (check GTM preview)
- [ ] Success message displays
- [ ] Submitted greeting appears on wall

---

## Deployment Checklist

Before going live:
- [ ] All GTM configurations saved
- [ ] GTM published (new version created)
- [ ] All code changes committed to GitHub
- [ ] Code changes deployed to GitHub Pages
- [ ] Wait 5 minutes after deployment
- [ ] Verify data flowing into GA4
- [ ] Verify events in GTM preview from live site
- [ ] Document any changes made

---

## Post-Launch Monitoring (First Week)

Daily checklist:
- [ ] Check GA4 real-time data (should see users)
- [ ] Verify events are firing correctly
- [ ] Monitor for any JavaScript errors (check console)
- [ ] Check Google Search Console for new errors
- [ ] Review first greeting submissions
- [ ] Monitor page load times

Weekly checklist:
- [ ] Run full PageSpeed Insights audit
- [ ] Review GA4 conversion tracking
- [ ] Check for unexpected data patterns
- [ ] Verify scroll depth tracking
- [ ] Analyze link click data
- [ ] Review form completion rates

---

## Troubleshooting Quick Reference

```javascript
// Check if GTM is loaded
console.log('GTM loaded:', typeof gtag !== 'undefined');

// Check dataLayer
console.log('DataLayer:', window.dataLayer);

// Manually test GA4 event (if gtag available)
gtag('event', 'test_event', {
  'test_param': 'test_value'
});

// Check for JavaScript errors
// Open DevTools → Console → Look for red errors

// Monitor network requests
// Open DevTools → Network → Filter by 'google' or 'analytics'
// You should see requests to:
// - googletagmanager.com
// - analytics.google.com
// - Any platform you're tracking to
```

---

## Key Metrics to Monitor

```
DAILY MONITORING
─────────────────────────────────────────
✓ Unique visitors
✓ Page views
✓ Bounce rate
✓ Events fired
✓ Conversion rate

WEEKLY MONITORING
─────────────────────────────────────────
✓ Traffic trends
✓ Top performing pages
✓ User demographics
✓ Acquisition channels
✓ Greeting submissions

MONTHLY MONITORING
─────────────────────────────────────────
✓ Year-over-year growth
✓ Seasonality patterns
✓ Core Web Vitals
✓ Search rankings
✓ Backlink profile
```

---

**Next Steps:**
1. Copy the code snippets into your files
2. Follow the configuration steps in GTM console
3. Use the testing checklist before deployment
4. Deploy and monitor the first week
5. Adjust based on performance data

Good luck! 🚀

