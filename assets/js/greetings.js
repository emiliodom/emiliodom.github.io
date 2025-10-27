// greetings.js - Refactored with best practices
// Handles greeting selection, submission, and display with NocoDB integration

/**
 * Preset greeting messages available for selection
 * @type {Array<{id: string, text: string}>}
 */
const PRESET_MESSAGES = [
    { id: "m1", text: "Keep pushing, you're doing great!" },
    { id: "m2", text: "Proud of your work — keep it up." },
    { id: "m3", text: "Inspiration for us all!" },
    { id: "m4", text: "Stay curious and keep building." },
    { id: "m5", text: "Small steps lead to big changes." },
    { id: "m6", text: "Keep the momentum going!" },
    { id: "m7", text: "Your dedication is truly admirable." },
    { id: "m8", text: "Great things are coming your way!" },
    { id: "m9", text: "You make a real difference." },
    { id: "m10", text: "Keep shining bright!" },
    { id: "m11", text: "Never stop learning and growing." },
    { id: "m12", text: "Your work is truly inspiring!" },
    { id: "m13", text: "Thanks for sharing your knowledge." },
    { id: "m14", text: "Interesting perspective on this." },
    { id: "m15", text: "Saw your work, looks solid." },
    { id: "m16", text: "Appreciate what you're building here." },
];

/**
 * NocoDB client configuration
 * @type {{url: string|null, postUrl: string|null, getUrl: string|null, token: string|null}}
 */
const NOCODB =
    typeof window !== "undefined" && window.NOCODB_CONFIG
        ? window.NOCODB_CONFIG
        : { url: null, postUrl: null, getUrl: null, token: null };

/**
 * Application state
 */
const AppState = {
    selectedMessage: "",
    selectedFeeling: "",
    selectedCountry: "",
    isSubmitting: false,
    cachedGreetings: null,
};

/**
 * Fetches list of countries from JSON file
 * @returns {Promise<Array>} Array of country objects or empty array on failure
 */
async function fetchCountries() {
    try {
        return await fetchJSON(CONFIG.API.COUNTRIES);
    } catch (error) {
        return [];
    }
}

/**
 * Fetches greetings data from NocoDB via proxy
 * @returns {Promise<Array<{message: string, feeling: string, when: string, whenTimestamp: number, ip: string}>|null>}
 * Array of greeting objects or null on failure
 */
async function fetchFromNocoDB() {
    const fetchUrl = NOCODB.getUrl || NOCODB.url || NOCODB.postUrl;
    if (!fetchUrl) {
        return null;
    }

    try {
        const data = await fetchJSON(fetchUrl);

        const rows = Array.isArray(data)
            ? data
            : Array.isArray(data.records)
            ? data.records
            : Array.isArray(data.list)
            ? data.list
            : [];

        if (!rows.length) {
            return null;
        }

        return rows.map((rec) => {
            const fields = rec.fields || rec;
            const message = fields.Message || fields.message || "";
            const feeling = fields.Notes || fields.notes || "";
            const ip = fields.User || fields.user || "";
            const rawDate = fields.CreatedAt || fields.created_at || fields.createdAt || Date.now();

            const timestamp = new Date(rawDate).getTime();
            const formatter = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
            const when = formatter.format(new Date(rawDate));

            return { message, feeling, when, whenTimestamp: timestamp, ip };
        });
    } catch (error) {
        return null;
    }
}

/**
 * Posts a new greeting to NocoDB via proxy
 * @param {string} message - The greeting message text
 * @param {string} user - The user identifier (IP address)
 * @param {string} notes - The emoji/feeling
 * @param {string} countryCode - ISO country code
 * @returns {Promise<any>} The API response
 * @throws {Error} If posting fails
 */
async function postToNocoDB(message, user, notes, countryCode) {
    const postUrl = NOCODB.postUrl || NOCODB.url;
    if (!postUrl) {
        throw new Error("NocoDB not configured");
    }

    const body =
        postUrl.includes("/api/v2") || postUrl.includes("/api/greetings")
            ? { Message: message, User: user, Notes: notes, Country: countryCode || "XX" }
            : { records: [{ fields: { Message: message, User: user, Notes: notes, Country: countryCode || "XX" } }] };

    const response = await fetchWithRetry(postUrl, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`NocoDB POST failed: ${response.status} ${text}`);
    }

    return response.json();
}

