# Emilio Dominguez - Personal Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-success)](https://emiliodom.github.io)

A modern, interactive personal website with dark/light theme support, multi-language capabilities, and an interactive greetings wall powered by NocoDB.

🌐 **Live Site**: [https://emiliodom.github.io](https://emiliodom.github.io)

---

## 🆕 Recent Updates (October 2025)

### Latest Improvements (v2.0)
- ✅ **Migrated to hCaptcha** - Replaced Google reCAPTCHA with hCaptcha for better reliability
- ✅ **Explicit render mode** - Fixed CAPTCHA loading issues with proper async handling
- ✅ **Enhanced form UX** - Submit button now enables only when hCaptcha is completed
- ✅ **Improved submission flow** - Form hides after successful submission, shows countdown
- ✅ **Latest greeting on index** - Homepage displays the most recent greeting card
- ✅ **Code cleanup** - Removed all console.log statements and debugging code
- ✅ **Better loaders** - Added loading indicators during API calls and data fetching

### Major Cleanup & Improvements
- ✅ **Removed Vercel infrastructure** - Switched to Cloudflare Workers proxy
- ✅ **Enhanced error handling** - Graceful NocoDB unavailability with greyed-out UI
- ✅ **Code quality tools** - Added ESLint and Prettier configurations
- ✅ **Script optimization** - Separated inline scripts to external files
- ✅ **SEO improvements** - Enhanced meta tags, Open Graph, and Twitter Card support
- ✅ **Accessibility** - Improved ARIA labels, semantic HTML, and alt attributes

---

## 📑 Table of Contents

- [Recent Updates](#-recent-updates-october-2025)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)
- [Security Considerations](#security-considerations)
- [Features in Detail](#features-in-detail)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)
- [Credits](#credits)

---

## ✨ Features

### 🎨 Core Features
- **Categorized Link Cards**: Links organized into three categories:
  - **Web Development Related**: LinkedIn, GitHub Profile, CV
  - **Personal Stuff**: Study Guides on Notion, Blog, University Guides
  - **Sports Related**: Strava, Komoot, FitFit Pro, Local Guide Photos
- **Custom Images Support**: Link cards can display custom images (e.g., Strava button)
- **Persistent Light/Dark Theme**: CSS variable-based theming with localStorage persistence
- **Responsive Font Sizing**: Three-level font size controls (A-, A, A+) affecting all text including links
- **Multi-language Support**: Google Translate widget integration (English, Spanish, French)
- **Dynamic Favicons**: Random emoji favicons using Twemoji library and canvas rendering
- **Animated Background**: particles.js for subtle interactive background effects on both pages
- **Responsive Design**: Mobile-first design with breakpoints at 640px and 1024px
- **Masonry Grid Layout**: Photos and video displayed in responsive masonry grid on index page

### 💬 Greetings Wall
- **Interactive Form**: Three-step submission process (feeling → message → country → captcha)
- **hCaptcha Integration**: Secure bot protection with explicit render mode
- **Smart Button State**: Submit button enables only when all fields + CAPTCHA completed
- **14 Emoticons**: Balanced mix of positive and neutral feelings (😊, 🙂, 😄, 🤩, 👏, 🙌, 💪, 😐, 🤔, 👍, 🙏, 🤝, 🫡, ✌️)
- **16 Preset Messages**: Professional and casual greeting options
- **Country Selection**: Flag-enabled dropdown with 150+ countries
- **IP-Based Rate Limiting**: One submission per IP per 24 hours
- **Success Flow**: Form hides after submission, shows countdown message with hours/minutes remaining
- **Latest Greeting**: Homepage displays the most recent greeting card
- **Privacy Disclaimer**: Clear notice that IP is not shared with third parties
- **Lazy Loading**: Mobile greeting cards use content-visibility for performance
- **NocoDB Integration**: Cloud-based storage with Cloudflare Worker proxy
- **Error Handling**: Graceful degradation with greyed-out UI when database unavailable

### 🗺️ Location & Contact
- **Masonry Media Grid**: YouTube video and location photos in responsive grid layout
- **YouTube Video**: "Retalhuleu Nuevo San Carlos Costa Sur con dron" embedded with privacy-enhanced mode
- **Interactive Map**: Embedded Google Maps with exact coordinates (14.574567657442334, -91.6898847619052)
- **Location Photos**: Three Guatemala/Retalhuleu destination images
- **Contact Info**: Phone (+502 56142468) and email (emiliodom@gmail.com)

---

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Hosting**: GitHub Pages (static hosting, no build step)
- **Backend**: NocoDB v2 API with Cloudflare Worker proxy
- **CDN Libraries**:
  - particles.js v2.0.0 (background animation)
  - Twemoji API (emoji rendering)
  - DOMPurify v3.0.8 (XSS protection)
  - Google Translate Widget (i18n)
- **Code Quality**: ESLint and Prettier for linting and formatting

### Design Patterns
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Mobile-First**: Responsive design starts with mobile and scales up
- **Component-Based CSS**: Modular CSS with BEM-like naming
- **Client-Side Storage**: localStorage for theme, preferences, and fallback data
- **Proxy Architecture**: Cloudflare Worker secures NocoDB API access

---

## 🛠️ Technologies

| Technology | Purpose | Version |
|-----------|---------|---------|
| HTML5 | Markup structure | - |
| CSS3 (Variables) | Theming & responsive styles | - |
| JavaScript (ES6+) | Interactivity & API calls | - |
| particles.js | Animated background | 2.0.0 |
| Twemoji | Emoji rendering | latest |
| DOMPurify | XSS sanitization | 3.0.8 |
| hCaptcha | Bot protection | v1 API |
| NocoDB | Database/backend | v2 API |
| Cloudflare Workers | API proxy | - |
| Google Translate | Multi-language support | Widget |
| ipify API | IP detection | - |
| ESLint | JavaScript linting | latest |
| Prettier | Code formatting | latest |

---

## 📂 Project Structure

```
emiliodom.github.io/
├── index.html                 # Main landing page with categorized links
├── greetings.html            # Interactive greetings wall
├── LICENSE                   # MIT License
├── README.md                 # This file
├── .eslintrc.json           # ESLint configuration for JavaScript linting
├── .prettierrc.json         # Prettier configuration for code formatting
├── .prettierignore          # Files to exclude from Prettier formatting
├── _includes/
│   └── header.html           # Reusable header (Jekyll-compatible)
├── _layouts/
│   └── default.html          # Default layout (Jekyll-compatible)
├── api/
│   ├── cloudflare/          # Cloudflare Worker proxy
│   │   ├── wrangler.toml    # Cloudflare Worker configuration
│   │   └── src/
│   │       └── index.js     # Worker proxy implementation
│   ├── deploy-cloudflare.sh # Deployment script for Cloudflare
│   ├── nocodb-proxy.js      # Proxy logic documentation
│   ├── PROXY_SETUP.md       # Proxy setup instructions
│   ├── README.md            # API documentation
│   └── SECURITY_ARCHITECTURE.md # Security design documentation
├── assets/
│   ├── css/
│   │   └── theme.css         # Unified stylesheet with theme variables & masonry grid
│   ├── data/
│   │   ├── link_cards.json   # Categorized link cards with custom images
│   │   └── location_media.json # Video and photos configuration
│   ├── img/                  # Image assets (avatars, fallbacks)
│   └── js/
│       ├── greetings.js      # Greetings form logic & NocoDB integration
│       ├── greetings-page.js # Page-specific scripts (extracted from inline)
│       ├── nocodb-config.js  # NocoDB configuration
│       └── site-theme.js     # Theme toggle & font-size controls
```

---

## 🚀 Setup & Installation

### Prerequisites
- Git
- A modern web browser
- (Optional) Local HTTP server for testing

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/emiliodom/emiliodom.github.io.git
   cd emiliodom.github.io
   ```

2. **Serve locally** (choose one method):

   **Python:**
   ```bash
   python3 -m http.server 8000
   ```

   **Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## ⚙️ Configuration

### Cloudflare Worker Proxy Setup (Recommended for Production)

For secure token management in production, use a Cloudflare Worker as a proxy to NocoDB:

1. **Cloudflare Worker Setup**:
   - Navigate to `api/cloudflare/` directory
   - Configure `wrangler.toml` with your Worker settings
   - Add secrets as Cloudflare environment variables:
     ```bash
     wrangler secret put NOCODB_TOKEN
     wrangler secret put HCAPTCHA_SECRET
     ```

2. **hCaptcha Setup**:
   - Sign up at [hCaptcha.com](https://hcaptcha.com)
   - Create a new site
   - Get your site key and secret key
   - Add site key to `greetings.html` (already configured)
   - Add secret key to Cloudflare Worker secrets

3. **Deploy the Worker**:
   ```bash
   cd api/cloudflare
   wrangler deploy
   ```

4. **Update Frontend Configuration**:
   - Edit `assets/js/nocodb-config.js`
   - Point API calls to your Cloudflare Worker URL instead of direct NocoDB

5. **Benefits**:
   - Tokens never exposed to client
   - Server-side hCaptcha verification
   - Additional security layer with rate limiting
   - CORS handling
   - Request validation and sanitization

For detailed setup instructions, see `api/PROXY_SETUP.md` and `api/SECURITY_ARCHITECTURE.md`.

### NocoDB Setup

The greetings wall uses NocoDB for persistent storage. To configure:

1. **Create NocoDB Account**: Sign up at [nocodb.com](https://nocodb.com)

2. **Create a Table** with these fields:
   - `Message` (Text) - The greeting message
   - `User` (Text) - IP address
   - `Notes` (Text) - Emoticon/feeling
   - `Country` (Text) - ISO country code (e.g., "US", "GT")
   - `CreatedAt` (DateTime) - Auto-generated timestamp

3. **Get API Credentials**:
   - Table ID: Found in URL
   - View ID: Found in URL
   - API Token: Settings → API Tokens → Create Token

4. **Configure Worker** (production):
   Add token as Cloudflare secret (see above)

5. **For Local Development**:
   Update `assets/js/nocodb-config.js` to point to your local test endpoint or use the deployed Worker.

### Link Cards Configuration

Edit `assets/data/link_cards.json` to customize your links:

```json
{
  "categories": [
    {
      "name": "Category Name",
      "description": "Optional description",
      "links": [
        {
          "title": "Link Title",
          "description": "Link description",
          "href": "https://example.com",
          "icon": "🚀",
          "customImage": null,
          "external": true
        }
      ]
    }
  ],
  "standalone": [
    {
      "title": "Special Link",
      "description": "Description",
      "href": "/page.html",
      "icon": "💬",
      "external": false
    }
  ]
}
```

**Custom Images**: For links with custom images (like Strava button), set `icon` to `null` and provide `customImage` URL.

### Location Media Configuration

Edit `assets/data/location_media.json` to update video and photos:

```json
{
  "video": {
    "youtube_id": "d5pgNEO1iJo",
    "title": "Your Video Title",
    "embed_url": "https://www.youtube-nocookie.com/embed/d5pgNEO1iJo"
  },
  "photos": [
    {
      "url": "https://example.com/photo1.jpg",
      "alt": "Photo description"
    }
  ]
}
```

### Theme Customization

Edit CSS variables in `assets/css/theme.css`:

```css
:root {
  --bg: #f9fafb;              /* Light mode background */
  --text-color: #1e293b;      /* Text color */
  --accent-1: rgba(102,126,234,0.9); /* Primary accent */
  --card-bg: #ffffff;         /* Card backgrounds */
  /* ... */
}

.theme-dark {
  --bg: linear-gradient(135deg, #0c1420 0%, #1a2332 100%);
  --text-color: #e2e8f0;
  /* ... */
}
```

---

## 🔒 Security Considerations

### Production Security Model: Cloudflare Worker Proxy

✅ **Best Practice**: Use a Cloudflare Worker as a secure proxy to NocoDB.

#### Cloudflare Worker Approach:
1. **Token Storage**: Stored as Cloudflare Worker secret (never exposed to client)
2. **Proxy Layer**: All NocoDB requests go through the Worker
3. **Zero Exposure**: Token never appears in client code or repository
4. **Additional Security**:
   - CORS handling
   - Rate limiting at edge
   - Request validation and sanitization
   - IP-based duplicate prevention

See `api/PROXY_SETUP.md` and `api/SECURITY_ARCHITECTURE.md` for implementation details.

#### What's Protected:
1. **XSS Prevention**: DOMPurify sanitizes all user-generated content before rendering
2. **Bot Protection**: hCaptcha prevents automated submissions
3. **Rate Limiting**: 24-hour IP-based submission window (enforced by Worker)
4. **Input Validation**: Server-side validation in Cloudflare Worker
5. **Token Security**: API tokens never exposed to client
6. **CAPTCHA Verification**: Server-side hCaptcha validation in Worker
7. **IP Privacy**: Clear disclaimer that IP addresses are not shared with third parties
8. **Error Handling**: Graceful degradation when database unavailable

#### Known Limitations:
1. **IP Spoofing**: IP detection can be bypassed with VPN/proxy
2. **Rate Limiting**: Per-IP limits can be circumvented with multiple IPs
3. **hCaptcha**: While better than simple captchas, advanced bots may still bypass

### Why This Approach?

For a **personal portfolio site**, the Cloudflare Worker proxy provides:
- ✅ True security (token never exposed)
- ✅ Prevents casual misuse
- ✅ Stops XSS attacks
- ✅ Works with free GitHub Pages + Cloudflare Workers
- ✅ Edge computing for low latency
- ✅ Automatic scaling

For more advanced security needs, consider:
- reCAPTCHA v3 for bot protection
- Server-side rate limiting with Redis
- Database-level access controls
- WAF (Web Application Firewall)

---

## 📖 Features in Detail

### Theme System

The theme system uses CSS custom properties and JavaScript for persistence:

**CSS Variables** (`theme.css`):
```css
:root {
  --bg: #f9fafb;
  --text-color: #1e293b;
  /* ... */
}

.theme-dark {
  --bg: linear-gradient(135deg, #0c1420 0%, #1a2332 100%);
  --text-color: #e2e8f0;
  /* ... */
}
```

**JavaScript** (`site-theme.js`):
```javascript
function applyTheme(isDark) {
  document.documentElement.classList.toggle('theme-dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved === 'dark' || (!saved && prefersDark));
}
```

### Font Size System

Three-level font scaling using `rem` units:

```javascript
const fontSizes = {
  small: { html: '14px', body: '14px' },
  medium: { html: '16px', body: '16px' },
  large: { html: '18px', body: '18px' }
};

function applyFontSize(key) {
  const size = fontSizes[key];
  document.documentElement.style.fontSize = size.html;
  document.body.style.fontSize = size.body;
  localStorage.setItem('font-size', key);
}
```

All typography uses `rem` units to scale proportionally.

### NocoDB Integration

**API Calls**:

```javascript
// POST new greeting
async function postToNocoDB(message, user, notes) {
  const resp = await fetch(NOCODB.postUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xc-token': NOCODB.token
    },
    body: JSON.stringify({ Message: message, User: user, Notes: notes })
  });
  return resp.json();
}

// GET greetings list
async function fetchFromNocoDB() {
  const resp = await fetch(NOCODB.getUrl, {
    headers: {
      'accept': 'application/json',
      'xc-token': NOCODB.token
    }
  });
  return resp.json();
}
```

**IP Verification**:
```javascript
async function getIp() {
  const resp = await fetch('https://api.ipify.org?format=json');
  const data = await resp.json();
  return data.ip;
}

// 24-hour window check
const oneDayMs = 24 * 60 * 60 * 1000;
const recentEntry = nocodbList.find(entry => {
  if(entry.ip !== ip) return false;
  const entryTime = new Date(entry.when).getTime();
  return (Date.now() - entryTime) < oneDayMs;
});
```

### Responsive Behavior

**Breakpoints**:
- **Desktop**: > 1024px (full features)
- **Tablet**: 641px - 1024px (hybrid layout)
- **Mobile**: ≤ 640px (touch-optimized)

**Mobile Adaptations**:
```css
@media (max-width: 640px) {
  .feelings { display: none; }
  .feeling-select { display: block !important; }
  .message-select { display: block !important; }
  .card-grid { display: none !important; }
}
```

**Desktop Enhancements**:
```css
@media (min-width: 641px) {
  .message-select { display: block !important; }
  .card-grid { display: none !important; }
}
```

---

## 👨‍💻 Development

### Code Style

- **HTML**: Semantic HTML5 elements
- **CSS**: BEM-like naming, mobile-first
- **JavaScript**: ES6+, async/await, no transpilation
- **Linting**: ESLint for JavaScript code quality
- **Formatting**: Prettier for consistent code style

### Code Quality Tools

This project uses ESLint and Prettier to maintain code quality:

**Run ESLint**:
```bash
npx eslint assets/js/**/*.js
```

**Run Prettier**:
```bash
npx prettier --write "**/*.{js,css,html,json,md}"
```

**Check Formatting**:
```bash
npx prettier --check "**/*.{js,css,html,json,md}"
```

Configuration files:
- `.eslintrc.json` - ESLint rules (browser environment, ES2021, 4-space indent)
- `.prettierrc.json` - Prettier rules (4-space tabs, 120 char width, double quotes)
- `.prettierignore` - Files to exclude from formatting

### Testing Checklist

- [ ] Theme toggle persists across page loads
- [ ] Font-size affects all text (including links)
- [ ] Favicon changes on each page load
- [ ] Greetings form validates captcha
- [ ] IP rate limiting prevents duplicate submissions
- [ ] NocoDB unavailable state shows greyed-out UI with error message
- [ ] Mobile dropdowns replace button grids
- [ ] Lazy loading works on mobile greeting cards
- [ ] Map modal opens and closes properly
- [ ] Google Translate changes page language
- [ ] Cloudflare Worker proxy handles all NocoDB requests

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android

---

## 🚢 Deployment

### GitHub Pages (Automatic)

This site auto-deploys via GitHub Pages:

1. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Update site"
   git push origin main
   ```

2. **GitHub Actions** (if enabled):
   - Automatic build on push
   - Deploys to `gh-pages` branch

3. **Live in ~2 minutes** at:
   ```
   https://emiliodom.github.io
   ```

### Custom Domain (Optional)

1. **Add CNAME file**:
   ```
   yourdomain.com
   ```

2. **Configure DNS** (at your registrar):
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   ```

3. **Enable HTTPS** in GitHub repo settings

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Emilio Dominguez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See [LICENSE](LICENSE) file for full text.

---

## 🙏 Credits

### Created By
**Emilio Dominguez**  
Software Engineer, IT & English Teacher, Web Enthusiast  
📍 Nuevo San Carlos, Retalhuleu, Guatemala 🇬🇹

### Built With Help From
- **GitHub Copilot** - AI pair programmer
- **GitHub Pages** - Free static hosting

### Third-Party Libraries
- [particles.js](https://vincentgarreau.com/particles.js/) by Vincent Garreau
- [CryptoJS](https://github.com/brix/crypto-js) by brix
- [Twemoji](https://github.com/twitter/twemoji) by Twitter
- [DOMPurify](https://github.com/cure53/DOMPurify) by Cure53
- [NocoDB](https://nocodb.com) - Open-source Airtable alternative

### Design Inspiration
- Modern portfolio sites
- Material Design principles
- Neumorphism UI trends

---

## 📞 Contact

- **Email**: [emiliodom@gmail.com](mailto:emiliodom@gmail.com)
- **Phone**: +502 56142468
- **GitHub**: [@emiliodom](https://github.com/emiliodom)
- **Location**: Nuevo San Carlos, Retalhuleu, Guatemala

---

**Made with ❤️ in Guatemala** 🇬🇹
