/**
 * Shared Layout Logic for all Guides
 * Handles: Global Nav, Theme Toggle, Local Nav, Footer
 */

window.initGuideLayout = function(config) {
    const { navLinks, themeColor, footerHtml } = config;

    // 0. Inject Global Nav (if not present)
    if (!document.querySelector('.site-nav')) {
        const script = document.createElement('script');
        script.src = '../assets/js/global-nav.js';
        document.head.appendChild(script);
    }

    // 1. Inject Theme Toggle (if not present)
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.textContent = '🌓 Theme';
        themeToggle.onclick = toggleTheme;
        document.body.appendChild(themeToggle);
    }

    // 2. Inject Navigation
    const nav = document.querySelector('nav');
    if (nav) {
        nav.innerHTML = ''; // Clear existing if any
        
        // Create a container for better styling control if needed, or just append 'a' tags
        navLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            
            // Active State Logic
            // Use a.pathname to get the resolved absolute path from the link
            const normalize = (p) => p.replace(/\/index\.html$/, '/').replace(/\/$/, '');
            const normalizedCurrent = normalize(window.location.pathname);
            const normalizedLink = normalize(a.pathname);

            if (normalizedCurrent === normalizedLink) {
                if (themeColor) {
                    a.style.backgroundColor = themeColor;
                    a.style.color = 'white';
                } else {
                    a.classList.add('active'); // Fallback to CSS class
                }
            }
            nav.appendChild(a);
        });
    }

    // 3. Inject Footer
    const footer = document.querySelector('footer');
    if (footer && footerHtml) {
        footer.innerHTML = footerHtml;
    }

    // 4. Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
};

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
