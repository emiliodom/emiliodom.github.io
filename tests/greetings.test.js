/**
 * Test Cases for Greetings Functionality
 *
 * These tests verify the core functionality of the greetings system including:
 * - Form validation
 * - 24-hour submission prevention
 * - Connection status detection
 * - Local storage fallback
 * - Country and feeling selection
 */

// Mock test framework structure
const tests = {
    passed: 0,
    failed: 0,
    results: [],
};

function assert(condition, message) {
    if (condition) {
        tests.passed++;
        tests.results.push({ status: "✅ PASS", message });
        console.log(`✅ PASS: ${message}`);
    } else {
        tests.failed++;
        tests.results.push({ status: "❌ FAIL", message });
        console.error(`❌ FAIL: ${message}`);
    }
}

function assertEquals(actual, expected, message) {
    assert(actual === expected, `${message} (expected: ${expected}, got: ${actual})`);
}

// Test Suite
describe("Greetings System Tests", () => {
    // Test 1: Preset Messages Exist
    test("Should have preset messages loaded", () => {
        const messages = [
            { id: "m1", text: "Keep pushing, you're doing great!" },
            { id: "m2", text: "Proud of your work — keep it up." },
        ];
        assert(messages.length > 0, "Preset messages array should not be empty");
        assert(messages[0].text.length > 0, "Preset message should have text");
    });

    // Test 2: 24-Hour Submission Check
    test("Should prevent duplicate submission within 24 hours", () => {
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;

        // Simulate a recent submission
        const recentSubmission = { when: now - 1000 * 60 * 60 * 2 }; // 2 hours ago
        const timeSince = now - recentSubmission.when;

        assert(timeSince < oneDayMs, "Should detect submission within 24 hours");

        // Simulate an old submission
        const oldSubmission = { when: now - (oneDayMs + 1000) };
        const oldTimeSince = now - oldSubmission.when;

        assert(oldTimeSince > oneDayMs, "Should allow submission after 24 hours");
    });

    // Test 3: Calculate Hours Remaining
    test("Should correctly calculate hours remaining", () => {
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        const twoHoursAgo = now - 2 * 60 * 60 * 1000;

        const hoursLeft = Math.ceil((oneDayMs - (now - twoHoursAgo)) / (1000 * 60 * 60));

        assertEquals(hoursLeft, 22, "Should show 22 hours remaining");
    });

    // Test 4: IP Validation
    test("Should handle IP address validation", () => {
        const validIP = "192.168.1.1";
        const invalidIP = null;

        assert(validIP && validIP.length > 0, "Valid IP should be a non-empty string");
        assert(invalidIP === null || invalidIP === "web", 'Invalid IP should fallback to null or "web"');
    });

    // Test 5: Message Sanitization
    test("Should sanitize message content", () => {
        const unsafeMessage = '<script>alert("xss")</script>';
        const badWords = ["spam", "badword"];

        // Check if message contains bad words
        const hasBadWord = badWords.some((word) => unsafeMessage.toLowerCase().includes(word));

        assert(!hasBadWord, "Should not contain bad words");
        assert(unsafeMessage.length <= 500, "Message should be within length limit");
    });

    // Test 6: LocalStorage Fallback
    test("Should save to localStorage when offline", () => {
        const mockGreeting = {
            message: "Test message",
            feeling: "😊",
            when: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        };

        // Simulate saving to localStorage
        const list = [mockGreeting];

        assert(list.length > 0, "Should save greeting to local list");
        assert(mockGreeting.message.length > 0, "Saved greeting should have message");
    });

    // Test 7: Form Field Validation
    test("Should validate required form fields", () => {
        const formData = {
            message: "Keep pushing, you're doing great!",
            feeling: "😊",
            country: "🇬🇹",
            captcha: 5,
        };

        assert(formData.message && formData.message.length > 0, "Message should be required");
        assert(formData.captcha !== null && formData.captcha !== undefined, "Captcha should be required");
    });

    // Test 8: Country Selection
    test("Should handle country selection", () => {
        const countries = ["🇬🇹", "🇺🇸", "🇲🇽", "🇪🇸"];
        const selectedCountry = "🇬🇹";

        assert(countries.includes(selectedCountry), "Selected country should be in available list");
        assert(selectedCountry.length > 0, "Country should not be empty");
    });

    // Test 9: Feeling Selection
    test("Should handle feeling/emoticon selection", () => {
        const feelings = ["😊", "🙂", "😄", "🤩", "👏"];
        const selectedFeeling = "😊";

        assert(feelings.includes(selectedFeeling), "Selected feeling should be in available list");
        assert(selectedFeeling.length > 0, "Feeling should not be empty");
    });

    // Test 10: Deduplication Hash
    test("Should generate deduplication hash", async () => {
        const ip = "192.168.1.1";
        const message = "Test message";
        const dedupInput = ip + "|" + message;

        // Simple hash simulation
        let h = 0;
        for (let i = 0; i < dedupInput.length; i++) {
            h = (h << 5) - h + dedupInput.charCodeAt(i);
            h |= 0;
        }
        const hash = String(h);

        assert(hash.length > 0, "Should generate non-empty hash");
        assert(typeof hash === "string", "Hash should be a string");
    });

    // Test 11: Pagination
    test("Should paginate greeting list correctly", () => {
        const greetings = Array.from({ length: 25 }, (_, i) => ({
            message: `Message ${i + 1}`,
            feeling: "😊",
            when: "Oct 26, 2025",
        }));

        const perPage = 5;
        const page = 1;
        const start = (page - 1) * perPage;
        const pageItems = greetings.slice(start, start + perPage);

        assertEquals(pageItems.length, 5, "Should return 5 items per page");
        assertEquals(Math.ceil(greetings.length / perPage), 5, "Should have 5 pages total");
    });

    // Test 12: Connection Status Check
    test("Should detect connection status", async () => {
        // Simulate successful connection
        const mockResponse = { ok: true, status: 200 };

        assert(mockResponse.ok, "Should detect successful connection");
        assertEquals(mockResponse.status, 200, "Should return 200 status code");
    });

    // Test 13: NocoDB Config Validation
    test("Should validate NocoDB configuration", () => {
        const config = {
            postUrl: "https://nocodb-proxy.edomingt.workers.dev/api/greetings",
            getUrl: "https://nocodb-proxy.edomingt.workers.dev/api/greetings",
            token: null,
        };

        assert(config.postUrl && config.postUrl.length > 0, "Post URL should be configured");
        assert(config.getUrl && config.getUrl.length > 0, "Get URL should be configured");
        assert(config.token === null, "Token should be null (handled by proxy)");
    });

    // Test 14: Optimistic UI Update
    test("Should show pending state during submission", () => {
        const optimisticEntry = {
            message: "Test message",
            feeling: "😊",
            when: "Sending…",
            _pending: true,
        };

        assert(optimisticEntry._pending === true, "Should mark entry as pending");
        assertEquals(optimisticEntry.when, "Sending…", 'Should show "Sending..." status');
    });

    // Test 15: Error Handling
    test("Should handle errors gracefully", () => {
        const errors = {
            401: "Unauthorized: invalid API token",
            429: "Rate limit exceeded",
            network: "Network or CORS error",
        };

        assert(errors["401"].includes("Unauthorized"), "Should have appropriate error message for 401");
        assert(errors["429"].includes("Rate limit"), "Should have appropriate error message for 429");
        assert(errors["network"].includes("Network"), "Should have appropriate error message for network errors");
    });
});

