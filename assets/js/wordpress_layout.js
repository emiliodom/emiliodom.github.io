const navLinks = [
    { href: "/wordpress_guide/index.html", text: "Home" },
    { href: "/wordpress_guide/setup.html", text: "0. Environment Setup" },
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

function loadSharedLayout() {
    const config = {
        navLinks: navLinks,
        themeColor: '#21759b', // WordPress Blue
        footerHtml: `
            <p>Enterprise WordPress Engineering - High Performance & Scalability</p>
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
