// Cloudflare Worker script for NocoDB proxy
// Deploy this to Cloudflare Workers and set NOCODB_TOKEN as environment variable

export default {
    async fetch(request, env) {
        console.log("🚀 Worker invoked:", request.method, request.url);

        // CORS headers
        const corsHeaders = {
            "Access-Control-Allow-Origin": "https://emiliodom.github.io",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400",
        };

        // Handle preflight
        if (request.method === "OPTIONS") {
            console.log("✅ Handling OPTIONS preflight");
            return new Response(null, { headers: corsHeaders });
        }

        // Only allow from your domain
        const origin = request.headers.get("Origin");
        console.log("🌐 Request origin:", origin);
        if (origin !== "https://emiliodom.github.io") {
            console.error("❌ Forbidden origin:", origin);
            return new Response("Forbidden", { status: 403 });
        }

        const url = new URL(request.url);
        const path = url.pathname;
        console.log("📍 Path:", path);

        // Route: GET /api/greetings
        if (path === "/api/greetings" && request.method === "GET") {
            console.log("📥 GET /api/greetings");
            try {
                const nocodbUrl =
                    "https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records?viewId=vww985w35i0umz1g&limit=25&shuffle=0&offset=0";
                console.log("🔗 Fetching from NocoDB...");
                const response = await fetch(nocodbUrl, {
                    headers: {
                        accept: "application/json",
                        "xc-token": env.NOCODB_TOKEN,
                    },
                });

                console.log("📊 NocoDB response status:", response.status);
                if (!response.ok) {
                    throw new Error(`NocoDB GET failed: ${response.status}`);
                }

                const data = await response.json();
                console.log("✅ Returning", data.list?.length || 0, "records");
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            } catch (e) {
                console.error("❌ GET error:", e.message);
                return new Response(JSON.stringify({ error: e.message }), {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }
        }

        // Route: POST /api/greetings
        if (path === "/api/greetings" && request.method === "POST") {
            console.log("📮 POST /api/greetings");
            try {
                const body = await request.json();
                console.log("📦 Request body:", JSON.stringify(body));

                // Validate hCaptcha token
                if (!body.hcaptchaToken) {
                    console.error("❌ Missing hCaptcha token");
                    return new Response(JSON.stringify({ error: "CAPTCHA verification required" }), {
                        status: 400,
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                    });
                }

                // Verify hCaptcha with their API
                console.log("🔐 Verifying hCaptcha...");
                const hcaptchaResponse = await fetch("https://api.hcaptcha.com/siteverify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        secret: env.HCAPTCHA_SECRET,
                        response: body.hcaptchaToken,
                        remoteip:
                            request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "",
                    }),
                });

                const hcaptchaResult = await hcaptchaResponse.json();
                console.log("🔐 hCaptcha verification result:", JSON.stringify(hcaptchaResult));

                if (!hcaptchaResult.success) {
                    console.error("❌ hCaptcha verification failed:", hcaptchaResult["error-codes"]);
                    return new Response(JSON.stringify({ error: "CAPTCHA verification failed. Please try again." }), {
                        status: 400,
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                    });
                }

                console.log("✅ hCaptcha verified successfully");

                // Validate required fields
                if (!body.Message || !body.User || !body.Notes) {
                    console.error("❌ Missing fields:", {
                        Message: !!body.Message,
                        User: !!body.User,
                        Notes: !!body.Notes,
                    });
                    return new Response(JSON.stringify({ error: "Missing required fields" }), {
                        status: 400,
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                    });
                }

                // Basic sanitization
                const sanitized = {
                    Message: String(body.Message).substring(0, 500),
                    User: String(body.User).substring(0, 100),
                    Notes: String(body.Notes).substring(0, 50),
                    Country: body.Country ? String(body.Country).substring(0, 10) : "🌍",
                };
                console.log("🧹 Sanitized data:", JSON.stringify(sanitized));

                const nocodbUrl = "https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records";
                console.log("🔗 Posting to NocoDB...");
                const response = await fetch(nocodbUrl, {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                        "xc-token": env.NOCODB_TOKEN,
                    },
                    body: JSON.stringify(sanitized),
                });

                console.log("📊 NocoDB POST response status:", response.status);
                if (!response.ok) {
                    const text = await response.text();
                    console.error("❌ NocoDB error:", text);
                    throw new Error(`NocoDB POST failed: ${response.status} ${text}`);
                }

                const data = await response.json();
                console.log("✅ POST successful:", JSON.stringify(data));
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            } catch (e) {
                console.error("❌ POST error:", e.message);
                return new Response(JSON.stringify({ error: e.message }), {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }
        }

        // Route: GET /api/ip (optional - for IP detection)
        if (path === "/api/ip" && request.method === "GET") {
            const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
            console.log("🌐 IP request:", ip);
            return new Response(JSON.stringify({ ip }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        console.log("❌ Route not found:", path, request.method);
        return new Response("Not Found", { status: 404, headers: corsHeaders });
    },
};
