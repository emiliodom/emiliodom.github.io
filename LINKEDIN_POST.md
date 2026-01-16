# LinkedIn Post: Interactive Greetings System v2.0

---

## Option 1: Security Challenge - "Try to Break My Rate Limiter"

🔐 **Security Challenge: Can you bypass my IP-based rate limiter?**

I built an interactive greetings wall with a custom rate limiting system. Here's the challenge: try to submit more than one greeting in 24 hours.

**The Tech Stack:**
```
Frontend: Vanilla JavaScript (no frameworks)
Backend: NocoDB (PostgreSQL-based)
Proxy Layer: Cloudflare Workers (edge computing)
Bot Protection: hCaptcha verification
Rate Limiting: IP-based with 24-hour sliding window
Hosting: GitHub Pages (CDN distributed)
```

**Security Measures I Implemented:**
- ✅ Server-side IP validation (not just client-side)
- ✅ hCaptcha verification on every submission
- ✅ Timestamp-based expiry checking
- ✅ Input sanitization with DOMPurify
- ✅ Content-length validation
- ✅ CORS properly configured
- ✅ No authentication bypass possible (stateless verification)

**Attack Vectors I Want You to Try:**
1. **IP Spoofing**: Can you fake your IP to submit multiple times?
2. **VPN Rotation**: Switch VPNs and try again
3. **Browser Fingerprinting**: Clear cookies, use incognito, different browsers
4. **Race Conditions**: Multiple simultaneous submissions
5. **SQL Injection**: Try malicious inputs in the message field
6. **XSS Attempts**: Submit scripts or HTML
7. **Rate Limit Bypass**: Find any loophole in the 24-hour window
8. **hCaptcha Token Reuse**: Can you replay a captcha token?

**Try it here:** https://emiliodom.github.io/greetings/

**Rules of Engagement:**
- ✅ Try to break it (ethically - no DDoS please!)
- ✅ Document your approach
- ✅ Share your findings in comments
- ✅ If you succeed, explain how you did it
- 🏆 First person to find a real vulnerability gets a shoutout

**What I'm Testing:**
- IP-based rate limiting effectiveness
- hCaptcha integration security
- Edge case handling
- Input validation robustness

**Open Source:** Full code available on GitHub if you want to review the implementation before attacking.

Who's ready to test some security boundaries? Let's see if my rate limiter holds up! 💪

#CyberSecurity #WebSecurity #SecurityTesting #RateLimiting #EthicalHacking #WebDevelopment #JavaScript

---

## Option 2: Technical Deep Dive - "Architecture Challenge"

⚡ **Built a zero-cost, serverless greetings system. Here's how (and why you should try to break it).**

**Architecture Overview:**

```
User Browser
    ↓
GitHub Pages (Static Frontend)
    ↓
Cloudflare Workers (Edge Proxy)
    ↓
NocoDB API (Hosted Database)
```

**Technical Decisions & Trade-offs:**

**1. Why Cloudflare Workers?**
- Edge computing = < 50ms latency globally
- Built-in DDoS protection
- Request filtering before hitting database
- Cost: $0 (5M requests/month free tier)

**2. Why NocoDB over traditional backend?**
- Auto-generated REST API
- Built-in data validation
- No server maintenance
- PostgreSQL under the hood
- Cost: $0 (self-hosted option)

**3. Why IP-based rate limiting instead of sessions?**
- No authentication required
- Stateless verification
- Works across devices
- Privacy-friendly (no tracking cookies)
- Edge case: Shared IPs (offices, universities) = intentional trade-off

**4. Why hCaptcha over reCAPTCHA?**
- Better privacy compliance (GDPR)
- More accessible
- Lower friction for users
- No Google dependency

**The Challenge:**

I want you to **stress test** this architecture:

**Performance Testing:**
- How many concurrent users can it handle?
- What's the actual latency from your location?
- Does it degrade gracefully under load?

**Security Testing:**
- Can you bypass the Cloudflare Worker proxy?
- Find any unvalidated inputs?
- Exploit the NocoDB API directly?

**Edge Cases:**
- IPv6 vs IPv4 handling
- Mobile network IP rotation
- CGN (Carrier-Grade NAT) scenarios
- Time zone edge cases in rate limiting

