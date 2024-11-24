import { createServerSideClient } from "@/lib/supbase";
import { NextResponse } from "next/server";

export async function GET (request: Request) {
  const overrideOrigin = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME;
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next");
  
  if (code) {
    const supbase = await  createServerSideClient();
    const { error } = await supbase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${overrideOrigin}`);
    } else {
      return NextResponse.redirect(`${overrideOrigin}${next}`);
    }
  }

  return NextResponse.redirect(`${overrideOrigin}`);
}