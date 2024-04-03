import React from "react";
import { cookies } from "next/headers";

const cookieStore = cookies();
const cookie = cookieStore.get("adminAuthToken");

export default cookie;
