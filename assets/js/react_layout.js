const navLinks = [
    { href: "/react_guide/index.html", text: "Home" },
    { href: "/react_guide/use_cases.html", text: "💼 Real World Use Cases" },
    { href: "/react_guide/setup.html", text: "0. Setup" },
    { href: "/react_guide/module0.html", text: "0.5 JS Prep" },
    { href: "/react_guide/module1.html", text: "1. React Basics" },
    { href: "/react_guide/module2.html", text: "2. Hooks Deep Dive" },
    { href: "/react_guide/module3.html", text: "3. Routing & API" },
    { href: "/react_guide/module4.html", text: "4. State & Forms" },
    { href: "/react_guide/module5.html", text: "5. Advanced Patterns" },
    { href: "/react_guide/module6.html", text: "6. Global State" },
    { href: "/react_guide/module7.html", text: "7. Testing" },
    { href: "/react_guide/module8.html", text: "8. Pro Workflow" },
    { href: "/react_guide/module9.html", text: "9. Perf & Security" },
    { href: "/react_guide/capstone.html", text: "Capstone" },
    { href: "/react_guide/interview_index.html", text: "Interview Index" },
    { href: "/react_guide/quiz.html", text: "✅ Final Quiz" }
];

function loadSharedLayout() {
    const config = {
        navLinks: navLinks,
        themeColor: 'var(--link-color)',
        footerHtml: `
            <p>React Curriculum v2.0 - Professional Edition</p>
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