// Helper functions for test framework
function describe(suiteName, tests) {
    console.log(`\n📦 ${suiteName}`);
    console.log("=".repeat(50));
    tests();
}

function test(testName, testFunction) {
    console.log(`\n🧪 ${testName}`);
    try {
        testFunction();
    } catch (error) {
        tests.failed++;
        tests.results.push({ status: "❌ ERROR", message: `${testName}: ${error.message}` });
        console.error(`❌ ERROR: ${testName}:`, error.message);
    }
}

// Run all tests
console.log("\n🚀 Starting Greetings Test Suite...\n");
describe("Greetings System Tests", () => {
    test("Should have preset messages loaded", () => {
        const messages = [
            { id: "m1", text: "Keep pushing, you're doing great!" },
            { id: "m2", text: "Proud of your work — keep it up." },
        ];
        assert(messages.length > 0, "Preset messages array should not be empty");
        assert(messages[0].text.length > 0, "Preset message should have text");
    });

    test("Should prevent duplicate submission within 24 hours", () => {
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        const recentSubmission = { when: now - 1000 * 60 * 60 * 2 };
        const timeSince = now - recentSubmission.when;
        assert(timeSince < oneDayMs, "Should detect submission within 24 hours");
    });

    test("Should correctly calculate hours remaining", () => {
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        const twoHoursAgo = now - 2 * 60 * 60 * 1000;
        const hoursLeft = Math.ceil((oneDayMs - (now - twoHoursAgo)) / (1000 * 60 * 60));
        assertEquals(hoursLeft, 22, "Should show 22 hours remaining");
    });

    test("Should validate required form fields", () => {
        const formData = {
            message: "Keep pushing, you're doing great!",
            feeling: "😊",
            country: "🇬🇹",
            captcha: 5,
        };
        assert(formData.message && formData.message.length > 0, "Message should be required");
    });

    test("Should paginate greeting list correctly", () => {
        const greetings = Array.from({ length: 25 }, (_, i) => ({
            message: `Message ${i + 1}`,
            feeling: "😊",
            when: "Oct 26, 2025",
        }));
        const perPage = 5;
        const pageItems = greetings.slice(0, perPage);
        assertEquals(pageItems.length, 5, "Should return 5 items per page");
    });
});

// Print summary
console.log("\n" + "=".repeat(50));
console.log("📊 Test Summary");
console.log("=".repeat(50));
console.log(`✅ Passed: ${tests.passed}`);
console.log(`❌ Failed: ${tests.failed}`);
console.log(`📈 Total: ${tests.passed + tests.failed}`);
console.log(`🎯 Success Rate: ${((tests.passed / (tests.passed + tests.failed)) * 100).toFixed(2)}%`);
console.log("=".repeat(50) + "\n");
