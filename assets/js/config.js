// Configuration constants for the greetings application
const CONFIG = Object.freeze({
    // Time constants
    SUBMISSION_COOLDOWN_MS: 24 * 60 * 60 * 1000, // 24 hours in milliseconds

    // Pagination
    ITEMS_PER_PAGE: 5,

    // Responsive design
    MOBILE_BREAKPOINT: 640,

    // Network retry settings
    RETRY: {
        MAX_ATTEMPTS: 3,
        INITIAL_DELAY_MS: 1000,
        MAX_DELAY_MS: 5000,
        BACKOFF_MULTIPLIER: 2,
    },

    // API endpoints
    API: {
        WORKER_IP: "https://nocodb-proxy.edomingt.workers.dev/api/ip",
        FALLBACK_IP: "https://api.ipify.org?format=json",
        COUNTRIES: "/assets/data/countries.json",
    },

    // reCAPTCHA
    RECAPTCHA_SITE_KEY: "6LcF5_crAAAAABBrXkDLdIFnSbQ36AIaDJxXA0P8",
    RECAPTCHA_ACTION: "submit_greeting",

    // Feature flags
    DEBUG: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1",
});
