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

function loadSharedLayout() {
    const config = {
        navLinks: navLinks,
        themeColor: '#f98012', // Moodle Orange
        footerHtml: `
            <p>Moodle Full Stack Developer Curriculum</p>
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