**Try it:** https://emiliodom.github.io/greetings/

**For the Technical Reviewers:**
- Check the Network tab (what requests are made?)
- Inspect the API responses (what data is exposed?)
- Review the hCaptcha implementation (any vulnerabilities?)
- Test the rate limiter logic (can you find edge cases?)

**Bonus Points:**
- Suggest architectural improvements
- Find performance bottlenecks
- Propose alternative approaches
- Calculate actual cost at scale

**Repository:** Open source on GitHub - review the code before you test!

Let's discuss: **What would you have built differently?** Comment with your approach!

#SystemDesign #SoftwareArchitecture #Serverless #CloudflareWorkers #TechStack #WebPerformance #DistributedSystems

---

## Option 3: Bug Bounty Style - "Find the Vulnerabilities"

🐛 **Unofficial Bug Bounty: Find vulnerabilities in my greetings wall**

I'm launching an **informal bug bounty** for my latest project. No monetary rewards, but you'll get:
- 🏆 Public recognition
- 💡 Contribution credit in the repo
- 🤝 A strong reference if you're job hunting
- 📈 Portfolio material

**The Target:** https://emiliodom.github.io/greetings/

**Scope of Testing:**

**✅ In Scope:**
- Authentication/Authorization bypass
- Rate limiting bypass
- Input validation vulnerabilities (XSS, SQLi, etc.)
- Business logic flaws
- Information disclosure
- Privacy leaks
- API security issues
- Client-side security issues
- CORS misconfigurations

