import { cookies } from "next/headers";

const nextCookies = cookies();
export const token = nextCookies.get("authToken");
