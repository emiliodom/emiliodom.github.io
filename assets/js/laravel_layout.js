const navLinks = [
    { href: "/laravel_guide/index.html", text: "Home" },
    { href: "/laravel_guide/module1.html", text: "1. Modern PHP & Setup" },
    { href: "/laravel_guide/module2.html", text: "2. Laravel 12 Core" },
    { href: "/laravel_guide/module3.html", text: "3. Database & Eloquent" },
    { href: "/laravel_guide/module4.html", text: "4. Livewire 3" },
    { href: "/laravel_guide/module5.html", text: "5. Alpine & Tailwind" },
    { href: "/laravel_guide/module6.html", text: "6. Filament Admin" },
    { href: "/laravel_guide/module7.html", text: "7. Queues & Redis" },
    { href: "/laravel_guide/module8.html", text: "8. Testing & CI/CD" },
    { href: "/laravel_guide/capstone.html", text: "🏆 Capstone Project" },
    { href: "/laravel_guide/interview_index.html", text: "📝 Interview Prep" }
];

function initLayout() {
    // 0. Inject Global Nav (if not present)
    if (!document.querySelector('.site-nav')) {
        const script = document.createElement('script');
        script.src = '/assets/js/global-nav.js';
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
                a.style.backgroundColor = '#ff2d20'; // Laravel Red
                a.style.color = 'white';
            }
            nav.appendChild(a);
        });
    }

    // 3. Inject Footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
            <p>Laravel TALL Stack Curriculum - Senior Developer Edition</p>
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
