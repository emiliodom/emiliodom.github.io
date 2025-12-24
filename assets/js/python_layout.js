/* filepath: /Users/emilio/Desktop/emiliodom.github.io/assets/js/python_layout.js */
const navLinks = [
    { href: "/python_guide/index.html", text: "Home" },
    { href: "/python_guide/use_cases.html", text: "💼 Real World Use Cases" },
    { href: "/python_guide/module1.html", text: "1. Advanced Python" },
    { href: "/python_guide/module2.html", text: "2. Web Frameworks (FastAPI/Django)" },
    { href: "/python_guide/module3.html", text: "3. Concurrency & AsyncIO" },
    { href: "/python_guide/module4.html", text: "4. Testing & Quality" },
    { href: "/python_guide/module5.html", text: "5. Data Science & Analysis" },
    { href: "/python_guide/module6.html", text: "6. Machine Learning Basics" },
    { href: "/python_guide/module7.html", text: "7. System Design & Architecture" },
    { href: "/python_guide/module8.html", text: "8. Database Interaction" },
    { href: "/python_guide/module9.html", text: "9. Packaging & Distribution" },
    { href: "/python_guide/module10.html", text: "10. Security Best Practices" },
    { href: "/python_guide/quiz.html", text: "✅ Final Quiz" },
    { href: "/python_guide/interview_index.html", text: "📝 Interview Prep" }
];

function initLayout() {
    // 0. Inject Global Nav
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
        nav.innerHTML = '';
        navLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            if (window.location.pathname.endsWith(link.href)) {
                a.className = 'active';
            }
            nav.appendChild(a);
        });
    }

    // 3. Inject Footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = '<p>&copy; 2025 Python Guide. Built for Senior Developers.</p>';
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

// Apply theme on load
if (localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}
