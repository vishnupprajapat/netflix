"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Input from "@/components/Input";
import Link from "next/link";
import Loader from "@/components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useCallback(async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      setError("");
      setLoading(true);
      await axios.post("/api/admin/login", {
        email,
        password,
      });
      router.push("/admin");
      window.location.reload();
    } catch (error) {
      console.log("Error logging in:", error.response);
      setLoading(false);
      setError("Invalid email or password");
    }
  }, [email, password, router]);
  useEffect(() => {
    login;
  }, [login]);

  return (
    <div className="relative h-full w-full">
      <div className="bg-black w-full h-full lg:bg-opacity-50 ">
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-[120px] lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">login</h2>
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
              />
              <span className="text-red-600">{error}</span>
            </div>
            <button
              onClick={login}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {loading ? <Loader /> : "Login"}
            </button>
            <p className="text-neutral-500 mt-12 text-center">
              First time using Netflix?
              <Link
                className="text-white ml-1 hover:underline cursor-pointer"
                href="/admin/register"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
