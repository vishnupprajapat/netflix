"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useState } from "react";
import Input from "@/components/Input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import UserContext from "@/context/userContext";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function Page() {
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
      await axios.post("/api/login", {
        email,
        password,
      });
      router.push("/");
      // window.location.reload();
    } catch (error) {
      // console.log("Error logging in:", error.response);
      setLoading(false);
      setError("Invalid email or password");
    }
  }, [email, password, router]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            className="h-12"
            alt="Logo"
            width={100}
            height={100}
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
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
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                // onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                // onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12 text-center">
              First time using Netflix?
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Create an account
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
