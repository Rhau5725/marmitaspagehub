import { NextResponse } from "next/server";

const META_PIXEL_ID = "2140373103194475";
const DEFAULT_GRAPH_API_VERSION = "v22.0";

export async function POST(request: Request) {
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;
  if (!accessToken) return new NextResponse(null, { status: 204 });

  let body: { eventId?: string; eventSourceUrl?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.eventId || !body.eventSourceUrl) {
    return NextResponse.json({ error: "Missing event data" }, { status: 400 });
  }

  try {
    const eventUrl = new URL(body.eventSourceUrl);
    if (eventUrl.protocol !== "https:" && eventUrl.protocol !== "http:") throw new Error();
  } catch {
    return NextResponse.json({ error: "Invalid event URL" }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent");
  const graphVersion = process.env.META_GRAPH_API_VERSION ?? DEFAULT_GRAPH_API_VERSION;

  const userData: Record<string, string> = {};
  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;

  const response = await fetch(
    `https://graph.facebook.com/${graphVersion}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: "PageView",
            event_time: Math.floor(Date.now() / 1000),
            event_id: body.eventId,
            event_source_url: body.eventSourceUrl,
            action_source: "website",
            user_data: userData,
          },
        ],
      }),
    },
  );

  return NextResponse.json(
    { ok: response.ok },
    { status: response.ok ? 200 : 502 },
  );
}