/**
 * Fetches the user's IP address with fallback
 * @returns {Promise<string|null>} The IP address or null if unavailable
 */
async function getIp() {
    try {
        const data = await fetchJSON(CONFIG.API.WORKER_IP);
        return data.ip;
    } catch (error) {
        try {
            const data = await fetchJSON(CONFIG.API.FALLBACK_IP);
            return data.ip;
        } catch (fallbackError) {
            return null;
        }
    }
}

/**
 * Checks if a user has recently submitted a greeting
 * @param {string|null} userIp - The user's IP address
 * @param {Array} greetingsList - Current list of greetings from database
 * @returns {Promise<{allowed: boolean, hoursLeft: number, minutesLeft: number, entry: object|null}>}
 */
async function checkRecentSubmission(userIp, greetingsList = null) {
    const now = Date.now();

    if (userIp && NOCODB.postUrl) {
        const nocodbList = greetingsList || (await fetchFromNocoDB());
        if (nocodbList?.length) {
            const recentEntry = nocodbList.find((entry) => {
                if (!entry.ip || entry.ip !== userIp) return false;
                try {
                    return now - entry.whenTimestamp < CONFIG.SUBMISSION_COOLDOWN_MS;
                } catch (error) {
                    return false;
                }
            });

            if (recentEntry) {
                const msLeft = CONFIG.SUBMISSION_COOLDOWN_MS - (now - recentEntry.whenTimestamp);
                return {
                    allowed: false,
                    hoursLeft: Math.ceil(msLeft / (1000 * 60 * 60)),
                    minutesLeft: Math.ceil((msLeft % (1000 * 60 * 60)) / (1000 * 60)),
                    entry: recentEntry,
                };
            }
        }
    }

    if (userIp) {
        const stored = localStorage.getItem(`greet-submitted-${userIp}`);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                if (data.when && now - data.when < CONFIG.SUBMISSION_COOLDOWN_MS) {
                    const msLeft = CONFIG.SUBMISSION_COOLDOWN_MS - (now - data.when);
                    return {
                        allowed: false,
                        hoursLeft: Math.ceil(msLeft / (1000 * 60 * 60)),
                        minutesLeft: Math.ceil((msLeft % (1000 * 60 * 60)) / (1000 * 60)),
                        entry: data,
                    };
                }
            } catch (error) {
                // Invalid localStorage data, allow submission
            }
        }
    }

    if (!userIp) {
        const browserStored = localStorage.getItem("greet-submitted-browserside");
        if (browserStored) {
            try {
                const browserData = JSON.parse(browserStored);
                if (browserData.when && now - browserData.when < CONFIG.SUBMISSION_COOLDOWN_MS) {
                    const msLeft = CONFIG.SUBMISSION_COOLDOWN_MS - (now - browserData.when);
                    return {
                        allowed: false,
                        hoursLeft: Math.ceil(msLeft / (1000 * 60 * 60)),
                        minutesLeft: Math.ceil((msLeft % (1000 * 60 * 60)) / (1000 * 60)),
                        entry: browserData,
                    };
                }
            } catch (error) {
                // Invalid localStorage data, allow submission
            }
        }
    }

    return { allowed: true, hoursLeft: 0, minutesLeft: 0, entry: null };
}

/**
 * Displays a friendly countdown message when user can't submit
 * @param {number} hoursLeft - Hours remaining until next submission
 * @param {number} minutesLeft - Minutes remaining until next submission
 * @param {HTMLElement} alertElement - The alert element to populate
 * @param {HTMLFormElement} formElement - The form element to hide
 */
