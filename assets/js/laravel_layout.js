const navLinks = [
    { href: "/laravel_guide/index.html", text: "Home" },
    { href: "/laravel_guide/use_cases.html", text: "💼 Real World Use Cases" },
    { href: "/laravel_guide/setup.html", text: "0. Setup" },
    { href: "/laravel_guide/module1.html", text: "1. Modern PHP & Setup" },
    { href: "/laravel_guide/module2.html", text: "2. Laravel 12 Core" },
    { href: "/laravel_guide/module3.html", text: "3. Database & Eloquent" },
    { href: "/laravel_guide/module4.html", text: "4. Livewire 3" },
    { href: "/laravel_guide/module5.html", text: "5. Alpine & Tailwind" },
    { href: "/laravel_guide/module6.html", text: "6. Filament Admin" },
    { href: "/laravel_guide/module7.html", text: "7. Testing" },
    { href: "/laravel_guide/module8.html", text: "8. Deployment" },
    { href: "/laravel_guide/quiz.html", text: "✅ Final Quiz" },
    { href: "/laravel_guide/capstone.html", text: "🏆 Capstone Project" },
    { href: "/laravel_guide/interview_index.html", text: "📝 Interview Prep" }
];

function loadSharedLayout() {
    const config = {
        navLinks: navLinks,
        themeColor: '#ff2d20', // Laravel Red
        footerHtml: `
            <p>Laravel TALL Stack Curriculum - Senior Developer Edition</p>
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
