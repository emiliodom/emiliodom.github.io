# Emilio Dominguez - Personal Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-success)](https://emiliodom.github.io)

A modern, interactive personal website with dark/light theme support, multi-language capabilities, and an interactive greetings wall powered by NocoDB.

🌐 **Live Site**: [https://emiliodom.github.io](https://emiliodom.github.io)

---

## 📑 Table of Contents

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
- **Persistent Light/Dark Theme**: CSS variable-based theming with localStorage persistence
- **Responsive Font Sizing**: Three-level font size controls (A-, A, A+) affecting all text including links
- **Multi-language Support**: Google Translate widget integration (English, Spanish, French)
- **Dynamic Favicons**: Random emoji favicons using Twemoji library and canvas rendering
- **Animated Background**: particles.js for subtle interactive background effects
- **Responsive Design**: Mobile-first design with breakpoints at 640px and 1024px

### 💬 Greetings Wall
- **Interactive Form**: Three-step submission process (feeling → message → captcha)
- **14 Emoticons**: Balanced mix of positive and neutral feelings (😊, 🙂, 😄, 🤩, 👏, 🙌, 💪, 😐, 🤔, 👍, 🙏, 🤝, 🫡, ✌️)
- **16 Preset Messages**: Professional and casual greeting options
- **Smart UI Adaptation**:
  - Desktop: Button grids for feelings, large styled selector for messages
  - Mobile: Dropdown selectors for both feelings and messages
- **Numeric Captcha**: Simple 3-choice math verification
- **IP-Based Rate Limiting**: One submission per IP per 24 hours
- **Bad Words Filter**: Client-side profanity detection
- **Lazy Loading**: Mobile greeting cards use content-visibility for performance
- **NocoDB Integration**: Cloud-based storage with encrypted API token

### 🗺️ Location & Contact
- **Interactive Map Modal**: Embedded Google Maps with exact coordinates (14.574567657442334, -91.6898847619052)
- **Location Photos**: Three Guatemala/Retalhuleu destination images
- **Contact Info**: Phone (+502 56142468) and email (emiliodom@gmail.com)

---

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Hosting**: GitHub Pages (static hosting, no build step)
- **Backend**: NocoDB v2 API (public endpoints)
- **CDN Libraries**:
  - particles.js v2.0.0 (background animation)
  - CryptoJS v4.1.1 (AES encryption)
  - Twemoji API (emoji rendering)
  - DOMPurify v3.0.8 (XSS protection)
  - Google Translate Widget (i18n)

### Design Patterns
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Mobile-First**: Responsive design starts with mobile and scales up
- **Component-Based CSS**: Modular CSS with BEM-like naming
- **Client-Side Storage**: localStorage for theme, preferences, and fallback data
- **Security by Obscurity**: Encrypted API token (see Security Considerations)

---

## 🛠️ Technologies

| Technology | Purpose | Version |
|-----------|---------|---------|
| HTML5 | Markup structure | - |
| CSS3 (Variables) | Theming & responsive styles | - |
| JavaScript (ES6+) | Interactivity & API calls | - |
| particles.js | Animated background | 2.0.0 |
| CryptoJS | Token encryption (AES) | 4.1.1 |
| Twemoji | Emoji rendering | latest |
| DOMPurify | XSS sanitization | 3.0.8 |
| NocoDB | Database/backend | v2 API |
| Google Translate | Multi-language support | Widget |
| ipify API | IP detection | - |

---

## 📂 Project Structure

```
emiliodom.github.io/
├── index.html                 # Main landing page
├── greetings.html            # Interactive greetings wall
├── LICENSE                   # MIT License
├── README.md                 # This file
├── _includes/
│   └── header.html           # Reusable header (Jekyll-compatible)
├── _layouts/
│   └── default.html          # Default layout (Jekyll-compatible)
├── assets/
│   ├── css/
│   │   └── theme.css         # Unified stylesheet with theme variables
│   ├── data/
│   │   ├── badwords.json     # Client-side profanity filter list
│   │   └── link_cards.json   # Externalized link cards data
│   ├── img/                  # Image assets (avatars, fallbacks)
│   └── js/
│       ├── greetings.js      # Greetings form logic & NocoDB integration
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

### NocoDB Setup

The greetings wall uses NocoDB for persistent storage. To configure:

1. **Create NocoDB Account**: Sign up at [nocodb.com](https://nocodb.com)

2. **Create a Table** with these fields:
   - `Message` (Text) - The greeting message
   - `User` (Text) - IP address
   - `Notes` (Text) - Emoticon/feeling
   - `CreatedAt` (DateTime) - Auto-generated timestamp

3. **Get API Credentials**:
   - Table ID: Found in URL (`mtujnjge9o5j98m`)
   - View ID: Found in URL (`vww985w35i0umz1g`)
   - API Token: Settings → API Tokens → Create Token

4. **Encrypt Token** (optional):
   ```javascript
   // In browser console with CryptoJS loaded
   const token = 'YOUR_NOCODB_TOKEN';
   const passphrase = 'your-custom-passphrase';
   const encrypted = CryptoJS.AES.encrypt(token, passphrase).toString();
   console.log(encrypted);
   ```

5. **Update `greetings.html`** (lines 197-210):
   ```javascript
   const encryptedToken = 'YOUR_ENCRYPTED_TOKEN';
   const passphrase = 'your-custom-passphrase';
   window.NOCODB_CONFIG = {
     postUrl: 'https://app.nocodb.com/api/v2/tables/YOUR_TABLE_ID/records',
     getUrl: 'https://app.nocodb.com/api/v2/tables/YOUR_TABLE_ID/records?viewId=YOUR_VIEW_ID&limit=25',
     token: decryptedToken
   };
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

### Link Cards

Edit `assets/data/link_cards.json`:

```json
[
  {
    "title": "My Project",
    "description": "Project description",
    "href": "https://example.com",
    "icon": "🚀",
    "external": true
  }
]
```

---

## 🔒 Security Considerations

### Current Security Model

⚠️ **Important**: This is a **static site** hosted on GitHub Pages with **no server-side logic**. Security is limited to client-side measures.

#### What's Protected:
1. **XSS Prevention**: DOMPurify sanitizes all user-generated content before rendering
2. **Bad Words Filter**: Client-side filtering of inappropriate language (badwords.json)
3. **Rate Limiting**: 24-hour IP-based submission window (client + NocoDB verification)
4. **Token Encryption**: NocoDB API token encrypted with CryptoJS AES

#### Known Limitations:
1. **Token Exposure**: Despite encryption, the passphrase is in client code. Anyone can:
   - View page source
   - Decrypt the token
   - Make direct API calls

2. **Client-Side Validation**: All checks (IP, captcha, bad words) can be bypassed via:
   - Browser DevTools
   - Direct API calls
   - Modified client code

3. **IP Spoofing**: IP detection via ipify.org can be bypassed

#### Recommended Mitigations (Future):
- **Server-Side Proxy**: Move NocoDB calls behind an API gateway/serverless function
- **Rate Limiting**: Implement server-side rate limiting
- **CAPTCHA**: Use reCAPTCHA v3 for bot protection
- **API Webhooks**: Use NocoDB webhooks for validation

### Why This Approach?

For a **personal portfolio site**, this security model is acceptable because:
- ✅ Prevents casual misuse
- ✅ Stops XSS attacks
- ✅ Filters obvious spam
- ✅ Works without backend infrastructure
- ✅ Free hosting on GitHub Pages

For production applications with sensitive data, use proper backend security.

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

### Testing Checklist

- [ ] Theme toggle persists across page loads
- [ ] Font-size affects all text (including links)
- [ ] Favicon changes on each page load
- [ ] Greetings form validates captcha
- [ ] IP rate limiting prevents duplicate submissions
- [ ] Bad words filter catches disallowed terms
- [ ] Mobile dropdowns replace button grids
- [ ] Lazy loading works on mobile greeting cards
- [ ] Map modal opens and closes properly
- [ ] Google Translate changes page language

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
