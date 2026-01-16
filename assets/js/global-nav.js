const globalNavLinks = [
    { href: "/", text: "Home", exact: true },
    { href: "/react_guide/", text: "React" },
    { href: "/nextjs_guide/", text: "Next.js" },
    { href: "/laravel_guide/", text: "Laravel" },
    { href: "/python_guide/", text: "Python" },
    { href: "/devops_guide/", text: "DevOps" },
    { href: "/moodle_guide/", text: "Moodle" },
    { href: "/wordpress_guide/", text: "WordPress" },
    { href: "/greetings/", text: "Greetings" },
    { href: "/interview_guide/", text: "Interview Questions" },
];

function initGlobalNav() {
    // Prevent duplicate initialization
    if (document.querySelector(".site-nav")) return;

    // Try to find the site header, or fall back to generic header
    const header = document.querySelector("header.site-header") || document.querySelector("header");
    if (!header) return;

    const nav = document.createElement("nav");
    nav.className = "site-nav";
    nav.setAttribute("aria-label", "Main Navigation");

    const currentPath = window.location.pathname;

    globalNavLinks.forEach((link) => {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.text;

        // Active state logic
        let isActive = false;
        if (link.exact) {
            isActive = currentPath === "/" || currentPath === "/index.html";
        } else {
            isActive = currentPath.startsWith(link.href);
        }

        if (isActive) {
            a.className = "active";
            a.setAttribute("aria-current", "page");
        }

        nav.appendChild(a);
    });

    // Insert after header
    header.parentNode.insertBefore(nav, header.nextSibling);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGlobalNav);
} else {
    initGlobalNav();
}
