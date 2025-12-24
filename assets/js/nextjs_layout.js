const navLinks = [
    { href: "/nextjs_guide/index.html", text: "Home" },
    { href: "/nextjs_guide/use_cases.html", text: "💼 Real World Use Cases" },
    { href: "/nextjs_guide/module1.html", text: "1. App Router & RSC" },
    { href: "/nextjs_guide/module2.html", text: "2. Routing & Layouts" },
    { href: "/nextjs_guide/module3.html", text: "3. Server Actions" },
    { href: "/nextjs_guide/module4.html", text: "4. Client Interactivity" },
    { href: "/nextjs_guide/module5.html", text: "5. Styling (Tailwind)" },
    { href: "/nextjs_guide/module6.html", text: "6. Database (Prisma)" },
    { href: "/nextjs_guide/module7.html", text: "7. Auth (NextAuth)" },
    { href: "/nextjs_guide/module8.html", text: "8. Deployment" },
    { href: "/nextjs_guide/quiz.html", text: "✅ Final Quiz" },
    { href: "/nextjs_guide/capstone.html", text: "🏆 Capstone Project" },
    { href: "/nextjs_guide/interview_index.html", text: "📝 Interview Prep" }
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
            <p>Next.js 14+ Curriculum - App Router Edition</p>
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
