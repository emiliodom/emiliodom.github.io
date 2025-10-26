// greetings.js
// Handles preset greeting selection, Google reCAPTCHA Enterprise, simple IP-based single submission

async function fetchCountries() {
    try {
        const r = await fetch("/assets/data/countries.json");
        if (!r.ok) return [];
        return await r.json();
    } catch (e) {
        console.warn("Could not load countries list", e);
        return [];
    }
}

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

// NocoDB client config (optional). Set window.NOCODB_CONFIG in the page to enable.
// Support both v3 (`url`) and v2 (`postUrl`/`getUrl`) styles.
const NOCODB =
    typeof window !== "undefined" && window.NOCODB_CONFIG
        ? window.NOCODB_CONFIG
        : { url: null, postUrl: null, getUrl: null, token: null };

async function fetchFromNocoDB() {
    const fetchUrl = NOCODB.getUrl || NOCODB.url || NOCODB.postUrl;
    if (!fetchUrl) return null;
    try {
        // No xc-token header needed - the proxy handles authentication
        const headers = { accept: "application/json" };
        const r = await fetch(fetchUrl, { headers });
        if (!r.ok) throw new Error("nocodb fetch failed");
        const j = await r.json();
        // Expecting array of records; map into local format {message, feeling, when, ip}
        // Normalize various response shapes
        const rows = [];
        if (Array.isArray(j)) {
            rows.push(...j);
        } else if (j && Array.isArray(j.records)) {
            rows.push(...j.records);
        } else if (j && Array.isArray(j.list)) {
            rows.push(...j.list);
        }
        if (rows.length) {
            return rows.map((rec) => {
                const fields = rec.fields || rec;
                // For v2 mapping: Message = text, Notes = emoticon, User = ip
                const message = fields.Message || fields.message || "";
                const feeling = fields.Notes || fields.notes || "";
                const ip = fields.User || fields.user || "";
                const rawDate = fields.CreatedAt || fields.created_at || fields.createdAt || "";
                // Format date nicely
                let when = "";
                if (rawDate) {
                    try {
                        const d = new Date(rawDate);
                        when = d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
                    } catch (e) {
                        when = rawDate;
                    }
                } else {
                    when = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
                }
                return { message, feeling, when, ip };
            });
        }
        return null;
    } catch (e) {
        console.warn("fetchFromNocoDB failed", e);
        return null;
    }
}

async function postToNocoDB(message, user, notes, countryCode) {
    const postUrl = NOCODB.postUrl || NOCODB.url;
    if (!postUrl) throw new Error("NocoDB not configured");
    try {
        // For v2 API (tables endpoint) the user-supplied curl posts a flat JSON with fields at root.
        // We'll detect v2 by presence of postUrl including '/api/v2' or when postUrl is explicitly provided.
        let body;
        if (postUrl.includes("/api/v2") || postUrl.includes("/api/greetings")) {
            // Send flat JSON: Message (text), User (ip), Notes (emoticon), Country (code like 'GT')
            body = { Message: message, User: user, Notes: notes, Country: countryCode || "XX" };
        } else {
            // Fallback for v3 style: send records wrapper
            body = {
                records: [{ fields: { Message: message, User: user, Notes: notes, Country: countryCode || "XX" } }],
            };
        }

        // No xc-token header needed - the proxy handles authentication
        const r = await fetch(postUrl, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!r.ok) {
            const text = await r.text();
            throw new Error(`NocoDB POST failed: ${r.status} ${text}`);
        }
        return await r.json();
    } catch (e) {
        console.warn("postToNocoDB failed", e);
        throw e;
    }
}
async function getIp() {
    try {
        // Use the worker's IP endpoint first
        const r = await fetch("https://nocodb-proxy.edomingt.workers.dev/api/ip");
        if (!r.ok) throw new Error("ip fetch failed");
        const j = await r.json();
        return j.ip;
    } catch (e) {
        console.warn("Worker IP fetch failed, trying fallback", e);
        // Fallback to ipify
        try {
            const r = await fetch("https://api.ipify.org?format=json");
            if (!r.ok) throw new Error("ip fetch failed");
            const j = await r.json();
            return j.ip;
        } catch (e2) {
            console.warn("IP fetch failed completely, falling back to local id", e2);
            return null;
        }
    }
}

