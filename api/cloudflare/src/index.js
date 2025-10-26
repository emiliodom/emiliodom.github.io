// Cloudflare Worker script for NocoDB proxy
// Deploy this to Cloudflare Workers and set NOCODB_TOKEN as environment variable

export default {
    async fetch(request, env) {
        // CORS headers
        const corsHeaders = {
            "Access-Control-Allow-Origin": "https://emiliodom.github.io",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400",
        };

        // Handle preflight
        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        // Only allow from your domain
        const origin = request.headers.get("Origin");
        if (origin !== "https://emiliodom.github.io") {
            return new Response("Forbidden", { status: 403 });
        }

        const url = new URL(request.url);
        const path = url.pathname;

        // Route: GET /api/greetings
        if (path === "/api/greetings" && request.method === "GET") {
            try {
                const nocodbUrl =
                    "https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records?viewId=vww985w35i0umz1g&limit=25&shuffle=0&offset=0";
                const response = await fetch(nocodbUrl, {
                    headers: {
                        accept: "application/json",
                        "xc-token": env.NOCODB_TOKEN,
                    },
                });

                if (!response.ok) {
                    throw new Error(`NocoDB GET failed: ${response.status}`);
                }

                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: e.message }), {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }
        }

        // Route: POST /api/greetings
        if (path === "/api/greetings" && request.method === "POST") {
            try {
                const body = await request.json();

                // Validate required fields
                if (!body.Message || !body.User || !body.Notes) {
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

                const nocodbUrl = "https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records";
                const response = await fetch(nocodbUrl, {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                        "xc-token": env.NOCODB_TOKEN,
                    },
                    body: JSON.stringify(sanitized),
                });

                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`NocoDB POST failed: ${response.status} ${text}`);
                }

                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: e.message }), {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }
        }

        // Route: GET /api/ip (optional - for IP detection)
        if (path === "/api/ip" && request.method === "GET") {
            const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
            return new Response(JSON.stringify({ ip }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        return new Response("Not Found", { status: 404, headers: corsHeaders });
    },
};
