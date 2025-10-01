import { NextResponse } from "next/server";

async function fetchPosMenu() {
  let url = process.env.POS_API_URL?.trim();
  const token = process.env.POS_API_TOKEN;

  if (!url || !token) {
    return NextResponse.json(
      {
        error:
          "POS API not configured. Please set POS_API_URL and POS_API_TOKEN in .env",
      },
      { status: 500 }
    );
  }

  // Ensure absolute URL with protocol
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  const form = new URLSearchParams({
    token,
    action: "download",
    type: "posmenu",
  });

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      cache: "no-store",
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        error: `Failed to reach POS API: ${e?.message || "network error"}`,
        url,
      },
      { status: 502 }
    );
  }

  const text = await upstream.text();
  try {
    const data = JSON.parse(text);
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, data },
        { status: 502 }
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch {
    if (!upstream.ok) {
      return NextResponse.json(
        {
          error: "Upstream non-JSON response",
          status: upstream.status,
          body: text,
        },
        { status: 502 }
      );
    }
    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    return await fetchPosMenu();
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    return await fetchPosMenu();
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
