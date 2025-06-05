import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const code = req.nextUrl.searchParams.get("code");
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await res.json();
    const accessToken = data.access_token;

    const cookieStore = cookies();
    cookieStore.set("token", accessToken);

    return NextResponse.redirect(`${baseUrl}/dashboard?token=${accessToken}`);
  } catch {
    return NextResponse.redirect(`${baseUrl}/dashboard?token=`);
  }
}
