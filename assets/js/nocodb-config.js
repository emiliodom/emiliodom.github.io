// NocoDB configuration - using Cloudflare Worker proxy
// The proxy handles authentication securely on the server side
// No token needed on the client side!

(function () {
    window.NOCODB_CONFIG = {
        postUrl: "https://nocodb-proxy.edomingt.workers.dev/api/greetings",
        getUrl: "https://nocodb-proxy.edomingt.workers.dev/api/greetings",
        token: null, // No token needed - proxy handles authentication
    };
})();
