/* filepath: /Users/emilio/Desktop/emiliodom.github.io/assets/js/devops_layout.js */
const navLinks = [
    { href: "/devops_guide/index.html", text: "Home" },
    { href: "/devops_guide/use_cases.html", text: "💼 Real World Use Cases" },
    { href: "/devops_guide/setup.html", text: "0. Environment Setup" },
    { href: "/devops_guide/module1.html", text: "1. Docker Mastery" },
    { href: "/devops_guide/module2.html", text: "2. Kubernetes Basics" },
    { href: "/devops_guide/module3.html", text: "3. Advanced K8s" },
    { href: "/devops_guide/module4.html", text: "4. CI/CD Pipelines" },
    { href: "/devops_guide/module5.html", text: "5. Infrastructure as Code (Terraform)" },
    { href: "/devops_guide/module6.html", text: "6. Configuration Management (Ansible)" },
    { href: "/devops_guide/module7.html", text: "7. Monitoring & Logging" },
    { href: "/devops_guide/module8.html", text: "8. Cloud Security (DevSecOps)" },
    { href: "/devops_guide/module9.html", text: "9. Networking for DevOps" },
    { href: "/devops_guide/module10.html", text: "10. Site Reliability Engineering (SRE)" },
    { href: "/devops_guide/quiz.html", text: "✅ Final Quiz" },
    { href: "/devops_guide/interview_index.html", text: "📝 Interview Prep" }
];

function loadSharedLayout() {
    const config = {
        navLinks: navLinks,
        themeColor: null, // Use default active class
        footerHtml: '<p>&copy; 2025 DevOps Guide. Built for Senior Developers.</p>'
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
