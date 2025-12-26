/* filepath: /Users/emilio/Desktop/emiliodom.github.io/assets/js/python_layout.js */
const navLinks = [
    { href: "/python_guide/index.html", text: "Home" },
    { href: "/python_guide/use_cases.html", text: "💼 Real World Use Cases" },
    { href: "/python_guide/setup.html", text: "0. Environment Setup" },
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

function loadSharedLayout() {
    const config = {
        navLinks: navLinks,
        themeColor: null, // Use default active class
        footerHtml: '<p>&copy; 2025 Python Guide. Built for Senior Developers.</p>'
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