function renderPagination(list, page = 1, perPage = 5) {
    const total = list.length;
    const pages = Math.max(1, Math.ceil(total / perPage));
    const start = (page - 1) * perPage;
    const pageItems = list
        .slice()
        .reverse()
        .slice(start, start + perPage);
    const container = document.getElementById("greet-list");
    container.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "greet-grid";

    // Lazy loading for mobile
    const isMobile = window.innerWidth <= 640;
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
        // Sanitize user content before rendering
        const sanitizedFeeling =
            typeof DOMPurify !== "undefined" ? DOMPurify.sanitize(item.feeling || "") : item.feeling || "";
        const sanitizedMessage = typeof DOMPurify !== "undefined" ? DOMPurify.sanitize(item.message) : item.message;
        const sanitizedWhen = typeof DOMPurify !== "undefined" ? DOMPurify.sanitize(item.when) : item.when;
        card.innerHTML = `<div class="greet-feel">${sanitizedFeeling}</div><div class="greet-text">${sanitizedMessage}</div><div class="greet-meta">${sanitizedWhen}</div>`;
        grid.appendChild(card);
    });
    container.appendChild(grid);

    // pager
    const pager = document.createElement("div");
    pager.className = "pager";
    const prev = document.createElement("button");
    prev.textContent = "Previous";
    const next = document.createElement("button");
    next.textContent = "Next";
    prev.disabled = page <= 1;
    next.disabled = page >= pages;
    prev.addEventListener("click", () => renderPagination(list, page - 1, perPage));
    next.addEventListener("click", () => renderPagination(list, page + 1, perPage));
    pager.appendChild(prev);
    pager.appendChild(document.createTextNode(` Page ${page} / ${pages} `));
    pager.appendChild(next);
    container.appendChild(pager);
}

function saveWallEntry(message, feeling) {
    const list = JSON.parse(localStorage.getItem("greetings-list") || "[]");
    const when = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    list.push({ message, feeling, when });
    localStorage.setItem("greetings-list", JSON.stringify(list));
    renderPagination(list, 1, 5);
}

