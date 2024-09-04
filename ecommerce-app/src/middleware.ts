import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./helpers/jwt";
import { UserType } from "./db/models/users";
// import { UserType } from "./db/models/users";

async function auth(request: NextRequest) {
  try {
    // 1. Ambil token dari cookies
    const authCookie = cookies().get("Authorization");
    // console.log(authCookie, "<<<<< authCookie");

    // 2. Check authCookie
    if (!authCookie) throw new Error("Invalid Token");

    // 3. Verify token
    const [type, token] = authCookie.value.split(" ");
    if (type !== "Bearer") throw new Error("Invalid Token");
    const result = await verifyToken<UserType>(token);

    // 4. Berhasil? -> Lanjut
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", result._id.toString());
    requestHeaders.set("x-user-name", result.name.toString());
    requestHeaders.set("x-user-email", result.email.toString());
    return requestHeaders;
  } catch (error) {
    throw error;
  }
}

export async function middleware(request: NextRequest) {
  try {
    const headers = await auth(request);
    // Bisa terapkan authorization disini
    // const userId = headers.get("x-user-id")
    // Check authorization delete wishlist
    return NextResponse.next({
      request: {
        // New request headers
        headers: headers,
      },
    });
  } catch (error) {
    console.log(error);
    if (request.nextUrl.pathname === "/users") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (error instanceof Error) {
      return NextResponse.json<{ error: string }>(
        {
          error: error.message,
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json<{ error: string }>(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export const config = {
  matcher: ["/api/users/:path*", "/api/wishlists/:path*"],
};
