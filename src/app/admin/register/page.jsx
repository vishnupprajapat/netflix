"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Input from "@/components/Input";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const register = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      await axios.post("/api/admin/register", {
        email,
        username,
        password,
      });
      setLoading(true);
      router.push("/admin/login");
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      setError(error.response.data.message);
    }
    // setIsValid(emailRegex.test(email));
    console.log(email, username);
  }, [email, username, password, router]);
  useEffect(() => {
    register;
  }, [register]);
  return (
    <div className="relative h-full w-full">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-[120px] lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Register</h2>
            <div className="flex flex-col gap-4">
              <Input
                id="name"
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
              />
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
              />
              {isValid ? (
                ""
              ) : (
                <p className="text-red-600">Invalid Email Address</p>
              )}
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
              onClick={register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {loading ? <Loader /> : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12 text-center">
              Already have an account?
              <Link
                className="text-white ml-1 hover:underline cursor-pointer"
                href="/admin/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
