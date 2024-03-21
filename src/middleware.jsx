import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log("middleware executed");

  const authToken = request.cookies.get("authToken")?.value;
  const adminAuthToken = request.cookies.get("adminAuthToken")?.value;

  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/register" ||
    request.nextUrl.pathname === "/api/admin/login" ||
    request.nextUrl.pathname === "/api/admin/register"
  ) {
    return;
  }

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname == "/register";

  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("admin");
  }

  if (loggedInUserNotAccessPaths) {
    // access not secured route
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // accessing secured route

    if (!authToken) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json(
          {
            message: "Access Denied !!",
            success: false,
          },
          {
            status: 401,
          }
        );
      }

      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      // varify...
    }
  }

  //   console.log(authToken);

  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    // "/admin",
    // "/admin/login",
    // "/admin/register",
    "/login",
    "/register",
    "/api/:path*",
  ],
};