document.addEventListener("DOMContentLoaded", async () => {
    // Check NocoDB availability first
    let nocodbAvailable = false;
    try {
        const testResponse = await fetch(NOCODB.getUrl || NOCODB.postUrl, {
            method: "HEAD",
            headers: { accept: "application/json" },
        });
        nocodbAvailable = testResponse && testResponse.ok;
    } catch (e) {
        nocodbAvailable = false;
    }

    // If NocoDB is not available, show error and grey out page
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
        return; // Stop execution
    }

    // Check if user has already submitted by querying NocoDB directly
    const submissionStatusAlert = document.getElementById("submission-status-alert");
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    let hasRecentSubmission = false;

    // Get user's IP
    let userIp = null;
    try {
        userIp = await getIp();
    } catch (e) {
        console.warn("Could not get IP", e);
    }

    // Check NocoDB database for existing submission from this IP
    if (userIp) {
        try {
            const nocodbList = await fetchFromNocoDB();
            if (nocodbList && nocodbList.length) {
                // Find any submission from this IP in the last 24 hours
                const recentEntry = nocodbList.find((entry) => {
                    if (!entry.ip || entry.ip !== userIp) return false;
                    // Parse the entry's date and check if within 24 hours
                    try {
                        const entryDate = new Date(entry.when);
                        const entryTime = entryDate.getTime();
                        return now - entryTime < oneDayMs;
                    } catch (e) {
                        return false;
                    }
                });

                if (recentEntry) {
                    hasRecentSubmission = true;
                    const entryDate = new Date(recentEntry.when);
                    const entryTime = entryDate.getTime();
                    const hoursLeft = Math.ceil((oneDayMs - (now - entryTime)) / (1000 * 60 * 60));
                    if (submissionStatusAlert) {
                        submissionStatusAlert.className = "submission-status-alert submission-blocked";
                        submissionStatusAlert.innerHTML = `🚫 You've already submitted a greeting in the last 24 hours. Please wait ${hoursLeft} more hour${
                            hoursLeft !== 1 ? "s" : ""
                        } before submitting again.`;
                        submissionStatusAlert.style.display = "block";
                    }
                }
            }
        } catch (e) {
            console.warn("Could not check NocoDB for existing submissions", e);
        }
    }

    // Fallback: check localStorage
    if (!hasRecentSubmission && userIp) {
        const ipKey = `greet-submitted-${userIp}`;
        const stored = localStorage.getItem(ipKey);
        if (stored) {
            const data = JSON.parse(stored);
            if (data.when && now - data.when < oneDayMs) {
                hasRecentSubmission = true;
                const hoursLeft = Math.ceil((oneDayMs - (now - data.when)) / (1000 * 60 * 60));
                if (submissionStatusAlert) {
                    submissionStatusAlert.className = "submission-status-alert submission-blocked";
                    submissionStatusAlert.innerHTML = `🚫 You've already submitted a greeting in the last 24 hours. Please wait ${hoursLeft} more hour${
                        hoursLeft !== 1 ? "s" : ""
                    } before submitting again.`;
                    submissionStatusAlert.style.display = "block";
                }
            }
        }
    }

    // Browser-based fallback if no IP available
    if (!hasRecentSubmission && !userIp) {
        const browserKey = "greet-submitted-browserside";
        const browserStored = localStorage.getItem(browserKey);
        if (browserStored) {
            try {
                const browserData = JSON.parse(browserStored);
                if (browserData.when && now - browserData.when < oneDayMs) {
                    hasRecentSubmission = true;
                    const hoursLeft = Math.ceil((oneDayMs - (now - browserData.when)) / (1000 * 60 * 60));
                    if (submissionStatusAlert) {
                        submissionStatusAlert.className = "submission-status-alert submission-blocked";
                        submissionStatusAlert.innerHTML = `🚫 You've already submitted a greeting in the last 24 hours. Please wait ${hoursLeft} more hour${
                            hoursLeft !== 1 ? "s" : ""
                        } before submitting again.`;
                        submissionStatusAlert.style.display = "block";
                    }
                }
            } catch (e) {
                // ignore
            }
        }
    }

    // Show success message if no recent submission
    if (!hasRecentSubmission && submissionStatusAlert) {
        submissionStatusAlert.className = "submission-status-alert submission-ready";
        submissionStatusAlert.innerHTML = "✅ You can submit a greeting! Fill out the form below.";
        submissionStatusAlert.style.display = "block";
    }

    const countries = await fetchCountries();

    // Populate country selector with flag icons
    const countrySelector = document.getElementById("country-selector");
    if (countrySelector && countries.length > 0) {
        // Sort countries alphabetically by name
        const sortedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));

        sortedCountries.forEach((country) => {
            const opt = document.createElement("option");
            opt.value = country.code.toUpperCase(); // Store country code like 'GT'
            opt.textContent = country.name;
            opt.dataset.flag = country.flag;
            opt.dataset.code = country.code.toLowerCase();
            countrySelector.appendChild(opt);
        });

        // Add flag icon visualization before selector
        const wrapper = countrySelector.parentElement;
        const flagDisplay = document.createElement("span");
        flagDisplay.id = "selected-flag";
        flagDisplay.className = "fi fi-xx fis";
        flagDisplay.style.cssText =
            "position:absolute;left:12px;top:50%;transform:translateY(-50%);pointer-events:none;font-size:20px;";
        wrapper.style.position = "relative";
        wrapper.insertBefore(flagDisplay, countrySelector);
        countrySelector.style.paddingLeft = "44px";

        // Update flag display when country changes
        countrySelector.addEventListener("change", function () {
            const selectedOption = this.options[this.selectedIndex];
            const code = selectedOption.dataset.code;
            if (code) {
                flagDisplay.className = `fi fi-${code} fis`;
                flagDisplay.style.opacity = "1";
            } else {
                flagDisplay.className = "fi fi-xx fis";
                flagDisplay.style.opacity = "0.3";
            }
        });
    }

    // Track selected fields to enable submit button
    let selectedMessage = null;
    let selectedFeeling = null;
    let selectedCountry = null;

    function checkFormValidity() {
        const submitBtn = document.getElementById("greet-submit");
        if (submitBtn) {
            if (selectedMessage && selectedFeeling && selectedCountry) {
                submitBtn.disabled = false;
            } else {
                submitBtn.disabled = true;
            }
        }
    }

    // render preset cards
    const cards = document.getElementById("preset-cards");
    PRESET_MESSAGES.forEach((m) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "preset-card";
        b.dataset.id = m.id;
        b.dataset.text = m.text;
        b.innerHTML = `<div class="card-text">${m.text}</div>`;
        b.addEventListener("click", () => {
            document.querySelectorAll(".preset-card").forEach((x) => x.classList.remove("selected"));
            b.classList.add("selected");
            b.setAttribute("aria-pressed", "true");
            selectedMessage = m.text;
            checkFormValidity();
        });
        cards.appendChild(b);
    });

    // populate message selector (for desktop and mobile)
    const messageSelect = document.getElementById("message-select");
    if (messageSelect) {
        PRESET_MESSAGES.forEach((m) => {
            const opt = document.createElement("option");
            opt.value = m.text;
            opt.textContent = m.text;
            messageSelect.appendChild(opt);
        });
        messageSelect.addEventListener("change", (e) => {
            selectedMessage = e.target.value || null;
            checkFormValidity();
        });
    }

    // feelings buttons
    document.querySelectorAll(".feeling").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".feeling").forEach((b) => {
                b.setAttribute("aria-pressed", "false");
                b.classList.remove("selected");
            });
            btn.setAttribute("aria-pressed", "true");
            btn.classList.add("selected");
            selectedFeeling = btn.dataset.feel;
            checkFormValidity();
        });
    });

    // mobile feeling select
    const feelingSelect = document.getElementById("feeling-select");
    if (feelingSelect) {
        feelingSelect.addEventListener("change", (e) => {
            selectedFeeling = e.target.value || null;
            checkFormValidity();
        });
    }

    // country selector
    if (countrySelector) {
        countrySelector.addEventListener("change", (e) => {
            selectedCountry = e.target.value || null;
            checkFormValidity();
        });
    }

    // try to load from NocoDB first (if configured), otherwise from localStorage
    (async () => {
        const loader = document.getElementById("greet-loader");
        if (loader) loader.style.display = "flex";
        try {
            const nocodbList = await fetchFromNocoDB();
            if (nocodbList && nocodbList.length) {
                renderPagination(nocodbList, 1, 5);
            } else {
                const stored = JSON.parse(localStorage.getItem("greetings-list") || "[]");
                renderPagination(stored, 1, 5);
            }
        } catch (e) {
            const stored = JSON.parse(localStorage.getItem("greetings-list") || "[]");
            renderPagination(stored, 1, 5);
        } finally {
            if (loader) loader.style.display = "none";
        }
    })();

    document.getElementById("greet-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const feedback = document.getElementById("greet-feedback");
        feedback.textContent = "";

        // Execute reCAPTCHA Enterprise
        let recaptchaToken;
        try {
            if (typeof grecaptcha === "undefined" || !grecaptcha.enterprise) {
                throw new Error("reCAPTCHA not loaded. Please refresh the page.");
            }
            await grecaptcha.enterprise.ready();
            recaptchaToken = await grecaptcha.enterprise.execute("6LcF5_crAAAAABBrXkDLdIFnSbQ36AIaDJxXA0P8", {
                action: "submit_greeting",
            });
            console.log("reCAPTCHA token generated successfully");
        } catch (e) {
            console.error("reCAPTCHA error:", e);
            feedback.innerHTML = `
                <strong>reCAPTCHA verification failed.</strong><br>
                <br>
                <strong>If you're using Google Translate:</strong><br>
                1. Switch the language selector above back to "ENG" (English)<br>
                2. Wait 2 seconds for the page to reset<br>
                3. Try submitting again<br>
                <br>
                Google Translate interferes with reCAPTCHA. Please use English to submit.
            `;
            feedback.style.color = "#f5576c";
            feedback.style.background = "rgba(245, 87, 108, 0.1)";
            feedback.style.padding = "12px";
            feedback.style.borderRadius = "8px";
            feedback.style.marginTop = "12px";
            return;
        }

        const sel = document.querySelector(".preset-card.selected");
        const messageSelectEl = document.getElementById("message-select");
        const preset = sel
            ? sel.dataset.text.trim()
            : messageSelectEl && messageSelectEl.value
            ? messageSelectEl.value.trim()
            : selectedMessage || "";

        if (!preset) {
            feedback.textContent = "Please choose a message.";
            return;
        }

        if (!selectedFeeling) {
            feedback.textContent = "Please select how you're feeling.";
            return;
        }

        if (!selectedCountry) {
            feedback.textContent = "Please select your country.";
            return;
        }

        // fetch IP
        const ip = await getIp();

        // Check if this IP already submitted in the last 24 hours (database and local)
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (ip && NOCODB.postUrl && NOCODB.token) {
            try {
                const nocodbList = await fetchFromNocoDB();
                if (nocodbList && nocodbList.length) {
                    const recentEntry = nocodbList.find((entry) => {
                        if (entry.ip !== ip) return false;
                        // Check if within 24 hours
                        const entryTime = entry.when ? new Date(entry.when).getTime() : 0;
                        return now - entryTime < oneDayMs;
                    });
                    if (recentEntry) {
                        feedback.textContent =
                            "You have already submitted a greeting from this IP in the last 24 hours.";
                        return;
                    }
                }
            } catch (e) {
                console.warn("IP verification failed, falling back to local check", e);
            }
        }

        // Local 24-hour check
        if (ip) {
            const key = `greet-submitted-${ip}`;
            const stored = localStorage.getItem(key);
            if (stored) {
                try {
                    const data = JSON.parse(stored);
                    if (data.when && now - data.when < oneDayMs) {
                        feedback.textContent =
                            "You have already submitted a greeting from this IP in the last 24 hours.";
                        return;
                    }
                } catch (e) {
                    /* ignore */
                }
            }
        }

        // compute dedup hash (IP + message) to avoid duplicate identical submissions
        const dedupInput = (ip || "web") + "|" + preset;
        async function hashString(s) {
            if (window.crypto && crypto.subtle) {
                const enc = new TextEncoder().encode(s);
                const hashBuf = await crypto.subtle.digest("SHA-1", enc);
                const hashArr = Array.from(new Uint8Array(hashBuf));
                return hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
            }
            // fallback simple hash
            let h = 0;
            for (let i = 0; i < s.length; i++) {
                h = (h << 5) - h + s.charCodeAt(i);
                h |= 0;
            }
            return String(h);
        }
        const dedupHash = await hashString(dedupInput);
        const dedupKey = `greet-submitted-hash-${dedupHash}`;
        const dedupStored = localStorage.getItem(dedupKey);
        if (dedupStored) {
            try {
                const dedupData = JSON.parse(dedupStored);
                if (dedupData.when && now - dedupData.when < oneDayMs) {
                    feedback.textContent = "Duplicate submission detected (same IP/message in last 24 hours).";
                    return;
                }
            } catch (e) {
                /* ignore */
            }
        }

        if (ip) {
            const key = `greet-submitted-${ip}`;
            // mark as submitted per IP with timestamp
            localStorage.setItem(key, JSON.stringify({ when: now, message: preset }));
        } else {
            // fallback: per-browser submission prevention
            const key = "greet-submitted-browserside";
            const browserStored = localStorage.getItem(key);
            if (browserStored) {
                try {
                    const browserData = JSON.parse(browserStored);
                    if (browserData.when && now - browserData.when < oneDayMs) {
                        feedback.textContent =
                            "You have already submitted a greeting from this browser in the last 24 hours.";
                        return;
                    }
                } catch (e) {
                    /* ignore */
                }
            }
            localStorage.setItem(key, JSON.stringify({ when: now, message: preset }));
        }
        // Prepare message and notes (notes stores emoticon separately)
        const messageText = preset;
        const notesEmoji = selectedFeeling || "";
        const countryCode = selectedCountry || "XX"; // Country code like 'GT', 'US', etc.

        // Optimistic UI: insert pending card immediately
        const optimisticEntry = { message: messageText, feeling: notesEmoji, when: "Sending…", _pending: true };
        const currentList = JSON.parse(localStorage.getItem("greetings-list") || "[]");
        // render optimistic at top by temporarily adding to DOM grid
        renderPagination([...(currentList || []), optimisticEntry], 1, 5);

        // Attempt to send to NocoDB if configured; fall back to local storage
        try {
            const userField = ip || "web";
            const postUrl = NOCODB.postUrl || NOCODB.url;
            if (postUrl && NOCODB.token) {
                const resp = await postToNocoDB(messageText, userField, notesEmoji, countryCode).catch((err) => {
                    throw err;
                });
                // success: mark dedup key and reload authoritative list
                localStorage.setItem(dedupKey, JSON.stringify({ when: Date.now() }));
                // reload list from NocoDB
                const nocodbList = await fetchFromNocoDB();
                if (nocodbList) renderPagination(nocodbList, 1, 5);
                feedback.textContent = "Thanks — your greeting was added (saved to NocoDB)!";
            } else {
                // save locally: store message and emoticon separately
                saveWallEntry(messageText, notesEmoji);
                localStorage.setItem(dedupKey, JSON.stringify({ when: Date.now() }));
                feedback.textContent = "Thanks — your greeting was added (saved locally)!";
            }
        } catch (e) {
            // on failure save locally as fallback and show specific error
            saveWallEntry(messageText, notesEmoji);
            // detect error type
            let msg = "Saved locally (NocoDB failed).";
            if (e && e.message) {
                const em = e.message.toLowerCase();
                if (em.includes("401") || em.includes("unauthor"))
                    msg = "Unauthorized: invalid API token (401). Entry saved locally.";
                else if (em.includes("429") || em.includes("rate")) msg = "Rate limit exceeded. Entry saved locally.";
                else msg = "Network or server error. Entry saved locally.";
            } else {
                msg = "Network or CORS error. Entry saved locally.";
            }
            feedback.textContent = msg;
        }
        // reset UI selections and form
        document.getElementById("greet-form").reset();
        // clear selected classes and aria-pressed from preset cards, feelings, countries and captcha
        document.querySelectorAll(".preset-card.selected").forEach((x) => {
            x.classList.remove("selected");
            x.setAttribute("aria-pressed", "false");
        });
        document.querySelectorAll(".feeling.selected").forEach((x) => {
            x.classList.remove("selected");
            x.setAttribute("aria-pressed", "false");
        });
        selectedFeeling = null;
        selectedCountry = null;
        selectedMessage = null;
        if (messageSelectEl) messageSelectEl.selectedIndex = 0;
        if (countrySelector) countrySelector.selectedIndex = 0;
        checkFormValidity(); // Re-disable submit button
    });
});
