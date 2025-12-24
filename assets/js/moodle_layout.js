const navLinks = [
    { href: "/moodle_guide/index.html", text: "Home" },
    { href: "/moodle_guide/module1.html", text: "1. Moodle Architecture" },
    { href: "/moodle_guide/module_php.html", text: "2. PHP for Moodle" },
    { href: "/moodle_guide/module2.html", text: "3. Plugin Development" },
    { href: "/moodle_guide/module3.html", text: "4. Theme Development" },
    { href: "/moodle_guide/module4.html", text: "5. Core APIs & Database" },
    { href: "/moodle_guide/module5.html", text: "6. Security & Performance" },
    { href: "/moodle_guide/module_power_user.html", text: "7. Power User & CLI" },
    { href: "/moodle_guide/module_enterprise.html", text: "8. Enterprise & CI/CD" },
    { href: "/moodle_guide/module_admin.html", text: "9. Site Administration" },
    { href: "/moodle_guide/use_cases.html", text: "10. Real-World Use Cases" },
    { href: "/moodle_guide/plugin_explorer.html", text: "💻 Code Explorer" },
    { href: "/moodle_guide/quiz.html", text: "✅ Final Quiz" },
    { href: "/moodle_guide/interview_index.html", text: "📝 Interview Prep" }
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
                a.style.backgroundColor = '#f98012'; // Moodle Orange
                a.style.color = 'white';
            }
            nav.appendChild(a);
        });
    }

    // 3. Inject Footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
            <p>Moodle Full Stack Developer Curriculum</p>
            <p>&copy; ${new Date().getFullYear()} Emilio. All rights reserved.</p>
        `;
    }

    // 4. Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initLayout);
