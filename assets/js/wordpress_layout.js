const navLinks = [
    { href: "/wordpress_guide/index.html", text: "Home" },
    { href: "/wordpress_guide/use_cases.html", text: "💼 Real World Use Cases" },
    { href: "/wordpress_guide/module1.html", text: "1. Modern Setup (Bedrock)" },
    { href: "/wordpress_guide/module2.html", text: "2. Timber & Twig" },
    { href: "/wordpress_guide/module3.html", text: "3. Advanced Gutenberg" },
    { href: "/wordpress_guide/module4.html", text: "4. DB & Performance" },
    { href: "/wordpress_guide/module5.html", text: "5. AWS Fargate & CI/CD" },
    { href: "/wordpress_guide/module6.html", text: "6. Headless WordPress" },
    { href: "/wordpress_guide/module7.html", text: "7. Enterprise Security" },
    { href: "/wordpress_guide/module8.html", text: "8. Plugin Development" },
    { href: "/wordpress_guide/module9.html", text: "9. WooCommerce Scale" },
    { href: "/wordpress_guide/module10.html", text: "10. Migration & Legacy" },
    { href: "/wordpress_guide/quiz.html", text: "✅ Final Quiz" },
    { href: "/wordpress_guide/interview_index.html", text: "📝 Interview Prep" }
];

function initLayout() {
    // 0. Inject Global Nav (if not present)
    if (!document.querySelector('.site-nav')) {
        const script = document.createElement('script');
        script.src = '../assets/js/global-nav.js';
        document.head.appendChild(script);
    }

    // 1. Inject Theme Toggle
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.textContent = '🌓 Theme';
    themeToggle.onclick = toggleTheme;
    document.body.appendChild(themeToggle);

    // 2. Inject Navigation
    const nav = document.querySelector('nav');
    if (nav) {
        nav.innerHTML = ''; // Clear existing if any
        navLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            if (window.location.pathname.endsWith(link.href)) {
                a.style.backgroundColor = '#21759b'; // WordPress Blue
                a.style.color = 'white';
            }
            nav.appendChild(a);
        });
    }

    // 3. Inject Footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
            <p>Enterprise WordPress Engineering - High Performance & Scalability</p>
        `;
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}
