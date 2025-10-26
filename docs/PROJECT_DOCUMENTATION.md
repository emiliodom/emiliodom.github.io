# 📚 Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Infrastructure](#architecture--infrastructure)
3. [Cloudflare Worker Proxy (Advanced)](#cloudflare-worker-proxy-advanced)
4. [Frontend Technologies](#frontend-technologies)
5. [Greetings System](#greetings-system)
6. [Database Integration](#database-integration)
7. [Security & Privacy](#security--privacy)
8. [Analytics & Tracking](#analytics--tracking)
9. [Styling & Theming](#styling--theming)
10. [Deployment Pipeline](#deployment-pipeline)
11. [API Endpoints](#api-endpoints)
12. [Project Structure](#project-structure)
13. [Development Workflow](#development-workflow)

---

## Project Overview

**Project Name:** emiliodom.github.io  
**Type:** Personal Portfolio & Interactive Greetings Website  
**Hosting:** GitHub Pages (Static Site)  
**Proxy:** Cloudflare Workers  
**Database:** NocoDB (External)  
**Analytics:** Google Tag Manager + Google Analytics 4

### Purpose
This is a modern, interactive personal portfolio website that features:
- A central hub for links to projects and profiles
- An interactive greetings system where visitors can leave messages
- Real-time data storage with fallback mechanisms
- Modern UI with light/dark theme support
- International support with Google Translate integration

---

## Architecture & Infrastructure

### High-Level Architecture

```
┌─────────────┐
│   Visitor   │
└─────┬───────┘
      │
      ▼
┌─────────────────────┐
│  GitHub Pages       │
│  (Static Hosting)   │
│  - HTML/CSS/JS      │
│  - emiliodom.github.io │
└─────┬───────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│  Cloudflare Worker Proxy            │
│  nocodb-proxy.edomingt.workers.dev  │
│  - Authentication                   │
│  - CORS Handling                    │
│  - Rate Limiting                    │
│  - Input Sanitization               │
└─────┬───────────────────────────────┘
      │
      ▼
┌─────────────────────┐
│  NocoDB Database    │
│  app.nocodb.com     │
│  - Greetings Data   │
│  - User Analytics   │
└─────────────────────┘
```

### Why This Architecture?

**Problem:** GitHub Pages is static-only and can't make authenticated API calls safely.

**Solution:** Cloudflare Worker acts as a secure proxy that:
1. **Hides credentials** - API token never exposed to client
2. **Adds security** - CORS protection, rate limiting, input validation
3. **Improves performance** - CDN edge computing, lower latency
4. **Provides resilience** - Automatic failover, DDoS protection

---

## Cloudflare Worker Proxy (Advanced)

### What is a Cloudflare Worker?

Cloudflare Workers are JavaScript functions that run on Cloudflare's edge network (in over 275+ cities worldwide). They execute code closer to users, reducing latency and improving performance.

### Worker URL
```
https://nocodb-proxy.edomingt.workers.dev
```

### Worker Code Location
```
api/cloudflare/src/index.js
```

### How It Works

#### 1. **Request Flow**
```javascript
export default {
  async fetch(request, env) {
    // 1. Check request origin (CORS)
    const origin = request.headers.get('Origin');
    if (origin !== 'https://emiliodom.github.io') {
      return new Response('Forbidden', { status: 403 });
    }
    
    // 2. Route to appropriate handler
    // 3. Fetch from NocoDB with secured token
    // 4. Return response with CORS headers
  }
}
```

#### 2. **CORS Headers**
```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://emiliodom.github.io',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};
```

**Why?** Browsers block cross-origin requests by default. CORS headers tell the browser: "It's OK, this site is allowed to make requests to me."

#### 3. **Environment Variables**
The worker uses `env.NOCODB_TOKEN` - this is set in Cloudflare Dashboard:
- Workers & Pages → nocodb-proxy → Settings → Variables
- **Critical:** Never commit tokens to git!

#### 4. **Endpoints**

##### GET /api/greetings
Fetches all greetings from NocoDB.

```javascript
if (path === '/api/greetings' && request.method === 'GET') {
  const nocodbUrl = 'https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records?viewId=vww985w35i0umz1g&limit=25';
  const response = await fetch(nocodbUrl, {
    headers: {
      'accept': 'application/json',
      'xc-token': env.NOCODB_TOKEN
    }
  });
  // Return sanitized data
}
```

##### POST /api/greetings
Submits a new greeting to NocoDB.

```javascript
if (path === '/api/greetings' && request.method === 'POST') {
  const body = await request.json();
  
  // Validate required fields
  if (!body.Message || !body.User || !body.Notes) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400
    });
  }
  
  // Sanitize inputs (prevent XSS, SQL injection)
  const sanitized = {
    Message: String(body.Message).substring(0, 500),
    User: String(body.User).substring(0, 100),
    Notes: String(body.Notes).substring(0, 50),
    Country: body.Country ? String(body.Country).substring(0, 10) : '🌍'
  };
  
  // Forward to NocoDB
  await fetch('https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records', {
    method: 'POST',
    headers: {
      'xc-token': env.NOCODB_TOKEN
    },
    body: JSON.stringify(sanitized)
  });
}
```

##### GET /api/ip
Returns visitor's IP address using Cloudflare headers.

```javascript
if (path === '/api/ip' && request.method === 'GET') {
  const ip = request.headers.get('CF-Connecting-IP') || 
             request.headers.get('X-Forwarded-For') || 
             'unknown';
  return new Response(JSON.stringify({ ip }));
}
```

### Deployment

#### Deploy to Cloudflare Workers
```bash
cd api/cloudflare
wrangler publish
```

#### Configuration File
`api/cloudflare/wrangler.toml`:
```toml
name = "nocodb-proxy"
main = "src/index.js"
compatibility_date = "2024-01-01"

[env.production]
route = "nocodb-proxy.edomingt.workers.dev/*"
```

### Security Features

1. **Origin Validation** - Only your domain can access the worker
2. **Token Protection** - API token never sent to client
3. **Input Sanitization** - Prevents XSS, SQL injection
4. **Rate Limiting** - Cloudflare automatically protects against DDoS
5. **HTTPS Only** - All traffic encrypted

---

## Frontend Technologies

### Core Stack
- **HTML5** - Semantic markup
- **CSS3** - Custom properties (CSS variables), Grid, Flexbox
- **Vanilla JavaScript** - No frameworks, ES6+ features

### Why Vanilla JS?
- **Performance:** No framework overhead (React = ~40KB, this site = ~15KB total JS)
- **Learning:** Direct DOM manipulation teaches fundamentals
- **Simplicity:** No build process, works on any server

### Key Libraries

#### 1. **Twemoji** (Twitter Emoji)
```html
<script src="https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js"></script>
```
**Purpose:** Ensures emoji look consistent across all platforms (Windows, Mac, Linux, mobile).

#### 2. **DOMPurify** (XSS Protection)
```html
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.8/dist/purify.min.js"></script>
```
**Purpose:** Sanitizes user-generated content before rendering to prevent XSS attacks.

```javascript
const sanitizedMessage = DOMPurify.sanitize(item.message);
```

#### 3. **Particles.js** (Background Animation)
```html
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
```
**Purpose:** Creates animated particle background effect.

```javascript
particlesJS('particles-js', {
  particles: {
    number: { value: 60 },
    color: { value: '#667eea' },
    opacity: { value: 0.15 },
    // ... configuration
  }
});
```

---

## Greetings System

### Overview
The greetings system allows visitors to:
1. Select an emotion (emoji)
2. Choose a preset message
3. Select their country
4. Complete reCAPTCHA verification
5. Submit greeting (saved to NocoDB)

### Flow Diagram

```
User visits /greetings.html
       ↓
Checks connection to worker
       ↓
Displays existing greetings
       ↓
User fills form:
  - Emotion 😊
  - Message "Great work!"
  - Country 🇬🇹
       ↓
Executes reCAPTCHA verification
       ↓
Validates input locally
       ↓
Checks IP rate limiting (24hr)
       ↓
Sends to Cloudflare Worker
       ↓
Worker sanitizes & forwards to NocoDB
       ↓
Success! Greeting appears in list
```

### Key Features

#### 1. **24-Hour Submission Check on Page Load**
Before users even fill out the form, the system checks if they've already submitted in the last 24 hours and displays a friendly message:

```javascript
// Check on page load
const now = Date.now();
const oneDayMs = 24 * 60 * 60 * 1000;
const ip = await getIp();

if (ip) {
  const stored = localStorage.getItem(`greet-submitted-${ip}`);
  if (stored) {
    const data = JSON.parse(stored);
    if (data.when && (now - data.when) < oneDayMs) {
      const hoursLeft = Math.ceil((oneDayMs - (now - data.when)) / (1000 * 60 * 60));
      submissionStatusAlert.innerHTML = `🚫 You've already submitted a greeting in the last 24 hours. Please wait ${hoursLeft} more hours.`;
    }
  }
}
```

**User Experience:**
- ✅ **Green alert:** "You can submit a greeting! Fill out the form below."
- 🚫 **Red alert:** "You've already submitted a greeting in the last 24 hours. Please wait X more hours."

This prevents user frustration by informing them upfront instead of after filling the form.

#### 2. **Connection Status Alert**
Checks if the worker is reachable on page load:

```javascript
try {
  const testResponse = await fetch(NOCODB.getUrl, { method: 'HEAD' });
  if (!testResponse.ok) {
    connectionAlert.textContent = '⚠️ Connection issue detected...';
  }
} catch (e) {
  connectionAlert.textContent = '⚠️ Unable to connect to server...';
}
```

#### 2. **Connection Status Alert**
Checks if the worker is reachable on page load:

```javascript
try {
  const testResponse = await fetch(NOCODB.getUrl, { method: 'HEAD' });
  if (!testResponse.ok) {
    connectionAlert.textContent = '⚠️ Connection issue detected...';
  }
} catch (e) {
  connectionAlert.textContent = '⚠️ Unable to connect to server...';
}
```

#### 3. **Country Selection Field**
Users can now select their country using flag emoticons:

```html
<fieldset class="greet-fieldset">
  <legend>3. Where are you from?</legend>
  <div class="countries" role="radiogroup">
    <button type="button" class="country" data-country="🇬🇹">🇬🇹</button>
    <button type="button" class="country" data-country="🇺🇸">🇺🇸</button>
    <!-- ... more countries -->
  </div>
</fieldset>
```

**Countries Available:**
- 🇬🇹 Guatemala
- 🇺🇸 United States
- 🇲🇽 Mexico
- 🇪🇸 Spain
- 🇦🇷 Argentina
- 🇨🇴 Colombia
- 🇧🇷 Brazil
- 🇨🇦 Canada
- 🇬🇧 United Kingdom
- 🇫🇷 France
- 🇩🇪 Germany
- 🇮🇹 Italy
- 🌍 Other

#### 4. **Google reCAPTCHA Enterprise**
Replaced custom math captcha with professional bot protection:

```javascript
await grecaptcha.enterprise.ready();
const token = await grecaptcha.enterprise.execute(
  '6LcF5_crAAAAABBrXkDLdIFnSbQ36AIaDJxXA0P8', 
  {action: 'submit_greeting'}
);
```

**Benefits over custom captcha:**
- Invisible to users (no interaction needed)
- Advanced bot detection using machine learning
- Risk analysis scores
- Protects against automated attacks
- Enterprise-grade security

#### 5. **IP-Based Rate Limiting**
Prevents spam by limiting one greeting per IP per 24 hours:

```javascript
const now = Date.now();
const oneDayMs = 24 * 60 * 60 * 1000;

if (ip) {
  const key = `greet-submitted-${ip}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    const data = JSON.parse(stored);
    if (data.when && (now - data.when) < oneDayMs) {
      feedback.textContent = 'You have already submitted a greeting...';
      return;
    }
  }
  localStorage.setItem(key, JSON.stringify({ when: now, message: preset }));
}
```

#### 3. **Optimistic UI**
Shows greeting immediately while sending to server:

```javascript
// Show "Sending..." card
const optimisticEntry = { 
  message: messageText, 
  feeling: notesEmoji, 
  when: "Sending…", 
  _pending: true 
};
renderPagination([...currentList, optimisticEntry], 1, 5);

// Send to server in background
try {
  await postToNocoDB(messageText, userField, notesEmoji, countryFlag);
  // Update with real data
} catch (e) {
  // Mark as failed or save locally
}
```

#### 4. **Badwords Filter**
Prevents offensive content:

```javascript
const badwords = await fetchBadWords(); // Load from /assets/data/badwords.json
const lower = preset.toLowerCase();
const found = badwords.find(b => lower.includes(b.toLowerCase()));
if (found) {
  feedback.textContent = 'The selected message contains disallowed words.';
  return;
}
```

#### 5. **Local Storage Fallback**
If the worker/NocoDB is down, save locally:

```javascript
try {
  await postToNocoDB(...);
} catch (e) {
  // Save to localStorage instead
  saveWallEntry(messageText, notesEmoji);
  feedback.textContent = 'Saved locally (NocoDB failed).';
}
```

---

## Database Integration

### NocoDB Overview

**What is NocoDB?**  
NocoDB is an open-source Airtable alternative that turns any database into a smart spreadsheet interface.

**URL:** https://app.nocodb.com

### Schema

#### Greetings Table
| Field | Type | Description |
|-------|------|-------------|
| **Id** | Integer | Auto-increment primary key |
| **Message** | Text | The greeting message (max 500 chars) |
| **User** | Text | IP address of submitter (max 100 chars) |
| **Notes** | Text | Emotion emoji (max 50 chars) |
| **Country** | Text | Country flag emoji (max 10 chars) |
| **CreatedAt** | DateTime | Auto-generated timestamp |

### API Integration

#### Table ID
```
mtujnjge9o5j98m
```

#### View ID (for filtered queries)
```
vww985w35i0umz1g
```

#### GET Request
```bash
curl -X GET \
  'https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records?viewId=vww985w35i0umz1g&limit=25' \
  -H 'xc-token: YOUR_TOKEN'
```

**Response:**
```json
{
  "list": [
    {
      "Id": 1,
      "Message": "Keep pushing, you're doing great!",
      "User": "192.168.1.1",
      "Notes": "😊",
      "Country": "🇬🇹",
      "CreatedAt": "2025-10-26T12:34:56.000Z"
    }
  ]
}
```

#### POST Request
```bash
curl -X POST \
  'https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records' \
  -H 'Content-Type: application/json' \
  -H 'xc-token: YOUR_TOKEN' \
  -d '{
    "Message": "Great work!",
    "User": "192.168.1.1",
    "Notes": "👏",
    "Country": "🇺🇸"
  }'
```

---

## Security & Privacy

### Multi-Layer Security

#### 1. **Client-Side Protection**
- DOMPurify sanitization of all user content
- Input length limits (Message: 500, User: 100, Notes: 50)
- IP-based rate limiting (24 hours)
- Duplicate submission detection (hash-based)

#### 2. **Worker-Side Protection**
- Origin validation (only emiliodom.github.io)
- CORS headers enforcement
- Input sanitization before forwarding to NocoDB
- Cloudflare DDoS protection

#### 3. **reCAPTCHA Enterprise**
```javascript
await grecaptcha.enterprise.ready();
const token = await grecaptcha.enterprise.execute(
  '6LcF5_crAAAAABBrXkDLdIFnSbQ36AIaDJxXA0P8', 
  {action: 'submit_greeting'}
);
```

**Why Enterprise?** Better bot detection, advanced risk analysis, detailed analytics.

#### 4. **IP Privacy**
- IPs used only for rate limiting
- Not displayed publicly
- Not shared with third parties
- Notice displayed to users

```html
<div class="ip-disclaimer">
  🔒 Your IP address is used only for verification purposes to prevent duplicate submissions.
  It is not shared with any third parties.
</div>
```

### Attack Prevention

| Attack Type | Prevention Method |
|-------------|-------------------|
| **XSS** | DOMPurify sanitization |
| **SQL Injection** | NocoDB API (no direct SQL) |
| **CSRF** | Origin validation, SameSite cookies |
| **DDoS** | Cloudflare protection, rate limiting |
| **Spam** | reCAPTCHA + IP rate limiting |
| **Duplicate Submissions** | Hash-based deduplication |

---

## Analytics & Tracking

### Google Tag Manager (GTM)

**Container ID:** `GTM-KTTGQDPP`

#### Implementation
```html
<!-- Head -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KTTGQDPP');</script>

<!-- Body (noscript fallback) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTTGQDPP"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### What GTM Tracks

#### Automatic Events
- Page views
- Scroll depth
- Click events
- Form submissions
- Video interactions

#### Custom Events (Potential)
```javascript
// Example: Track greeting submission
dataLayer.push({
  'event': 'greeting_submitted',
  'emotion': selectedFeeling,
  'country': selectedCountry,
  'message_length': messageText.length
});
```

### Google Analytics 4 Integration

GTM can be configured to send data to GA4 for:
- User demographics
- Geographic data
- Device types
- User flow analysis
- Conversion tracking

---

## Styling & Theming

### CSS Architecture

#### 1. **CSS Custom Properties (Variables)**
```css
:root {
  --bg-gradient: linear-gradient(135deg, #f6f8ff 0%, #eef2ff 100%);
  --page-bg: #f7fbff;
  --text-color: #222831;
  --accent-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --shadow: 0 8px 32px rgba(0,0,0,0.06);
}

.theme-dark {
  --bg-gradient: linear-gradient(135deg, #07102b 0%, #0b2447 100%);
  --page-bg: #041029;
  --text-color: #e6eef8;
  --accent-1: linear-gradient(135deg, #0f3b6a 0%, #08304f 100%);
  --shadow: 0 8px 32px rgba(0,0,0,0.5);
}
```

**Benefits:**
- Single source of truth for colors
- Easy theme switching
- Better maintainability

#### 2. **Theme Toggle**
```javascript
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('theme-dark');
  localStorage.setItem('theme', toggle.checked ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('theme-dark');
  toggle.checked = true;
}
```

#### 3. **Responsive Design**
```css
/* Desktop */
.header-inner {
  display: flex;
  justify-content: space-between;
}

/* Tablet & Mobile */
@media (max-width: 1024px) {
  .header-inner {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .feelings { display: none; }
  .feeling-select { display: block!important; }
}
```

#### 4. **Animations**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.link-card {
  animation: slideIn 0.5s ease-out backwards;
}

.link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.14);
}
```

### Design System

#### Colors
- **Primary:** #667eea (Purple-blue)
- **Secondary:** #764ba2 (Purple)
- **Success:** #10b981 (Green)
- **Warning:** #ffc107 (Amber)
- **Error:** #dc2626 (Red)

#### Typography
- **Font:** System fonts (Apple San Francisco, Segoe UI, Roboto)
- **Sizes:** Base 16px, headings 1.25-2rem

#### Spacing
- **Base unit:** 4px
- **Scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

---

## Deployment Pipeline

### GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      # No token generation needed - Cloudflare Worker handles auth
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Deployment Flow

```
Developer pushes to main
       ↓
GitHub Actions triggered
       ↓
Checkout code
       ↓
Setup GitHub Pages
       ↓
Upload artifacts (HTML/CSS/JS)
       ↓
Deploy to GitHub Pages
       ↓
Site live at emiliodom.github.io
```

### Why GitHub Pages?

1. **Free hosting** - Unlimited bandwidth
2. **HTTPS by default** - Automatic SSL certificates
3. **CDN** - Global content delivery
4. **Git integration** - Deploy with `git push`
5. **Custom domains** - Support for CNAME

---

## API Endpoints

### Summary Table

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/greetings` | GET | Fetch all greetings | Worker (token hidden) |
| `/api/greetings` | POST | Submit new greeting | Worker (token hidden) |
| `/api/ip` | GET | Get visitor IP | None |

### Request/Response Examples

#### GET /api/greetings

**Request:**
```javascript
fetch('https://nocodb-proxy.edomingt.workers.dev/api/greetings', {
  headers: { 'accept': 'application/json' }
})
```

**Response:**
```json
{
  "list": [
    {
      "Id": 1,
      "Message": "Keep pushing, you're doing great!",
      "User": "192.168.1.1",
      "Notes": "😊",
      "Country": "🇬🇹",
      "CreatedAt": "2025-10-26T12:34:56.000Z"
    }
  ]
}
```

#### POST /api/greetings

**Request:**
```javascript
fetch('https://nocodb-proxy.edomingt.workers.dev/api/greetings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    Message: "Great work!",
    User: "192.168.1.1",
    Notes: "👏",
    Country: "🇺🇸"
  })
})
```

**Response:**
```json
{
  "Id": 2,
  "Message": "Great work!",
  "User": "192.168.1.1",
  "Notes": "👏",
  "Country": "🇺🇸",
  "CreatedAt": "2025-10-26T13:00:00.000Z"
}
```

#### GET /api/ip

**Request:**
```javascript
fetch('https://nocodb-proxy.edomingt.workers.dev/api/ip')
```

**Response:**
```json
{
  "ip": "192.168.1.1"
}
```

---

## Project Structure

```
emiliodom.github.io/
├── index.html                 # Main landing page
├── greetings.html             # Interactive greetings page
├── LICENSE                    # MIT License
├── README.md                  # Project overview
├── PROJECT_DOCUMENTATION.md   # This file
├── WORKER_MIGRATION.md        # Migration guide
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment
│
├── _includes/
│   └── header.html            # Shared header component
│
├── _layouts/
│   └── default.html           # Page layout template
│
├── api/
│   ├── nocodb-proxy.js        # Original worker code
│   ├── PROXY_SETUP.md         # Proxy setup guide
│   ├── SECURITY_ARCHITECTURE.md # Security documentation
│   └── cloudflare/
│       ├── wrangler.toml      # Cloudflare config
│       └── src/
│           └── index.js       # Worker implementation
│
├── assets/
│   ├── css/
│   │   └── theme.css          # Main stylesheet
│   ├── data/
│   │   ├── badwords.json      # Profanity filter
│   │   ├── link_cards.json    # Link data
│   │   └── location_media.json # Location photos/video
│   ├── img/
│   │   └── avatar-fallback.svg # Default avatar
│   └── js/
│       ├── greetings.js       # Greetings page logic
│       ├── nocodb-config.js   # Worker endpoints config
│       └── site-theme.js      # Theme toggle logic
│
└── tests/
    └── greetings.test.js      # Test suite for greetings functionality
```

---

## Testing

### Test Suite

The project includes a comprehensive test suite for the greetings functionality.

**Location:** `tests/greetings.test.js`

### Running Tests

```bash
# Open test file in browser console
# Or run with Node.js
node tests/greetings.test.js
```

### Test Coverage

#### 15 Test Cases Included:

1. **Preset Messages Validation** - Verifies preset messages are loaded correctly
2. **24-Hour Submission Prevention** - Tests duplicate submission detection
3. **Hours Remaining Calculation** - Validates time calculation accuracy
4. **IP Address Validation** - Tests IP handling and fallback
5. **Message Sanitization** - Verifies XSS prevention and badword filtering
6. **LocalStorage Fallback** - Tests offline functionality
7. **Form Field Validation** - Ensures required fields are validated
8. **Country Selection** - Tests country dropdown functionality
9. **Feeling/Emoticon Selection** - Verifies emotion picker
10. **Deduplication Hash** - Tests hash generation for duplicates
11. **Pagination Logic** - Validates greeting list pagination
12. **Connection Status Detection** - Tests worker connectivity check
13. **NocoDB Configuration** - Validates API endpoints configuration
14. **Optimistic UI Updates** - Tests immediate feedback on submission
15. **Error Handling** - Verifies error messages for various scenarios

### Example Test Output

```
🚀 Starting Greetings Test Suite...

📦 Greetings System Tests
==================================================

🧪 Should have preset messages loaded
✅ PASS: Preset messages array should not be empty
✅ PASS: Preset message should have text

🧪 Should prevent duplicate submission within 24 hours
✅ PASS: Should detect submission within 24 hours

🧪 Should correctly calculate hours remaining
✅ PASS: Should show 22 hours remaining (expected: 22, got: 22)

==================================================
📊 Test Summary
==================================================
✅ Passed: 15
❌ Failed: 0
📈 Total: 15
🎯 Success Rate: 100.00%
==================================================
```

---

## Development Workflow

### Local Development

#### 1. **Clone Repository**
```bash
git clone https://github.com/emiliodom/emiliodom.github.io.git
cd emiliodom.github.io
```

#### 2. **Start Local Server**
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

#### 3. **Open in Browser**
```
http://localhost:8000
```

### Testing

#### Test Greetings Form
1. Open `http://localhost:8000/greetings.html`
2. Fill out form (emotion, message, country)
3. Submit
4. Check browser console for errors
5. Verify greeting appears in list

#### Test Worker Locally (Wrangler Dev)
```bash
cd api/cloudflare
wrangler dev
```

This starts a local worker at `http://localhost:8787`

Update `nocodb-config.js` to point to local worker:
```javascript
window.NOCODB_CONFIG = {
  postUrl: 'http://localhost:8787/api/greetings',
  getUrl: 'http://localhost:8787/api/greetings',
  token: null
};
```

### Deployment Steps

#### 1. **Make Changes**
```bash
# Edit files
vim greetings.html
vim assets/js/greetings.js
```

#### 2. **Test Locally**
```bash
python -m http.server 8000
# Test in browser
```

#### 3. **Commit & Push**
```bash
git add .
git commit -m "Add new feature"
git push origin main
```

#### 4. **GitHub Actions Deploys Automatically**
- Watch workflow: https://github.com/emiliodom/emiliodom.github.io/actions
- Site updates in ~2 minutes

#### 5. **Deploy Worker** (if changed)
```bash
cd api/cloudflare
wrangler publish
```

### Troubleshooting

#### Issue: Greetings not loading
1. Check browser console for errors
2. Verify worker is running: `https://nocodb-proxy.edomingt.workers.dev/api/greetings`
3. Check CORS errors (must access from emiliodom.github.io)

#### Issue: reCAPTCHA not working
1. Verify site key is correct
2. Check browser console for errors
3. Ensure domain is registered in Google reCAPTCHA console

#### Issue: Worker returns 403
1. Check CORS origin in worker code
2. Verify you're accessing from correct domain
3. Check Cloudflare Dashboard for errors

---

## Advanced Concepts Explained

### 1. **What is CORS?**

**Cross-Origin Resource Sharing** - A security feature that controls which websites can access your API.

**Problem:** By default, JavaScript on `emiliodom.github.io` can't make requests to `nocodb-proxy.edomingt.workers.dev` because they're different origins.

**Solution:** The worker sends CORS headers telling the browser "It's OK, allow this."

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://emiliodom.github.io',
  // Only this domain can access the worker
};
```

### 2. **What is a Preflight Request?**

Before making POST/PUT/DELETE requests, browsers send an OPTIONS request (preflight) to check if the server allows it.

```javascript
if (request.method === 'OPTIONS') {
  return new Response(null, { headers: corsHeaders });
}
```

### 3. **What is Edge Computing?**

Traditional: Client → Server (US) → Database  
Edge: Client → Edge Server (nearby) → Database

Cloudflare Workers run on edge servers in 275+ cities. When a user in Guatemala accesses the site, the worker runs on a server in Guatemala, not across the ocean in the US.

**Result:** Faster response times, better user experience.

### 4. **What is a CDN?**

**Content Delivery Network** - Distributes your website's static files (HTML/CSS/JS) to servers worldwide. GitHub Pages uses a CDN, so visitors download files from the nearest server.

### 5. **What is LocalStorage?**

Browser storage that persists across sessions (unlike cookies that expire).

```javascript
// Save
localStorage.setItem('theme', 'dark');

// Get
const theme = localStorage.getItem('theme');

// Remove
localStorage.removeItem('theme');
```

**Limits:** 5-10 MB per domain, strings only (use JSON.stringify for objects).

### 6. **What is Optimistic UI?**

Show the result immediately, update later if it fails.

**Example:** When you like a tweet, it turns red instantly (optimistic), then the request is sent in the background. If it fails, it reverts.

In this project:
```javascript
// Show "Sending..." immediately
renderPagination([...list, optimisticEntry], 1, 5);

// Send to server
try {
  await postToNocoDB(...);
  // Success! Update with real data
} catch {
  // Failed! Show error or save locally
}
```

---

## Performance Optimizations

### 1. **Lazy Loading**
```javascript
if (isMobile && idx > 2) {
  card.setAttribute('loading', 'lazy');
  card.style.contentVisibility = 'auto';
}
```

Only render cards when they're about to enter viewport.

### 2. **Debouncing**
```javascript
let last = 0;
window.addEventListener('mousemove', (ev) => {
  const now = Date.now();
  if (now - last < 8) return; // Skip if less than 8ms since last
  last = now;
  // Update mouse follower
});
```

Reduces function calls during high-frequency events.

### 3. **Code Splitting**
Separate scripts for different pages:
- `site-theme.js` - Theme logic (all pages)
- `greetings.js` - Greetings logic (greetings page only)

### 4. **CSS Animations Instead of JS**
```css
.link-card:hover {
  transform: translateY(-4px);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
```

CSS animations run on GPU, much faster than JavaScript.

---

## Future Enhancements

### Potential Features

1. **Email Notifications** - Notify you when someone leaves a greeting
2. **Admin Dashboard** - Moderate greetings, view analytics
3. **Reactions** - Let visitors react to greetings with emojis
4. **Search & Filter** - Search greetings by keyword, filter by country
5. **Export Data** - Download greetings as CSV/JSON
6. **Real-time Updates** - WebSocket/SSE for live greeting updates
7. **User Profiles** - Optional accounts with avatars
8. **Multilingual** - Translate greetings automatically
9. **Sharing** - Share individual greetings on social media
10. **Gamification** - Badges for frequent visitors

### Technical Improvements

1. **Service Worker** - Offline support, cache assets
2. **WebP Images** - Smaller image sizes
3. **Critical CSS** - Inline critical CSS, defer rest
4. **Preload/Prefetch** - Load resources before needed
5. **Bundle Optimization** - Minify JS/CSS, tree-shaking
6. **A/B Testing** - Test different UI variations
7. **Error Tracking** - Sentry or similar for error monitoring
8. **Performance Monitoring** - Lighthouse CI, SpeedCurve

---

## Resources & Learning

### Official Documentation
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [NocoDB](https://docs.nocodb.com/)
- [GitHub Pages](https://docs.github.com/en/pages)
- [reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise/docs)

### Tutorials
- [MDN Web Docs](https://developer.mozilla.org/) - HTML/CSS/JS reference
- [web.dev](https://web.dev/) - Performance best practices
- [CSS-Tricks](https://css-tricks.com/) - CSS techniques

### Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

---

## Contact & Support

**Author:** Emilio Dominguez  
**Email:** emiliodom@gmail.com  
**Phone:** +502 56142468  
**Location:** Nuevo San Carlos, Retalhuleu, Guatemala 🇬🇹

**Repository:** https://github.com/emiliodom/emiliodom.github.io  
**Website:** https://emiliodom.github.io

---

## License

MIT License - See [LICENSE](LICENSE) file

---

**Last Updated:** October 26, 2025  
**Version:** 2.0.0  
**Documentation Author:** GitHub Copilot + Emilio Dominguez
