import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request) {
  const response = NextResponse.json({
    message: "Logged out !!",
    success: true,
  });

  cookies().set("adminAuthToken", "", {
    expires: new Date(0),
  });

  return response;
}
