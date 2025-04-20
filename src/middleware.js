import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // リフレッシュトークンの処理とセッションの更新
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: [
    // 認証が必要なルートを指定
    // ユーザー管理関連の全てのルートを保護
    "/user/:path*",
  ],
};
