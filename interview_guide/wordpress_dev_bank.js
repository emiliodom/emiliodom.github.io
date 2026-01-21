// Interview Guide Question Bank (WordPress Developer)
// Generated from interview_guide/index.html to keep data separate from UI.
// Edit this file to add questions/challenges and future revisions.

(function () {
    "use strict";

    const bank = {
        meta: {
            title: "WordPress Developer Interview Bank",
            generatedFrom: "interview_guide/index.html",
            generatedAt: new Date().toISOString(),
            schemaVersion: 1,
        },

        // Optional topic registry (UI will fall back gracefully if missing).
        // Add summaries/default levels here to make scanning revisions easier.
        topics: {
            WordPress: {
                summary: "Core concepts, template hierarchy, WP lifecycle, content modeling, plugin/theme boundaries",
                defaultLevel: "Mid/Senior",
            },
            Caching: {
                summary:
                    "Object cache vs transients, invalidation strategy, stampedes/race conditions, cache key design",
                defaultLevel: "Senior",
            },
            CSS: {
                summary:
                    "Layout (Flexbox/Grid), stacking contexts, responsive patterns, component-friendly CSS and modern features",
                defaultLevel: "Junior/Mid",
            },
            JavaScript: {
                summary: "Event loop, async patterns, browser APIs, data fetching, performance and correctness",
                defaultLevel: "Mid",
            },
            React: {
                summary: "Hooks fundamentals, state/effects, performance trade-offs, component architecture",
                defaultLevel: "Mid/Senior",
            },
            Hooks: {
                summary: "Actions vs filters, hook priorities, query modification, plugin/theme extensibility patterns",
                defaultLevel: "Mid/Senior",
            },
            Security: {
                summary:
                    "Nonces/CSRF, capability checks, escaping/sanitization, supply-chain risks, hardening and incident response",
                defaultLevel: "Senior",
            },
            Performance: {
                summary:
                    "Profiling, database bottlenecks, N+1, object cache, query optimization, front-end performance",
                defaultLevel: "Senior",
            },
            Gutenberg: {
                summary:
                    "Block editor concepts, block registration, custom blocks, block patterns, ACF blocks trade-offs",
                defaultLevel: "Mid/Senior",
            },
            "REST API": {
                summary: "WP REST endpoints, auth, permissions, caching, webhook integrations, external systems",
                defaultLevel: "Senior",
            },
            Database: {
                summary:
                    "MySQL fundamentals, indexing, meta_query pitfalls, custom tables, migrations, reporting queries",
                defaultLevel: "Senior",
            },
            "PHP / OOP": {
                summary: "Modern PHP (7/8) fundamentals, OOP design, DI, testing seams, Composer/autoloading",
                defaultLevel: "Mid/Senior",
            },
            Testing: {
                summary: "Unit/integration testing, WP_Mock, WP-CLI testing, regression strategy and CI",
                defaultLevel: "Senior",
            },
            DevOps: {
                summary: "Deployments, environments, configuration, CI/CD, logs/monitoring, rollback strategy",
                defaultLevel: "Mid/Senior",
            },
            WooCommerce: {
                summary: "Checkout/cart flows, hooks, performance, extensibility, plugin interoperability",
                defaultLevel: "Senior",
            },
            Headless: {
                summary: "Headless WP trade-offs, preview/drafts, auth, caching, SSR/ISR/SPA considerations",
                defaultLevel: "Senior",
            },
            Migration: {
                summary: "Legacy migrations, content modeling, URL mapping, SEO preservation, data validation",
                defaultLevel: "Senior",
            },
            "Design Patterns": {
                summary: "Practical patterns (adapter/observer), maintainability, extensibility, seams for testing",
                defaultLevel: "Mid/Senior",
            },
            "Dependency Injection": {
                summary: "Constructor injection, inversion of control, testability, avoiding globals/singletons",
                defaultLevel: "Mid/Senior",
            },
            "Object Cache": {
                summary: "Persistent cache backends (Redis/Memcached), cache groups, keying, flushing strategy",
                defaultLevel: "Senior",
            },
            "Rapid Fire": {
                summary: "Fast fundamentals check (PHP/HTML/WordPress basics)",
                defaultLevel: "Junior/Mid",
            },
            Architecture: {
                summary:
                    "Design fundamentals, SOLID trade-offs, patterns, DI boundaries, maintainability and test seams",
                defaultLevel: "Senior",
            },
            "Role Fit (Ntara)": {
                summary:
                    "Consulting workflows, cross-functional collaboration, translating requirements to deliverables, client constraints",
                defaultLevel: "Senior",
            },
        },

        // Optional aliases to keep topic navigation compact and consistent.
        // UI can normalize topics using this map.
        topicAliases: {
            "Unit Testing": "Testing",
            "WP Hooks": "Hooks",
            "WordPress Architecture": "WordPress",
            "WP Core": "WordPress",
            "WP Tricky": "WordPress",
            "Theme.json": "Gutenberg",
            SOLID: "Architecture",
            "Design Patterns": "Architecture",
            "Dependency Injection": "Architecture",
            Algorithms: "Architecture",
            PHP: "PHP / OOP",
            "PHP 8": "PHP / OOP",
            "PHP Extensions": "PHP / OOP",
            "PHP Tricky": "PHP / OOP",
            "PHP-FPM": "PHP / OOP",
            Server: "DevOps",
            Docker: "DevOps",
            Git: "DevOps",
            "JS Tricky": "JavaScript",
            Regex: "JavaScript",
            "React Hooks": "React",
            "Object Cache": "Caching",
            Headless: "WordPress",
            Migration: "WordPress",
            General: "Role Fit (Ntara)",
            Leadership: "Role Fit (Ntara)",
        },

        // Practical exercises. These render in the UI under "Challenges".
        challenges: [
            {
                id: "wp-theme-figma",
                title: "Theme implementation from Figma",
                seniority: "Mid/Senior",
                timebox: "3–4 hours",
                summary: "Build a small custom theme page template (responsive + accessible) and wire it to WP data.",
                prompt: "Given a landing page design (Figma), implement it as a WordPress theme template with clean PHP, proper escaping, and a minimal build pipeline.",
                deliverables: [
                    "Theme or child theme with a dedicated page template",
                    "README explaining local setup and build steps",
                    "Notes on performance + accessibility checks you ran",
                ],
                evaluation: [
                    "Template hierarchy + enqueue strategy",
                    "Accessibility (semantic HTML, focus order, contrast)",
                    "Security (escaping, nonces for forms)",
                    "Maintainability (structure, naming, separation of concerns)",
                ],
            },
            {
                id: "wp-plugin-crm-integration",
                title: "Plugin: CRM integration + webhooks",
                seniority: "Senior",
                timebox: "2–3 hours",
                summary:
                    "Implement a small plugin that syncs submissions to an external CRM with retries, logging, and safe auth.",
                prompt: "Create a plugin that posts form submissions to a mock CRM REST API. Use a background/async mechanism where appropriate, add rate-limit/backoff handling, and include a debug log toggle.",
                deliverables: [
                    "Plugin code with a settings page (API base URL + token)",
                    "A webhook receiver endpoint and signature validation (HMAC)",
                    "Retry/backoff strategy and a clear failure mode",
                ],
                evaluation: [
                    "Security (capability checks, nonce usage, safe storage)",
                    "Resilience (timeouts, retries, idempotency keys)",
                    "Observability (structured logs, correlation IDs)",
                    "Code quality (separation of concerns, test seams)",
                ],
            },
            {
                id: "wp-gutenberg-custom-block",
                title: "Gutenberg custom block (ACF vs native)",
                seniority: "Mid/Senior",
                timebox: "2–3 hours",
                summary:
                    "Build one block with editable fields and server-side render, explain ACF vs native block trade-offs.",
                prompt: "Implement a “Callout” block that supports title/body/variant and renders on the server. Provide both a native block approach or justify choosing ACF Blocks.",
                deliverables: [
                    "Block registration + editor UX",
                    "Server-side render callback/template",
                    "Short write-up: ACF blocks vs native blocks",
                ],
                evaluation: [
                    "Editor UX + maintainability",
                    "Rendering correctness and escaping",
                    "Forward-compatibility and deprecation strategy",
                ],
            },
            {
                id: "wp-performance-audit",
                title: "Performance audit: slow page diagnosis",
                seniority: "Senior",
                timebox: "60–90 minutes",
                summary: "Given a “slow” WP page, identify bottlenecks and propose fixes with measurable impact.",
                prompt: "You are given a staging URL and WP admin access. Find the top 3 contributors to TTFB and propose concrete changes (queries, caching, rendering, asset loading).",
                deliverables: [
                    "A short report with evidence (Query Monitor screenshots/logs)",
                    "Fix list prioritized by impact/effort",
                    "One implemented improvement (code or config)",
                ],
                evaluation: [
                    "Correct diagnosis (not guesswork)",
                    "Pragmatic prioritization",
                    "Understanding of WP internals and caches",
                ],
            },
            {
                id: "consulting-scope-estimate",
                title: "Consulting: scope + estimate + trade-offs",
                seniority: "Senior",
                timebox: "45–60 minutes",
                summary:
                    "Turn a vague client request into a scoped plan with risks, assumptions, and a defendable estimate.",
                prompt: "A client asks: “Integrate WordPress with our CRM and ensure leads sync reliably.” Produce a 1–2 page scope: requirements, assumptions, milestones, out-of-scope, risk register, and an estimate with ranges.",
                deliverables: [
                    "Scope doc with acceptance criteria",
                    "Milestones + estimate ranges (best/likely/worst)",
                    "Risk register (tech + stakeholder) and mitigations",
                ],
                evaluation: [
                    "Clarity (constraints, assumptions, success metrics)",
                    "Stakeholder alignment (trade-offs made explicit)",
                    "Technical correctness (WP integration realities)",
                ],
            },
            {
                id: "wp-security-hardening",
                title: "Security hardening + incident response mini-review",
                seniority: "Senior",
                timebox: "60–90 minutes",
                summary:
                    "Review a WP site/plugin snippet for common vulnerabilities and propose concrete fixes + monitoring.",
                prompt: "Given a small plugin/theme code sample and admin access to staging, identify at least 5 issues (CSRF, capability checks, escaping/sanitization, unsafe file ops, SSRF, etc.). Propose fixes and what telemetry you’d add.",
                deliverables: [
                    "Findings list with severity and remediation",
                    "One implemented fix (patch)",
                    "Monitoring/logging recommendations",
                ],
                evaluation: [
                    "Correct vulnerability identification",
                    "Practical remediation and regression prevention",
                    "Security mindset without breaking product UX",
                ],
            },
        ],

        questions: [
            // --- TOPIC: OBJECT CACHING & TRANSIENTS ---
            {
                topic: "Caching",
                q: "In a high-traffic WordPress environment (e.g., Redis enabled), what is the critical difference between `wp_cache_set` and `set_transient`?",
                options: [
                    "`set_transient` always writes to the DB options table, `wp_cache_set` is memory only.",
                    "`wp_cache_set` is for the current request only, `set_transient` is persistent across requests.",
                    "If an external object cache is enabled, `set_transient` acts as a wrapper for `wp_cache_set`. If not, it writes to the DB.",
                    "`set_transient` supports expiration, but `wp_cache_set` does not.",
                ],
                a: 2,
            },
            {
                topic: "Caching",
                q: "You are implementing a view counter for a post on a site with 1M daily hits. Why is updating a post meta value on every page load a bad architectural decision?",
                options: [
                    "It fills the post_meta table with duplicate rows.",
                    "It busts the cache for the entire post object on every read, causing a stampede on the DB.",
                    "It causes a deadlock in the PHP worker.",
                    "Post meta cannot handle integers larger than 32-bit.",
                ],
                a: 1,
            },
            {
                topic: "Caching",
                q: "What is a 'Race Condition' when using `get_transient` and `set_transient` for a heavy calculation?",
                options: [
                    "Multiple workers recompute the same missing value concurrently.",
                    "The transient expires before it is read.",
                    "The database locks the options table preventing reads.",
                    "The object cache runs out of memory.",
                ],
                a: 0,
                explain:
                    "If two (or more) requests read an empty/missing transient at the same time, they can all run the expensive work and then all write the result. Mitigations include locking/mutex, request coalescing, or storing an 'in progress' sentinel.",
            },
            {
                topic: "Caching",
                q: "How does the `wp_suspend_cache_addition()` function impact performance during bulk imports?",
                options: [
                    "It stops WordPress from adding new data to the object cache to prevent memory exhaustion.",
                    "It deletes the current cache to ensure fresh data.",
                    "It pauses the Redis server connection.",
                    "It forces all queries to go directly to the database without caching.",
                ],
                a: 0,
            },

            // --- TOPIC: WORDPRESS HOOKS & CORE ---
            {
                topic: "Hooks",
                q: "You need to modify a query BEFORE it executes, but only for the main blog loop. Which hook is most appropriate?",
                options: ["the_content", "pre_get_posts", "wp_head", "query_posts"],
                a: 1,
            },
            {
                topic: "Hooks",
                q: "What is the specific risk of using `add_action('init', ...)` to perform a redirect based on `$_POST` data without a nonce check?",
                options: [
                    "It causes a White Screen of Death.",
                    "It is susceptible to CSRF (Cross-Site Request Forgery) attacks.",
                    "The init hook fires too late for redirects.",
                    "It will cause an infinite redirect loop.",
                ],
                a: 1,
            },
            {
                topic: "Hooks",
                q: "Explain 'Priority' in WordPress hooks. If two plugins filter `the_content` with priority 10 and 11, which runs last?",
                options: [
                    "Priority 10 runs last.",
                    "Priority 11 runs last, overwriting or appending to the result of 10.",
                    "They run simultaneously asynchronously.",
                    "WordPress executes them in alphabetical order of the function name.",
                ],
                a: 1,
            },

            // --- TOPIC: DEPENDENCY INJECTION & PATTERNS ---
            {
                topic: "Design Patterns",
                q: "Why is the Singleton pattern often discouraged in modern testable WordPress development in favor of Dependency Injection?",
                options: [
                    "Singletons are slower to execute.",
                    "Singletons create global state that is difficult to mock/reset during unit tests.",
                    "WordPress does not support static classes.",
                    "Singletons cannot use WordPress hooks.",
                ],
                a: 1,
            },
            {
                topic: "Design Patterns",
                q: "How would you implement Dependency Injection in a WordPress plugin context?",
                options: [
                    "Pass dependencies via the `global` keyword.",
                    "Use a Container (like PHP-DI) to instantiate classes and pass dependencies via the constructor.",
                    "Use `require_once` inside every method.",
                    "Rely on `apply_filters` to fetch objects.",
                ],
                a: 1,
            },
            {
                topic: "SOLID",
                q: "In the context of SOLID, what does the 'O' (Open/Closed) principle suggest for a custom plugin?",
                options: [
                    "The code should be open for modification but closed for extension.",
                    "The code should be open for extension (via hooks/interfaces) but closed for modification.",
                    "Database connections should be opened and closed immediately.",
                    "Open source code must be closed to proprietary licenses.",
                ],
                a: 1,
            },

            // --- TOPIC: PHP & PERFORMANCE ---
            {
                topic: "PHP",
                q: "What is the performance implication of using `include` vs `require_once` inside a loop?",
                options: [
                    "They are identical in PHP 7+.",
                    "`require_once` checks if the file is already loaded, adding overhead on every iteration.",
                    "`include` is fatal on failure, making it safer.",
                    "`require_once` caches the file content in RAM.",
                ],
                a: 1,
            },
            {
                topic: "PHP",
                q: "What does the `yield` keyword do in PHP, and how does it help with large data exports?",
                options: [
                    "It pauses the script execution to wait for user input.",
                    "It creates a Generator, allowing you to iterate over large datasets without loading the whole array into memory.",
                    "It yields control to the frontend JavaScript.",
                    "It stops the PHP script to prevent timeouts.",
                ],
                a: 1,
            },

            // --- TOPIC: REACT & JS ---
            {
                topic: "React",
                q: "In React, what is the primary purpose of `useMemo`?",
                options: [
                    "To memorize the state of the component.",
                    "To memoize expensive calculations so they don't re-run on every render unless dependencies change.",
                    "To cache API calls automatically.",
                    "To prevent the component from mounting.",
                ],
                a: 1,
            },
            {
                topic: "React",
                q: "You are building a Gutenberg block. When does `useEffect` cleanup function run?",
                options: [
                    "Immediately after the component mounts.",
                    "Only when the browser window closes.",
                    "Before the component unmounts or before the effect re-runs due to dependency changes.",
                    "When the Redux state changes.",
                ],
                a: 2,
            },
            {
                topic: "JavaScript",
                q: "Explain the 'Event Loop' in JavaScript. What happens if you run a heavy synchronous calculation on the main thread?",
                options: [
                    "The calculation runs in the background.",
                    "It blocks the rendering and user interaction until finished, freezing the UI.",
                    "It creates a new thread automatically.",
                    "JavaScript rejects the operation.",
                ],
                a: 1,
            },
            {
                topic: "JavaScript",
                q: "What is the difference between `==` and `===`?",
                options: [
                    "`==` checks value and type, `===` checks only value.",
                    "`==` checks value with type coercion, `===` checks value and type (strict).",
                    "`===` is an assignment operator.",
                    "There is no difference.",
                ],
                a: 1,
            },

            // --- TOPIC: GIT ---
            {
                topic: "Git",
                q: "You are working on a feature branch and the `main` branch has advanced. You want a linear history. Do you Merge or Rebase?",
                options: ["Merge", "Rebase", "Cherry-pick", "Reset"],
                a: 1,
            },
            {
                topic: "Git",
                q: "What does `git bisect` do?",
                options: [
                    "It cuts the repository size in half.",
                    "It uses binary search to find the specific commit that introduced a bug.",
                    "It merges two branches with resolving conflicts automatically.",
                    "It deletes old branches.",
                ],
                a: 1,
            },

            // --- TOPIC: UNIT TESTING ---
            {
                topic: "Unit Testing",
                q: "In PHPUnit, what is the difference between a Mock and a Stub?",
                options: [
                    "Stubs are for database testing, Mocks are for API testing.",
                    "A Stub provides canned answers to calls. A Mock expects specific calls (behavior verification).",
                    "There is no difference.",
                    "Mocks are used in production, Stubs in development.",
                ],
                a: 1,
            },
            {
                topic: "Unit Testing",
                q: "How do you test a function that depends on `wp_remote_get` without making an actual HTTP request?",
                options: [
                    "You can't, you must test the live API.",
                    "Use `pre_http_request` filter or a library like WP_Mock to intercept and return a fake response.",
                    "Comment out the API call.",
                    "Use a local DNS resolver.",
                ],
                a: 1,
            },

            // --- TOPIC: CSS/HTML ---
            {
                topic: "CSS",
                q: "What is the 'Specificty' hierarchy in CSS (Low to High)?",
                options: [
                    "ID, Class, Tag, Inline",
                    "Tag, Class, ID, Inline",
                    "Class, Tag, Inline, ID",
                    "Inline, ID, Class, Tag",
                ],
                a: 1,
            },
            {
                topic: "CSS",
                q: "What does `box-sizing: border-box` do?",
                options: [
                    "It adds a border to the box.",
                    "It calculates width/height including padding and border, preventing layout breakage.",
                    "It removes the margin.",
                    "It makes the element a flex container.",
                ],
                a: 1,
            },

            // --- ADDED KILLER SENIOR QUESTIONS ---
            {
                topic: "Security",
                q: "Why is `prepare()` essential when using `$wpdb`?",
                options: [
                    "It improves query speed.",
                    "It protects against SQL Injection by escaping inputs.",
                    "It formats the date correctly.",
                    "It connects to the database.",
                ],
                a: 1,
            },
            {
                topic: "WordPress Architecture",
                q: "What is the role of the Hierarchy in the Template Loading process?",
                options: [
                    "It determines user roles.",
                    "It determines which PHP file (single.php, index.php) loads based on the query.",
                    "It organizes the CSS files.",
                    "It sorts the database results.",
                ],
                a: 1,
            },
            {
                topic: "React",
                q: "What is the 'Prop Drilling' problem and how do you solve it?",
                options: [
                    "Props breaking the layout. Solve with CSS.",
                    "Passing data through many layers of components. Solve with Context API or Redux.",
                    "Props being undefined. Solve with TypeScript.",
                    "Components rendering too fast.",
                ],
                a: 1,
            },
            {
                topic: "Design Patterns",
                q: "Explain the Factory Pattern.",
                options: [
                    "A class that fixes other classes.",
                    "A creational pattern that uses a method to create objects without specifying the exact class.",
                    "A way to organize CSS files.",
                    "A database optimization technique.",
                ],
                a: 1,
            },
            {
                topic: "PHP",
                q: "What are Trait conflicts and how do you resolve them?",
                options: [
                    "Traits cannot conflict.",
                    "When two traits have the same method. Resolve using `insteadof` or `as` operators.",
                    "When a trait is too large.",
                    "By deleting one trait.",
                ],
                a: 1,
            },
            {
                topic: "WordPress Architecture",
                q: "What is the difference between `flush_rewrite_rules()` and manual `.htaccess` editing?",
                options: [
                    "Manual editing is safer.",
                    "Flush regenerates rewrite rules and updates .htaccess; run it only on activation.",
                    "They are the same.",
                    "Flush deletes the database.",
                ],
                a: 1,
                explain:
                    "`flush_rewrite_rules()` regenerates WordPress’s rewrite rules and may update `.htaccess` programmatically. It’s expensive, so you typically run it on plugin/theme activation (or when rewrites change), not on every request.",
            },
            {
                topic: "WordPress Architecture",
                q: "When using `WP_Query`, what is the danger of `posts_per_page => -1`?",
                options: [
                    "It returns no posts.",
                    "It can cause memory exhaustion (OOM) by loading thousands of post objects into RAM.",
                    "It is faster than specifying a number.",
                    "It breaks the pagination.",
                ],
                a: 1,
            },
            {
                topic: "Hooks",
                q: "What is the difference between `do_action` and `apply_filters`?",
                options: [
                    "`do_action` executes code at a point. `apply_filters` modifies a value and must return it.",
                    "`do_action` is for styles, `apply_filters` for scripts.",
                    "`do_action` returns data, `apply_filters` does not.",
                    "They are aliases for the same function.",
                ],
                a: 0,
            },
            {
                topic: "Hooks",
                q: "How do you remove an anonymous function (closure) attached to a hook?",
                options: [
                    "Simply call remove_action with the closure.",
                    "You need the same callable reference you added.",
                    "Use `remove_all_actions`.",
                    "Use the priority number.",
                ],
                a: 1,
                explain:
                    "To remove a hook, WordPress needs the exact same callable you originally added. For anonymous closures, you can’t recreate that reference later unless you stored it (e.g., in a property) or used a named function/method.",
            },
            {
                topic: "Caching",
                q: "What is 'Cache Invalidation' and why is it considered one of the hardest things in CS?",
                options: [
                    "Deleting cache files.",
                    "Deciding when cached data is stale and must be purged.",
                    "Validating HTML.",
                    "Encrypting the cache.",
                ],
                a: 1,
                explain:
                    "Cache invalidation is hard because you must know exactly what depends on what, and invalidate at the right time/scope. Too aggressive invalidation kills cache value; too lax serves stale data.",
            },
            {
                topic: "Security",
                q: "What is a Nonce in WordPress and what attack does it prevent?",
                options: [
                    "Number used ONCE. Prevents SQL Injection.",
                    "Number used ONCE. Prevents CSRF (Cross-Site Request Forgery).",
                    "A random salt for passwords.",
                    "A caching key.",
                ],
                a: 1,
            },
            {
                topic: "Unit Testing",
                q: "What is TDD (Test Driven Development)?",
                options: [
                    "Testing after development.",
                    "Writing the test (which fails) BEFORE writing the code to make it pass.",
                    "Testing only the database.",
                    "Testing by the QA team.",
                ],
                a: 1,
            },
            {
                topic: "Git",
                q: "What is the difference between `git fetch` and `git pull`?",
                options: [
                    "They are the same.",
                    "`fetch` gets changes but doesn't merge. `pull` does `fetch` + `merge`.",
                    "`pull` uploads files.",
                    "`fetch` is deprecated.",
                ],
                a: 1,
            },
            {
                topic: "React",
                q: "What are Higher-Order Components (HOC)?",
                options: [
                    "Components at the top of the page.",
                    "Functions that take a component and return a new component (logic reuse).",
                    "Components that use Redux.",
                    "Class components.",
                ],
                a: 1,
            },
            {
                topic: "React",
                q: "Why should you never call hooks inside loops or conditions?",
                options: [
                    "It's a style preference.",
                    "React relies on the call order of hooks to maintain state consistency between renders.",
                    "It causes syntax errors.",
                    "It makes the code slow.",
                ],
                a: 1,
            },
            // --- TOPIC: SOLID PRINCIPLES ---
            {
                topic: "SOLID",
                q: "In the context of the Single Responsibility Principle (SRP), why is a 'God Class' (a class that manages everything) problematic for maintenance?",
                options: [
                    "It uses too much memory.",
                    "It makes the code tightly coupled; changing one feature risks breaking unrelated features.",
                    "It cannot be instantiated.",
                    "It is not supported by PHP 8.",
                ],
                a: 1,
            },
            {
                topic: "SOLID",
                q: "Explain the Liskov Substitution Principle (LSP) with a practical example.",
                options: [
                    "A child class must be able to replace a parent class without breaking the application logic.",
                    "You should always substitute interfaces for classes.",
                    "Child classes must have fewer methods than the parent.",
                    "Variables should be named after their type.",
                ],
                a: 0,
            },
            {
                topic: "SOLID",
                q: "How does Dependency Inversion help when writing Unit Tests?",
                options: [
                    "It allows you to inject Mock objects instead of real dependencies (like a Database connection).",
                    "It inverts the order of test execution.",
                    "It removes the need for tests entirely.",
                    "It forces you to use static methods.",
                ],
                a: 0,
            },
            {
                topic: "Design Patterns",
                q: "Which design pattern is best suited for a system that needs to notify multiple users/services when a new Post is published?",
                options: ["Singleton Pattern", "Observer Pattern", "Factory Pattern", "Decorator Pattern"],
                a: 1,
            },

            // --- TOPIC: ADVANCED PHP ---
            {
                topic: "PHP",
                q: "What is the primary difference between an `Interface` and an `Abstract Class` in PHP?",
                options: [
                    "Abstract classes can have implementation (code) for some methods; Interfaces only define method signatures.",
                    "Interfaces are faster than Abstract classes.",
                    "You can implement multiple Abstract classes but only one Interface.",
                    "Abstract classes are private; Interfaces are public.",
                ],
                a: 0,
            },
            {
                topic: "PHP",
                q: "What is the purpose of PHP Namespaces (PSR-4)?",
                options: [
                    "To encrypt the file names.",
                    "To prevent name collisions and organize code.",
                    "To organize files by date.",
                    "To replace folders in the file system.",
                ],
                a: 1,
                explain:
                    "Namespaces prevent class/function name collisions and improve organization. PSR-4 defines how namespaces map to directory paths for autoloaders (Composer).",
            },
            {
                topic: "PHP",
                q: "What is Late Static Binding (using `static::` instead of `self::`)?",
                options: [
                    "A way to bind variables late in the script execution.",
                    "It allows a child class to reference the called class rather than the defining class in inheritance scenarios.",
                    "It is a deprecated feature in PHP 8.",
                    "It prevents static methods from running.",
                ],
                a: 1,
            },
            {
                topic: "PHP",
                q: "How do Closures (Anonymous functions) handle variable scope from the parent context?",
                options: [
                    "They automatically inherit all variables.",
                    "You must manually import variables using the `use` keyword.",
                    "They cannot access parent variables.",
                    "They use global variables only.",
                ],
                a: 1,
            },

            // --- TOPIC: DATABASE & SCALABILITY ---
            {
                topic: "Database",
                q: "You need to search for posts based on a custom meta key. Why is a standard `meta_query` slow on a table with 1 million rows?",
                options: [
                    "Because `wp_postmeta` is not indexed by default.",
                    "Because the `meta_value` column is not indexed, forcing a full table scan.",
                    "Because WordPress limits query speed.",
                    "Because MySQL cannot handle text searches.",
                ],
                a: 1,
            },
            {
                topic: "Database",
                q: "When designing a high-scale plugin, when should you create a Custom Table instead of using Custom Post Types?",
                options: [
                    "Always, Custom Tables are cooler.",
                    "When you need high-volume, query-heavy structured data.",
                    "When you don't want the data to appear in the admin panel.",
                    "Never, always use CPTs.",
                ],
                a: 1,
                explain:
                    "Custom tables make sense for high-volume, structured data where you need indexed columns, complex filtering/sorting, and performance that `wp_postmeta` + `meta_query` can’t provide efficiently.",
            },
            {
                topic: "Database",
                q: "What is an SQL Injection attack, and how does `$wpdb->prepare` prevent it?",
                options: [
                    "An attack that deletes the database. `prepare` backs it up.",
                    "Malicious SQL code inserted into inputs. `prepare` escapes special characters to treat input as data, not code.",
                    "Injecting CSS into the database. `prepare` sanitizes HTML.",
                    "Overloading the server with requests.",
                ],
                a: 1,
            },
            {
                topic: "Performance",
                q: "What is the N+1 Query Problem?",
                options: [
                    "A math error in PHP.",
                    "Running 1 query, then N more queries inside a loop for related data.",
                    "Having one too many servers.",
                    "A problem with array indexing.",
                ],
                a: 1,
                explain:
                    "You fetch a list (1 query) and then issue an extra query per item (N queries). Fix with eager loading/joins, batching, caching, or reshaping the data access layer.",
            },

            // --- TOPIC: WORDPRESS INTERNALS ---
            {
                topic: "WordPress Architecture",
                q: "What is the difference between `site_url()` and `home_url()`?",
                options: [
                    "They are exactly the same.",
                    "site_url = WP install; home_url = site front URL.",
                    "`home_url` is for the admin dashboard.",
                    "`site_url` is deprecated.",
                ],
                a: 1,
                explain:
                    "`site_url()` points to the WordPress core installation location; `home_url()` is the public-facing site address (what visitors type). They differ when WordPress is installed in a subdirectory.",
            },
            {
                topic: "WordPress Architecture",
                q: "How does the WordPress Heartbeat API affect server load on high-traffic admin dashboards?",
                options: [
                    "It has no effect.",
                    "Frequent admin-ajax calls can increase CPU load.",
                    "It improves server speed by keeping the connection alive.",
                    "It only runs on the front end.",
                ],
                a: 1,
                explain:
                    "Heartbeat triggers periodic `admin-ajax.php` requests for autosave, post locking, etc. With many concurrent editors/admin users, it can increase PHP/DB load unless tuned (heartbeat settings/plugins) or offloaded.",
            },
            {
                topic: "WordPress Architecture",
                q: "What is the purpose of the `template_redirect` hook?",
                options: [
                    "To load the footer template.",
                    "To intercept requests before template loading.",
                    "To redirect 404 pages only.",
                    "To load CSS styles.",
                ],
                a: 1,
                explain:
                    "Runs after the query is set up but before the theme template loads. It’s commonly used for conditional redirects, access checks, and routing custom endpoints before rendering.",
            },

            // --- TOPIC: REACT & GUTENBERG ---
            {
                topic: "React",
                q: "In a Gutenberg block, what is the role of the `save` function?",
                options: [
                    "To save data to the database via API.",
                    "To define the static HTML markup that gets saved into `post_content` in the database.",
                    "To render the editor UI.",
                    "To auto-save the post.",
                ],
                a: 1,
            },
            {
                topic: "React",
                q: "What is the difference between `State` and `Props` in React?",
                options: [
                    "State is internal and mutable; Props are external and immutable (passed down).",
                    "Props are internal; State is external.",
                    "State is for database storage.",
                    "Props are only for CSS.",
                ],
                a: 0,
            },
            {
                topic: "React",
                q: "Why is mutating state directly (e.g., `this.state.count = 5`) bad practice in React?",
                options: [
                    "It throws a syntax error.",
                    "It does not trigger a re-render, leaving the UI out of sync with the data.",
                    "It is slower than `setState`.",
                    "It deletes the previous state.",
                ],
                a: 1,
            },

            // --- TOPIC: GIT & DEVOPS ---
            {
                topic: "Git",
                q: "What is a 'Merge Conflict'?",
                options: [
                    "When Git crashes.",
                    "Git can’t auto-merge overlapping changes.",
                    "When a file is too large to merge.",
                    "When you don't have permission to push.",
                ],
                a: 1,
                explain:
                    "A merge conflict occurs when changes overlap (same lines/regions) and Git can’t choose automatically. You resolve by editing conflict markers and selecting the correct combined result, then committing.",
            },
            {
                topic: "Git",
                q: "What is the purpose of `.gitignore`?",
                options: [
                    "To ignore errors in the code.",
                    "To prevent files from being tracked by Git.",
                    "To delete files from the server.",
                    "To hide files from other users.",
                ],
                a: 1,
                explain:
                    "`.gitignore` lists file patterns Git should treat as untracked (e.g., build outputs, dependencies, local config like `.env`). It doesn’t remove files already committed unless you untrack them.",
            },
            // --- TOPIC: SECURITY ---
            {
                topic: "Security",
                q: "What is the difference between Sanitization and Escaping in WordPress?",
                options: [
                    "Sanitization is for output (display); Escaping is for input (database).",
                    "Sanitization cleans input data BEFORE saving to DB; Escaping cleans output data BEFORE rendering to HTML.",
                    "They are synonyms.",
                    "Sanitization removes viruses; Escaping removes SQL.",
                ],
                a: 1,
            },
            {
                topic: "Security",
                q: "Which function should you use to safely output a URL inside an `href` attribute?",
                options: ["`echo $url;`", "`esc_html($url);`", "`esc_url($url);`", "`sanitize_text_field($url);`"],
                a: 2,
            },
            {
                topic: "Security",
                q: "Why is allowing SVG uploads in WordPress considered a security risk?",
                options: [
                    "SVGs are too large in file size.",
                    "SVGs are XML-based and can contain malicious JavaScript (XSS) that executes in the viewer's browser.",
                    "SVGs are not supported by older browsers.",
                    "SVGs cannot be cached.",
                ],
                a: 1,
            },
            {
                topic: "Security",
                q: "You are building an AJAX endpoint. Besides `check_ajax_referer` (Nonce), what else MUST you check?",
                options: [
                    "The user's IP address.",
                    "Capabilities: `current_user_can('edit_posts')` (Authorization).",
                    "The browser user agent.",
                    "The time of day.",
                ],
                a: 1,
            },
            {
                topic: "Security",
                q: "What is the purpose of `wp_kses()`?",
                options: [
                    "To kill server sessions.",
                    "To strip ALL HTML tags from a string.",
                    "To sanitize HTML by allowing only safe tags/attrs.",
                    "To encrypt passwords.",
                ],
                a: 2,
                explain:
                    "`wp_kses()` sanitizes HTML by stripping disallowed tags/attributes and keeping an allowed subset (whitelisting). It’s commonly used to prevent XSS when you need to allow some HTML from user input.",
            },

            // --- TOPIC: UNIT TESTING (ADVANCED) ---
            {
                topic: "Unit Testing",
                q: "What is the difference between `assertEquals` and `assertSame` in PHPUnit?",
                options: [
                    "`assertEquals` checks value only (`==`); `assertSame` checks value AND type (`===`).",
                    "`assertSame` is deprecated.",
                    "`assertEquals` is stricter.",
                    "They are identical.",
                ],
                a: 0,
            },
            {
                topic: "Unit Testing",
                q: "Why is it important to use `Mockery` or `WP_Mock` instead of loading the full WordPress environment for *Unit* tests?",
                options: [
                    "Because Mocks are cooler.",
                    "To ensure tests are fast (milliseconds) and isolated from the database/global state.",
                    "Because WordPress cannot run in CLI.",
                    "To test the database connection.",
                ],
                a: 1,
            },
            {
                topic: "Unit Testing",
                q: "What is a 'DataProvider' in PHPUnit?",
                options: [
                    "A database connection string.",
                    "A method that feeds multiple argument sets into one test.",
                    "A plugin that provides data.",
                    "A mock object.",
                ],
                a: 1,
                explain:
                    "A PHPUnit DataProvider returns an array of inputs so the same test runs multiple times with different arguments (great for edge cases without duplicating test code).",
            },
            {
                topic: "Unit Testing",
                q: "When testing a function that relies on `time()`, how do you ensure the test is deterministic (repeatable)?",
                options: [
                    "Wait for the correct time to run the test.",
                    "Control time via injection or mocking.",
                    "Use `sleep()` in the test.",
                    "Ignore the time component.",
                ],
                a: 1,
                explain:
                    "Make time a dependency (e.g., `Clock->now()`), or mock time at the boundary (namespace-mock `time()` / use a time library) so the test can assert stable, repeatable outcomes.",
            },

            // --- TOPIC: MODERN JAVASCRIPT (ES6+) ---
            {
                topic: "JavaScript",
                q: "How does an Arrow Function `() => {}` treat the `this` keyword differently than a regular function?",
                options: [
                    "It defines its own `this`.",
                    "It has no `this`.",
                    "It lexically binds `this`, meaning it inherits `this` from the surrounding code context.",
                    "It always refers to the Window object.",
                ],
                a: 2,
            },
            {
                topic: "JavaScript",
                q: "What is the output of: `console.log(myVar); var myVar = 5;`?",
                options: ["5", "ReferenceError", "undefined (due to Hoisting)", "null"],
                a: 2,
            },
            {
                topic: "JavaScript",
                q: "What is the output of: `console.log(myLet); let myLet = 5;`?",
                options: ["undefined", "ReferenceError (Temporal Dead Zone)", "5", "null"],
                a: 1,
            },
            {
                topic: "JavaScript",
                q: "Explain Destructuring in JS: `const { name, age } = user;`",
                options: [
                    "It deletes the name and age properties from user.",
                    "It creates a new object combining name and age.",
                    "It extracts the `name` and `age` properties from the `user` object into standalone variables.",
                    "It checks if name and age exist.",
                ],
                a: 2,
            },
            {
                topic: "JavaScript",
                q: "What is the benefit of using `Async/Await` over raw Promises?",
                options: [
                    "It makes the code faster.",
                    "It improves readability with synchronous-looking flow.",
                    "It removes the need for error handling.",
                    "It works in Internet Explorer 6.",
                ],
                a: 1,
                explain:
                    "`async/await` is syntax over Promises that makes control flow and error handling (`try/catch`) easier to read, especially for sequential async steps.",
            },
            {
                topic: "JavaScript",
                q: "What does the Spread Operator (`...`) do in this context: `const newArr = [...oldArr, 4, 5];`?",
                options: [
                    "It adds 4 and 5 to the old array.",
                    "It creates a shallow copy of `oldArr`, expands its elements, and adds 4 and 5 to a new array.",
                    "It calculates the sum of the array.",
                    "It spreads the array into an object.",
                ],
                a: 1,
            },

            // --- TOPIC: ADVANCED WP/PHP CONCEPTS ---
            {
                topic: "WordPress Architecture",
                q: "What is the 'Transient API' fallback mechanism?",
                options: [
                    "It falls back to cookies.",
                    "If an Object Cache (Redis/Memcached) is NOT present, it stores data in the `wp_options` table.",
                    "It falls back to a file on disk.",
                    "It returns false immediately.",
                ],
                a: 1,
            },
            {
                topic: "PHP",
                q: "What is the difference between `==` and `===` in PHP?",
                options: [
                    "`==` performs type juggling (coercion); `===` checks for strict type and value equality.",
                    "`===` is used for assignment.",
                    "There is no difference.",
                    "`==` is strictly for strings.",
                ],
                a: 0,
            },
            {
                topic: "Design Patterns",
                q: "What is the 'Facade' pattern?",
                options: [
                    "A fake database.",
                    "A simplified interface over a complex subsystem.",
                    "A frontend theme framework.",
                    "A way to hide errors.",
                ],
                a: 1,
                explain:
                    "A Facade is a structural pattern that wraps a complex subsystem behind a simpler API. It reduces coupling and makes common use-cases easier without exposing all internal complexity.",
            },
            {
                topic: "Git",
                q: "What does `git cherry-pick <commit-hash>` do?",
                options: [
                    "It deletes a specific commit.",
                    "It applies the changes introduced by a specific commit from one branch onto the current branch.",
                    "It picks a random commit.",
                    "It merges the entire branch.",
                ],
                a: 1,
            },
            // --- TOPIC: ADVANCED CSS ---
            {
                topic: "CSS",
                q: "What is the main difference between `display: flex` and `display: grid`?",
                options: [
                    "Flexbox is one-dimensional (row OR column), Grid is two-dimensional (rows AND columns).",
                    "Flexbox is for mobile, Grid is for desktop.",
                    "Grid is older and slower than Flexbox.",
                    "Flexbox requires JavaScript.",
                ],
                a: 0,
            },
            {
                topic: "CSS",
                q: "In Flexbox, what does `justify-content: space-between` do?",
                options: [
                    "It centers all items.",
                    "It pushes the first item to the start, the last to the end, and distributes space evenly between the others.",
                    "It adds equal space around every item including the edges.",
                    "It removes all space between items.",
                ],
                a: 1,
            },
            {
                topic: "CSS",
                q: "What is a 'Stacking Context' in CSS (related to z-index)?",
                options: [
                    "A library for stacking cards.",
                    "A new z-index context for an element and its children.",
                    "It means z-index only works on position: static.",
                    "It creates a 3D effect.",
                ],
                a: 1,
                explain:
                    "A stacking context is a rendering boundary: children’s `z-index` values are compared within that context, not globally. It can be created by things like `position` + `z-index`, `opacity < 1`, `transform`, `filter`, etc.",
            },
            {
                topic: "CSS",
                q: "Explain the difference between `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` and `auto-fill`.",
                options: [
                    "They are the same.",
                    "`auto-fit` collapses empty tracks; `auto-fill` keeps them.",
                    "`auto-fit` works on height, `auto-fill` on width.",
                    "`auto-fill` is not supported in Chrome.",
                ],
                a: 1,
                explain:
                    "Both determine how many columns are created when using `repeat()` with `minmax()`. `auto-fill` creates as many tracks as will fit and keeps them even if empty; `auto-fit` behaves similarly but collapses empty tracks so remaining items can stretch to fill the available space.",
            },
            {
                topic: "CSS",
                q: "What does the `+` selector do? (e.g., `div + p`)",
                options: [
                    "Selects all paragraphs inside a div.",
                    "Selects the paragraph immediately following a div (adjacent sibling).",
                    "Selects the div and the paragraph.",
                    "Adds a paragraph to the div.",
                ],
                a: 1,
            },

            // --- TOPIC: ADVANCED REACT ---
            {
                topic: "React",
                q: "When would you choose `useReducer` over `useState`?",
                options: [
                    "Always, it's faster.",
                    "When state transitions are complex or interrelated.",
                    "When using Redux.",
                    "When the component is a Class component.",
                ],
                a: 1,
                explain:
                    "`useReducer` is a good fit when state updates depend on previous state, you have multiple sub-values, or you want a single place to model transitions (especially when updates come from many events).",
            },
            {
                topic: "React",
                q: "What is the performance pitfall of using `React.Context` for high-frequency updates (like mouse coordinates)?",
                options: [
                    "It crashes the browser.",
                    "It can cause excessive re-renders of consumers.",
                    "Context cannot handle numbers.",
                    "It requires too much RAM.",
                ],
                a: 1,
                explain:
                    "When the Provider value changes frequently, every consuming component can re-render. For hot signals (mouse coords), consider local state, memoization, splitting context, selectors, or an external store.",
            },
            {
                topic: "React",
                q: "What is a 'Custom Hook'?",
                options: [
                    "A built-in React function.",
                    "A reusable function (starting with `use`) that calls hooks.",
                    "A hook that connects to WordPress.",
                    "A component class.",
                ],
                a: 1,
                explain:
                    "A custom hook is a JavaScript function that follows the hooks rules (name starts with `use`, called consistently) and encapsulates reusable stateful logic using other hooks.",
            },
            {
                topic: "React",
                q: "How does `useCallback` help with child component performance?",
                options: [
                    "It memoizes a callback so its identity stays stable between renders.",
                    "It runs the function in the background.",
                    "It prevents the function from being called.",
                    "It automatically debounces the input.",
                ],
                a: 0,
                explain:
                    "`useCallback` returns the same function instance until dependencies change. This helps when passing callbacks to memoized children (`React.memo`) so they don’t re-render just because a new function identity was created.",
            },
            {
                topic: "React",
                q: "What is 'Virtual DOM'?",
                options: [
                    "A VR version of the website.",
                    "An in-memory tree React diffs to update the real DOM.",
                    "A database for HTML.",
                    "A plugin for Chrome.",
                ],
                a: 1,
                explain:
                    "React keeps a lightweight representation of the UI in memory (often called the virtual DOM). On updates, it compares (diffs) the new tree to the previous one and applies minimal changes to the real DOM.",
            },

            // --- TOPIC: REST API & AUTH ---
            {
                topic: "REST API",
                q: "What is the difference between `PUT` and `PATCH` methods?",
                options: [
                    "PUT creates a file, PATCH deletes it.",
                    "PUT replaces the entire resource; PATCH applies a partial update to the resource.",
                    "PATCH is for fixing bugs.",
                    "There is no difference.",
                ],
                a: 1,
            },
            {
                topic: "REST API",
                q: "In WordPress REST API, how do you authenticate a request from an external mobile app?",
                options: [
                    "Use the standard browser cookie.",
                    "Use Application Passwords (Basic Auth) or JWT (JSON Web Tokens).",
                    "Send the admin password in the URL.",
                    "You cannot access API externally.",
                ],
                a: 1,
            },
            {
                topic: "REST API",
                q: "What does a `401 Unauthorized` status mean vs `403 Forbidden`?",
                options: [
                    "401 = not authenticated; 403 = authenticated but not allowed.",
                    "401 is a server error; 403 is a client error.",
                    "401 is permanent; 403 is temporary.",
                    "They are the same.",
                ],
                a: 0,
                explain:
                    "A 401 typically means the request lacks valid authentication (missing/invalid credentials). A 403 means the server understood who you are (or you are authenticated), but you do not have permission to access that resource.",
            },
            {
                topic: "REST API",
                q: "What is CORS (Cross-Origin Resource Sharing)?",
                options: [
                    "A font style.",
                    "Browser-enforced cross-origin rules controlled by server response headers.",
                    "A database connection method.",
                    "A type of React component.",
                ],
                a: 1,
                explain:
                    "CORS is enforced by browsers: cross-origin requests are blocked unless the server responds with headers like `Access-Control-Allow-Origin` (and sometimes methods/headers/credentials).",
            },
            {
                topic: "REST API",
                q: "If your API response is slow, which HTTP header can help the client cache the response?",
                options: ["Set-Cookie", "Cache-Control (e.g., max-age=3600)", "X-Frame-Options", "Server-Timing"],
                a: 1,
            },

            // --- TOPIC: WEB PERFORMANCE (CORE VITALS) ---
            {
                topic: "Performance",
                q: "What is 'Lazy Loading' images?",
                options: [
                    "Loading images that are blurry.",
                    "Deferring the loading of images until they are about to scroll into the viewport.",
                    "Loading images in black and white first.",
                    "Blocking images entirely.",
                ],
                a: 1,
            },
            {
                topic: "Performance",
                q: "What is CLS (Cumulative Layout Shift)?",
                options: [
                    "A CSS framework.",
                    "A Core Web Vital for visual stability (layout shifts).",
                    "A JavaScript error.",
                    "A database shift.",
                ],
                a: 1,
                explain:
                    "CLS measures unexpected layout movement while a page loads. Common fixes: reserve space for images/ads, avoid injecting content above existing content, and preload fonts to reduce reflow.",
            },
            {
                topic: "Performance",
                q: "Why is 'Critical CSS' inlined in the `<head>`?",
                options: [
                    "To save disk space.",
                    "To render above-the-fold styles without extra requests.",
                    "Because external CSS is insecure.",
                    "To hide styles from users.",
                ],
                a: 1,
                explain:
                    "Inlining critical CSS avoids blocking on a separate CSS fetch, improving first paint/LCP. The remaining CSS can be loaded asynchronously or deferred.",
            },

            // --- TOPIC: ARCHITECTURE & SCALING ---
            {
                topic: "Architecture",
                q: "What is a 'Headless WordPress' architecture?",
                options: [
                    "WordPress without an admin panel.",
                    "WordPress as an API + separate frontend app.",
                    "Running WordPress without a header.php file.",
                    "A hacked WordPress site.",
                ],
                a: 1,
                explain:
                    "In headless, WordPress is the content backend (REST API/GraphQL) and a separate frontend (e.g., Next.js/React) renders the UI. Benefits: frontend flexibility/perf; tradeoffs: preview, auth, SEO, and editorial workflows need extra work.",
            },
            {
                topic: "Architecture",
                q: "What is the role of a Load Balancer?",
                options: [
                    "To weigh the server rack.",
                    "To distribute traffic across multiple servers.",
                    "To balance CSS colors.",
                    "To compress images.",
                ],
                a: 1,
                explain:
                    "Load balancers spread traffic to improve availability and throughput, and can do health checks, TLS termination, and routing (L7) so unhealthy instances are removed automatically.",
            },
            {
                topic: "Architecture",
                q: "What is 'Database Replication' (Master-Slave)?",
                options: [
                    "Copying the database to a USB drive.",
                    "Writes to primary; reads from replicas.",
                    "Duplicating tables within the same database.",
                    "Backing up the database weekly.",
                ],
                a: 1,
                explain:
                    "A common scaling pattern: write operations go to a primary node, while read-heavy traffic is served from replicas. You must handle replication lag and read-after-write consistency.",
            },
            // --- TOPIC: DEVOPS & DOCKER ---
            {
                topic: "DevOps",
                q: "What is the difference between a Docker Image and a Docker Container?",
                options: [
                    "They are the same thing.",
                    "An Image is a read-only template (the blueprint); a Container is a runnable instance of that image (the house).",
                    "An Image is for local dev; a Container is for production.",
                    "A Container contains the operating system; an Image does not.",
                ],
                a: 1,
            },
            {
                topic: "DevOps",
                q: "In Docker, what happens to data inside a container when the container is deleted?",
                options: [
                    "It is saved automatically to the cloud.",
                    "It is lost forever unless stored in a Volume or Bind Mount.",
                    "It moves to the next container.",
                    "It is archived in a zip file.",
                ],
                a: 1,
            },
            {
                topic: "DevOps",
                q: "What is CI/CD (Continuous Integration/Continuous Deployment)?",
                options: [
                    "A PHP framework.",
                    "Automated testing + automated delivery pipelines.",
                    "Constantly reinstalling the database.",
                    "A project management tool.",
                ],
                a: 1,
                explain:
                    "CI focuses on frequently integrating changes with automated builds/tests; CD automates delivery/deployment so changes can reach production reliably via pipelines.",
            },
            {
                topic: "DevOps",
                q: "Why is a 'Blue/Green Deployment' strategy safer than a standard deployment?",
                options: [
                    "It uses better colors.",
                    "Two environments; deploy to idle, then switch traffic with instant rollback.",
                    "It deploys to 50% of users randomly.",
                    "It requires manual file copying.",
                ],
                a: 1,
                explain:
                    "Blue/Green runs two identical environments. You deploy to the idle one, validate it, then switch traffic. If anything goes wrong, rollback is usually a fast traffic switch.",
            },
            {
                topic: "DevOps",
                q: "What is the primary purpose of a `.env` file?",
                options: [
                    "To store environment variables outside the codebase.",
                    "To list the environment requirements (PHP version).",
                    "To configure the IDE theme.",
                    "To store public documentation.",
                ],
                a: 0,
                explain:
                    "`.env` files typically hold config like DB credentials, API keys, and feature flags. They should not be committed to Git; use `.gitignore` and a secrets manager in production.",
            },

            // --- TOPIC: SCALABILITY & INFRASTRUCTURE ---
            {
                topic: "Architecture",
                q: "What is the difference between Vertical Scaling and Horizontal Scaling?",
                options: [
                    "Vertical = Adding more power (RAM/CPU) to a single server. Horizontal = Adding more servers to the pool.",
                    "Vertical = Adding more servers. Horizontal = Adding more RAM.",
                    "Vertical is for databases; Horizontal is for PHP.",
                    "There is no difference.",
                ],
                a: 0,
            },
            {
                topic: "Architecture",
                q: "What is a CDN (Content Delivery Network) and why is it essential for global sites?",
                options: [
                    "A backup service.",
                    "Distributed edge servers that deliver content closer to users to reduce latency.",
                    "A domain name registrar.",
                    "A tool to compress PHP files.",
                ],
                a: 1,
                explain:
                    "A CDN is a network of geographically distributed servers that cache and deliver assets (images/CSS/JS, sometimes HTML) from locations near the user. This reduces latency and offloads origin traffic.",
            },
            {
                topic: "Architecture",
                q: "If your database CPU spikes to 100%, what is the FIRST thing you should check?",
                options: [
                    "Buy a bigger server immediately.",
                    "Check for Slow Queries (missing indexes or N+1 problems).",
                    "Restart the server.",
                    "Disable the website.",
                ],
                a: 1,
            },

            // --- TOPIC: LEADERSHIP & SOFT SKILLS (CRITICAL FOR SENIORS) ---
            {
                topic: "Leadership",
                q: "A Junior Developer pushes code that breaks the build. How do you handle it?",
                options: [
                    "Yell at them in the public Slack channel.",
                    "Fix it yourself and don't tell them.",
                    "Contact them privately, help them understand why it broke, and guide them to fix it themselves (Mentorship).",
                    "Revert their code and ban them from the repo.",
                ],
                a: 2,
            },
            {
                topic: "Leadership",
                q: "The Product Owner wants a feature that is technically impossible (or very bad for performance). What do you do?",
                options: [
                    "Say 'No' and refuse to work.",
                    "Do it anyway and let the site crash.",
                    "Explain risks in business terms and propose a safer alternative.",
                    "Complain to the CTO.",
                ],
                a: 2,
                explain:
                    "Translate technical constraints into business outcomes (cost, timeline, user impact, risk). Offer options and a recommendation, plus a quick validation step (spike/prototype) if uncertainty remains.",
            },
            {
                topic: "Leadership",
                q: "What is 'Technical Debt'?",
                options: [
                    "Money the company owes for servers.",
                    "Extra rework you pay later for shortcuts you take now.",
                    "Bugs in the code.",
                    "Code that is commented out.",
                ],
                a: 1,
                explain:
                    "Technical debt is the implied cost of future rework caused by choosing a quick/easy solution now instead of a more maintainable approach. Like financial debt, it can be strategic, but it accrues “interest”.",
            },
            {
                topic: "Leadership",
                q: "How do you handle a Code Review where you strongly disagree with the author's approach?",
                options: [
                    "Reject the PR without comment.",
                    "Discuss tradeoffs respectfully and propose alternatives.",
                    "Rewrite their code in a new commit.",
                    "Approve it to avoid conflict.",
                ],
                a: 1,
                explain:
                    "Start with clarifying questions and context, then discuss tradeoffs (maintainability, performance, risk). Offer concrete suggestions or small diffs instead of demands; align on team standards.",
            },
            {
                topic: "Leadership",
                q: "What is the 'Bus Factor' in a team?",
                options: [
                    "Transportation allowance.",
                    "Risk from knowledge concentrated in one person.",
                    "The speed of the internet connection.",
                    "The number of bugs per sprint.",
                ],
                a: 1,
                explain:
                    "Bus factor measures resilience: if one (or a few) key people leave, progress stalls. Improve it via documentation, pairing, code reviews, ownership rotation, and reducing single points of failure.",
            },

            // --- TOPIC: ADVANCED JAVASCRIPT & ASYNC ---
            {
                topic: "JavaScript",
                q: "What is a 'Promise' in JavaScript?",
                options: [
                    "A guarantee that code will not fail.",
                    "A handle for an async result (success or failure).",
                    "A function that runs immediately.",
                    "A variable that cannot be changed.",
                ],
                a: 1,
                explain:
                    "A Promise represents a value that may be available now, later, or never. It can be pending/fulfilled/rejected and is consumed via `.then/.catch` or `await`.",
            },
            {
                topic: "JavaScript",
                q: "What is 'Callback Hell' and how do you fix it?",
                options: [
                    "A heavy metal band.",
                    "Deeply nested callbacks making code unreadable. Fix it using Promises or Async/Await.",
                    "A syntax error in JS.",
                    "Having too many event listeners.",
                ],
                a: 1,
            },
            {
                topic: "JavaScript",
                q: "What is the difference between `localStorage` and `sessionStorage`?",
                options: [
                    "localStorage persists; sessionStorage ends with the tab/session.",
                    "`sessionStorage` is more secure.",
                    "`localStorage` stores data on the server.",
                    "They are the same.",
                ],
                a: 0,
                explain:
                    "Both are per-origin storage in the browser. `localStorage` persists until cleared; `sessionStorage` is scoped to the tab/session and is cleared when that tab/window is closed.",
            },

            // --- TOPIC: GIT FLOW & COLLABORATION ---
            {
                topic: "Git",
                q: "What is a 'Pull Request' (PR) or 'Merge Request'?",
                options: [
                    "A request to download the code.",
                    "A request to review and merge changes.",
                    "A command to pull changes from the server.",
                    "A way to delete a branch.",
                ],
                a: 1,
                explain:
                    "A PR/MR is a collaboration workflow where changes on a branch are reviewed (comments, approvals, CI checks) before merging into the main branch.",
            },
            {
                topic: "Git",
                q: "Why should you never rewrite history (force push) on a shared public branch?",
                options: [
                    "It breaks the internet.",
                    "It can invalidate others' work and create painful sync/merge conflicts.",
                    "Git does not allow it.",
                    "It uses too much bandwidth.",
                ],
                a: 1,
                explain:
                    "Force-pushing rewrites commit SHAs. Anyone who based work on the old history will have a broken branch and must reconcile divergent histories, risking lost commits and messy merges.",
            },
            {
                topic: "Git",
                q: "What is 'Semantic Versioning' (SemVer e.g., 1.2.3)?",
                options: [
                    "Random numbers.",
                    "Versioning: MAJOR.MINOR.PATCH with meaning.",
                    "Day.Month.Year",
                    "Project.Module.File",
                ],
                a: 1,
                explain:
                    "SemVer uses `MAJOR.MINOR.PATCH`: bump MAJOR for breaking changes, MINOR for backward-compatible features, PATCH for backward-compatible bug fixes.",
            },

            // --- TOPIC: GENERAL ENGINEERING ---
            {
                topic: "General",
                q: "What does DRY stand for?",
                options: [
                    "Do Repeat Yourself.",
                    "Don't Repeat Yourself (Avoid code duplication).",
                    "Data Recovery Yard.",
                    "Docker Repository YAML.",
                ],
                a: 1,
            },
            {
                topic: "General",
                q: "What is KISS principle?",
                options: [
                    "Keep It Super Stylish.",
                    "Keep It Simple, Stupid (Simplicity should be a key goal in design).",
                    "Kernel Integrated System Shell.",
                    "Key Index Search System.",
                ],
                a: 1,
            },
            {
                topic: "General",
                q: "What is YAGNI?",
                options: [
                    "You Ain't Gonna Need It (Don't build functionality until you actually need it).",
                    "Yet Another Graphic Network Interface.",
                    "Your API Goes Now Inside.",
                    "Yearly Audit of General Network Infrastructure.",
                ],
                a: 1,
            },
            // --- TOPIC: PHP TRICKY QUESTIONS ---
            {
                topic: "PHP Tricky",
                q: "What is the difference between `array_merge($a, $b)` and `$a + $b` when both arrays have the same string keys?",
                options: [
                    "They behave exactly the same.",
                    "`array_merge` overwrites; `+` keeps left-hand keys.",
                    "`+` adds the values mathematically.",
                    "`array_merge` preserves keys, `+` reindexes them.",
                ],
                a: 1,
                explain:
                    "With duplicate string keys: `array_merge($a, $b)` uses `$b`’s value; `$a + $b` preserves `$a`’s value and ignores duplicates from `$b`.",
            },
            {
                topic: "PHP Tricky",
                q: "Look at this code: `$a = '1'; $b = &$a; $b = '2$b';` What is the value of `$a`?",
                options: ["'1'", "'21'", "'2$b'", "'2'"],
                a: 1,
            },
            {
                topic: "PHP Tricky",
                q: "What is the 'Reference Linger' problem in a `foreach` loop?",
                options: [
                    "Foreach is slow.",
                    "A `foreach` by reference can leak the last reference unless you `unset($value)`. ",
                    "PHP runs out of memory.",
                    "The loop never ends.",
                ],
                a: 1,
                explain:
                    "If you iterate with `foreach ($arr as &$value)` and don’t `unset($value)` afterward, `$value` stays bound to the last element. Reassigning `$value` later can unexpectedly modify the last array element.",
            },
            {
                topic: "PHP Tricky",
                q: "What will `strpos('abcdef', 'a')` return, and why can checking it with `if (strpos(...))` be dangerous?",
                options: [
                    "It returns `0`; loose checks treat 0 as false even when found.",
                    "It returns `1`.",
                    "It returns `true`.",
                    "It returns `null`.",
                ],
                a: 0,
                explain:
                    "`strpos()` returns the numeric position (0-based) or `false` if not found. If you do `if (strpos(...))`, a valid position `0` is treated as false. Use `!== false`.",
            },
            {
                topic: "PHP Tricky",
                q: "What is the output of `echo (int) ( (0.1 + 0.7) * 10 );`?",
                options: ["8", "7", "7 (float precision)", "0"],
                a: 2,
                explain:
                    "Due to floating point precision, the internal value can be close to 7.9999… and casting to int truncates to 7. Don’t assume decimal fractions are exact in binary floating point.",
            },

            // --- TOPIC: JAVASCRIPT WEIRDNESS ---
            {
                topic: "JS Tricky",
                q: "What is the result of `0.1 + 0.2 === 0.3` in JavaScript?",
                options: ["true", "false (float precision)", "NaN", "undefined"],
                a: 1,
                explain:
                    "Because of IEEE-754 floating point precision, `0.1 + 0.2` evaluates to `0.30000000000000004` in JavaScript.",
            },
            {
                topic: "JS Tricky",
                q: "What is the output of `typeof null`?",
                options: ["'null'", "'undefined'", "'object' (This is a famous historical bug in JS)", "'number'"],
                a: 2,
            },
            {
                topic: "JS Tricky",
                q: "Explain the 'Closure Trap' inside a loop using `var` vs `let`.",
                options: [
                    "They are the same.",
                    "`var` shares one binding; `let` creates a fresh binding per iteration.",
                    "`let` is slower.",
                    "`var` cannot be used in loops.",
                ],
                a: 1,
                explain:
                    "`var` is function-scoped, so async callbacks in a loop often read the final value of the loop variable. `let` is block-scoped and creates a new binding each iteration, so callbacks capture the expected value.",
            },
            {
                topic: "JS Tricky",
                q: "What happens if you access a variable declared with `let` BEFORE its declaration line?",
                options: [
                    "It returns `undefined`.",
                    "It returns `null`.",
                    "It throws a `ReferenceError` (Temporal Dead Zone).",
                    "It works fine due to hoisting.",
                ],
                a: 2,
            },
            {
                topic: "JS Tricky",
                q: "What is the result of `[] + []` in the console?",
                options: ["[]", '"" (An empty string)', "0", "NaN"],
                a: 1,
            },

            // --- TOPIC: WORDPRESS GOTCHAS ---
            {
                topic: "WP Tricky",
                q: "You use `is_admin()` to check if a user is an Administrator. Is this correct?",
                options: [
                    "Yes, absolutely.",
                    "No. `is_admin()` checks admin screens, not the user's role.",
                    "No, it checks if the site is in maintenance mode.",
                    "Yes, but only for Super Admins.",
                ],
                a: 1,
                explain:
                    "`is_admin()` checks whether the current request is for the WordPress admin area (including admin-ajax). It does not indicate the user’s role/capabilities. Use `current_user_can()` for authorization.",
            },
            {
                topic: "WP Tricky",
                q: "Why must you remove the `save_post` hook inside your own `save_post` callback function before calling `wp_update_post`?",
                options: [
                    "To save memory.",
                    "To avoid recursion/infinite save loops.",
                    "Because WordPress deletes hooks automatically.",
                    "It is not necessary.",
                ],
                a: 1,
                explain:
                    "Calling `wp_update_post()` triggers `save_post` again. Temporarily removing your callback (or guarding with a flag) prevents infinite recursion and repeated side-effects.",
            },
            {
                topic: "WP Tricky",
                q: "What happens if you run a `new WP_Query` inside the `the_content` filter without calling `wp_reset_postdata()`?",
                options: [
                    "Nothing bad.",
                    "Global `$post` stays modified, so later template tags can break.",
                    "It deletes the post.",
                    "It returns a 404 error.",
                ],
                a: 1,
                explain:
                    "`WP_Query` changes global state (`$post`, loop globals). If you don’t call `wp_reset_postdata()`, later parts of the page (comments/sidebar/footer/template tags) can render using the wrong post data.",
            },

            // --- TOPIC: ALGORITHMS & LOGIC (SENIOR INTERVIEW) ---
            {
                topic: "Algorithms",
                q: "What is Big O Notation?",
                options: [
                    "A popular PHP framework.",
                    "A way to describe algorithm time/space growth.",
                    "A way to measure disk space.",
                    "The version number of the software.",
                ],
                a: 1,
                explain:
                    "Big O describes how runtime or memory usage grows as input size $n$ grows (upper bound / growth rate). Example: array scan is $O(n)$; hash lookup is ~$O(1)$ on average.",
            },
            {
                topic: "Algorithms",
                q: "Which complexity is WORSE (Slower): O(n) or O(n^2)?",
                options: ["O(n)", "O(n^2) (Quadratic time - e.g., nested loops).", "They are the same.", "O(1)"],
                a: 1,
            },
            {
                topic: "Algorithms",
                q: "When would you choose a Hash Map (Associative Array) over a standard Array for lookups?",
                options: [
                    "Never.",
                    "When you need fast lookup by key.",
                    "When you want to sort items.",
                    "When using SQL.",
                ],
                a: 1,
                explain:
                    "Hash maps provide ~$O(1)$ average lookup/insert by key, while a plain array lookup by value is typically $O(n)$ (scan). Tradeoffs include memory overhead and unordered iteration.",
            },
            {
                topic: "Algorithms",
                q: "What is a 'Race Condition' in a database context?",
                options: [
                    "When the database is too fast.",
                    "When results depend on timing/order of concurrent operations.",
                    "A competition between servers.",
                    "A type of index.",
                ],
                a: 1,
                explain:
                    "A race condition occurs when the system’s outcome depends on timing/order (e.g., two users trying to buy the last ticket at the same moment). Fixes include transactions, locks, and atomic operations.",
            },

            // --- TOPIC: REGEX (REGULAR EXPRESSIONS) ---
            {
                topic: "Regex",
                q: "In Regex, what does `^` and `$` represent?",
                options: [
                    "Capital and Lowercase.",
                    "Start of string and End of string.",
                    "Wildcard characters.",
                    "Escape characters.",
                ],
                a: 1,
            },
            {
                topic: "Regex",
                q: "Why should you generally NOT use Regex to parse HTML?",
                options: [
                    "It is too slow.",
                    "HTML is nested/recursive; regex parsing is fragile.",
                    "Regex cannot match tags.",
                    "PHP does not support Regex.",
                ],
                a: 1,
                explain:
                    "HTML is nested/recursive and real-world markup is messy. Regex-based parsing tends to break on valid-but-unexpected structures; use an HTML parser/DOM instead.",
            },
            // --- TOPIC: WORDPRESS HOOKS (DEEP DIVE) ---
            {
                topic: "WP Hooks",
                q: "What is the difference between the `init` and `wp_loaded` hooks?",
                options: [
                    "`init` fires after `wp_loaded`.",
                    "`init`: core loaded; `wp_loaded`: plugins + theme fully loaded.",
                    "They are aliases for the same hook.",
                    "`wp_loaded` is for frontend only.",
                ],
                a: 1,
                explain:
                    "`init` runs after WordPress has loaded enough to register post types/taxonomies and process requests (headers not sent yet). `wp_loaded` fires later, once WordPress, all plugins, and the theme are fully loaded/instantiated.",
            },
            {
                topic: "WP Hooks",
                q: "Why is `pre_get_posts` dangerous if you don't check `!is_admin() && $query->is_main_query()`?",
                options: [
                    "It will break the site CSS.",
                    "It can unintentionally modify admin queries and non-main queries site-wide.",
                    "It deletes posts permanently.",
                    "It causes a 404 error.",
                ],
                a: 1,
                explain:
                    "Without guarding for `!is_admin()` and `$query->is_main_query()`, your changes can apply to *every* query: admin post lists, widgets, menus, secondary queries, etc., causing confusing side effects.",
            },
            {
                topic: "WP Hooks",
                q: "How do you modify the `WHERE` clause of a WP_Query specifically?",
                options: [
                    "Use the `posts_where` filter.",
                    "Use `pre_get_posts`.",
                    "Use `query_posts`.",
                    "Edit the core files.",
                ],
                a: 0,
            },
            {
                topic: "WP Hooks",
                q: "What happens if you add a filter with a priority of `PHP_INT_MAX`?",
                options: [
                    "It crashes PHP.",
                    "It runs last (or nearly last) in the chain.",
                    "It runs first.",
                    "It is ignored.",
                ],
                a: 1,
                explain:
                    "Higher priority numbers run later. `PHP_INT_MAX` is effectively “as late as possible”, often used to apply a final override after other filters have run.",
            },
            {
                topic: "WP Hooks",
                q: "Can you trigger a hook recursively? (e.g., calling `do_action('A')` inside a function hooked to `A`)",
                options: [
                    "Yes, but it causes an infinite loop unless you have a conditional break.",
                    "No, WordPress prevents this automatically.",
                    "Yes, but only in plugins.",
                    "No, PHP forbids it.",
                ],
                a: 0,
            },

            // --- TOPIC: REACT HOOKS (DEEP DIVE) ---
            {
                topic: "React Hooks",
                q: "What is a 'Stale Closure' in `useEffect`?",
                options: [
                    "A memory leak caused by missing cleanup.",
                    "An effect reading stale values due to missing dependencies.",
                    "An effect that never runs because React skips it.",
                    "A deprecated pattern from class components.",
                ],
                a: 1,
                explain:
                    "A stale closure happens when an effect uses variables from component scope, but the dependency array is missing those variables. The effect callback keeps reading the old captured value instead of the latest state/props.",
            },
            {
                topic: "React Hooks",
                q: "What is the difference between `useEffect` and `useLayoutEffect`?",
                options: [
                    "No difference.",
                    "`useEffect` runs after paint; `useLayoutEffect` runs before paint.",
                    "`useLayoutEffect` is for layouts only.",
                    "`useEffect` is faster.",
                ],
                a: 1,
                explain:
                    "`useEffect` runs after the browser has painted, so it won’t block rendering. `useLayoutEffect` runs synchronously after DOM mutations but before paint, so it can measure/layout and apply changes without flicker (but can block painting if it does heavy work).",
            },
            {
                topic: "React Hooks",
                q: "Why can't you put a hook inside a regular JavaScript function (not a component/hook)?",
                options: [
                    "You can.",
                    "Hooks must run in a component or custom hook.",
                    "Because hooks are private.",
                    "Because of linting rules.",
                ],
                a: 1,
                explain:
                    "Hooks depend on React calling them in a consistent order during rendering. Regular functions don’t participate in React’s render cycle, so React can’t reliably associate hook calls with a component instance.",
            },
            {
                topic: "React Hooks",
                q: "In `useReducer`, what is the `dispatch` function used for?",
                options: [
                    "To delete the state.",
                    "To send an action to the reducer.",
                    "To connect to the API.",
                    "To render the component.",
                ],
                a: 1,
                explain:
                    "`dispatch(action)` triggers the reducer to compute the next state from the current state + the action. The action typically describes what happened (type + payload).",
            },

            // --- TOPIC: THEME.JSON & FULL SITE EDITING (FSE) ---
            {
                topic: "Theme.json",
                q: "What is the primary purpose of `theme.json` in modern WordPress themes?",
                options: [
                    "To list installed plugins.",
                    "To centralize theme styles and block settings.",
                    "To store translations.",
                    "To replace `functions.php` completely.",
                ],
                a: 1,
                explain:
                    "`theme.json` centralizes configuration for styles, editor settings, and layout constraints (spacing, typography, color palette, etc.). It powers block defaults and replaces/augments many older `add_theme_support` and CSS patterns.",
            },
            {
                topic: "Theme.json",
                q: "How does `theme.json` affect CSS Specificity?",
                options: [
                    "It doesn't.",
                    "It generates low-specificity defaults (vars/classes) for the editor/theme.",
                    "It overrides all `!important` rules.",
                    "It writes inline styles only.",
                ],
                a: 1,
                explain:
                    "WordPress generates CSS variables and classes from `theme.json`. The resulting rules often have relatively low specificity and define defaults for the editor and theme; custom CSS can override them depending on specificity/order.",
            },
            {
                topic: "Theme.json",
                q: "What is a 'Block Template Part'?",
                options: [
                    "A part of the database.",
                    "A reusable block layout chunk (e.g., header/footer).",
                    "A React component.",
                    "A plugin extension.",
                ],
                a: 1,
                explain:
                    "Template parts are reusable block-based sections (like header/footer) used by block themes. They typically live under `parts/` and can be edited in the Site Editor.",
            },
            {
                topic: "Theme.json",
                q: "In FSE, how do you lock a block so users cannot move or remove it?",
                options: [
                    "You cannot.",
                    "Use the block `lock` attribute.",
                    "Using CSS `pointer-events: none`.",
                    "Using a plugin.",
                ],
                a: 1,
                explain:
                    'Block locking is done via the `lock` attribute in block markup/settings (e.g., `{"lock": {"move": true, "remove": true}}`). This controls editor behavior; it’s not a front-end security boundary.',
            },

            // --- TOPIC: WORDPRESS CORE & DB ---
            {
                topic: "WP Core",
                q: "Where are WordPress user roles and capabilities stored in the database?",
                options: [
                    "In the `wp_users` table.",
                    "In the `wp_usermeta` table as a serialized array (key: `wp_capabilities`).",
                    "In `wp_options`.",
                    "In a hardcoded array in PHP.",
                ],
                a: 1,
            },
            {
                topic: "WP Core",
                q: "What is the WordPress Rewrite API responsible for?",
                options: [
                    "Rewriting the database.",
                    "Mapping incoming clean URLs (Permalinks) to specific database queries (query vars).",
                    "Editing post content.",
                    "Redirecting 301 errors.",
                ],
                a: 1,
            },
            {
                topic: "WP Core",
                q: "What is a 'Cron Job' in WordPress (`wp-cron.php`) and how does it differ from a system Cron?",
                options: [
                    "It is the same as Linux Cron.",
                    "WP-Cron is traffic-triggered pseudo-cron; system cron is time-scheduled.",
                    "It runs on the user's computer.",
                    "It is a virus.",
                ],
                a: 1,
                explain:
                    "WP-Cron runs when the site receives requests (traffic-driven), so low traffic can delay jobs and high traffic can cause concurrency issues. System cron runs on a schedule regardless of traffic.",
            },
            {
                topic: "WP Core",
                q: "Why is `global $post` sometimes unavailable in a shortcode?",
                options: [
                    "Shortcodes never have access to globals.",
                    "Because the global post may not be set in that context.",
                    "It is a bug in WordPress.",
                    "Shortcodes run on the server, posts are on the client.",
                ],
                a: 1,
                explain:
                    "Shortcodes can run outside the main loop or inside nested queries. In those cases, `$post` may be unset or referencing a different post; use the passed attributes/context, `get_post()`, or ensure proper loop setup/reset.",
            },

            // --- TOPIC: UNIT TESTING (SPECIFIC MOCKING) ---
            {
                topic: "Unit Testing",
                q: "When testing a plugin that calls `update_option`, why do we mock it instead of letting it run?",
                options: [
                    "To save hard drive space.",
                    "To avoid DB writes and assert the call/arguments (speed + isolation).",
                    "Because `update_option` doesn't exist in CLI.",
                    "To make the test pass even if the code is wrong.",
                ],
                a: 1,
                explain:
                    "In unit tests you want fast, isolated tests. Mocking `update_option()` prevents real DB writes and lets you verify the code attempted the correct call with the correct arguments.",
            },
            {
                topic: "Unit Testing",
                q: "What does the `tearDown()` method do in PHPUnit?",
                options: [
                    "It destroys the server.",
                    "It runs after each test to clean up and reset state.",
                    "It runs before the test.",
                    "It logs errors.",
                ],
                a: 1,
                explain:
                    "`tearDown()` runs after each test method. Use it to reset globals, close resources, and undo side effects so each test starts from a clean baseline.",
            },
            {
                topic: "Unit Testing",
                q: "What is 'Code Coverage'?",
                options: [
                    "The number of lines of code in the project.",
                    "A metric showing what percentage of your source code is executed when the test suite runs.",
                    "The documentation quality.",
                    "The number of comments.",
                ],
                a: 1,
            },

            // --- TOPIC: CACHING & PERFORMANCE ---
            {
                topic: "Caching",
                q: "What is 'Fragment Caching'?",
                options: [
                    "Caching broken files.",
                    "Caching a portion of a page (e.g., a widget/menu).",
                    "Caching database fragments.",
                    "A browser feature.",
                ],
                a: 1,
                explain:
                    "Fragment caching stores expensive-to-render sections while letting the rest of the page remain dynamic. It’s useful when full-page caching is hard due to personalization or frequently changing sections.",
            },
            {
                topic: "Caching",
                q: "What is 'Cache Stampede' (or Dog-piling)?",
                options: [
                    "When the cache is too full.",
                    "Many workers rebuild the same expired key at once.",
                    "When cache deletes itself.",
                    "A Redis error.",
                ],
                a: 1,
                explain:
                    "A cache stampede happens when a hot key expires and many concurrent requests trigger expensive regeneration simultaneously. Mitigations: request coalescing/locking, probabilistic early refresh, stale-while-revalidate, and jittered expirations.",
            },
            {
                topic: "Caching",
                q: "Why is `autoload=yes` in `wp_options` a performance killer for large sites?",
                options: [
                    "It isn't.",
                    "Autoloaded options load every request; large values hurt TTFB/memory.",
                    "It makes the database read-only.",
                    "It disables caching.",
                ],
                a: 1,
                explain:
                    "Autoloaded options are fetched on most requests. If plugins store large blobs (e.g., big JSON) with `autoload=yes`, every request pays the cost in DB time and memory.",
            },

            // --- TOPIC: DOCKER ---
            {
                topic: "Docker",
                q: "What is `docker-compose.yml` used for?",
                options: [
                    "To write documentation.",
                    "To define and run a multi-container app together.",
                    "To compile PHP code.",
                    "To upload files to FTP.",
                ],
                a: 1,
                explain:
                    "Docker Compose lets you define services (containers), networks, and volumes in a single file, then run the whole stack with `docker compose up` (e.g., WordPress + DB + caching + admin tools).",
            },
            {
                topic: "Docker",
                q: "Explain 'Bind Mount' vs 'Volume' in Docker.",
                options: [
                    "Bind mount = host path. Volume = Docker-managed storage.",
                    "They are the same.",
                    "Volumes are slower.",
                    "Bind Mounts are deleted on restart.",
                ],
                a: 0,
                explain:
                    "Bind mounts map a specific host path into the container (common for dev code syncing). Volumes are managed by Docker and are generally preferred for persistent app/DB data.",
            },
            {
                topic: "Docker",
                q: "How do containers in the same Docker Compose network communicate?",
                options: [
                    "By IP address only.",
                    "By service name via internal DNS (e.g., `db`).",
                    "They cannot communicate.",
                    "Via USB.",
                ],
                a: 1,
                explain:
                    "Compose sets up a user-defined network and DNS so services can reach each other by name (the service name). Inside containers, `localhost` refers to the container itself, not other services.",
            },
            // --- TOPIC: PHP 8 FEATURES ---
            {
                topic: "PHP 8",
                q: "What is the 'JIT Compiler' (Just-In-Time) introduced in PHP 8?",
                options: [
                    "A tool to compile CSS.",
                    "Runtime compilation of PHP bytecode to machine code (best for CPU-heavy work).",
                    "A new JavaScript engine.",
                    "It removes the need for Opcache.",
                ],
                a: 1,
                explain:
                    "PHP 8 JIT can compile parts of PHP bytecode into native machine code at runtime. It can help for CPU-intensive workloads, but typical WordPress bottlenecks are often I/O (DB, network) where JIT gains are smaller.",
            },
            {
                topic: "PHP 8",
                q: "How do PHP 8 'Attributes' (Annotations) differ from old PHPDoc comments?",
                options: [
                    "They are the same.",
                    "Attributes are native, structured metadata accessible via Reflection.",
                    "Attributes are slower.",
                    "Attributes only work for database columns.",
                ],
                a: 1,
                explain:
                    "Attributes use native syntax (e.g., `#[Route('/x')]`) and are machine-readable via Reflection. PHPDoc annotations are plain text comments that require external parsers and are not enforced by the language.",
            },
            {
                topic: "PHP 8",
                q: "What does the 'Nullsafe Operator' (`?->`) do? e.g., `$user?->getAddress()?->country`",
                options: [
                    "It throws an error if null.",
                    "It short-circuits to null instead of throwing on a null chain.",
                    "It converts null to zero.",
                    "It forces the value to be not null.",
                ],
                a: 1,
                explain:
                    "The nullsafe operator returns `null` immediately if any part of the chain is `null`, instead of throwing `Call to a member function ... on null`.",
            },
            {
                topic: "PHP 8",
                q: "What is a 'Union Type' in PHP 8?",
                options: [
                    "Connecting two databases.",
                    "A type hint allowing multiple possible types.",
                    "Merging two arrays.",
                    "A type of CSS selector.",
                ],
                a: 1,
                explain:
                    "Union types let parameters/returns accept more than one type, e.g. `int|float` or `Foo|Bar|null`.",
            },
            {
                topic: "PHP 8",
                q: "Explain the `match` expression vs `switch`.",
                options: [
                    "`match` is strict and returns a value; `switch` is loose and uses statements.",
                    "`match` is for strings only.",
                    "`switch` is deprecated in PHP 8.",
                    "They are identical.",
                ],
                a: 0,
                explain:
                    "`match` uses strict comparison (`===`), returns an expression value, and doesn’t fall through. `switch` uses loose comparisons (`==`) and is statement-based (needs `break` to avoid fall-through).",
            },

            // --- TOPIC: PHP-FPM & SERVER EXTENSIONS ---
            {
                topic: "PHP-FPM",
                q: "In PHP-FPM configuration, what is the trade-off of using `pm = static` vs `pm = dynamic`?",
                options: [
                    "Static is slower but saves RAM.",
                    "Static = fixed workers (more RAM). Dynamic = spawns workers (less RAM, spawn latency).",
                    "Dynamic is always better.",
                    "Static prevents caching.",
                ],
                a: 1,
                explain:
                    "Static keeps workers always alive: consistent RAM usage but lower latency (no spawning). Dynamic can save RAM when idle, but may add latency when it needs to spawn workers under load.",
            },
            {
                topic: "PHP Extensions",
                q: "What is `Opcache` and why is it mandatory for production?",
                options: [
                    "It caches database queries.",
                    "It caches compiled PHP bytecode so scripts aren't re-parsed each request.",
                    "It optimizes images.",
                    "It is a debugger.",
                ],
                a: 1,
                explain:
                    "OPcache stores compiled PHP bytecode in shared memory so PHP doesn’t parse/compile source files on every request, significantly reducing CPU overhead.",
            },
            {
                topic: "PHP Extensions",
                q: "Which PHP extension is typically required for high-performance image processing in WordPress (manipulating uploads)?",
                options: ["GD or Imagick", "PDO", "cURL", "MBString"],
                a: 0,
            },
            {
                topic: "Server",
                q: "What is a 'Worker Limit' (max_children) in PHP-FPM and what happens if it's too low?",
                options: [
                    "It limits the number of child themes.",
                    "It caps concurrent PHP-FPM worker processes.",
                    "It limits the database connections.",
                    "It creates child processes.",
                ],
                a: 1,
                explain:
                    "`pm.max_children` limits how many PHP-FPM child processes can handle requests concurrently. If it’s too low, requests queue up (higher latency) and can hit upstream timeouts (often seen as 502/504) under load.",
            },

            // --- TOPIC: ADVANCED OBJECT CACHING ---
            {
                topic: "Object Cache",
                q: "If you use `wp_cache_set($key, $data, 'my_group')`, is this data persistent?",
                options: [
                    "Yes, always.",
                    "Only with a persistent cache backend; otherwise it's per-request only.",
                    "No, never.",
                    "Only for logged-in users.",
                ],
                a: 1,
                explain:
                    "Without a persistent object cache (Redis/Memcached), the default WP object cache is non-persistent and lasts only for the current request. With a persistent backend, values survive across requests.",
            },
            {
                topic: "Object Cache",
                q: "What is the difference between `wp_cache_add` and `wp_cache_set`?",
                options: [
                    "They are synonyms.",
                    "`add` doesn’t overwrite; `set` overwrites.",
                    "`add` adds numbers, `set` sets strings.",
                    "`set` is faster.",
                ],
                a: 1,
                explain:
                    "`wp_cache_add()` writes only if the key is missing (no overwrite). `wp_cache_set()` writes regardless and replaces any existing value.",
            },
            {
                topic: "Object Cache",
                q: "Why is it important to group cache keys (e.g., `wp_cache_set($id, $val, 'my_plugin')`)?",
                options: [
                    "To make the database look pretty.",
                    "So you can invalidate a plugin’s cache without flushing the whole site.",
                    "It is required by PHP.",
                    "It encrypts the data.",
                ],
                a: 1,
                explain:
                    "Cache groups namespace keys so you can invalidate/flush a specific plugin/module’s cached data without blowing away everything and causing a global cache cold start.",
            },

            // --- TOPIC: DESIGN PATTERNS & DI (EXPANDED) ---
            {
                topic: "Dependency Injection",
                q: "Scenario: You have a class `UserManager` that sends emails. Instead of `new Mailer()` inside it, you pass `$mailer` in the constructor. This is...",
                options: ["Singleton Pattern.", "Dependency Injection.", "Factory Pattern.", "Lazy Loading."],
                a: 1,
            },
            {
                topic: "Design Patterns",
                q: "The 'Adapter Pattern' is useful when...",
                options: [
                    "You need to make incompatible interfaces work together.",
                    "You want to create only one instance of a class.",
                    "You want to loop through an array.",
                    "You want to listen for events.",
                ],
                a: 0,
                explain:
                    "An Adapter wraps one API and exposes the interface your code expects (e.g., making a new payment provider conform to an older gateway interface) so you can integrate without rewriting call sites.",
            },
            {
                topic: "Design Patterns",
                q: "WordPress Hooks (`add_action`, `do_action`) are an implementation of which pattern?",
                options: ["MVC", "Observer Pattern (Publish/Subscribe)", "Active Record", "Prototype"],
                a: 1,
            },

            // --- TOPIC: RAPID FIRE (TRUE/FALSE STYLE) ---
            {
                topic: "Rapid Fire",
                q: "True or False: `require_once` stops the script execution if the file is missing.",
                options: ["True", "False"],
                a: 0,
            },
            {
                topic: "Rapid Fire",
                q: "True or False: In PHP, keys in an associative array are case-sensitive.",
                options: ["True", "False"],
                a: 0,
            },
            {
                topic: "Rapid Fire",
                q: "True or False: You can have multiple `<h1>` tags on a page according to HTML5 standards (though typically not recommended for SEO).",
                options: ["True", "False"],
                a: 0,
            },
            {
                topic: "Rapid Fire",
                q: "True or False: React state updates are always synchronous.",
                options: ["True", "False"],
                a: 1,
                explain:
                    "State updates are often batched and applied asynchronously. In React 18+, batching is more common across events; you should not rely on state updating immediately after calling a setter.",
            },
            {
                topic: "Rapid Fire",
                q: "True or False: A `transient` with an expiration of 0 seconds never expires.",
                options: ["True", "False"],
                a: 1,
                explain:
                    "This is a trick: in WP options, 0 often means 'no expiration', but for transients you should treat 0 as 'don’t use transients for permanence' (behavior/assumptions vary). Prefer an option for permanent storage, or set a real TTL for transients.",
            },
            {
                topic: "Rapid Fire",
                q: "Can you define a constant in PHP using `const` inside an `if` block?",
                options: ["Yes (it’s evaluated at runtime).", "No, `const` is compile-time."],
                a: 1,
                explain:
                    "`const` is compile-time and must be declared at top level (class/interface/trait scope or global scope), not conditionally at runtime. Use `define()` if you truly need runtime/conditional definition.",
            },
            {
                topic: "Rapid Fire",
                q: "Does `empty('0')` return true or false in PHP?",
                options: ["True", "False"],
                a: 0,
            },

            // --- TOPIC: DATABASE (EXPANDED TO 10) ---
            {
                topic: "Database",
                level: "Junior",
                summary: "Explain what an index is and why it helps reads.",
                q: "In MySQL, what is an index primarily used for?",
                options: [
                    "To speed up reads by improving lookups and sorting",
                    "To reduce storage by compressing table rows",
                    "To guarantee referential integrity automatically",
                    "To cache query results across connections",
                ],
                a: 0,
            },
            {
                topic: "Database",
                level: "Mid",
                summary: "Recognize why `meta_query` can be slow at scale.",
                q: "Why can heavy `meta_query` usage become a bottleneck on large WordPress sites?",
                options: [
                    "Meta values are stored in a separate table and require joins",
                    "`meta_query` disables the MySQL query cache forever",
                    "Post meta is stored only in PHP memory, not MySQL",
                    "MySQL cannot index any VARCHAR columns",
                ],
                a: 0,
            },
            {
                topic: "Database",
                level: "Mid",
                summary: "Understand transactions and when they matter.",
                q: "What is a database transaction (in practical terms)?",
                options: [
                    "A way to group multiple writes so they commit atomically",
                    "A background job runner that batches queries",
                    "A query that runs faster by using an index",
                    "A cache layer that stores rows in Redis",
                ],
                a: 0,
            },
            {
                topic: "Database",
                level: "Senior",
                summary: "Avoid deep OFFSET pagination on large datasets.",
                q: "Why is deep pagination with `LIMIT 20 OFFSET 100000` often slow, and what’s a better approach?",
                options: [
                    "OFFSET scans/skips many rows; prefer keyset pagination",
                    "OFFSET breaks indexes; prefer removing the ORDER BY",
                    "OFFSET causes deadlocks; prefer disabling autocommit",
                    "OFFSET disables PHP-FPM; prefer restarting workers",
                ],
                a: 0,
            },
            {
                topic: "Database",
                level: "Senior",
                summary: "Plan schema changes safely under load.",
                q: "You need to backfill a new column for millions of rows. What’s the safest strategy?",
                options: [
                    "Batch updates in small chunks with progress tracking",
                    "Run one giant UPDATE to finish quickly",
                    "Disable indexes and re-enable after the UPDATE",
                    "Do it in PHP on every page request until done",
                ],
                a: 0,
            },
            {
                topic: "Database",
                level: "Senior",
                summary: "Pick custom tables when query needs are complex.",
                q: "When is a custom table usually a better choice than post meta?",
                options: [
                    "When you need complex filtering/reporting at scale",
                    "When you only store a couple of short strings",
                    "When you want to avoid writing any SQL at all",
                    "When you need WordPress to autoload the values",
                ],
                a: 0,
            },
            {
                topic: "Database",
                level: "Senior",
                summary: "Keep migrations idempotent and repeatable.",
                q: "What does it mean for a migration to be idempotent?",
                options: [
                    "Running it twice produces the same final schema/state",
                    "It always uses the same primary key values",
                    "It never locks tables during ALTER statements",
                    "It only runs on production, not staging",
                ],
                a: 0,
            },

            // --- TOPIC: REST API (EXPANDED TO 10) ---
            {
                topic: "REST API",
                level: "Junior",
                summary: "Know what the `permission_callback` controls.",
                q: "In `register_rest_route`, what is `permission_callback` responsible for?",
                options: [
                    "Authorizing the request before executing the callback",
                    "Automatically validating and sanitizing input",
                    "Caching the response in the object cache",
                    "Generating the OpenAPI spec automatically",
                ],
                a: 0,
            },
            {
                topic: "REST API",
                level: "Mid",
                summary: "Version endpoints safely.",
                q: "What is the most common/clean way to version WordPress REST endpoints?",
                options: [
                    "Use the namespace like `myplugin/v1` and introduce `v2`",
                    "Add `?version=2` to every request URL",
                    "Create a separate WordPress site per version",
                    "Only change the callback name, keep the same route",
                ],
                a: 0,
            },
            {
                topic: "REST API",
                level: "Mid",
                summary: "Avoid leaking sensitive data in public endpoints.",
                q: "What’s a common security mistake when exposing custom REST endpoints?",
                options: [
                    "Returning private fields without capability checks",
                    "Using JSON for the response body format",
                    "Using `WP_REST_Response` instead of arrays",
                    "Registering routes on the `init` hook",
                ],
                a: 0,
            },
            {
                topic: "REST API",
                level: "Senior",
                summary: "Design for retries and duplicate deliveries.",
                q: "A CRM retries webhook delivery. What prevents duplicate lead creation?",
                options: [
                    "Idempotency keys and upserts keyed by external IDs",
                    "Increasing PHP memory_limit to handle retries",
                    "Disabling caching on all REST endpoints",
                    "Storing payloads in `wp_options` with autoload",
                ],
                a: 0,
            },
            {
                topic: "REST API",
                level: "Senior",
                summary: "Handle caching correctly for auth/user-scoped data.",
                q: "What’s the safest caching stance for REST responses that depend on the current user?",
                options: [
                    "Avoid shared caches; vary by auth and use private caching",
                    "Cache publicly at the CDN to improve performance",
                    "Cache for 24 hours because users rarely change",
                    "Cache only if the route name includes `/private`",
                ],
                a: 0,
            },

            // --- TOPIC: PERFORMANCE (EXPANDED TO 10) ---
            {
                topic: "Performance",
                level: "Junior",
                summary: "Know what TTFB measures.",
                q: "What does TTFB (Time To First Byte) primarily measure?",
                options: [
                    "Server response latency before the first byte arrives",
                    "How long JavaScript takes to execute on the page",
                    "How long images take to fully load",
                    "How many HTTP requests a page makes",
                ],
                a: 0,
            },
            {
                topic: "Performance",
                level: "Mid",
                summary: "Identify when caching is being bypassed.",
                q: "A page is slow even with a CDN. What’s a common reason full-page caching is bypassed in WordPress?",
                options: [
                    "Logged-in cookies or personalized sessions disable caching",
                    "The theme has too many CSS files loaded",
                    "The database engine is not InnoDB",
                    "Using HTTPS prevents edge caching",
                ],
                a: 0,
            },
            {
                topic: "Performance",
                level: "Mid",
                summary: "Avoid work in the request path.",
                q: "Which change usually improves performance under load?",
                options: [
                    "Move heavy work to async jobs (queues/WP-Cron + real cron)",
                    "Run more PHP logic inside `the_content` filter",
                    "Store large blobs in autoloaded options",
                    "Increase the number of SQL joins in the main query",
                ],
                a: 0,
            },
            {
                topic: "Performance",
                level: "Senior",
                summary: "Understand autoloaded option pitfalls.",
                q: "Why can large autoloaded options hurt every request?",
                options: [
                    "They load on most requests and bloat memory/DB time",
                    "They disable OPcache for the whole PHP process",
                    "They force WordPress to run in debug mode",
                    "They prevent CDN caching on image assets",
                ],
                a: 0,
            },
            {
                topic: "Performance",
                level: "Senior",
                summary: "Measure before optimizing.",
                q: "What is the most senior first step when optimizing a slow WordPress page?",
                options: [
                    "Profile and measure bottlenecks before changing code",
                    "Minify CSS first because it’s always the culprit",
                    "Rewrite the theme using a different framework",
                    "Disable plugins until it feels faster",
                ],
                a: 0,
            },
            {
                topic: "Performance",
                level: "Senior",
                summary: "Know what causes layout thrashing.",
                q: "In frontend performance, what’s “layout thrashing”?",
                options: [
                    "Alternating reads/writes that trigger repeated reflow",
                    "Loading too many fonts in the page head",
                    "Using too many media queries in a stylesheet",
                    "Serving images without `srcset` and `sizes`",
                ],
                a: 0,
            },

            // --- TOPIC: GUTENBERG (EXPANDED TO 10) ---
            {
                topic: "Gutenberg",
                level: "Junior",
                summary: "Know what `block.json` is for.",
                q: "What is `block.json` used for in modern Gutenberg development?",
                options: [
                    "Declaring block metadata, scripts, styles, and supports",
                    "Storing block content in the database permanently",
                    "Generating PHP classes for block rendering",
                    "Replacing the need for any JavaScript tooling",
                ],
                a: 0,
            },
            {
                topic: "Gutenberg",
                level: "Mid",
                summary: "Differentiate static vs dynamic rendering.",
                q: "When is a dynamic block with a PHP `render_callback` most appropriate?",
                options: [
                    "When output depends on live data or user context",
                    "When you want the HTML stored exactly in post_content",
                    "When you want to avoid PHP entirely on the frontend",
                    "When you need the block to work without a theme",
                ],
                a: 0,
            },
            {
                topic: "Gutenberg",
                level: "Mid",
                summary: "Use the right API for editor data fetching.",
                q: "In the editor, what is a common way to fetch WP data for a block?",
                options: [
                    "Use `@wordpress/data` selectors or `apiFetch`",
                    "Directly query MySQL from the browser",
                    "Call PHP functions like `get_posts()` from JS",
                    "Use `document.write` to inject server data",
                ],
                a: 0,
            },
            {
                topic: "Gutenberg",
                level: "Senior",
                summary: "Keep blocks compatible with theme styles.",
                q: "What’s a senior approach to styling blocks across multiple themes?",
                options: [
                    "Leverage `theme.json` + block supports over inline styles",
                    "Hardcode pixel values inline for consistent rendering",
                    "Only ship styles via external CDNs",
                    "Require each theme to override every selector",
                ],
                a: 0,
            },
            {
                topic: "Gutenberg",
                level: "Senior",
                summary: "Understand editor vs frontend parity.",
                q: "Why do blocks sometimes look different in editor vs frontend?",
                options: [
                    "Different CSS scope and markup wrappers can apply",
                    "Gutenberg renders blocks only as images in editor",
                    "React disables CSS specificity in editor",
                    "The REST API strips all block attributes",
                ],
                a: 0,
            },
            {
                topic: "Gutenberg",
                level: "Senior",
                summary: "Design blocks with accessibility in mind.",
                q: "Which is the most accessibility-friendly block output choice?",
                options: [
                    "Semantic elements + keyboard support for interactions",
                    "Div-based markup plus ARIA for everything",
                    "Clickable spans because they are easy to style",
                    "Icon-only buttons without accessible labels",
                ],
                a: 0,
            },

            // --- TOPIC: SECURITY (EXPANDED TO 10) ---
            {
                topic: "Security",
                level: "Junior",
                summary: "Pick the right escaping function for HTML context.",
                q: "Which function is most appropriate to escape text output inside HTML (not attributes)?",
                options: ["esc_html()", "esc_attr()", "esc_url()", "wp_kses_post()"],
                a: 0,
            },
            {
                topic: "Security",
                level: "Mid",
                summary: "Avoid stored XSS by validating and escaping.",
                q: "What best describes a stored XSS risk in WordPress?",
                options: [
                    "Attacker saves script in DB; it executes on page render",
                    "Attacker forces a user to click a malicious link",
                    "Attacker guesses an admin password via brute force",
                    "Attacker blocks CDN requests to slow the site",
                ],
                a: 0,
            },
            {
                topic: "Security",
                level: "Senior",
                summary: "Enforce authorization in REST endpoints.",
                q: "In a custom REST route, what’s the safest place to enforce capabilities?",
                options: [
                    "In `permission_callback` before running business logic",
                    "Only in the JS client because it controls the UI",
                    "Only in the response formatter after the callback",
                    "Only in the route namespace string (e.g., /private)",
                ],
                a: 0,
            },

            // --- TOPIC: CSS (EXPANDED TO 10, JUNIOR → SENIOR) ---
            {
                topic: "CSS",
                level: "Mid",
                summary: "Understand Flexbox alignment nuances.",
                q: "In Flexbox, what’s the difference between `align-items` and `align-content`?",
                options: [
                    "Items aligns children; content aligns flex lines when wrapping",
                    "Items aligns main-axis; content aligns cross-axis always",
                    "Items works only in Grid; content works only in Flex",
                    "They are aliases; both do the same thing",
                ],
                a: 0,
            },
            {
                topic: "CSS",
                level: "Mid/Senior",
                summary: "Choose Grid vs Flex based on layout requirements.",
                q: "When is CSS Grid usually the better tool than Flexbox?",
                options: [
                    "When you need 2D control of rows and columns",
                    "When you only need a single row of buttons",
                    "When you want to avoid defining any column sizes",
                    "When you need JavaScript-driven layout changes",
                ],
                a: 0,
            },
            {
                topic: "CSS",
                level: "Senior",
                summary: "Use container queries for component-driven design.",
                q: "What’s a container query and why is it useful?",
                options: [
                    "Styles based on container size, not the viewport",
                    "A query that fetches CSS from a CDN container",
                    "A way to select parent elements with CSS selectors",
                    "A media query that only targets print styles",
                ],
                a: 0,
            },

            // --- TOPIC: RAPID FIRE (EXPANDED TO 10) ---
            {
                topic: "Rapid Fire",
                q: "True or False: `wp_insert_post()` triggers the `save_post` action.",
                options: ["True", "False"],
                a: 0,
            },
            {
                topic: "Rapid Fire",
                q: "True or False: `wp_enqueue_script` should be called inside `wp_head`.",
                options: ["True", "False"],
                a: 1,
            },
            {
                topic: "Rapid Fire",
                q: "True or False: `position: sticky` works without setting `top`/`left`.",
                options: ["True", "False"],
                a: 1,
            },

            // --- TOPIC: ROLE FIT (NTARA) ---
            {
                topic: "Role Fit (Ntara)",
                level: "Senior",
                summary: "Assess consulting mindset and prioritization under multiple stakeholders.",
                q: "In a consulting environment, you get 5 incoming requests from different teams. What is the most senior/healthy first step?",
                options: [
                    "Start with the easiest request to show quick wins.",
                    "Ask each stakeholder to email their request so you have it in writing.",
                    "Clarify impact/urgency, constraints, and dependencies; then propose a prioritized plan with trade-offs.",
                    "Pick the loudest stakeholder to avoid escalations.",
                ],
                a: 2,
                explain:
                    "Senior behavior is to make prioritization explicit using impact and constraints, not convenience or politics.",
            },
            {
                topic: "Role Fit (Ntara)",
                level: "Senior",
                summary: "Translate a job requirement into a concrete technical approach.",
                q: "The role requires integrating WordPress with CRMs/marketing platforms. Which design choice most reduces long-term risk?",
                options: [
                    "Hardcode API credentials in wp-config.php to keep it simple.",
                    "Wrap integrations behind a stable interface (adapter), add retries/timeouts, and log with correlation IDs.",
                    "Call external APIs inside theme templates so designers can adjust easily.",
                    "Store API responses in post meta for easier access later.",
                ],
                a: 1,
                explain:
                    "Use an adapter boundary + resilience + observability. Avoid business logic in templates and avoid misusing post meta as a cache.",
            },
            {
                topic: "Role Fit (Ntara)",
                level: "Mid/Senior",
                summary: "WCAG/Accessibility as an engineering responsibility.",
                q: "You’re asked to deliver an accessible, SEO-friendly page from Figma. Which workflow is most appropriate?",
                options: [
                    "Implement pixel-perfect UI first, then run Lighthouse at the end.",
                    "Start with semantic HTML and keyboard navigation, then style; verify with automated checks and manual screen reader pass.",
                    "Use divs everywhere and rely on ARIA to fix semantics later.",
                    "Accessibility is QA’s job; developers focus on functionality.",
                ],
                a: 1,
                explain:
                    "Accessibility is cheapest when built in from the start: semantics + keyboard + testing loops.",
            },
            {
                topic: "Role Fit (Ntara)",
                level: "Senior",
                summary: "Make performance/SEO trade-offs explicit.",
                q: "A client wants “perfect” Core Web Vitals, but also asks for several heavy third-party scripts. What’s the best senior response?",
                options: [
                    "Reject the request — performance is non-negotiable.",
                    "Load everything synchronously so it’s reliable.",
                    "Propose an instrumentation plan, defer/partition scripts, and align on measurable targets and exceptions.",
                    "Put the scripts in the footer and hope it passes.",
                ],
                a: 2,
                explain: "Senior approach: data + measurement, then pragmatic mitigation and stakeholder alignment.",
            },
            {
                topic: "Role Fit (Ntara)",
                level: "Senior",
                summary: "Collaboration and requirements gathering.",
                q: "Before estimating a custom plugin build, what information matters most?",
                options: [
                    "Only the UI mockups.",
                    "Acceptance criteria + data contracts + non-functional requirements.",
                    "The client’s preferred coding style.",
                    "The number of pages in the site.",
                ],
                a: 1,
                explain:
                    "Good estimates depend on clear acceptance criteria, integrations/data contracts (schemas), edge cases/error handling, and NFRs (performance, security, accessibility). These drive scope, risk, and unknowns more than UI mocks alone.",
            },
        ],
    };

    // Global for non-module script tags.
    window.WORDPRESS_DEV_BANK = bank;
})();
