const navLinks = [
    { href: "/nextjs_guide/index.html", text: "Home" },
    { href: "/nextjs_guide/use_cases.html", text: "💼 Real World Use Cases" },
    { href: "/nextjs_guide/setup.html", text: "0. Setup" },
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

function loadSharedLayout() {
    const config = {
        navLinks: navLinks,
        themeColor: 'var(--link-color)',
        footerHtml: `
            <p>Next.js 14+ Curriculum - App Router Edition</p>
            <p>&copy; ${new Date().getFullYear()} Emilio. All rights reserved.</p>
        `
    };

    if (typeof window.initGuideLayout === 'function') {
        window.initGuideLayout(config);
    } else {
        const script = document.createElement('script');
        script.src = '../assets/js/guide-layout.js';
        script.onload = () => {
             window.initGuideLayout(config);
        };
        document.head.appendChild(script);
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', loadSharedLayout);
