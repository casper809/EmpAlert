export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Route only /api/alert requests to Rave
    if (url.pathname === '/api/alert' && request.method === 'POST') {
      try {
        const xmlBody = await request.text();

        // Rave REST Endpoint URL & Credentials (or use Cloudflare Env vars)
        const RAVE_ENDPOINT = env.RAVE_ENDPOINT || "https://www.getrave.com/remoteservices/capalert/siskiyouca/in3";
        const RAVE_USER = env.RAVE_USER || "EmpAlertIn";
        const RAVE_PASS = env.RAVE_PASS || "EmployeeAlertPassword1";

        const authHeader = "Basic " + btoa(`${RAVE_USER}:${RAVE_PASS}`);

        // Forward the POST request from Cloudflare server-side to Rave
        const raveResponse = await fetch(RAVE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/xml',
            'Authorization': authHeader
          },
          body: xmlBody
        });

        const responseData = await raveResponse.text();

        return new Response(responseData, {
          status: raveResponse.status,
          headers: {
            'Content-Type': 'application/xml',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (err) {
        return new Response(`Worker Relay Error: ${err.message}`, { status: 500 });
      }
    }

    // Pass all static requests (index.html, images, CSS) through to Cloudflare Pages assets
    return env.ASSETS.fetch(request);
  }
};