
const navLinks = [
    { href: "index.html", text: "Home" },
    { href: "module0.html", text: "0. JS Prep" },
    { href: "module1.html", text: "1. Fundamentals" },
    { href: "module2.html", text: "2. Hooks & Lifecycle" },
    { href: "module3.html", text: "3. Routing & API" },
    { href: "module4.html", text: "4. State & Forms" },
    { href: "module5.html", text: "5. Advanced Patterns" },
    { href: "module6.html", text: "6. Global State" },
    { href: "module7.html", text: "7. Testing" },
    { href: "module8.html", text: "8. Pro Workflow" },
    { href: "module9.html", text: "9. Perf & Security" },
    { href: "capstone.html", text: "Capstone" },
    { href: "interview_index.html", text: "Interview Index" }
];

function initLayout() {
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
                a.style.backgroundColor = 'var(--link-color)';
                a.style.color = 'white';
            }
            nav.appendChild(a);
        });
    }

    // 3. Inject Footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
            <p>React Curriculum v2.0 - Professional Edition</p>
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
