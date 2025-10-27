/**
 * Network utility functions with retry logic
 */

/**
 * Performs an exponential backoff retry for fetch operations
 * @param {string} url - The URL to fetch
 * @param {RequestInit} options - Fetch options
 * @param {number} maxAttempts - Maximum retry attempts
 * @returns {Promise<Response>} The fetch response
 * @throws {Error} If all retry attempts fail
 */
async function fetchWithRetry(url, options = {}, maxAttempts = CONFIG.RETRY.MAX_ATTEMPTS) {
    let lastError;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const response = await fetch(url, options);

            if (response.ok || response.status === 400 || response.status === 403) {
                return response;
            }

            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        } catch (error) {
            lastError = error;

            if (attempt < maxAttempts - 1) {
                const delay = Math.min(
                    CONFIG.RETRY.INITIAL_DELAY_MS * Math.pow(CONFIG.RETRY.BACKOFF_MULTIPLIER, attempt),
                    CONFIG.RETRY.MAX_DELAY_MS
                );
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError;
}

/**
 * Fetches and parses JSON with retry logic
 * @param {string} url - The URL to fetch
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
async function fetchJSON(url, options = {}) {
    const response = await fetchWithRetry(url, {
        ...options,
        headers: {
            accept: "application/json",
            ...options.headers,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Fetch failed: ${response.status} ${text}`);
    }

    return response.json();
}
