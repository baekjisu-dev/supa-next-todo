import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";


// - Router Handler
// RESTful API 관련
// app > api > 엔드 포인트 > route.ts > GET, POST... 로 작성
export const createServerSideClient = async (serverComponent = false) => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if (serverComponent) return;
          cookieStore.set(key, value, options)
        },
        remove: (key, options) => {
          if (serverComponent) return;
          cookieStore.set(key, "", options);
        }
      }
    }
  );
}

export const createServerSideClientRSC = async () => {
  createServerSideClient(true);
}

export const createServerSideMiddleware = async (req: NextRequest, res: NextResponse) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => getCookie(key, {req, res}),
        set: (key, value, options) => {
          setCookie(key, value, { req, res, ...options })
        },
        remove: (key, options) => {
          setCookie(key, "", { req, res, ...options });
        }
      }
    }
  );
}