**❌ Out of Scope (Don't Test These):**
- DDoS attacks
- Social engineering
- Physical security
- Third-party services (hCaptcha, GitHub Pages, etc.)

**Tech Stack to Review:**

```javascript
// Frontend (Client-Side)
- Vanilla JavaScript (ES6+)
- DOMPurify for XSS prevention
- hCaptcha integration
- localStorage usage (check for sensitive data!)

// Backend Proxy (Cloudflare Workers)
- Request filtering
- IP extraction and validation
- Header manipulation
- Rate limit enforcement

// Database Layer (NocoDB)
- REST API endpoints
- Data validation
- PostgreSQL queries
- Authentication token handling
```

**Vulnerability Categories I'm Most Worried About:**

**P0 - Critical:**
- Rate limit complete bypass
- SQL injection
- Authentication bypass
- Remote code execution (highly unlikely, but check!)

**P1 - High:**
- XSS vulnerabilities
- CSRF attacks
- Information disclosure (PII leakage)
- Authorization flaws

**P2 - Medium:**
- Input validation issues
- Error message information leakage
- Browser-specific bugs
- Race conditions

**P3 - Low:**
- UX confusion that could be exploited
- Client-side logic flaws
- Console logging sensitive data

**How to Report:**

1. **Test ethically** - no brute force, no attacks on infrastructure
2. **Document your findings:**
   - Steps to reproduce
   - Expected vs actual behavior
   - Impact assessment
   - Suggested fix (bonus!)
3. **Submit via:**
   - GitHub Issues (preferred)
   - LinkedIn DM with details
   - Comment on this post with high-level description

**Testing Tools You Might Use:**
- Browser DevTools (Network, Console, Application tabs)
- Burp Suite / OWASP ZAP
- Postman / curl for API testing
- Browser extensions for security testing
- Mobile device testing

**Sample Test Cases:**

```bash
# Test 1: Can you submit without hCaptcha?
# Test 2: Can you submit XSS payload?
# Test 3: Can you access other users' data?
# Test 4: Can you submit from different IPs rapidly?
# Test 5: Can you manipulate timestamps?
# Test 6: Can you overflow input fields?
# Test 7: Can you access the API directly?
# Test 8: Can you inject SQL?
```

**What I've Already Tested:**
- Basic XSS attempts (blocked by DOMPurify)
- SQL injection patterns (NocoDB handles this)
- Rate limit with VPN switching (working)
- Concurrent submissions (handled)
- Empty/null inputs (validated)

**What I Haven't Fully Tested:**
- Mobile browser edge cases
- IPv6 specific issues
- Time zone manipulation
- Browser extension interference
- Screen reader compatibility (not security, but important!)

**Timeline:**
- Testing open for 2 weeks
- I'll publish findings & fixes weekly
- Hall of fame for all contributors

**Why Am I Doing This?**
Because real-world security testing > theoretical security. Your creative attacks help make this better for everyone.

**Ready to hack?** Let's see what you can find! 🔍

#BugBounty #SecurityTesting #VulnerabilityResearch #ApplicationSecurity #PenTesting #WebSecurity #EthicalHacking #CyberSecurity #InfoSec

---

**Technical Details for Serious Testers:**

**Rate Limiting Implementation:**
```javascript
// Simplified logic
const lastSubmission = await getLastSubmissionByIP(userIP);
const hoursSinceSubmission = (Date.now() - lastSubmission.timestamp) / 3600000;
if (hoursSinceSubmission < 24) {
  return { allowed: false, remainingHours: 24 - hoursSinceSubmission };
}
```

**Input Sanitization:**
```javascript
// Client-side (additional server-side validation exists)
const sanitizedMessage = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: []
});
```

**API Proxy Structure:**
```javascript
// Cloudflare Worker pseudocode
async function handleRequest(request) {
  const ip = request.headers.get('CF-Connecting-IP');
  const hcaptchaToken = await request.json().hcaptcha_token;
  
  // Verify hCaptcha
  // Check rate limit
  // Forward to NocoDB
  // Return sanitized response
}
```

**Questions to Consider:**
- Can you bypass IP detection using proxy headers?
- Can you replay hCaptcha tokens?
- Can you access the NocoDB endpoint directly?
- Can you exploit race conditions in the rate limiter?
- Can you overflow any buffers with large inputs?

---

**Why This Approach Works:**
- Developers love technical challenges
- "Break it" invitation reduces hesitation to test
- Specific attack vectors = actionable testing
- Open source = transparency builds trust
- Community testing > solo QA

🚀 **Just launched: Interactive Greetings System v2.0**

I'm excited to share a project I've been working on - an interactive greetings wall built with vanilla JavaScript, hCaptcha, and NocoDB.

**What makes it interesting:**
✨ Real-time greeting submissions with IP-based rate limiting (one greeting per 24 hours)
🎊 Confetti celebration animations on successful submissions
🌍 Country detection with Twemoji flag rendering
🔒 Security-first architecture with hCaptcha verification
🎨 Dark/light mode support with smooth transitions
📱 Fully responsive with accessibility features

**Tech Stack:**
- Vanilla JavaScript (no frameworks)
- NocoDB for backend storage
- Cloudflare Workers for proxy/security
- hCaptcha for bot protection
- GitHub Pages for hosting

**I'd love your feedback!**

👉 Check it out: https://emiliodom.github.io/greetings/

Feel free to:
- Test the submission flow
- Try to break it (seriously, please do!)
- Leave a greeting if you enjoyed it
- Share your thoughts on the implementation

The entire project is open source on GitHub. Would love to hear from fellow developers about edge cases, improvements, or just your experience using it.

What features would you add to an interactive greetings wall?

#WebDevelopment #JavaScript #OpenSource #WebDesign #CodingProject

---

## Option 2: Product/User Experience Focused - Personal Hub Edition

� **Built my own digital hub - a link-in-bio on steroids**

Instead of using Linktree or similar tools, I built a custom personal hub that brings together my social profiles, teaching materials, and an interactive greetings wall 🌍

**What makes it different:**

📚 **Organized Categories:**
- Professional profiles (LinkedIn, GitHub, CV)
- Study guides & teaching materials (React notes, university resources)
- Sports tracking (Strava, Komoot, fitness plans)
- Personal projects & blog

💬 **Interactive Greetings Feature:**
- Choose from preset messages or write your own
- Select how you're feeling (with emoji!)
- Pick your country
- Complete a quick verification
- Watch confetti fly when your greeting is posted 🎊

**Why I built this:**

As developers, we often focus on complex features. I wanted to create something that's both functional (organize all my links) AND delightful (interactive greetings with real-time feedback).

**The challenge:** 
Build a personal hub that's more than just a list of links. Make it interactive, secure against spam, and simple enough for anyone to use in under 30 seconds.

**Two sides to test:**

1️⃣ **The Hub**: Browse my categorized links, check out the clean design, test mobile responsiveness
2️⃣ **The Greetings Wall**: Try to submit a message and see the full experience (hCaptcha → Confetti → Real-time display)

**Try it yourself:** https://emiliodom.github.io/

**I'd love for you to:**
✅ Test it out (mobile or desktop)
✅ Try to break the greetings feature (seriously, try edge cases!)
✅ Leave a greeting if you enjoyed the experience
✅ Share feedback on the UX and organization
✅ Let me know: Would you use something like this for yourself?

**Built with:**
- Vanilla JavaScript (no frameworks bloat)
- GitHub Pages (free hosting)
- NocoDB for greetings storage
- Cloudflare Workers for security
- hCaptcha for spam protection

**Total monthly cost:** $0 ✨

What would you add to a personal hub like this? Would love to hear your thoughts!

#ProductDevelopment #UXDesign #WebApp #InteractiveDesign #PersonalBranding #DeveloperPortfolio #LinkInBio

---

## Option 3: Story-Driven/Engaging

🎯 **"One submission per person per day. Make it count."**

That's the constraint I gave myself when building an interactive greetings wall. No spam, no clutter - just thoughtful messages from real people around the world.

**The journey:**
Started with a simple idea: let visitors leave greetings. But then came the questions:
- How do you prevent abuse without forcing registration?
- How do you make it feel celebratory, not transactional?
- How do you balance security with simplicity?

**The solution:**
Built a system that combines IP-based rate limiting, hCaptcha verification, and country detection - wrapped in a delightful experience with confetti animations and emoji reactions 🎊

**The best part?**
It's built with vanilla JavaScript (no heavy frameworks), hosted on GitHub Pages (free!), and secured with Cloudflare Workers. Total monthly cost: $0.

**Want to see it in action?**
👉 https://emiliodom.github.io/greetings/

I'm inviting the LinkedIn community to:
🔹 Test the user experience
🔹 Try to find edge cases (bonus points if you break it!)
🔹 Leave a greeting if it made you smile
🔹 Share what you'd build differently

Open source and open to feedback. What constraints have led to your best projects?

#Coding #SideProject #WebDevelopment #OpenSource #DeveloperCommunity

---

## Option 4: Short & Direct (Best for Quick Engagement)

🎉 Built an interactive greetings wall where anyone can leave a message in under 30 seconds!

Features:
✨ One greeting per person per 24h
🎊 Confetti celebration on submit
🌍 Shows your country with flag
🔒 Protected against spam/abuse

Try it → https://emiliodom.github.io/greetings/

Challenge: Can you break it? 😈

Leave a greeting if you like it, or share feedback if you don't!

Built with vanilla JS, NocoDB, Cloudflare Workers.
Open source on GitHub.

#WebDev #JavaScript #OpenSource

---

## Option 5: Call-to-Action Focused

🚨 **Developers & Designers: I need your help!**

I just launched an interactive greetings wall and I want YOU to try and break it.

**Your mission (if you accept):**
1. Go to: https://emiliodom.github.io/greetings/
2. Test the submission flow (try weird inputs!)
3. Check mobile responsiveness
4. Find edge cases or bugs
5. Report back what happened

**What you'll find:**
- Real-time greeting wall
- IP-based rate limiting
- hCaptcha verification
- Country detection with flags
- Confetti animations 🎊
- Dark/light mode

**If it works well for you:**
Leave a greeting! Bonus points if you mention what you tested.

**If you find bugs:**
Drop them in the comments or GitHub issues. I'm offering virtual high-fives for every bug found 🙌

**Why this matters:**
Real-world testing > controlled environments. Your weird use cases help make this better for everyone.

Who's in? Let's stress test this thing! 💪

#QATesting #WebDevelopment #CommunityTesting #OpenSource #BugBounty

---

**Usage Tips:**
- Use Option 1 if your network is mostly technical/developers
- Use Option 2 if you have a mix of developers and product people
- Use Option 3 if you want to tell a story and get engagement
- Use Option 4 if you want quick, viral potential
- Use Option 5 if you want active participation and testing

**Engagement Boosters:**
- Post between 8-10 AM or 12-2 PM on Tuesday-Thursday for best reach
- Respond to every comment in the first hour
- Share a follow-up post with interesting metrics/feedback after 1 week
- Consider adding a poll: "What's most important in an interactive widget? Security / Speed / UX / Features"
