import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // console.log("middleware executed");
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;
  const adminAuthToken = cookieStore.get("adminAuthToken")?.value;

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
  const loggedInAdminUserNotAccessPaths =
    request.nextUrl.pathname === "/admin/login" ||
    request.nextUrl.pathname == "/admin/register";

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (loggedInAdminUserNotAccessPaths) {
      if (adminAuthToken) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else {
      if (!adminAuthToken && request.nextUrl.pathname.startsWith("/admin")) {
        if (request.nextUrl.pathname.startsWith("/api/admin")) {
          return NextResponse.json(
            {
              message: "Access Denied !! admin",
              success: false,
            },
            {
              status: 401,
            }
          );
        }
        return NextResponse.redirect(new URL("/admin/login", request.url));
      } else {
        // varify...
      }
    }
  } else {
    if (loggedInUserNotAccessPaths) {
      // access not secured route
      if (authToken) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      if (!authToken && request.nextUrl.pathname.startsWith("/")) {
        if (request.nextUrl.pathname.startsWith("/api")) {
          return NextResponse.json(
            {
              message: "Access Denied user!!",
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
  }

  //   console.log(authToken);

  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/admin",
    "/admin/login",
    "/admin/register",
    "/admin/movies",
    "/admin/addMovie",
    "/login",
    "/register",
    // "/api/:path*",
  ],
};