function showSubmissionBlockedUI(hoursLeft, minutesLeft, alertElement, formElement) {
    if (formElement) {
        formElement.style.display = "none";
    }

    if (alertElement) {
        alertElement.className = "submission-status-alert submission-info";
        alertElement.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 48px; margin-bottom: 10px;">⏰</div>
                <h3 style="margin: 10px 0; color: var(--color-text);">Thank you for your greeting!</h3>
                <p style="color: var(--color-text-muted); margin: 10px 0;">
                    You can submit another greeting in approximately <strong>${hoursLeft} hour${
            hoursLeft !== 1 ? "s" : ""
        }</strong>
                    ${
                        minutesLeft > 0 && hoursLeft < 24
                            ? ` and <strong>${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""}</strong>`
                            : ""
                    }.
                </p>
                <p style="color: var(--color-text-muted); margin-top: 20px;">
                    In the meantime, check out the latest greetings below! 👇
                </p>
            </div>
        `;
        alertElement.style.display = "block";
    }
}

/**
 * Renders greetings using pagination.js library
 * @param {Array} list - Array of greeting objects
 * @param {number} page - Current page number
 */
function renderPagination(list, page = 1) {
    const container = document.getElementById("greet-list");
    if (!container) return;

    container.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "greet-grid";
    grid.id = "greet-grid";
    container.appendChild(grid);

    const paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination-container";
    paginationContainer.className = "pager";
    container.appendChild(paginationContainer);

    if (typeof pagination === "undefined") {
        renderSimplePagination(list, page, grid, paginationContainer);
        return;
    }

    const reversedList = list.slice().reverse();

    pagination(paginationContainer, {
        dataSource: reversedList,
        pageSize: CONFIG.ITEMS_PER_PAGE,
        pageNumber: page,
        callback: function (data, pagination) {
            grid.innerHTML = "";
            const isMobile = window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;

            data.forEach((item, idx) => {
                const card = document.createElement("article");
                card.className = "greet-card";
                if (item._pending) card.classList.add("pending");
                if (item._failed) card.classList.add("failed");
                card.tabIndex = 0;

                if (isMobile && idx > 2) {
                    card.setAttribute("loading", "lazy");
                    card.style.contentVisibility = "auto";
                }

                const feelDiv = document.createElement("div");
                feelDiv.className = "greet-feel";
                feelDiv.textContent = item.feeling || "";

                const textDiv = document.createElement("div");
                textDiv.className = "greet-text";
                textDiv.textContent = item.message;

                const metaDiv = document.createElement("div");
                metaDiv.className = "greet-meta";
                metaDiv.textContent = item.when;

                card.appendChild(feelDiv);
                card.appendChild(textDiv);
                card.appendChild(metaDiv);
                grid.appendChild(card);
            });
        },
    });
}

/**
 * Fallback simple pagination if library not loaded
 * @param {Array} list - Array of greeting objects
 * @param {number} page - Current page number
 * @param {HTMLElement} grid - Grid container element
 * @param {HTMLElement} pagerContainer - Pagination controls container
 */
function renderSimplePagination(list, page, grid, pagerContainer) {
    const total = list.length;
    const pages = Math.max(1, Math.ceil(total / CONFIG.ITEMS_PER_PAGE));
    const start = (page - 1) * CONFIG.ITEMS_PER_PAGE;
    const pageItems = list
        .slice()
        .reverse()
        .slice(start, start + CONFIG.ITEMS_PER_PAGE);

    const isMobile = window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
    pageItems.forEach((item, idx) => {
        const card = document.createElement("article");
        card.className = "greet-card";
        if (item._pending) card.classList.add("pending");
        if (item._failed) card.classList.add("failed");
        card.tabIndex = 0;

        if (isMobile && idx > 2) {
            card.setAttribute("loading", "lazy");
            card.style.contentVisibility = "auto";
        }

        const feelDiv = document.createElement("div");
        feelDiv.className = "greet-feel";
        feelDiv.textContent = item.feeling || "";

        const textDiv = document.createElement("div");
        textDiv.className = "greet-text";
        textDiv.textContent = item.message;

        const metaDiv = document.createElement("div");
        metaDiv.className = "greet-meta";
        metaDiv.textContent = item.when;

        card.appendChild(feelDiv);
        card.appendChild(textDiv);
        card.appendChild(metaDiv);
        grid.appendChild(card);
    });

    pagerContainer.innerHTML = "";
    const prev = document.createElement("button");
    prev.textContent = "Previous";
    const next = document.createElement("button");
    next.textContent = "Next";
    prev.disabled = page <= 1;
    next.disabled = page >= pages;
    prev.addEventListener("click", () => renderPagination(list, page - 1));
    next.addEventListener("click", () => renderPagination(list, page + 1));
    pagerContainer.appendChild(prev);
    pagerContainer.appendChild(document.createTextNode(` Page ${page} / ${pages} `));
    pagerContainer.appendChild(next);
}

/**
 * Saves a greeting entry to localStorage
 * @param {string} message - The greeting message
 * @param {string} feeling - The emoji/feeling
 */
function saveWallEntry(message, feeling) {
    const list = JSON.parse(localStorage.getItem("greetings-list") || "[]");
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const when = formatter.format(new Date());
    const whenTimestamp = Date.now();
    list.push({ message, feeling, when, whenTimestamp });
    localStorage.setItem("greetings-list", JSON.stringify(list));
    renderPagination(list, 1);
}

/**
 * Loads greeting entries from localStorage
 * @returns {Array} Array of greeting objects from localStorage
 */
function loadWallEntries() {
    try {
        return JSON.parse(localStorage.getItem("greetings-list") || "[]");
    } catch (error) {
        return [];
    }
}

/**
 * Validates reCAPTCHA and returns token
 * @returns {Promise<string>} The reCAPTCHA token
 * @throws {Error} If reCAPTCHA validation fails
 */
async function validateRecaptcha() {
    if (typeof grecaptcha === "undefined") {
        throw new Error("reCAPTCHA script not loaded. Please refresh the page and try again.");
    }
    if (!grecaptcha.enterprise) {
        throw new Error("reCAPTCHA Enterprise not available. Please refresh the page and try again.");
    }

    await grecaptcha.enterprise.ready();
    const token = await grecaptcha.enterprise.execute(CONFIG.RECAPTCHA_SITE_KEY, {
        action: CONFIG.RECAPTCHA_ACTION,
    });

    if (!token) {
        throw new Error("Failed to generate reCAPTCHA token");
    }

    return token;
}

/**
 * Sets feedback message with styling
 * @param {HTMLElement} feedbackEl - Feedback element
 * @param {string} message - Message to display
 * @param {string} type - Message type: 'error', 'info', 'success'
 */
function setFeedback(feedbackEl, message, type = "error") {
    feedbackEl.textContent = message;
    feedbackEl.style.padding = "12px";
    feedbackEl.style.borderRadius = "8px";
    feedbackEl.style.marginTop = "12px";

    if (type === "error") {
        feedbackEl.style.color = "#f5576c";
        feedbackEl.style.background = "rgba(245, 87, 108, 0.1)";
    } else if (type === "info") {
        feedbackEl.style.color = "#3b6fa6";
        feedbackEl.style.background = "rgba(59, 111, 166, 0.1)";
    } else if (type === "success") {
        feedbackEl.style.color = "#52c41a";
        feedbackEl.style.background = "rgba(82, 196, 26, 0.1)";
    }
}

/**
 * Handles form submission
 * @param {Event} e - Submit event
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    if (AppState.isSubmitting) return;
    AppState.isSubmitting = true;

    const feedback = document.getElementById("greet-feedback");
    const submitButton = e.target.querySelector('button[type="submit"]');
    feedback.textContent = "";

    try {
        if (submitButton) submitButton.disabled = true;

        const sel = document.querySelector(".preset-card.selected");
        const messageSelectEl = document.getElementById("message-select");
        const preset = sel?.dataset.text.trim() || messageSelectEl?.value.trim() || AppState.selectedMessage || "";

        if (!preset) {
            setFeedback(feedback, "Please choose a message.", "error");
            return;
        }

        if (!AppState.selectedFeeling) {
            setFeedback(feedback, "Please select how you're feeling.", "error");
            return;
        }

        if (!AppState.selectedCountry) {
            setFeedback(feedback, "Please select your country.", "error");
            return;
        }

        setFeedback(feedback, "🔐 Verifying you're human...", "info");

        let recaptchaToken;
        try {
            recaptchaToken = await validateRecaptcha();
        } catch (recaptchaError) {
            feedback.innerHTML = `
                <strong>reCAPTCHA verification failed.</strong><br>
                <br>
                <strong>Possible causes:</strong><br>
                • Script still loading - wait a few seconds and try again<br>
                • Ad blocker or browser extension interfering<br>
                • Google Translate active (switch to English)<br>
                <br>
                <strong>If using Google Translate:</strong><br>
                1. Switch the language selector above back to "ENG" (English)<br>
                2. Wait 2 seconds for the page to reset<br>
                3. Try submitting again<br>
                <br>
                <strong>Error details:</strong> ${recaptchaError.message}
            `;
            setFeedback(feedback, feedback.innerHTML, "error");
            return;
        }

        const ip = await getIp();

        const submissionCheck = await checkRecentSubmission(ip);
        if (!submissionCheck.allowed) {
            setFeedback(feedback, "You have already submitted a greeting from this IP in the last 24 hours.", "error");
            return;
        }

        const dedupInput = (ip || "web") + "|" + preset;
        const dedupHash = await (async function hashString(s) {
            if (window.crypto?.subtle) {
                const enc = new TextEncoder().encode(s);
                const hashBuf = await crypto.subtle.digest("SHA-1", enc);
                const hashArr = Array.from(new Uint8Array(hashBuf));
                return hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
            }
            let h = 0;
            for (let i = 0; i < s.length; i++) {
                h = (h << 5) - h + s.charCodeAt(i);
                h |= 0;
            }
            return String(h);
        })(dedupInput);

        const dedupKey = `greet-submitted-hash-${dedupHash}`;
        const dedupStored = localStorage.getItem(dedupKey);
        if (dedupStored) {
            try {
                const dedupData = JSON.parse(dedupStored);
                if (dedupData.when && Date.now() - dedupData.when < CONFIG.SUBMISSION_COOLDOWN_MS) {
                    setFeedback(feedback, "Duplicate submission detected (same IP/message in last 24 hours).", "error");
                    return;
                }
            } catch (error) {
                // Invalid data, allow submission
            }
        }

        if (ip) {
            localStorage.setItem(
                `greet-submitted-${ip}`,
                JSON.stringify({
                    when: Date.now(),
                    message: preset,
                })
            );
        } else {
            localStorage.setItem(
                "greet-submitted-browserside",
                JSON.stringify({
                    when: Date.now(),
                    message: preset,
                })
            );
        }

        const messageText = preset;
        const notesEmoji = AppState.selectedFeeling || "";
        const countryCode = AppState.selectedCountry || "XX";

        const formatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        const optimisticEntry = {
            message: messageText,
            feeling: notesEmoji,
            when: "Sending…",
            whenTimestamp: Date.now(),
            _pending: true,
        };
        const currentList = loadWallEntries();
        renderPagination([...currentList, optimisticEntry], 1);

        try {
            const userField = ip || "web";
            const postUrl = NOCODB.postUrl || NOCODB.url;
            if (postUrl) {
                await postToNocoDB(messageText, userField, notesEmoji, countryCode);
                localStorage.setItem(dedupKey, JSON.stringify({ when: Date.now() }));
                const nocodbList = await fetchFromNocoDB();
                if (nocodbList) {
                    AppState.cachedGreetings = nocodbList;
                    renderPagination(nocodbList, 1);
                }
                setFeedback(feedback, "Thanks — your greeting was added (saved to NocoDB)!", "success");
            } else {
                saveWallEntry(messageText, notesEmoji);
                localStorage.setItem(dedupKey, JSON.stringify({ when: Date.now() }));
                setFeedback(feedback, "Thanks — your greeting was saved locally!", "success");
            }
        } catch (error) {
            const currentListFailed = loadWallEntries();
            const failedEntry = {
                message: messageText,
                feeling: notesEmoji,
                when: formatter.format(new Date()),
                whenTimestamp: Date.now(),
                _failed: true,
            };
            renderPagination([...currentListFailed, failedEntry], 1);
            setFeedback(feedback, `Failed to save: ${error.message}`, "error");
        }
    } finally {
        AppState.isSubmitting = false;
        if (submitButton) submitButton.disabled = false;
    }
}

/**
 * Initialize the greetings page
 */
document.addEventListener("DOMContentLoaded", async () => {
    let nocodbAvailable = false;
    let cachedData = null;

    try {
        const testData = await fetchFromNocoDB();
        nocodbAvailable = testData !== null && Array.isArray(testData);
        if (nocodbAvailable) {
            cachedData = testData;
            AppState.cachedGreetings = testData;
        }
    } catch (error) {
        nocodbAvailable = false;
    }

    if (!nocodbAvailable) {
        const greetingsSection = document.querySelector(".greetings-section");
        if (greetingsSection) {
            greetingsSection.style.opacity = "0.3";
            greetingsSection.style.pointerEvents = "none";
            greetingsSection.style.filter = "grayscale(1)";
        }

        const errorDiv = document.createElement("div");
        errorDiv.style.cssText =
            "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(245,87,108,0.95);color:white;padding:32px;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);text-align:center;z-index:9999;max-width:500px;";
        errorDiv.innerHTML = `
            <h2 style="margin:0 0 16px 0;font-size:24px;">⚠️ Service Temporarily Unavailable</h2>
            <p style="margin:0;font-size:16px;line-height:1.6;">
                Please come back later, we are having problems connecting to the database.
            </p>
            <p style="margin:16px 0 0 0;font-size:14px;opacity:0.9;">
                The greetings feature will be back online shortly.
            </p>
        `;
        document.body.appendChild(errorDiv);

        // Still try to load and show cached localStorage data
        const localWall = loadWallEntries();
        if (localWall?.length > 0) {
            renderPagination(localWall, 1);
        }
        return;
    }

    const submissionStatusAlert = document.getElementById("submission-status-alert");
    let userIp = null;

    try {
        userIp = await getIp();
    } catch (error) {
        // IP fetch failed, continue without IP
    }

    const submissionCheck = await checkRecentSubmission(userIp, cachedData);
    if (!submissionCheck.allowed) {
        const greetForm = document.getElementById("greet-form");
        showSubmissionBlockedUI(
            submissionCheck.hoursLeft,
            submissionCheck.minutesLeft,
            submissionStatusAlert,
            greetForm
        );
    } else if (submissionStatusAlert) {
        submissionStatusAlert.className = "submission-status-alert submission-ready";
        submissionStatusAlert.innerHTML = "✅ You can submit a greeting! Fill out the form below.";
        submissionStatusAlert.style.display = "block";
    }

    const countries = await fetchCountries();
    const countrySelector = document.getElementById("country-selector");
    if (countrySelector && countries.length > 0) {
        countries.forEach((c) => {
            const opt = document.createElement("option");
            opt.value = c.code;
            opt.textContent = `${c.flag} ${c.name}`;
            countrySelector.appendChild(opt);
        });
        countrySelector.addEventListener("change", (e) => {
            AppState.selectedCountry = e.target.value;
        });
    }

    const presetCards = document.getElementById("preset-cards");
    const messageSelect = document.getElementById("message-select");

    if (presetCards) {
        PRESET_MESSAGES.forEach((msg) => {
            const card = document.createElement("div");
            card.className = "preset-card";
            card.dataset.id = msg.id;
            card.dataset.text = msg.text;
            card.textContent = msg.text;
            card.tabIndex = 0;
            card.setAttribute("role", "radio");
            card.setAttribute("aria-checked", "false");
            card.addEventListener("click", function () {
                document.querySelectorAll(".preset-card").forEach((c) => {
                    c.classList.remove("selected");
                    c.setAttribute("aria-checked", "false");
                });
                this.classList.add("selected");
                this.setAttribute("aria-checked", "true");
                AppState.selectedMessage = this.dataset.text;
            });
            presetCards.appendChild(card);
        });
    }

    if (messageSelect) {
        PRESET_MESSAGES.forEach((msg) => {
            const option = document.createElement("option");
            option.value = msg.text;
            option.textContent = msg.text;
            messageSelect.appendChild(option);
        });
        messageSelect.addEventListener("change", (e) => {
            AppState.selectedMessage = e.target.value;
        });
    }

    const feelings = document.querySelectorAll(".feeling");
    feelings.forEach((btn) => {
        btn.addEventListener("click", function () {
            feelings.forEach((b) => {
                b.classList.remove("selected");
                b.setAttribute("aria-pressed", "false");
            });
            this.classList.add("selected");
            this.setAttribute("aria-pressed", "true");
            AppState.selectedFeeling = this.dataset.feel;
        });
    });

    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "block";

    (async () => {
        try {
            const nocodbList = cachedData || (await fetchFromNocoDB());
            if (nocodbList && nocodbList.length) {
                renderPagination(nocodbList, 1);
            } else {
                const stored = loadWallEntries();
                if (stored.length) {
                    renderPagination(stored, 1);
                }
            }
        } catch (error) {
            const stored = loadWallEntries();
            renderPagination(stored, 1);
        } finally {
            if (loader) loader.style.display = "none";
        }
    })();

    const greetForm = document.getElementById("greet-form");
    if (greetForm) {
        greetForm.addEventListener("submit", handleFormSubmit);
    }
});
